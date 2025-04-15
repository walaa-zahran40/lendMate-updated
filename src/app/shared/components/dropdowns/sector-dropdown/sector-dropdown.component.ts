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
import { loadSectors } from '../store/sector.actions';
import { selectAllSectors } from '../store/sector.selectors';
import { Observable, map } from 'rxjs';
import { Sectors } from '../../../interfaces/sectors.interface';

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
  value: any;
  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};
  @Output() selectionChanged = new EventEmitter<any>();

  sectorsSafe$!: Observable<Sectors[]>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadSectors());

    this.sectorsSafe$ = this.store.select(selectAllSectors);
  }

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
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // Angular registers a function to call when the control is touched
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Optionally handle disabled state
  setDisabledState?(isDisabled: boolean): void {
    // Handle disable state if necessary
  }

  // Example method to update the value internally (e.g., when user selects an item)
  updateValue(newValue: any): void {
    this.value = newValue;
    this.onChange(newValue);
    this.onTouched();
  }
  onSectorChange(event: any) {
    this.value = event.value;
    this.onChange(this.value);
    this.onTouched();

    this.selectionChanged.emit(this.value);

    if (this.value?.id) {
      this.sectorChanged.emit(this.value.id);
    }
  }
}
