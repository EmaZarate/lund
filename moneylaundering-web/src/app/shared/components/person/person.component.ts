import { Person } from './../../../main/case-management/models/person.model';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Case } from 'src/app/main/analyst-assignment/models/case.model';
import { Router } from '@angular/router';
import { SelectBusinessuinitService } from '../../services/select-businessuinit.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  @Input() person: Person;
  @Input() case: Case;
  @Input() show: boolean = true;
  @Input() navigateUrl: string ;

  personBusinessUnitRisk: string;
  personBusinessUnitFinancialProfile: number;

  formGroup: FormGroup;

  get checkboxGreyList() { return this.formGroup.get('checkboxGreyList'); } 
  get checkboxPep() { return this.formGroup.get('checkboxPep'); } 
  get checkboxTerrorist() { return this.formGroup.get('checkboxTerrorist'); } 
  get checkboxThird() { return this.formGroup.get('checkboxThird'); } 
  get checkboxGroup() { return this.formGroup.get('checkboxGroup'); } 
  get checkboxDuplicate() { return this.formGroup.get('checkboxDuplicate'); } 

  businessUnits: any[] = [];
  businessUnit: string = "";
  constructor(
    private fb: FormBuilder, private router: Router,
    private businessUnitService: SelectBusinessuinitService,

  ) { }

  ngOnInit() {
    this.initForm();
    this.getActualBusinessUnit();
    this.navigateUrl = this.navigateUrl === "" || this.navigateUrl === undefined ? '/person-management/' + this.person.id + '/detail3': this.navigateUrl;
  }

  initForm() {
    this.formGroup = this.fb.group({
      checkboxGreyList: [this.person.grayLists != undefined && this.person.grayLists.length > 0 ? this.person.grayLists[0].active : false],
      checkboxPep: [this.person.pep],
      checkboxTerrorist: [this.person.terrorist],
      checkboxThird: [this.person.thirdParty],
      checkboxGroup: [this.person.group],
      checkboxDuplicate:[this.person.groupCode != null && this.person.groupCode > 0 ? true: false] 
    });
    this.businessUnitService.getBusinessUnit().subscribe( res => {
      this.businessUnits = res;
      for(var i=0; i < this.businessUnits.length; i++){
        if(this.person.businessUnitId === this.businessUnits[i].id){
          this.businessUnit = this.businessUnits[i].description;
        }      
      }
    });
  }

  getActualBusinessUnit(): void{
    let actualBUId = parseInt(localStorage.getItem('businessUnitId'));
    this.person.personBusinessUnits.forEach((businessUnit, i) => {
      if (businessUnit.businessUnitId === actualBUId)
      {
        this.personBusinessUnitRisk = this.person.personBusinessUnits[i].risk.description;
        this.personBusinessUnitFinancialProfile = this.person.personBusinessUnits[i].financialProfile;
      }
    });
  }
 
  handleButtonClick() {
    this.router.navigate([this.navigateUrl] )
  }
}
