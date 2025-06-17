import {
  Component,
  forwardRef,
  Input,
  Injector,
  OnInit,
  Self,
  Optional,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';

@Component({
  selector: 'shared-date-picker',
  standalone: false,
  templateUrl: './shared-date-picker.component.html',
  styleUrls: ['./shared-date-picker.component.scss'],
  providers: [],
})
export class SharedDatePickerComponent implements ControlValueAccessor, OnInit {
  @Input() showIcon = true;
  @Input() inputId!: string;
  @Input() minDate?: Date;
  @Input() maxDate?: Date;
  value: Date | null = null;
  disabled = false;

  onTouched = () => {};
  onChange = (_: any) => {};

  constructor(
    private injector: Injector,
    @Self() @Optional() public ngControl: NgControl
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {}
  get control(): FormControl | null {
    return this.ngControl?.control as FormControl;
  }

  writeValue(val: any) {
    this.value = val ? new Date(val, ) : null;
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
    this.onTouched(); // ✅ good
  }
}
