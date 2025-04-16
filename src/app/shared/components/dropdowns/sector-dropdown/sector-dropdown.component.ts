import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { Sectors } from '../../../interfaces/sectors.interface';
import { loadSectors } from './store/sector.actions';
import { selectAllSectors } from './store/sector.selectors';

@Component({
  selector: 'app-sector-dropdown',
  standalone: false,
  templateUrl: './sector-dropdown.component.html',
  styleUrls: ['./sector-dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SectorDropdownComponent),
      multi: true,
    },
  ],
})
export class SectorDropdownComponent implements OnInit {
  @Input() formControl!: FormControl;
  @Output() sectorChanged = new EventEmitter<number>();
  @Output() selectionChanged = new EventEmitter<any>();

  value: any;
  sectorsSafe$!: Observable<Sectors[]>;

  constructor(private store: Store) {}

  ngOnInit() {
    console.log('📦 <app-sector-dropdown> initialized');

    this.store.dispatch(loadSectors());

    this.sectorsSafe$ = this.store.select(selectAllSectors);
    this.sectorsSafe$.subscribe((sectors) => {
      console.log('📋 All sectors in dropdown:', sectors);
      const currentValue = this.formControl?.value;
      console.log('sectors', sectors);
      console.log('currentValue', currentValue);
      const matched = sectors.find((s) => s.id === currentValue);
      console.log('🔍 Matched sector in options:', matched);

      if (!matched) {
        console.warn(
          `⚠️ Sector with value ${currentValue} not found in dropdown options`
        );
      }
    });

    console.log('🧲 formControl initial value:', this.formControl?.value);
  }
  compareWithFn = (option: any, value: any): boolean => {
    return option?.id === value?.id;
  };
  // Called when external value is set
  writeValue(value: any): void {
    this.value = value;
    this.onChange(value);
    this.onSelectionChange();
  }

  onSelectionChange() {
    this.selectionChanged.emit(this.value);
  }

  // Angular registers a function to call when the control’s value changes
  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Optionally handle disable state
  }

  updateValue(newValue: any): void {
    this.value = newValue;
    this.onChange(newValue);
    this.onTouched();
  }

  onSectorChange(event: any) {
    console.log('🟠 onSectorChange fired with event:', event);

    const selectedId = event.value;
    let selectedSector: Sectors | undefined;

    this.sectorsSafe$
      .pipe(map((sectors) => sectors.find((s) => s.id === selectedId)))
      .subscribe((sector) => {
        selectedSector = sector;
        this.value = selectedSector;
        this.onChange(this.value);
        this.onTouched();

        this.selectionChanged.emit(selectedSector);
        if (selectedId) {
          this.sectorChanged.emit(selectedId);
        }
      });
  }
}
