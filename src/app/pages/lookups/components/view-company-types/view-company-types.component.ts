import { Component, ViewChild } from '@angular/core';
import { CompanyTypes } from '../../../../shared/interfaces/company-types.interface';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { Client } from '../../../../shared/interfaces/client.interface';
import { ClientsFacade } from '../../../crm/clients/store/clients/clients.facade';
import { CompanyType } from '../../store/company-types/company-type.model';
import { CompanyTypesFacade } from '../../store/company-types/company-types.facade';

@Component({
  selector: 'app-view-company-types',
  standalone: false,
  templateUrl: './view-company-types.component.html',
  styleUrl: './view-company-types.component.scss',
})
export class ViewCompanyTypesComponent {
  tableDataInside: CompanyTypes[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  rows: number = 10;
  showFilters: boolean = false;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'name', header: 'Name EN' },
    { field: 'nameAR', header: 'Name AR' },
  ];
  showDeleteModal: boolean = false;
  selectedCompanyTypeId: number | null = null;
  originalCompanyTypes: CompanyType[] = [];
  filteredCompanyTypes: CompanyType[] = [];
  companyTypes$!: Observable<CompanyType[]>;

  constructor(private router: Router, private facade: CompanyTypesFacade) {}
  ngOnInit() {
    this.facade.loadAll();
    this.companyTypes$ = this.facade.items$;

    this.companyTypes$
      ?.pipe(takeUntil(this.destroy$))
      .subscribe((companyTypes) => {
        // companyTypes is now CompanyType[], not any
        const sorted = [...companyTypes].sort((a, b) => b.id - a.id);
        this.originalCompanyTypes = sorted;
        this.filteredCompanyTypes = [...sorted];
      });
  }

  onAddCompanyType() {
    this.router.navigate(['/lookups/add-company-types']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteCompanyType(companyTypeId: any): void {
    console.log(
      '[View] onDeleteCompanyType() – opening modal for id=',
      companyTypeId
    );
    this.selectedCompanyTypeId = companyTypeId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    console.log(
      '[View] confirmDelete() – about to dispatch delete for id=',
      this.selectedCompanyTypeId
    );
    if (this.selectedCompanyTypeId !== null) {
      this.facade.delete(this.selectedCompanyTypeId);
      console.log('[View] confirmDelete() – facade.delete() called');
    } else {
      console.warn('[View] confirmDelete() – no id to delete');
    }
    this.resetDeleteModal();
  }
  cancelDelete() {
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    console.log('[View] resetDeleteModal() – closing modal and clearing id');
    this.showDeleteModal = false;
    this.selectedCompanyTypeId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredCompanyTypes = this.originalCompanyTypes.filter(
      (companyType) =>
        Object.values(companyType).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditCompanyType(companyType: CompanyType) {
    this.router.navigate(['/lookups/edit-company-types', companyType.id], {
      queryParams: { mode: 'edit' },
    });
  }
  onViewCompanyType(ct: CompanyType) {
    this.router.navigate(['/lookups/edit-company-types', ct.id], {
      queryParams: { mode: 'view' },
    });
  }
}
