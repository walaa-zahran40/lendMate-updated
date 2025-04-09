import { Component, Input, OnChanges, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-sub-sector-dropdown',
  standalone: false,
  templateUrl: './sub-sector-dropdown.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SubSectorDropdownComponent),
      multi: true,
    },
  ],
})
export class SubSectorDropdownComponent
  implements ControlValueAccessor, OnChanges
{
  @Input() sectorId: number | null = null;
  @Input() allSectors: any[] = [];

  value: any;

  // The filtered list based on the selected sector
  filteredSubSectors: any[] = [];

  // Callbacks that Angular provides
  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  // Called when the model changes, write the value into your component
  writeValue(obj: any): void {
    this.value = obj;
  }

  // Save the callback function to call when the value changes
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // Save the callback function to call when the component is touched
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Optionally implement setDisabledState if needed
  setDisabledState?(isDisabled: boolean): void {
    // Handle the disabled state if necessary
  }

  // Called from the template when the user makes a selection
  updateValue(newValue: any): void {
    this.value = newValue;
    this.onChange(newValue);
    this.onTouched();
  }

  ngOnChanges() {
    const sector = this.allSectors.find((sec) => sec.id === this.sectorId);
    this.filteredSubSectors = sector?.subSectors || [];
  }
}
