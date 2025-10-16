import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { ServicesModule } from './services/services.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from './directives/directives.module';
import { MonthYearPipe } from './components/pipes/month-year.pipe';

@NgModule({
  declarations: [],

  imports: [
    CommonModule,
    ComponentsModule,
    ServicesModule,
    ReactiveFormsModule,
    MonthYearPipe,
    DirectivesModule,
  ],
  providers: [DatePipe],

  exports: [ComponentsModule, ServicesModule, DirectivesModule, MonthYearPipe],
})
export class SharedModule {}
