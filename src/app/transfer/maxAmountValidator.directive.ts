import { AbstractControl, ValidatorFn, NG_VALIDATORS, Validator, FormControl } from '@angular/forms';
import { Directive, Input } from '@angular/core';

// validation function
function validateMaxValue(maxValue: number): ValidatorFn {
    return (c: AbstractControl) => {
        if(c.value > maxValue) {
          return {maxValue: true};
        }
        if(c.value < 0) {
          return {minValue: true};
        }
        return null;
    }
}

@Directive({
    selector: '[maxValue][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: MaxAmountValidator, multi: true }
    ]
})
export class MaxAmountValidator implements Validator {
    @Input("maxValue") maxValue;
    validator: ValidatorFn;

    ngOnInit() {
        this.validator = validateMaxValue(this.maxValue);
    }

    validate(c: FormControl) {
        return this.validator(c);
    }
}