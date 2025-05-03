import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { ServicesModule } from './services/services.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    ServicesModule,
    ReactiveFormsModule,
  ],
  exports: [ComponentsModule, ServicesModule],
})
export class SharedModule {}
