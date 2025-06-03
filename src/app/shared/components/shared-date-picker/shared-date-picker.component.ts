import { Component, forwardRef, Input } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormControl,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'shared-date-picker',
  templateUrl: './shared-date-picker.component.html',
  styleUrls: ['./shared-date-picker.component.scss'],
  standalone: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SharedDatePickerComponent),
      multi: true,
    },
  ],
})
export class SharedDatePickerComponent implements ControlValueAccessor {
  @Input() showIcon = true;
  @Input() inputId!: string;
  @Input() minDate?: Date;
  @Input() maxDate?: Date;

  value: Date | null = null;
  disabled = false;

  onTouched = () => {};
  onChange = (_: any) => {};

  writeValue(val: any) {
    if (val === null || val === undefined) {
      this.value = null;
    } else {
      const d = new Date(val);
      this.value = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  onSelect(d: Date) {
    this.value = d;
    this.onChange(d);
    this.onTouched();
  }
}
