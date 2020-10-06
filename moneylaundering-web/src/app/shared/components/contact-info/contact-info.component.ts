import { SelectLocationService } from './../../services/select-location.service';
import { StateModel } from './../../models/state.model';
import { LocationModel } from './../../models/location.model';
import { ContactInfo } from '../../../main/case-management/models/contact.interface';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SelectStateService } from '../../services/select-state.service';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss']
})
export class ContactInfoComponent implements OnInit {

  form: FormGroup;
  states: StateModel[];
  statesAsync$: Observable<StateModel[]>;
  defaultState: StateModel;
  defaultStateIndex: number;
  locations: LocationModel[];
  defaultLocationIndex: number;
  
  @Input() locationAsync$: Observable<LocationModel[]>;
  @Input() contactInfo: ContactInfo;
  @Input() isReadOnly: boolean = false;
  @Output() optionChanged: EventEmitter<StateModel> = new EventEmitter<StateModel>();
  @Output() isValidContactForm: EventEmitter<any> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private stateService: SelectStateService,
    private locationService: SelectLocationService
    ) { }

  ngOnInit() {
    this.initForm();
    this.getStatesAndLocations();
  }

  private getStatesAndLocations() {
    this.stateService.getStates().subscribe(res => {
      let index = this.getDefaultState(res)
      this.statesAsync$ = of(res).pipe(tap(() => {
        this.form.patchValue({ personProvince: res[index] })
      }));
      this.locationService.getLocations(this.defaultState).subscribe(res => {
        let newLocations = this.setLocationAndZipCode(res);
        let index = this.getDefaultLocation(newLocations);
        this.locationAsync$ = of(newLocations).pipe(tap(() => {
          this.form.patchValue({ personCity: res[index]})
        }))
      });
    });
  }

  private getDefaultState(states: StateModel[]) {
    states.forEach((state, index) => {
      if (state.stateId == this.contactInfo.contactStateId) {
        this.defaultState = state
        this.defaultStateIndex = index;
      }
      else { return }
    });
    return this.defaultStateIndex;
  }

  private getDefaultLocation(locations: LocationModel[]) {
    locations.forEach((location, index) => {
      if (location.description == this.contactInfo.contactCity) {
        this.defaultLocationIndex = index;
      }
      else { return }
    });
    return this.defaultLocationIndex
  }

  private setLocationAndZipCode(location: LocationModel[]): LocationModel[] {
    let newLocations: LocationModel[] = [];
    location.forEach((location: LocationModel) => {
      let newLocation: LocationModel = {
        ...location, locationAndZipCode: location.description + ' - ' + location.zipCode
      }
      newLocations.push(newLocation);
    })
    return newLocations;
  }

  initForm() {
    this.form = this.fb.group({
      productorEmail: [this.contactInfo.contactMail],
      personAddress: [this.contactInfo.contactAddress],
      personProvince: [null],
      personCity: [null]
    });
    this.onFormInit();
    this.onFormChanges();
  }

  onFormInit() {
    console.log(this.form);
    this.isValidContactForm.emit(this.form);
  }

  onFormChanges() {
    this.form.valueChanges.subscribe(() => {
      this.isValidContactForm.emit(this.form);
    });
  }

  onOptionChange(event: StateModel) {
    this.optionChanged.emit(event);
    this.form.controls['personCity'].reset();
    this.locationAsync$ = undefined
  }
}
