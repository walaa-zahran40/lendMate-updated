import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { TableComponent } from '../../../../../../shared/components/table/table.component';
import { Mandate } from '../../../store/leasing-mandates/leasing-mandate.model';
import { MandatesFacade } from '../../../store/leasing-mandates/leasing-mandates.facade';

@Component({
  selector: 'app-view-mandates',
  standalone: false,
  templateUrl: './view-mandates.component.html',
  styleUrl: './view-mandates.component.scss',
})
export class ViewMandatesComponent {
  tableDataInside: Mandate[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  leasingMandates$ = this.facade.all$;
  rows: number = 10;
  showFilters: boolean = false;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'description', header: 'Description' },
    { field: 'clientName', header: 'Client Name' },
    { field: 'startDate', header: 'Start Date' },
  ];
  showDeleteModal: boolean = false;
  selectedLeasingMandateId: number | null = null;
  originalLeasingMandates: any[] = [];
  filteredLeasingMandates: Mandate[] = [];

  constructor(private router: Router, private facade: MandatesFacade) {}
  ngOnInit() {
    this.facade.loadAll();
    // this.facadeInd.loadAll();
    this.leasingMandates$
      .pipe(takeUntil(this.destroy$))
      .subscribe((leasingMandates) => {
        console.log('raw Leasing Mandates from facade:', leasingMandates);
        leasingMandates.forEach((c) => console.log(`> id=${c.id}`));

        const sorted = [...leasingMandates].sort((a, b) => b.id! - a.id!);

        this.originalLeasingMandates = sorted.map((c) => {
          console.log(`client ${c} mapping client id=${c.id} `);
          // choose the field that actually exists:

          console.log(`mapped id=${c.id} `);
          return {
            ...c,
          };
        });

        console.log(
          'originalLeasingMandates after mapping:',
          this.originalLeasingMandates
        );
        this.filteredLeasingMandates = [...this.originalLeasingMandates];
      });
  }

  onAddLeasingMandate() {
    this.router.navigate(['/crm/leasing-mandates/add-leasing-mandate']);
  }
  onAddSide(leasingMandatesId: any) {
    this.router.navigate([
      '/crm/leasing-mandates/leasing-mandate-wizard',
      leasingMandatesId,
    ]);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteLeasingMandate(leasingMandatesId: number): void {
    this.selectedLeasingMandateId = leasingMandatesId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    if (this.selectedLeasingMandateId !== null) {
      this.facade.delete(this.selectedLeasingMandateId);
    }
    this.resetDeleteModal();
  }

  cancelDelete() {
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    this.showDeleteModal = false;
    this.selectedLeasingMandateId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredLeasingMandates = this.originalLeasingMandates.filter(
      (mandate) =>
        Object.values(mandate).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditLeasingMandate(mandate: Mandate) {
    this.router.navigate(['/crm/mandates/edit-mandate', mandate.id], {
      queryParams: {
        mode: 'edit',
      },
    });
  }
  onViewLeasingMandates(mandate: Mandate) {
    console.log('mandate', mandate);
    this.router.navigate(['/crm/mandates/edit-mandate', mandate.id], {
      queryParams: {
        mode: 'view',
      },
    });
  }
}
