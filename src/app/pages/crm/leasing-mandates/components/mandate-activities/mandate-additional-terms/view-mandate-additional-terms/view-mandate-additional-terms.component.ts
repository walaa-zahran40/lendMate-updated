import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, Observable, combineLatest, of, map, takeUntil } from 'rxjs';
import { MandateAdditionalTerm } from '../../../../store/mandate-additional-terms/mandate-additional-term.model';
import { TableComponent } from '../../../../../../../shared/components/table/table.component';
import { MandateAdditionalTermsFacade } from '../../../../store/mandate-additional-terms/mandate-additional-terms.facade';

@Component({
  selector: 'app-view-mandate-additional-terms',
  standalone: false,
  templateUrl: './view-mandate-additional-terms.component.html',
  styleUrl: './view-mandate-additional-terms.component.scss',
})
export class ViewMandateAdditionalTermsComponent implements OnInit, OnDestroy {
  tableDataInside: MandateAdditionalTerm[] = [];
  first2 = 0;
  rows = 10;
  showFilters = false;
  private destroy$ = new Subject<void>();
  mandateIdParam!: any;

  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'termKey', header: 'Term Key' },
    { field: 'description', header: 'Description' },
  ];

  showDeleteModal = false;
  selectedMandateAdditionalTermId: number | null = null;
  originalMandateAdditionalTerms: MandateAdditionalTerm[] = [];
  filteredMandateAdditionalTerms: MandateAdditionalTerm[] = [];

  mandateAdditionalTerms$!: Observable<MandateAdditionalTerm[]>;

  constructor(
    private router: Router,
    private facade: MandateAdditionalTermsFacade,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // 1) grab the param
    const raw = this.route.snapshot.paramMap.get('mandateId');
    this.mandateIdParam = raw !== null ? Number(raw) : undefined;
    console.log('[View] ngOnInit → mandateIdParam =', this.mandateIdParam);

    this.facade.loadByClientId(this.mandateIdParam);
    this.mandateAdditionalTerms$ = this.facade.items$;


    if (this.mandateIdParam == null || isNaN(this.mandateIdParam)) {
      console.error(
        '❌ Missing or invalid mandateIdParam! Cannot load exchange rates.'
      );
      return;
    }

    combineLatest([
      this.mandateAdditionalTerms$ ?? of([]),
    ])
      .pipe(
        map(([mandateAdditionalTerms]) => {
          console.log('📦 Raw mandateAdditionalTerms:', mandateAdditionalTerms);

          return mandateAdditionalTerms
            .sort((a, b) => b.id - a.id);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((result) => {
        console.log('✅ Final result:', result);
        this.filteredMandateAdditionalTerms = result;
        this.originalMandateAdditionalTerms = result;
      });
  }

  onAddMandateAdditionalTerm() {
    console.log('edioyt', this.mandateIdParam);
    const routeId = this.route.snapshot.paramMap.get('mandateId');
    this.router.navigate(['crm/leasing-mandates/add-mandate-additional-terms', routeId], {
      queryParams: {
        mode: 'add',
        mandateId: this.mandateIdParam, // <-- use "mandateId" here
      },
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDeleteMandateAdditionalTerm(mandateAdditionalTermId: number): void {
    console.log(
      '[View] onDeleteMandateAdditionalTerm() – opening modal for id=',
      mandateAdditionalTermId
    );
    this.selectedMandateAdditionalTermId = mandateAdditionalTermId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    if (this.selectedMandateAdditionalTermId != null) {
      this.facade.delete(this.selectedMandateAdditionalTermId, this.mandateIdParam);
    }
    this.resetDeleteModal();
  }

  cancelDelete() {
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    this.showDeleteModal = false;
    this.selectedMandateAdditionalTermId = null;
  }

  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredMandateAdditionalTerms = this.originalMandateAdditionalTerms.filter(
      (clientSales) =>
        Object.values(clientSales).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }

  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }

  onEditMandateAdditionalTerm(mandateAdditionalTerm: MandateAdditionalTerm) {
    console.log('edioyt', this.mandateIdParam);
    this.router.navigate(['crm/leasing-mandates/edit-mandate-additional-terms', mandateAdditionalTerm.id], {
      queryParams: {
        mode: 'edit',
        mandateId: this.mandateIdParam, // <-- use "mandateId" here
      },
    });
  }

  onViewMandateAdditionalTerm(mandateAdditionalTerm: MandateAdditionalTerm) {
    console.log('route', this.route.snapshot);
    this.router.navigate(['crm/leasing-mandates/edit-mandate-additional-terms', mandateAdditionalTerm.id], {
      queryParams: {
        mode: 'view',
        mandateId: this.mandateIdParam, // <-- and here
      },
    });
  }
}
