export class BoolToNumberMap {
    boolToNumberMap(value: boolean | null) : number {
        let newValue;
        if (value === null) {
          newValue = 1;
        }
        else if (value == false) {
          newValue = 3;
        }
        else {
          newValue = 2;
        }
        return newValue;
      }

    numberToBoolMap(value: number) : boolean | null {
      let newValue;
      if (value === 1) {
        newValue = null;
      }
      else if (value === 2) {
        newValue = true;
      }
      else {
        newValue = false;
      }
      return newValue; 
    }
}