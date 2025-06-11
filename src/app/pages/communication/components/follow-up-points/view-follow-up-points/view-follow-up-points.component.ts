import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, Observable, combineLatest, of, map, takeUntil } from 'rxjs';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { FollowupPoint } from '../../../store/followup-points/followup-point.model';
import { FollowupPointsFacade } from '../../../store/followup-points/followup-points.facade';

@Component({
  selector: 'app-view-follow-up-points',
  standalone: false,
  templateUrl: './view-follow-up-points.component.html',
  styleUrl: './view-follow-up-points.component.scss',
})
export class ViewFollowupPointsComponent implements OnInit, OnDestroy {
  tableDataInside: FollowupPoint[] = [];
  first2 = 0;
  rows = 10;
  showFilters = false;
  private destroy$ = new Subject<void>();
  communicationIdParam!: any;

  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'topic', header: 'Topic' },
    { field: 'details', header: 'Details' },
    { field: 'date', header: 'Date' },
  ];

  showDeleteModal = false;
  selectedFollowupPointId: number | null = null;
  originalFollowupPoints: FollowupPoint[] = [];
  filteredFollowupPoints: FollowupPoint[] = [];

  followups$!: Observable<FollowupPoint[]>;

  constructor(
    private router: Router,
    private facade: FollowupPointsFacade,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // 1) grab the param
    console.log('rrr', this.route.snapshot);
    const raw = this.route.snapshot.params['communicationId'];
    this.communicationIdParam = raw !== null ? Number(raw) : undefined;
    console.log(
      '[View] ngOnInit → communicationIdParam =',
      this.communicationIdParam
    );

    this.facade.loadByCommunicationId(this.communicationIdParam);
    this.followups$ = this.facade.items$;

    if (this.communicationIdParam == null || isNaN(this.communicationIdParam)) {
      console.error(
        '❌ Missing or invalid communicationIdParam! Cannot load exchange rates.'
      );
      return;
    }

    combineLatest([this.followups$ ?? of([])])
      .pipe(
        map(([followups]) => {
          console.log('📦 Raw followups:', followups);

          return followups; //.sort((a) => a.id);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((result) => {
        console.log('✅ Final result:', result);
        this.filteredFollowupPoints = result;
        this.originalFollowupPoints = result;
      });
  }

  onAddFollowupPoint() {
    console.log('edioyt', this.communicationIdParam);
    const routeId = this.route.snapshot.paramMap.get('communicationId');
    console.log(`route : ${routeId}`);
    this.router.navigate(['communication/add-follow-ups/', routeId], {
      queryParams: {
        mode: 'add',
        communicationId: this.communicationIdParam, // <-- use "communicationId" here
      },
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDeleteFollowupPoint(clientPhoneNumberId: number): void {
    console.log(
      '[View] onDeleteFollowupPoint() – opening modal for id=',
      clientPhoneNumberId
    );
    this.selectedFollowupPointId = clientPhoneNumberId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    if (this.selectedFollowupPointId != null) {
      this.facade.delete(
        this.selectedFollowupPointId,
        this.communicationIdParam
      );
    }
    this.resetDeleteModal();
  }

  cancelDelete() {
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    this.showDeleteModal = false;
    this.selectedFollowupPointId = null;
  }

  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredFollowupPoints = this.originalFollowupPoints.filter(
      (clientSales) =>
        Object.values(clientSales).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }

  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }

  onEditFollowupPoint(followup: FollowupPoint) {
    this.router.navigate(
      ['communication/edit-follow-ups', followup.id, followup.communicationId],
      {
        queryParams: {
          mode: 'edit',
          communicationId: this.communicationIdParam, // <-- use "communicationId" here
        },
      }
    );
  }

  onViewFollowupPoint(followup: FollowupPoint) {
    console.log('route', this.route.snapshot);
    this.router.navigate(
      ['communication/edit-follow-ups', followup.id, followup.communicationId],
      {
        queryParams: {
          mode: 'view',
          communicationId: this.communicationIdParam, // <-- and here
        },
      }
    );
  }
}
