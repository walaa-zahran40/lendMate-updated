import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { DirectivesModule } from './directives/directives.module';
import { ServicesModule } from './services/services.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, ComponentsModule, DirectivesModule, ServicesModule],
  exports: [ComponentsModule],
})
export class SharedModule {}
