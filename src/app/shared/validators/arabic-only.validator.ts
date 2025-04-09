import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function arabicOnlyValidator(): ValidatorFn {
  const arabicRegex = /^[\u0600-\u06FF\s]*$/;
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;
    return arabicRegex.test(value) ? null : { nonArabic: true };
  };
}
