import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { SubSectors } from '../../../interfaces/sub-sector.interface';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAllSubSectors } from './store/sub-sector.selectors';
import { loadSubSectors } from './store/sub-sector.actions';

@Component({
  selector: 'app-sub-sector-dropdown',
  standalone: false,
  templateUrl: './sub-sector-dropdown.component.html',
  styleUrls: ['./sub-sector-dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SubSectorDropdownComponent),
      multi: true,
    },
  ],
})
export class SubSectorDropdownComponent
  implements OnInit, ControlValueAccessor
{
  @Input() formControl!: any;
  @Output() subSectorChanged = new EventEmitter<number[]>();
  @Output() selectionChanged = new EventEmitter<any[]>();
  @Input() allSectors: any[] = [];
  subSectors: any;
  subSectorsSafe$!: Observable<SubSectors[]>;
  value: number[] = [];
  @Input() sectorId!: any;

  constructor(private store: Store) {}

  ngOnInit() {
    console.log(
      '📦 SubSectorDropdown initialized with sectorId:',
      this.sectorId
    );
    this.store.dispatch(loadSubSectors());

    this.subSectorsSafe$ = this.store
      .select(selectAllSubSectors)
      .pipe(map((subs) => subs.filter((s) => s.sectorId === this.sectorId)));
  }

  // Called when user selects/deselects sub-sectors
  updateValue(event: any): void {
    const selectedIds: number[] = event.value;
    this.value = selectedIds;

    this.onChange(selectedIds);
    this.onTouched();

    this.selectionChanged.emit(selectedIds); // emits array of selected IDs
    this.subSectorChanged.emit(selectedIds); // same here for consistency
  }

  // ControlValueAccessor implementation
  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: number[]): void {
    this.value = value || [];
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Optionally implement this
  }
  ngOnChanges(): void {
    if (this.sectorId !== undefined && this.sectorId !== 0) {
      console.log('🔁 sectorId changed:', this.sectorId);
      this.subSectorsSafe$ = this.store
        .select(selectAllSubSectors)
        .pipe(map((subs) => subs.filter((s) => s.sectorId === this.sectorId)));
    }
  }
}
