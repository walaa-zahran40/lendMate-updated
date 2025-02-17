import { Directive } from '@angular/core';

@Directive({
  selector: '[appYearOnly]',
  standalone: false
})
export class YearOnlyDirective {

  constructor() { }

}
