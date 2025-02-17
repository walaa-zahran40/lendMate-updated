import { Directive } from '@angular/core';

@Directive({
  selector: '[appArabicOnly]',
  standalone: false
})
export class ArabicOnlyDirective {

  constructor() { }

}
