import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Observable, takeUntil, tap, map, combineLatest } from 'rxjs';
import { TableComponent } from '../../../../../../shared/components/table/table.component';
import { ClientShareHolder } from '../../../store/client-share-holders/client-share-holders.model';
import { ClientShareHoldersFacade } from '../../../store/client-share-holders/client-share-holders.facade';
import { Store } from '@ngrx/store';
import { Client } from '../../../store/_clients/allclients/client.model';
import { loadAll } from '../../../store/_clients/allclients/clients.actions';
import { selectAllClients } from '../../../store/_clients/allclients/clients.selectors';

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
    const raw = this.route.snapshot.paramMap.get('clientId');
    this.clientIdParam = raw !== null ? Number(raw) : undefined;
    this.facade.loadClientShareHoldersByClientId(this.clientIdParam);
    this.shareHolders$ = this.facade.items$;

    this.store.dispatch(loadAll({}));
   
    this.clientsList$ = this.store.select(selectAllClients);
   

    combineLatest([this.shareHolders$, this.clientsList$])
          .pipe(
            map(([shareHolders, clientsList]) =>
              shareHolders
                .map((shareHolder) => ({
                  ...shareHolder,
                  shareHolderName:
                    clientsList.find((c) => c.id === shareHolder.shareHolderId)?.name || '—',
                }))
                .filter((shareHolder) => shareHolder.isActive)
                .sort((a, b) => b.id - a.id)
            ),
            takeUntil(this.destroy$)
          )
          .subscribe((enriched) => {
            this.originalShareHolders = enriched;
            this.filteredShareHolders = [...enriched];
          });
  }

  onAddShareHolder() {
    const clientIdParam = this.route.snapshot.paramMap.get('clientId');

    this.router.navigate(['/crm/clients/add-client-share-holders'], {
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
    this.selectedShareHolderId = shareHolderId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    console.log(
      '[View] confirmDelete() – about to dispatch delete for id=',
      this.selectedShareHolderId
    );
    if (this.selectedShareHolderId !== null) {
      this.facade.delete(this.selectedShareHolderId, this.clientIdParam);
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
      ['/crm/clients/edit-client-share-holders', shareHolder.id],
      {
        queryParams: {
          mode: 'edit',
          clientId: this.clientIdParam, // <-- use "currencyId" here
        },
      }
    );
  }
  onViewShareHolder(ct: ClientShareHolder) {
    this.router.navigate(['/crm/clients/edit-client-share-holders', ct.id], {
      queryParams: {
        mode: 'view',
        clientId: this.clientIdParam, // <-- use "currencyId" here
      },
    });
  }
}
