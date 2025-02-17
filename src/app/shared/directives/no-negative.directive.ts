import { Directive } from '@angular/core';

@Directive({
  selector: '[appNoNegative]',
  standalone: false
})
export class NoNegativeDirective {

  constructor() { }

}
