import IBAN from 'iban';
import {
  AbstractControl,
  ValidatorFn,
  NG_VALIDATORS,
  Validator,
  FormControl,
} from '@angular/forms';
import { Directive } from '@angular/core';

// validation function
function validateIban(): ValidatorFn {
  return (c: AbstractControl) => {
    if (!IBAN.isValid(c.value)) {
      return { ibanValid: true };
    }
    return null;
  };
}

@Directive({
  selector: '[iban][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: IbanValidator, multi: true },
  ],
})
export class IbanValidator implements Validator {
  validator: ValidatorFn;

  ngOnInit() {
    this.validator = validateIban();
  }

  validate(c: FormControl) {
    return this.validator(c);
  }
}
