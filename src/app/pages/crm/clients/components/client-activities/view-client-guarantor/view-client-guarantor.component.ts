import { Component, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subject, Observable, combineLatest, map, takeUntil } from "rxjs";
import { TableComponent } from "../../../../../../shared/components/table/table.component";
import { Client } from "../../../store/_clients/allclients/client.model";
import { selectAllClients } from "../../../store/_clients/allclients/clients.selectors";
import { loadAll } from "../../../store/client-identity-types/client-identity-types.actions";
import { ClientGuarantor } from "../../../store/client-guarantors/client-guarantor.model";
import { ClientGuarantorsFacade } from "../../../store/client-guarantors/client-guarantors.facade";

@Component({
 selector: 'app-view-client-guarantor',
  standalone: false,
  templateUrl: './view-client-guarantor.component.html',
  styleUrl: './view-client-guarantor.component.scss',
})

export class ViewGuarantorsComponent {
  tableDataInside: ClientGuarantor[] = [];
  first2: number = 0;
  private destroy$ = new Subject<void>();
  rows: number = 10;
  showFilters: boolean = false;
  clientIdParam!: any;
  @ViewChild('tableRef') tableRef!: TableComponent;

  readonly colsInside = [
    { field: 'percentage', header: 'Percentage' },
    { field: 'guarantorName', header: 'Guarantor Name' },
    { field: 'isActive', header: 'Is Active' },
  ];
  showDeleteModal: boolean = false;
  selectedGuarantorId: number | null = null;
  originalGuarantors: ClientGuarantor[] = [];
  filteredGuarantors: ClientGuarantor[] = [];
  guarantors$!: Observable<ClientGuarantor[]>;
  clientsList$!: Observable<Client[]>;

  constructor(
    private router: Router,
    private facade: ClientGuarantorsFacade,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit() {
    const raw = this.route.snapshot.paramMap.get('clientId');
    this.clientIdParam = raw !== null ? Number(raw) : undefined;
    this.facade.loadClientGuarantorsByClientId(this.clientIdParam);
    this.guarantors$ = this.facade.items$;

    this.store.dispatch(loadAll({}));

    this.clientsList$ = this.store.select(selectAllClients);

    combineLatest([this.guarantors$, this.clientsList$])
      .pipe(
        map(([guarantors, clientsList]) =>
          guarantors
            .map((guarantor) => ({
              ...guarantor,
              guarantorName:
                clientsList.find((c) => c.id === guarantor.guarantorId)
                  ?.name || '—',
            }))
            .filter((guarantor) => guarantor.isActive)
            .sort((a, b) => b.id - a.id)
        ),
        takeUntil(this.destroy$)
      )
      .subscribe((enriched) => {
        this.originalGuarantors = enriched;
        this.filteredGuarantors = [...enriched];
      });
  }


  onAddGuarantor() {
    const clientIdParam = this.route.snapshot.paramMap.get('clientId');

    this.router.navigate(['/crm/clients/add-client-guarantor'], {
      queryParams: { mode: 'add', clientId: clientIdParam },
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onDeleteGuarantor(guarantorId: any): void {
    console.log(
      '[View] onDeleteGuarantore() – opening modal for id=',
      guarantorId
    );
    this.selectedGuarantorId = guarantorId;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    console.log(
      '[View] confirmDelete() – about to dispatch delete for id=',
      this.selectedGuarantorId
    );
    if (this.selectedGuarantorId !== null) {
      this.facade.delete(this.selectedGuarantorId, this.clientIdParam);
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
    this.selectedGuarantorId = null;
  }
  onSearch(keyword: string) {
    const lower = keyword.toLowerCase();
    this.filteredGuarantors = this.originalGuarantors.filter(
      (guarantor) =>
        Object.values(guarantor).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
    );
  }
  onToggleFilters(value: boolean) {
    this.showFilters = value;
  }
  onEditGuarantor(guarantor: ClientGuarantor) {
    this.router.navigate(
      ['/crm/clients/edit-client-guarantors', guarantor.id],
      {
        queryParams: {
          mode: 'edit',
          clientId: this.clientIdParam, // <-- use "currencyId" here
        },
      }
    );
  }
  onViewGuarantor(ct: ClientGuarantor) {
    this.router.navigate(['/crm/clients/edit-client-guarantors', ct.id], {
      queryParams: {
        mode: 'view',
        clientId: this.clientIdParam, // <-- use "currencyId" here
      },
    });
  }
}
