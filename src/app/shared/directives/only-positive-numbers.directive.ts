import { Directive, HostListener, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appOnlyPositiveNumbers]',
  standalone: false,
})
export class OnlyPositiveNumbersDirective {
  constructor(private el: ElementRef, private control: NgControl) {}

  @HostListener('input', ['$event'])
  onInputChange(event: KeyboardEvent): void {
    const input = this.el.nativeElement;
    const regex = /^[0-9]*$/; // Regex to match only positive numbers (no characters, no 'e')

    if (!regex.test(input.value)) {
      // Replace any character that is not a digit
      input.value = input.value.replace(/[^0-9]/g, '');
      this.control.control?.setErrors({ nonPositiveNumeric: true });
    } else {
      this.control.control?.setErrors(null);
    }
  }

  // Prevent keypress of any non-numeric characters including 'e', '-', etc.
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (
      event.key === 'e' ||
      event.key === 'E' ||
      event.key === '-' ||
      event.key === '+' ||
      event.key === '.' || // Block decimal point as well if needed
      isNaN(Number(event.key)) // Block any other non-numeric key
    ) {
      event.preventDefault();
    }
  }
}
