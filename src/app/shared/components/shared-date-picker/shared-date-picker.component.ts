import {
  Component,
  Input,
  OnInit,
  Self,
  Optional,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
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
  @Input() readOnly: boolean = false;
  @ViewChild(Calendar) private calendar!: Calendar;

  value: Date | null = null;
  disabled = false;

  onTouched = () => {};
  onChange = (_: any) => {};
  dateFormat: string = 'dd-MM-yy'; // default for English

  constructor(
    private translate: TranslateService,
    @Self() @Optional() public ngControl: NgControl
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }
  ngOnInit(): void {
    const lang = this.translate.currentLang || this.translate.getDefaultLang();
    this.setDateFormat(lang);

    this.translate.onLangChange.subscribe((event) => {
      this.setDateFormat(event.lang);
    });
  }
  private setDateFormat(lang: string) {
    this.dateFormat =
      this.translate.currentLang === 'ar' ? 'yy/mm/dd' : 'dd-mm-yy';
    console.log('date', this.dateFormat);
  }

  ngAfterViewInit() {
    // Patch the missing `window` reference so bindDocumentResizeListener works
    if (this.calendar) {
      (this.calendar as any).window = window;
    }
  }

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
