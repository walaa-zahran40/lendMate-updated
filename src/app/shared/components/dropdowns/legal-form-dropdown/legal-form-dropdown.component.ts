import {
  Component,
  EventEmitter,
  forwardRef,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LegalFormService } from '../../../services/legal-form.service';

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

  constructor(private legalFormService: LegalFormService) {}

  ngOnInit(): void {
    this.fetchLegalForms();
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
  fetchLegalForms() {
    this.legalFormService.getAllLegalForms().subscribe((response: any) => {
      this.LegalForms = response.items.map((item: any) => ({
        id: item.id,
        name: item.name,
        nameAR: item.nameAR,
        legalFormId: item.legalFormId,
      }));
    });
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
