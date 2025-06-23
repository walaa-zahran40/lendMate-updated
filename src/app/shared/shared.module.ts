import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { ServicesModule } from './services/services.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HasPermissionDirective } from './directives/has-permission.directive';
import { DirectivesModule } from './directives/directives.module';

@NgModule({
  declarations: [],

  imports: [
    CommonModule,
    ComponentsModule,
    ServicesModule,
    ReactiveFormsModule,
    DirectivesModule,
  ],
  exports: [ComponentsModule, ServicesModule, DirectivesModule],
})
export class SharedModule {}
