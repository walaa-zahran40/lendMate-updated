import { AbstractControl, ValidationErrors } from '@angular/forms';

export function positiveNumberValidator(): (
  control: AbstractControl
) => ValidationErrors | null {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    return /^\d+$/.test(value) ? null : { nonPositiveNumeric: true };
  };
}
