import {
  Component,
  forwardRef,
  Input,
  Injector,
  OnInit,
  Self,
  Optional,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';
import { Calendar } from 'primeng/calendar';

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
  @ViewChild(Calendar) private calendar!: Calendar;

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
  ngAfterViewInit() {
    // Patch the missing `window` reference so bindDocumentResizeListener works
    if (this.calendar) {
      (this.calendar as any).window = window;
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

    let yyyy: number, mm: number, dd: number;
    if (typeof val === 'string') {
      // drop any time component, handle both “yyyy-MM-dd” and full ISO
      const dateOnly = val.split('T')[0];
      [yyyy, mm, dd] = dateOnly.split('-').map(Number);
    } else {
      const d = new Date(val);
      yyyy = d.getFullYear();
      mm = d.getMonth() + 1;
      dd = d.getDate();
    }

    // build a local‐time Date at 00:00
    this.value = new Date(yyyy, mm - 1, dd);
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
    // build a UTC‐midnight date instead of local-midnight
    const utcDate = new Date(
      Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())
    );

    // update your UI…
    this.value = utcDate;

    // …and notify the form
    this.onChange(utcDate);
    this.onTouched();
  }
}
