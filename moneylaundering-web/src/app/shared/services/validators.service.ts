import { ValidatorFn, AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  differentAnalyst(actualAnalystId: string) : ValidatorFn {

    return (control: AbstractControl): { [key: string]: boolean } | null => {

      if (control.value['userId'] === actualAnalystId) {
        return {
          isSameAnalyst: true
        }
      }
      else {
        return null;
      }
    }
  }
}
