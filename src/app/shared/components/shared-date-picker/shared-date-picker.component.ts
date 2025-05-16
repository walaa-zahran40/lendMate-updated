import { Component, forwardRef, Input } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormControl,
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
  ctrl = new FormControl();

  // ControlValueAccessor stubs
  onTouched = () => {};
  onChange = (_: any) => {};

  writeValue(val: any) {
    if (val == null) {
      this.ctrl.setValue(null, { emitEvent: false });
      return;
    }
    // incoming from backend: strip time & tz
    const d = new Date(val);
    const localMid = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    this.ctrl.setValue(localMid, { emitEvent: false });
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
    this.ctrl.valueChanges.subscribe((d: Date) => {
      // always return UTC-midnight so it serializes to the picked date
      const utcMid = new Date(
        Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())
      );
      fn(utcMid);
    });
  }
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean) {
    isDisabled ? this.ctrl.disable() : this.ctrl.enable();
  }

  // forward the p-datepicker onSelect
  onSelect(d: Date) {
    this.onTouched();
  }
}
