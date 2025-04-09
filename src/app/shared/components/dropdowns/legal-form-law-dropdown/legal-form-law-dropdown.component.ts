import {
  Component,
  EventEmitter,
  forwardRef,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LegalFormLawService } from '../../../services/legal-form-law.service';

@Component({
  selector: 'app-legal-form-law-dropdown',
  templateUrl: './legal-form-law-dropdown.component.html',
  styleUrl: './legal-form-law-dropdown.component.scss',
  standalone: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LegalFormLawDropdownComponent),
      multi: true,
    },
  ],
})
export class LegalFormLawDropdownComponent
  implements OnInit, ControlValueAccessor
{
  LegalFormLaws: any[] = [];
  selectedLegalFormLaw: any;
  @Output() selectionChanged = new EventEmitter<any>();
  selectedItem: any;

  constructor(private legalFormlawService: LegalFormLawService) {}

  ngOnInit(): void {
    this.fetchLegalFormLaws();
  }
  updateValue(value: any): void {
    this.selectedLegalFormLaw = value;
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

  fetchLegalFormLaws() {
    this.legalFormlawService
      .getAllLegalFormLaws()
      .subscribe((response: any) => {
        this.LegalFormLaws = response.items.map((item: any) => ({
          id: item.id,
          name: item.name,
          nameAR: item.nameAR,
          legalFormLawId: item.legalFormLawId,
        }));
      });
  }

  onSelectionChange() {
    this.selectionChanged.emit(this.selectedLegalFormLaw);
  }

  writeValue(value: any): void {
    this.selectedLegalFormLaw = value;
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
