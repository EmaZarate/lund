import { DocumentAttached } from 'src/app/shared/models/document-attached.model';
import { ContactInfo } from '../../../main/case-management/models/contact.interface';
import { LocationModel } from './../../models/location.model';
import { StateModel } from './../../models/state.model';
import { Person } from 'src/app/main/case-management/models/person.model';
import { News } from 'src/app/main/case-management/models/news';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Case } from 'src/app/main/analyst-assignment/models/case.model';
import { Observable } from 'rxjs';
import {GenericDataCaseComponent} from '../generic-data-case/generic-data-case.component';

@Component({
  selector: 'app-generic-data',
  templateUrl: './generic-data.component.html',
  styleUrls: ['./generic-data.component.scss']
})
export class GenericDataComponent implements OnInit {

  @Input() title: string;

  @Input() case: Case;

  @Input() person: Person;

  @Input() isNewCase: boolean;
  @Input() isReAssigningAnalyst: boolean;
  @Input() isChangingExpiration: boolean;
  @Input() isFalsePossitive: boolean;
  @Input() isInfoRequirement: boolean;

  @Input() documents: Observable<DocumentAttached[]>;
  @Input() newDate: Observable<GenericDataCaseComponent>;
  
  @Input() contactInfo: ContactInfo;
  @Input() locations: Observable<LocationModel[]>;
  @Input() isReadOnly: boolean;
  @Output() optionChanged: EventEmitter<StateModel> = new EventEmitter<StateModel>()

  @Input() hasNewsReasons: boolean;
  @Input() news: News;
  @Input() newsReason: number;

  @Output() validContactForm: EventEmitter<any> = new EventEmitter();
  @Output() validCaseForm: EventEmitter<any> = new EventEmitter();
  @Output() validNewsForm: EventEmitter<any> = new EventEmitter();

  @Input() itemsEmailType:any [];
  @Input() itemsLetterType:any [];
  @Input() itemsDuplicates:any [];
  @Input() itemsVehicles:any [];

  constructor() { 
    }

  ngOnInit() {
  }

  onOptionChange(event: StateModel) {
    this.optionChanged.emit(event);
  }
 
  validateContactForm(event) {
    this.validContactForm.emit(event);
  }

  validateCaseForm(event) {
    this.validCaseForm.emit(event);
  }
  
  validateNewsForm(event) {
      this.validNewsForm.emit(event);
  }
}
