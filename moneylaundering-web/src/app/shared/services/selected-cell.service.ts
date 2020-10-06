import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectedCellService {

  private isSelected: Subject<boolean> = new Subject();
  isSelected$ = this.isSelected.asObservable();

  constructor() { }

  changeStatus(value: boolean) {
    this.isSelected.next(value);
  }

}
