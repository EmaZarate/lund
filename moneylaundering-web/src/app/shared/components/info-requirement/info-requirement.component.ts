import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Case } from 'src/app/main/analyst-assignment/models/case.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GridSettings, GridColumnFactoryService } from '@sc/portal.fe.lib.ui-core-components';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ValidatorsService } from '../../services/validators.service';
import { SelectStateService } from '../../services/select-state.service';
import { SelectLocationService } from '../../services/select-location.service';
import { CaseInfoRequirementService } from  'src/app/main/case-info-requirement/services/case-info-requirement.service'

@Component({
  selector: 'app-info-requirement',
  templateUrl: './info-requirement.component.html',
  styleUrls: ['./info-requirement.component.scss']
})
export class InfoRequirementComponent implements OnInit {
  isValidCaseForm: any;
 
  @Input('case') set setCase(value: Case){
    if(value!=undefined)
    {
      this.case = value;
      
      this.caseInfoRequirementService.getVehicle(this.case.id).subscribe(resp=>{
        this.itemsVehicles = of(resp);
      })

      this.name.patchValue(this.case.person.firstName +" "+ this.case.person.lastName);
      this.address.patchValue(this.case.person.address);
      this.itemsCities.push({locationId: this.case.person.locationId, description: this.case.contactCity, stateId: this.case.contactStateId});
      this.itemsStates.push({stateId: this.case.contactStateId, description: this.case.contactProvince});
      this.cities.patchValue(this.itemsCities[0]);
      this.states.patchValue(this.itemsStates[0]);
      this.email.patchValue(this.case.contactMail);     
      
      if(value.originalPersonId != null){
          this.show = true;    
        }

      this.first_time = 0;  
    }
    
  }
  @Input('itemsEmailType') set setEmailType(value: any[]){
    if(value!=undefined)
    this.itemsEmailType = value;
  }
 
 @Input('itemsLetterType') set setLetterType(value: any[]){
   debugger;
  if(value!=undefined)
  this.itemsLetterType = value;
}
@Input('itemsDuplicates') set setDuplicates(value: any[]){
  debugger;
    if(value!=undefined){
  this.itemsDuplicatesObs =  of (value);
  }
}

@Output() isValidReqForm: EventEmitter<any> = new EventEmitter();

first_time: number = 1;
form: FormGroup;
itemsLetterType:any[] = [];
itemsEmailType: any []= [];
isEmailType : boolean=true;
isLetterType: boolean = false;
isTelephoneType : boolean=false;
itemLetter: any = "";
itemEmail: any = "";
itemsDuplicatesObs : Observable<any[]>;
settings: GridSettings;
settings2: GridSettings;
itemsStates: any[] = [];
itemsCities: any[] = []; 
case:Case;
itemsVehicles: Observable<any[]>;
get name() {return this.form.get("name");}
get address() {return this.form.get("address");}
get cities() {return this.form.get("cities");}
get message() {return this.form.get("message");}
get states() {return this.form.get("states");}
get subject() {return this.form.get("subject");}
get email() {return this.form.get("email");}
get vehicles() {return this.form.get("vehicles");}
show : boolean= false;
@ViewChild('modal1', {static: false})  modal1: any;
constructor(
  private fb: FormBuilder,
  private gridFactory: GridColumnFactoryService,
  private authService: AuthService,
  private toastr: ToastrService,
  private customValidators: ValidatorsService,
  private selectStateService: SelectStateService,
  private selectLocationService :SelectLocationService,
  private caseInfoRequirementService : CaseInfoRequirementService
  ) {}


  ngOnInit() {

    this.getFormData();
    this.gridMap();
    this.gridMap2();
    this.initForm();


  }
  getFormData() {

    this.selectStateService.getStates().subscribe(res=>{
      this.itemsStates = res;     
    })
    
  }
  onFormInit(form: FormGroup) {
    this.isValidReqForm.emit(this.form);
  }


