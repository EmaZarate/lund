import { Person } from 'src/app/main/person-management/models/person.model';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Case } from 'src/app/main/analyst-assignment/models/case.model';

@Component({
  selector: 'app-generic-data-person',
  templateUrl: './generic-data-person.component.html',
  styleUrls: ['./generic-data-person.component.scss']
})

export class GenericDataPersonComponent implements OnInit {

  @Input() person: Person;
  @Input() case: Case;

  formGroup: FormGroup;

  get checkboxGreyList() { return this.formGroup.get('checkboxGreyList'); } 
  get checkboxPep() { return this.formGroup.get('checkboxPep'); } 
  get checkboxTerrorist() { return this.formGroup.get('checkboxTerrorist'); } 
  get checkboxThird() { return this.formGroup.get('checkboxThird'); } 
  get checkboxGroup() { return this.formGroup.get('checkboxGroup'); } 

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.formGroup = this.fb.group({
      checkboxGreyList: [this.person.grayLists.length > 0 ? this.person.grayLists[0].active : false],
      checkboxPep: [this.person.pep],
      checkboxTerrorist: [this.person.terrorist],
      checkboxThird: [this.person.thirdParty],
      checkboxGroup: [this.person.group]
    });
  }

  handleButtonClick() {
    
  }
}
