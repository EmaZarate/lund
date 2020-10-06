import { BoolToNumberMap } from 'src/app/shared/boolToNumberMap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-docket',
  templateUrl: './docket.component.html',
  styleUrls: ['./docket.component.scss']
})
export class DocketComponent implements OnChanges {


  @Input() canSeeLegajo: boolean = true;
  @Input('isReadOnly') isRO: boolean = false;
  @Input() value: number;
  @Output() isValidDocket: EventEmitter<any> = new EventEmitter();
  private mapper: BoolToNumberMap = new BoolToNumberMap();

  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  get docket() { return this.form.get('radioLegajo') }

  ngOnChanges(changes: SimpleChanges): void {
    this.initForm();
    this.setDocketInfo();
    this.emitFormValue();
    this.onFormChanges();
  }

  private initForm() {
    this.form = this.fb.group({
      radioLegajo: null
    });
  }

  emitFormValue() {
    let newDocketValue = this.mapper.numberToBoolMap(this.docket.value)
    this.isValidDocket.emit(newDocketValue);
  }

  onFormChanges() {
    this.docket.valueChanges.subscribe(() => {
      this.emitFormValue();
    })
  }

  setDocketInfo() {
    this.docket.setValue(this.value);
  }
}
