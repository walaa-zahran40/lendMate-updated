import { Directive, HostListener, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appOnlyArabic]',
  standalone: false,
})
export class OnlyArabicDirective {
  private arabicRegex = /^[\u0600-\u06FF\s]*$/;

  constructor(private el: ElementRef, private control: NgControl) {}

  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    const inputElement = this.el.nativeElement as HTMLInputElement;
    const currentValue = inputElement.value;

    // Sanitize: remove non-Arabic characters
    const sanitizedValue = currentValue.replace(/[^\u0600-\u06FF\s]/g, '');

    if (currentValue !== sanitizedValue) {
      inputElement.value = sanitizedValue;
      this.control.control?.setValue(sanitizedValue, { emitEvent: false });
      this.control.control?.setErrors({ nonArabic: true });
    } else {
      // Only clear errors if no other errors exist
      const currentErrors = this.control.control?.errors;
      if (currentErrors?.['nonArabic']) {
        delete currentErrors['nonArabic'];

        if (Object.keys(currentErrors).length === 0) {
          this.control.control?.setErrors(null);
        } else {
          this.control.control?.setErrors(currentErrors);
        }
      }
    }
  }
}
