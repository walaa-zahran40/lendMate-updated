import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appNoNegative]',
})
export class NoNegativeDirective {
  @HostListener('input', ['$event'])
  onInput(event: any): void {
    const input = event.target;
    if (input.value < 0) {
      input.value = '';
    }
  }
}
