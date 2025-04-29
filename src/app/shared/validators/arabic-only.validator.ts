import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function arabicOnlyValidator(): ValidatorFn {
  const arabicRegex = /^[\u0600-\u06FF\s]+$/;
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;
    if (!value) {
      // don’t validate empty (let required() handle that)
      return null;
    }
    return arabicRegex.test(value)
      ? null
      : {
          arabicOnly: {
            valid: false,
            message: 'Please enter only Arabic letters.',
          },
        };
  };
}
