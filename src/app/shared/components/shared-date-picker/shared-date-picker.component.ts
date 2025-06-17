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
  if (!val) {
    this.value = null;
    return;
  }
  // if yyyy-MM-dd string
  if (typeof val === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(val)) {
    const [yyyy, mm, dd] = val.split('-').map(Number);
    this.value = new Date(yyyy, mm - 1, dd);  // local midnight
  } else if (val instanceof Date) {
    this.value = val;
  } else {
    this.value = new Date(val);
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
  // build a yyyy-MM-dd string in LOCAL time
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const dateString = `${y}-${m}-${day}`;

  this.value = d;
  this.onChange(dateString);  // <- send string, not Date
  this.onTouched();
}

}
