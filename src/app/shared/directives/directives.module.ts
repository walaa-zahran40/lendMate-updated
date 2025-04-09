import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlyPositiveNumbersDirective } from './only-positive-numbers.directive';
import { YearOnlyDirective } from './year-only.directive';
import { OnlyArabicDirective } from './arabic-only.directive';

@NgModule({
  declarations: [
    OnlyPositiveNumbersDirective,
    YearOnlyDirective,
    OnlyArabicDirective,
  ],
  imports: [CommonModule],
})
export class DirectivesModule {}
