// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-sector-dropdown',
//   standalone: false,
//   templateUrl: './sector-dropdown.component.html',
//   styleUrl: './sector-dropdown.component.scss'
// })
// export class SectorDropdownComponent {

// }
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl } from '@angular/forms';
import { loadSectors } from '../store/sector.actions';
import { selectAllSectors } from '../store/sector.selectors';
import { Observable, map } from 'rxjs';
import { Sectors } from '../../../interfaces/sectors.interface';

@Component({
  selector: 'app-sector-dropdown',
  standalone: false,
  template: `
<ng-container *ngIf="sectorsSafe$ | async as sectors">
  <p-dropdown
    [options]="sectors"
    optionLabel="name"
    placeholder="Select Sector"
    [formControl]="formControl"
    (onChange)="onSectorChange($event)">
  </p-dropdown>
</ng-container>

  `
})
export class SectorDropdownComponent implements OnInit {
  @Input() formControl!: FormControl;
  @Output() sectorChanged = new EventEmitter<number>();

  sectorsSafe$!: Observable<Sectors[]>; // ✅ strict and clean

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadSectors());

    this.sectorsSafe$ = this.store.select(selectAllSectors);
  }

  onSectorChange(event: any) {
    const selected = event?.value;
    if (selected?.id) {
      this.sectorChanged.emit(selected.id);  
    }
  }
  
  
}
