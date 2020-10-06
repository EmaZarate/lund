import { LoadingService } from './../../../../core/services/loading.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonService } from 'src/app/main/person-management/person.service';
import {DocumentAttachedService } from 'src/app/shared/components/document-attached-list/document-attached.service';
import { Person } from 'src/app/main/person-management/models/person.model';
import { ContactInfo } from 'src/app/main/person-management/models/contact.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GridColumnFactoryService, GridSettings } from '@sc/portal.fe.lib.ui-core-components';
import { SelectBusinessuinitService } from 'src/app/shared/services/select-businessuinit.service';
import { PersonBusinessUnit } from 'src/app/main/person-management/models/personBusinessUnits.model';
import { Observable, of } from 'rxjs';
import { DateFormat} from 'src/app/shared/dateFormat';
import { DocumentAttached } from 'src/app/shared/models/document-attached.model';
import { appRoutes } from 'src/constants/app-routes';
import { BusinessUnit } from 'src/app/shared/models/businessUnit.model';
import { RiskService } from '../../risk.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.scss']
})
export class PersonDetailComponent implements OnInit {

  @Output() button = new EventEmitter<any>();
  
  contactInfo: ContactInfo;
  isNewPerson: boolean;

  person: Person;
  personForm: FormGroup;

  title;
  documentAttached: Observable<DocumentAttached[]>;
  settings: GridSettings;
  dateFormat: DateFormat = new DateFormat();
  personBusinessUnits: Observable<PersonBusinessUnit[]> = new Observable();
  businessUnit: any[] = [];
  activity: string;
  get checkboxObligatedSubject() { return this.personForm.get('checkboxObligatedSubject'); } 
  get checkboxUIF() { return this.personForm.get('checkboxUIF'); } 
  risks:any[] = [];
  constructor(

    private router: Router,
    private route: ActivatedRoute,
    private personService: PersonService,
    private fb: FormBuilder,
    private gridFactory: GridColumnFactoryService,
    private documentAttachedService: DocumentAttachedService,
    private businessUnitService: SelectBusinessuinitService,
    private riskService: RiskService,
    private loadingService: LoadingService,
    private location: Location
  ) { }

  ngOnInit() {  
    this.loadingService.setLoading(true);
    this.getFormData(this.route.snapshot.params.id);
    this.gridMap();
  }


  handleButtonClick() {
    this.button.emit(
      this.navigateToList()
    );
  }

  private getFormData(id: number){
    
    this.personService.getById(id).subscribe(res => {
      this.person = res;
      this.loadingService.setLoading(false);
      this.personBusinessUnits = of(res.personBusinessUnits);
      this.contactInfo = new ContactInfo(res.mail, res.address, res.zipCode,  res.location.description, res.location.stateId);
      this.isNewPerson = false;
      this.personForm.controls['checkboxUIF'].patchValue(res.registerUIF);
      this.personService.getActivity().subscribe(
        resp =>{
          for (var i=0;i<resp.length;i++){
            if(resp[i].id === res.activityId){
              this.activity = resp[i].description;
              this.personForm.controls['checkboxObligatedSubject'].patchValue(resp[i].obligatedSubject);
            }              
          }          
        }
        );
      });
      
      this.documentAttachedService.getDocumentsByPersonId(id).subscribe(res =>{
        this.documentAttached = of (res);
    });
    this.riskService.getAll().subscribe(res => {
       this.risks =  res;    
    });
    this.businessUnitService.getBusinessUnit().subscribe( res => {
        this.businessUnit = res;
    });
    
    this.personForm = this.fb.group({
      checkboxObligatedSubject:false,
      checkboxUIF: false,
    });
  }
 
  private navigateToList() {
    this.router.navigate(['../person-management']);
  }

  gridMap() {

    this.settings = {
      columns: [
        this.gridFactory.value({
          id: "",
          header: "Unidad de Negocio",
          primaryValueGetter: (row: PersonBusinessUnit) => {      
            return row.businessUnit['description']
          },
        }),
        this.gridFactory.value({
          id: "",
          header: "Perfil Transaccional",
          primaryValueGetter: (row: PersonBusinessUnit) => {
            return (row.financialProfile);
          },
        }),
        this.gridFactory.value({
          id: "",
          header: "Riesgo Calculado",
          primaryValueGetter: (row: PersonBusinessUnit) => {
            for(var i=0; i<this.risks.length;i++){
              if(row.calcRisk === this.risks[i].id){
                return this.risks[i].description;
              }
            }  
          },
        }),
        this.gridFactory.value({
          id: "",
          header: "Riesgo Asignado",
          primaryValueGetter: (row: PersonBusinessUnit) => {
            for(var i=0; i<this.risks.length;i++){
              if(row.assignedRisk === this.risks[i].id){
                return this.risks[i].description;
              }
            }  
          },
        }),
       
    
      ]
    }
  }
onCancel() {
  this.location.back();
  }
 
}
