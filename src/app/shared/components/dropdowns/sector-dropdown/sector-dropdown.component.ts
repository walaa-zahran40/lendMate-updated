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
import { Observable, filter, map, take } from 'rxjs';
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
    this.store.dispatch(loadSectors());
    this.sectorsSafe$ = this.store.select(selectAllSectors);
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

  updateValue(newValue: any): void {
    this.value = newValue;
    this.onChange(newValue);
    this.onTouched();
  }

  onSectorChange(event: any) {
    const selectedId = event.value;
    this.sectorsSafe$
      .pipe(
        take(1),
        map((sectors) => sectors.find((s) => s.id === selectedId)),
        filter((sector): sector is Sectors => !!sector)
      )
      .subscribe((sector) => {
        this.value = selectedId;
        this.onChange(this.value);
        this.onTouched();
        this.selectionChanged.emit(sector);
        this.sectorChanged.emit(selectedId);
      });
  }
}
