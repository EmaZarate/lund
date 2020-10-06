import { SelectedCellService } from './../../services/selected-cell.service';
import { Component, Input, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'sc-selected-cell',
  templateUrl: './selected-cell.component.html',
})

export class SelectedCellComponent implements OnInit, OnDestroy {

  @Input() rowData: {id: string, isSelected: boolean}; 

  form: FormGroup;
  onDestroy$ = new Subject();

  constructor(private selectedCellService: SelectedCellService) {}

  ngOnInit() {
    this.createForm();
    this.subscribeToCheckboxChange();
    //this.subscribeToSelectedValueChanges();
  }

  private createForm() {
    this.form = new FormGroup({
      selected: new FormControl(this.rowData.isSelected)
    });
  }

  private subscribeToCheckboxChange() {
    this.form.controls.selected
      .valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((selected: boolean) => {
        this.rowData.isSelected = selected;
        this.selectedCellService.changeStatus(selected);
      });
  }
/*
  private subscribeToSelectedValueChanges() {
    this.rowData.isSelected$
      .pipe(distinctUntilChanged())
      .subscribe(selected => this.form.controls.selected.setValue(selected));
  }
*/
  ngOnDestroy() {
    this.onDestroy$.next();
  }
}
