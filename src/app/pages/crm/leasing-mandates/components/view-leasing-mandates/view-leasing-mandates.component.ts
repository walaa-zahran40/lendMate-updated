import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { LeasingMandate } from '../../../store/leasing-mandates/leasing-mandate.model';
import { LeasingMandatesFacade } from '../../../store/leasing-mandates/leasing-mandates.facade';

@Component({
  selector: 'app-view-leasing-mandates',
  standalone: false,
  templateUrl: './view-leasing-mandates.component.html',
  styleUrl: './view-leasing-mandates.component.scss',
})

export class ViewLeasingMandatesComponent {
  tableDataInside: LeasingMandate[] = [];
  first2 = 0;
  rows = 10;
  showFilters = false;
  private destroy$ = new Subject<void>();

  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'name', header: 'Name EN' },
    { field: 'nameAR', header: 'Name AR' },
  ];

  showDeleteModal = false;
  selectedLeasingMandateId: number | null = null;
  originalLeasingMandates: LeasingMandate[] = [];
  filteredLeasingMandates: LeasingMandate[] = [];
  leasingMandates$!: Observable<LeasingMandate[]>;

  constructor(private router: Router, private facade: LeasingMandatesFacade) {}

  ngOnInit() {
    console.log('🟢 ngOnInit: start loading leasingMandates');
    this.facade.loadAll();
    this.leasingMandates$ = this.facade.all$;

    this.leasingMandates$
      .pipe(takeUntil(this.destroy$))
      .subscribe((leasingMandates) => {
        const sorted = [...leasingMandates].sort((a, b) => b.id - a.id);
        console.log('🟢 sorted leasingMandates:', sorted);
        this.originalLeasingMandates = sorted;
        this.filteredLeasingMandates = [...sorted];
      });
  }

  onAddLeasingMandate() {
    this.router.navigate(['crm/leasing-mandates/add-leasing-mandate']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDeleteLeasingMandate(leasingMandateId: number): void {
    console.log(
      '[View] onDeleteLeasingMandate() – opening modal for id=',
      leasingMandateId
    );
    this.selectedLeasingMandateId = leasingMandateId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    console.log(
      '[View] confirmDelete() – about to dispatch delete for id=',
      this.selectedLeasingMandateId
    );
    if (this.selectedLeasingMandateId !== null) {
      this.facade.delete(this.selectedLeasingMandateId);
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
    this.selectedLeasingMandateId = null;
  }

  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredLeasingMandates = this.originalLeasingMandates.filter((leasingMandate) =>
      Object.values(leasingMandate).some((val) =>
        val?.toString().toLowerCase().includes(lower)
      )
    );
  }

  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }

  onEditLeasingMandate(leasingMandate: LeasingMandate) {
    this.router.navigate(['/crm/leasing-mandates/edit-leasing-Mandate', leasingMandate.id], {
      queryParams: { mode: 'edit' },
    });
  }

  onViewLeasingMandate(leasingMandate: LeasingMandate) {
    this.router.navigate(['/crm/leasing-mandates/edit-leasing-Mandate', leasingMandate.id], {
      queryParams: { mode: 'view' },
    });
  }
  onAddSide(leasingMandateId: any) {
    this.router.navigate(['/crm/wizard-leasing-Mandates', leasingMandateId]);
  }
}
