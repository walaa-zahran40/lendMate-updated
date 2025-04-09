import {
  Component,
  EventEmitter,
  forwardRef,
  OnInit,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';
import { LegalFormLawFacade } from '../../../../pages/crm/clients/state/legal-form-law/legal-form-law.facade';
import { LegalFormLaw } from '../../../interfaces/legal-form-law.interface';

@Component({
  selector: 'app-legal-form-law-dropdown',
  templateUrl: './legal-form-law-dropdown.component.html',
  styleUrls: ['./legal-form-law-dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LegalFormLawDropdownComponent),
      multi: true,
    },
  ],
  standalone: false,
})
export class LegalFormLawDropdownComponent
  implements OnInit, ControlValueAccessor
{
  @Output() selectionChanged = new EventEmitter<LegalFormLaw>();

  legalFormLaws$: Observable<LegalFormLaw[]> = this.facade.legalFormLaws$;
  selectedLegalFormLaw: LegalFormLaw | null = null;

  constructor(private facade: LegalFormLawFacade) {}

  ngOnInit(): void {
    this.facade.loadLegalFormLaws(); // trigger state-based load
  }

  updateValue(value: LegalFormLaw): void {
    this.selectedLegalFormLaw = value;
    this.onChange(value);
    this.onTouched();
    this.selectionChanged.emit(value);
  }

  // ControlValueAccessor implementation
  writeValue(value: LegalFormLaw): void {
    this.selectedLegalFormLaw = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};
}
