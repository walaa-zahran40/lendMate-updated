import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { DirectivesModule } from './directives/directives.module';
import { ServicesModule } from './services/services.module';

@NgModule({
  imports: [CommonModule, ComponentsModule, DirectivesModule, ServicesModule],
  exports: [ComponentsModule, DirectivesModule, ServicesModule],
})
export class SharedModule {}
