import { Component, Input, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-sub-sector-dropdown',
  standalone: false,
  templateUrl: './sub-sector-dropdown.component.html',
})
export class SubSectorDropdownComponent implements OnChanges {
  @Input() sectorId!: number;
  @Input() allSectors: any[] = [];
  @Input() formControl!: FormControl;

  filteredSubSectors: any[] = [];

  ngOnChanges() {
    const sector = this.allSectors.find((sec) => sec.id === this.sectorId);
    this.filteredSubSectors = sector?.subSectors || [];
  }
}
