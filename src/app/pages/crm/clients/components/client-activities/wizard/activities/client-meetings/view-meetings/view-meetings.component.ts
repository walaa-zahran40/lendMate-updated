import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Observable, takeUntil, forkJoin, combineLatest } from 'rxjs';
import { Meeting } from '../../../../../../../../communication/store/meetings/meeting.model';
import { TableComponent } from '../../../../../../../../../shared/components/table/table.component';
import { MeetingsFacade } from '../../../../../../../../communication/store/meetings/meetings.facade';
import { Client } from '../../../../../../store/_clients/allclients/client.model';
import { ClientsFacade } from '../../../../../../store/_clients/allclients/clients.facade';
import { MeetingType } from '../../../../../../../../lookups/store/meeting-types/meeting-type.model';
import { MeetingTypesFacade } from '../../../../../../../../lookups/store/meeting-types/meeting-types.facade';

@Component({
  selector: 'app-view-meetings',
  standalone: false,
  templateUrl: './view-meetings.component.html',
  styleUrl: './view-meetings.component.scss',
})
export class ViewMeetingsComponent {
  tableDataInside: Meeting[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  rows: number = 10;
  showFilters: boolean = false;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'topic', header: 'Topic' },
    { field: 'clientName', header: 'client' },
    { field: 'meetingTypeName', header: 'Meeting Type' },
    { field: 'startDate', header: 'Start Date' },
    { field: 'endDate', header: 'End Date' },
  ];
  showDeleteModal: boolean = false;
  selectedMeetingId: number | null = null;
  originalMeetings: Meeting[] = [];
  filteredMeetings: Meeting[] = [];
  meetings$!: Observable<Meeting[]>;

  clients!: Observable<Client[]>;
  meetingTypes!: Observable<MeetingType[]>;
  raw = this.route.snapshot.paramMap.get('clientId');

  constructor(
    private router: Router,
    private facade: MeetingsFacade,
    private clientsFacade: ClientsFacade,
    private meetingTypesFacade: MeetingTypesFacade,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.clientsFacade.loadAll();
    this.clients = this.clientsFacade.all$;

    this.meetingTypesFacade.loadAll();
    this.meetingTypes = this.meetingTypesFacade.all$;

    this.facade.loadAll();
    this.meetings$ = this.facade.all$;

    combineLatest([this.meetings$, this.clients, this.meetingTypes])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([meetings, clients, meetingTypes]) => {
        const filtered = meetings.filter(
          (m) => m.communication?.clientId === Number(this.raw)
        );

        const enriched: Meeting[] = filtered.map((meeting) => {
          const client = clients.find(
            (c) => c.id === meeting.communication.clientId
          );
          const meetingType = meetingTypes.find(
            (ct) => ct.id === meeting.meetingTypeId
          );

          return {
            ...meeting,
            clientName: client?.name || 'N/A',
            meetingTypeName: meetingType?.name || 'N/A',
            topic: meeting.communication?.topic,
            startDate: meeting.startDate,
            endDate: meeting.endDate,
          };
        });

        const sorted = enriched.sort((a, b) => b.id - a.id);
        this.originalMeetings = sorted;
        this.filteredMeetings = [...sorted];
      });
  }

  onAddMeeting() {
    this.router.navigate([`/communication/add-meetings/${this.raw}`]);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteMeeting(meetingId: any): void {
    console.log('[View] onDeleteMeeting() – opening modal for id=', meetingId);
    this.selectedIds = [meetingId];
    this.showDeleteModal = true;
  }

  onAddSide(meetingId: any) {
    this.router.navigate(['/communication/wizard-meeting', meetingId]);
  }

  cancelDelete() {
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    console.log('[View] resetDeleteModal() – closing modal and clearing id');
    this.showDeleteModal = false;
    this.selectedMeetingId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredMeetings = this.originalMeetings.filter((meeting) =>
      Object.values(meeting).some((val) =>
        val?.toString().toLowerCase().includes(lower)
      )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditMeeting(meeting: Meeting) {
    this.router.navigate(
      ['/communication/edit-meetings', meeting.id, Number(this.raw)],
      {
        queryParams: { mode: 'edit' },
      }
    );
  }
  onViewMeeting(ct: Meeting) {
    this.router.navigate(
      ['/communication/edit-meetings', ct.id, Number(this.raw)],
      {
        queryParams: { mode: 'view' },
      }
    );
  }
  selectedIds: number[] = [];
  confirmDelete() {
    const deleteCalls = this.selectedIds.map((id) => this.facade.delete(id));

    forkJoin(deleteCalls).subscribe({
      next: () => {
        this.selectedIds = [];
        this.showDeleteModal = false; // CLOSE MODAL HERE
        this.refreshMeetings();
      },
      error: (err) => {
        this.showDeleteModal = false; // STILL CLOSE IT
      },
    });
  }

  refreshMeetings() {
    this.facade.loadByClientId(Number(this.raw));
    this.meetings$ = this.facade.all$;
  }
  onBulkDelete(ids: number[]) {
    // Optionally confirm first
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }
}
