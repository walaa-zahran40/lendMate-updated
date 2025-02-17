import { Directive } from '@angular/core';

@Directive({
  selector: '[appOnlyPositiveNumbers]',
  standalone: false
})
export class OnlyPositiveNumbersDirective {

  constructor() { }

}
