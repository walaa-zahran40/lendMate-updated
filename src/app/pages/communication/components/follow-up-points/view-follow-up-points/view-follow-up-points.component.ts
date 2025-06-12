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
  followupIdParam!: any;
  communicationIdParam!: any;

  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'topic', header: 'Topic' },
    { field: 'details', header: 'Details' },
    { field: 'dueDate', header: 'Due Date' },
    { field: 'actualDate', header: 'Actual Date' },
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
    this.communicationIdParam = this.route.snapshot.params['communicationId'];
    const raw = this.route.snapshot.params['followupId'];
    this.followupIdParam = raw !== null ? Number(raw) : undefined;
    console.log('[View] ngOnInit → followupIdParam =', this.followupIdParam);

    this.facade.loadByCommunicationId(this.followupIdParam);
    this.followups$ = this.facade.items$;

    if (this.followupIdParam == null || isNaN(this.followupIdParam)) {
      console.error(
        '❌ Missing or invalid followupIdParam! Cannot load exchange rates.'
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
    const routeId = this.route.snapshot.paramMap.get('followupId');
    console.log(`route : ${routeId}`);
    this.router.navigate(['communication/add-follow-up-points', routeId], {
      queryParams: {
        mode: 'add',
        followupId: routeId,
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
      this.facade.delete(this.selectedFollowupPointId, this.followupIdParam);
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

  onEditFollowupPoint(followupPoint: FollowupPoint) {
    this.router.navigate(
      [
        'communication/edit-follow-up-points',
        followupPoint.id,
        this.followupIdParam,
      ],
      {
        queryParams: {
          mode: 'edit',
          followupId: this.followupIdParam, // <-- use "followupId" here
        },
      }
    );
  }

  onViewFollowupPoint(followupPoint: FollowupPoint) {
    console.log('route', this.route.snapshot);
    console.log('route', this.followupIdParam);
    this.router.navigate(
      [
        'communication/edit-follow-up-points',
        followupPoint.id,
        this.followupIdParam,
      ],
      {
        queryParams: {
          mode: 'view',
          followupId: this.followupIdParam,
        },
      }
    );
  }
}
