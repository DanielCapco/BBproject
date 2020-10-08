import {
  AbstractControl,
  ValidatorFn,
  NG_VALIDATORS,
  Validator,
  FormControl,
} from '@angular/forms';
import { Directive, Input } from '@angular/core';

// validation function
function validateAmountValue(amountMaxValue: number): ValidatorFn {
  return (c: AbstractControl) => {
    if (c.value > amountMaxValue) {
      return { maxValue: true };
    }
    if (c.value < 0) {
      return { minValue: true };
    }
    return null;
  };
}

@Directive({
  selector: '[amountMaxValue][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: AmountValidator, multi: true },
  ],
})
export class AmountValidator implements Validator {
  @Input('amountMaxValue') amountMaxValue;
  validator: ValidatorFn;

  ngOnInit() {
    this.validator = validateAmountValue(this.amountMaxValue);
  }

  validate(c: FormControl) {
    return this.validator(c);
  }
}
