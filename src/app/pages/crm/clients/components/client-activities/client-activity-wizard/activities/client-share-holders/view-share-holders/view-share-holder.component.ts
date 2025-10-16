import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  Subject,
  Observable,
  combineLatest,
  map,
  takeUntil,
  forkJoin,
  of,
} from 'rxjs';
import { TableComponent } from '../../../../../../../../../shared/components/table/table.component';
import { Client } from '../../../../../../store/_clients/allclients/client.model';
import { ClientShareHoldersFacade } from '../../../../../../store/client-share-holders/client-share-holders.facade';
import { ClientShareHolder } from '../../../../../../store/client-share-holders/client-share-holder.model';
import { ClientShareHoldersListData } from '../../../../../../resolvers/client-share-holders-list.resolver';

@Component({
  selector: 'app-view-share-holder',
  standalone: false,
  templateUrl: './view-share-holder.component.html',
  styleUrl: './view-share-holder.component.scss',
})
export class ViewShareHoldersComponent {
  tableDataInside: ClientShareHolder[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  rows: number = 10;
  showFilters: boolean = false;
  clientIdParam!: any;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'percentage', header: 'Percentage' },
    { field: 'shareHolderName', header: 'Share Holder' },
    { field: 'isActive', header: 'Is Active' },
  ];
  showDeleteModal: boolean = false;
  selectedShareHolderId: number | null = null;
  originalShareHolders: ClientShareHolder[] = [];
  filteredShareHolders: ClientShareHolder[] = [];
  shareHolders$!: Observable<ClientShareHolder[]>;
  clientsList$!: Observable<Client[]>;

  constructor(
    private router: Router,
    private facade: ClientShareHoldersFacade,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit() {
    const data = this.route.snapshot.data['list'] as ClientShareHoldersListData;
    this.clientIdParam = data.clientId;

    // 1) First render from resolver
    const idToClientName = new Map(data.clients.map((c) => [c.id, c.name]));
    const firstRender = (data.items ?? [])
      .map((it) => ({
        ...it,
        shareHolderName: idToClientName.get(it.shareHolderId) ?? '—',
      }))
      .filter((it) => it.isActive)
      .sort((a, b) => (b.id ?? 0) - (a.id ?? 0));

    this.originalShareHolders = firstRender;
    this.filteredShareHolders = [...firstRender];

    // 2) Live updates after CRUD
    this.facade.loadByClientId(this.clientIdParam);
    this.shareHolders$ = this.facade.items$;
    combineLatest([this.shareHolders$, of(data.clients)])
      .pipe(
        map(([items, clients]) => {
          const mapName = new Map(clients.map((c) => [c.id, c.name]));
          return (items ?? [])
            .filter((it) => it.clientId === this.clientIdParam)
            .map((it) => ({
              ...it,
              shareHolderName: mapName.get(it.shareHolderId) ?? '—',
            }))
            .filter((it) => it.isActive)
            .sort((a, b) => (b.id ?? 0) - (a.id ?? 0));
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((enriched) => {
        this.originalShareHolders = enriched;
        this.filteredShareHolders = [...enriched];
      });
  }

  onAddShareHolder() {
    const clientIdParam = this.route.snapshot.paramMap.get('clientId');

    this.router.navigate(['/crm/clients/add-client-share-holder'], {
      queryParams: { mode: 'add', clientId: clientIdParam },
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteShareHolder(shareHolderId: any): void {
    console.log(
      '[View] onDeleteShareHoldere() – opening modal for id=',
      shareHolderId
    );
    this.selectedIds = [shareHolderId];
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.resetDeleteModal();
  }

  resetDeleteModal() {
    console.log('[View] resetDeleteModal() – closing modal and clearing id');
    this.showDeleteModal = false;
    this.selectedShareHolderId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredShareHolders = this.originalShareHolders.filter(
      (shareHolder) =>
        Object.values(shareHolder).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditShareHolder(shareHolder: ClientShareHolder) {
    this.router.navigate(
      ['/crm/clients/edit-client-share-holder', shareHolder.id],
      {
        queryParams: {
          mode: 'edit',
          clientId: this.clientIdParam, // <-- use "currencyId" here
        },
      }
    );
  }
  onViewShareHolder(ct: ClientShareHolder) {
    this.router.navigate(['/crm/clients/edit-client-share-holder', ct.id], {
      queryParams: {
        mode: 'view',
        clientId: this.clientIdParam, // <-- use "currencyId" here
      },
    });
  }
  selectedIds: number[] = [];
  confirmDelete() {
    const deleteCalls = this.selectedIds.map((id) =>
      this.facade.delete(id, this.clientIdParam)
    );

    forkJoin(deleteCalls).subscribe({
      next: () => {
        this.selectedIds = [];
        this.showDeleteModal = false; // CLOSE MODAL HERE
        this.refreshCalls();
      },
      error: (err) => {
        this.showDeleteModal = false; // STILL CLOSE IT
      },
    });
  }

  refreshCalls() {
    this.facade.loadAll();
    this.shareHolders$ = this.facade.items$;
  }
  onBulkDelete(ids: number[]) {
    // Optionally confirm first
    this.selectedIds = ids;
    this.showDeleteModal = true;
  }
}
