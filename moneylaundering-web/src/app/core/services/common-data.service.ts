import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CommonDataService {

  public loader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  constructor() { }

  showLoader(value: boolean) {
    this.loader.next(value);
  }

  setExpandDiv(id) {
    document.getElementById(id).setAttribute("class", "collapse show");
    document.getElementById(id).previousElementSibling.setAttribute("aria-expanded", "true");
  }
}