import {
  Component,
  EventEmitter,
  forwardRef,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LegalFormFacade } from '../../form/store/legal-forms/legal-form.facade';

@Component({
  selector: 'app-legal-form-dropdown',
  templateUrl: './legal-form-dropdown.component.html',
  styleUrl: './legal-form-dropdown.component.scss',
  standalone: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LegalFormDropdownComponent),
      multi: true,
    },
  ],
})
export class LegalFormDropdownComponent
  implements OnInit, ControlValueAccessor
{
  LegalForms: any[] = [];
  selectedLegalForm: any;
  @Output() selectionChanged = new EventEmitter<any>();
  selectedItem: any;
  legalForms$ = this.facade.legalForms$;

  constructor(private facade: LegalFormFacade) {}

  ngOnInit(): void {
    this.facade.loadLegalForms();
  }

  updateValue(value: any): void {
    this.selectedLegalForm = value;
    this.onChange(value);
    this.onTouched();
    this.selectionChanged.emit(value); // Optional
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedItem']) {
      this.selectedItem = changes['selectedItem'].currentValue;
      this.onSelectionChange();
    }
  }

  onSelectionChange() {
    this.selectionChanged.emit(this.selectedLegalForm);
  }

  writeValue(value: any): void {
    this.selectedLegalForm = value;
    this.onChange(value);
    this.onSelectionChange();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onChange = (value: any) => {};
  onTouched = () => {};
}
