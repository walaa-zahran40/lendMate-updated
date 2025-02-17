import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArabicOnlyDirective } from './arabic-only.directive';
import { NoNegativeDirective } from './no-negative.directive';
import { OnlyPositiveNumbersDirective } from './only-positive-numbers.directive';
import { YearOnlyDirective } from './year-only.directive';

@NgModule({
  declarations: [
    ArabicOnlyDirective,
    NoNegativeDirective,
    OnlyPositiveNumbersDirective,
    YearOnlyDirective,
  ],
  imports: [CommonModule],
})
export class DirectivesModule {}
