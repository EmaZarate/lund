import { LoadingService } from './../../../../core/services/loading.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from 'src/app/main/person-management/person.service';
import { PersonBusinessUnit } from 'src/app/main/person-management/models/personBusinessUnits.model';
import { SelectBusinessuinitService } from 'src/app/shared/services/select-businessuinit.service';
import { RiskService } from "src/app/main/person-management/risk.service";
import { Risk } from 'src/app/main/person-management/models/risk.model';
import { Observable, of } from 'rxjs';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { appRoutes } from 'src/constants/app-routes';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-person-edit-form',
  templateUrl: './person-edit-form.component.html',
  styleUrls: ['./person-edit-form.component.scss']
})

export class PersonEditFormComponent implements OnInit {

  @Output() button = new EventEmitter<any>();

  personForm: FormGroup;
  itemsRisk: any[] = [];  

  itemsAsync$: Observable<Risk[]>;
  businessUnitDesc: string = "";
  defaultRiskIndex: number;
  personBusinessUnit: any
  itemRiskCalcDesc: string = "";
  personBusinessUnidId: number= -1;
  get riskSelect() {return this.personForm.get("riskSelect");}
  get financialProfile() {return this.personForm.get("financialProfile");}
  
  constructor(

    private fb: FormBuilder,
    private route: ActivatedRoute,
    private personService: PersonService,
    private businessUnitService: SelectBusinessuinitService,
    private riskService: RiskService,
    private router: Router,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {    
    this.loadingService.setLoading(true);    
    this.personForm = this.formCreate();    
    this.getFormData( this.route.snapshot.params.personId,this.route.snapshot.params.id );
  }
 
  getFormData(personId: number, id: number) {

    this.personService.getById(personId).subscribe(res => 
      {
          this.loadingService.setLoading(false);
          for (var i=0;i<res.personBusinessUnits.length;i++){
            if(res.personBusinessUnits[i].id == id){
              this.personBusinessUnit =  res.personBusinessUnits[i];  
            }
          }
         
          this.riskService.getAll().subscribe(res => { 

            this.itemsRisk.push({key:-1, value:'Vacio'});                  
            for (var i=0;i<res.length;i++)
              this.itemsRisk.push({key: res[i].id, value: res[i].description});    
            
            var ix =0;
            for (var i=0;i<this.itemsRisk.length;i++){
              if (this.personBusinessUnit.assignedRisk===this.itemsRisk[i].key){
                ix  = i;
              }
              if(this.personBusinessUnit.calcRisk===this.itemsRisk[i].key){
                this.itemRiskCalcDesc = this.itemsRisk[i].value;
              }
            }

            this.riskSelect.patchValue(this.itemsRisk[ix]);

          });
          this.financialProfile.patchValue(res.personBusinessUnits[0].financialProfile);
      }); 
  }

  formCreate() {
    return this.fb.group({ 
      financialProfile: ['', Validators.max(999)],
      riskSelect: ['']
    });
  }

  onCancel() {
    this.button.emit(
      this.router.navigate( ['/person-management', this.route.snapshot.params.personId, appRoutes.person.edit] )
    );
  }

  onAccept()
  {
    debugger;
    var id =parseInt(this.route.snapshot.params.id);
    var financialProfile = parseInt(this.financialProfile.value);
    var assignedRisk = parseInt(this.riskSelect.value.key);

    this.personService.businessUnitUpdate
    (
      id,
      financialProfile,
      assignedRisk, 
    )
    .subscribe( res => {
        this.router.navigateByUrl('/person-management', { skipLocationChange: true }).then(() => {
          this.router.navigate( ['/person-management', this.route.snapshot.params.personId, appRoutes.person.edit] );
      });
    });
  }
}