  gridMap() {
    this.settings = {    
      columns: [
        this.gridFactory.value({
          id: "",
          header: "Nombre",
          primaryValueGetter: (row: any) => {
            return row.name            

          },
        }), 
        this.gridFactory.value({
          id: "",
          header: "Direccion",
          primaryValueGetter: (row: any) => {
            return row.address            

          },
        }), 
        this.gridFactory.value({
          id: "",
          header: "Ciudad",
          primaryValueGetter: (row: any) => {
            return row.city            

          },
        }), 
        this.gridFactory.value({
          id: "",
          header: "Provincia",
          primaryValueGetter: (row: any) => {
            return row.state            

          },
        }), 
      ]
    };
  }
  gridMap2() {
    this.settings2 = {    
      columns: [
        this.gridFactory.value({
          id: "",
          header: "Marca",
          primaryValueGetter: (row: any) => {
            return row.make            

          },
        }), 
        this.gridFactory.value({
          id: "",
          header: "Modelo",
          primaryValueGetter: (row: any) => {
            return row.model            

          },
        }), 
        this.gridFactory.value({
          id: "",
          header: "Version",
          primaryValueGetter: (row: any) => {
            return row.version            

          },
        }), 
        this.gridFactory.value({
          id: "",
          header: "Licencia",
          primaryValueGetter: (row: any) => {
            return row.licensePlate            

          },
        }), 
        this.gridFactory.value({
          id: "",
          header: "Año",
          primaryValueGetter: (row: any) => {
            return row.year            
          },
        }),         
      ]
    };
  }

  onClick(item){
    this.first_time = 1;  
    this.name.patchValue(item.name);
    this.address.patchValue(item.address);
    this.itemsCities =[];
    this.itemsStates =[];
    this.selectLocationService.getLocationByStateId(item.stateId).subscribe(res=>{
      this.itemsCities = res;  

      for(var i=0; i<this.itemsCities.length;i++){
        if(item.cityId === this.itemsCities[i].locationId){
          this.cities.setValue(i);
        }
      }  
     
    
   });
    this.selectStateService.getStates().subscribe(res=>{
      this.itemsStates = res;  
      for(var i=0; i<this.itemsStates.length;i++){
        if(item.stateId=== this.itemsStates[i].stateId){
          this.states.patchValue(this.itemsStates[i]);  

        }
      }
    });
     
      this.first_time = 0;  
      this.modal1.close();

  } 
  private initForm() {
    this.form = this.fb.group({
      analystItems: [''],
      newexpiration: [''],
      falsepossitive: [''],
      emailType: [''],
      email: [''],
      subject: [''],
      message: [''],
      channel:['1'],
      letterType: [''],
      name: [''],
      address: [''],
      city: [''],
      state: [''],
      messageLetter:[''],
      cities:[''],
      states:[''],
      vehicles:[''],

    });

    this.onFormChanges();

  }
  onFormChanges() {
    this.form.valueChanges.subscribe(() => {
      this.isValidReqForm.emit(this.form);
    });
    this.form.controls['emailType'].valueChanges.subscribe(value => {
          this.message.patchValue(value.message);
          this.subject.patchValue(value.subject);


         }); 
    this.form.controls['letterType'].valueChanges.subscribe(value => {
    this.itemLetter=value;
    
  }); 
  this.form.controls['channel'].valueChanges.subscribe(value => {
          this.onRadioChange(value);
  }); 
  this.form.controls['states'].valueChanges.subscribe(value => {
    if (this.first_time==0)
      this.getLocation(value.stateId);
});            
            
  }
  getLocation(value: any) { 
    this.selectLocationService.getLocationByStateId(value).subscribe(res=>{
      this.cities.patchValue(this.itemsCities[-1]);
      this.itemsCities = res;
     
    });
  
    
  }
  onRadioChange(item){
    if(item === "1" ){
      this.isEmailType = true;
      this.isLetterType = false;
      this.isTelephoneType = false;

    }else if (item === "2" ){
      this.isEmailType = false;
      this.isLetterType = true;
      this.isTelephoneType = false;

    }else{
      this.isEmailType = false;
      this.isLetterType = false;
      this.isTelephoneType = true;

    }
  }

}
