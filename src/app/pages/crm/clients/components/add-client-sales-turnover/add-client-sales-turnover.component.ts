import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject, takeUntil, filter } from "rxjs";
import { ClientSalesTurnover } from "../../store/client-sales-turnovers/client-sales-turnovers.model";
import { ClientSalesTurnoversFacade } from "../../store/client-sales-turnovers/client-sales-turnovers.facade";

@Component({
  selector: 'app-add-client-sales-turnover',
  standalone: false,
  templateUrl: './add-client-sales-turnover.component.html',
  styleUrl: './add-client-sales-turnover.component.scss',
})
export class AddSalesTurnoverComponent implements OnInit, OnDestroy {
  // Flags driven by mode
  editMode = false;
  viewOnly = false;

  // Reactive form
  addSalesTurnoverForm!: FormGroup;

  // Lists and IDs
  mode!: 'add' | 'edit' | 'view';
  parentClientId!: number;
  recordId!: number;

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private clientSalesoverFacade: ClientSalesTurnoversFacade,
    private router: Router
  ) {}

  ngOnInit() {
    // Read mode and set flags
    this.mode = (this.route.snapshot.queryParamMap.get('mode') as any) ?? 'add';
    this.editMode = this.mode === 'edit';
    this.viewOnly = this.mode === 'view';

    // Read IDs
    this.parentClientId = Number(
      this.route.snapshot.queryParamMap.get('clientId')
    );
    if (this.editMode || this.viewOnly) {
      console.log('route add',this.route.snapshot)
      this.recordId = Number(this.route.snapshot.params['clientId']);
      this.clientSalesoverFacade.loadOne(this.recordId);
    }

    // Build form with clientId
    this.addSalesTurnoverForm = this.fb.group({
      amount: [null, Validators.required],
      date: [null, Validators.required]
      });
   
      this.addSalesTurnoverForm.patchValue({
         clientId: this.route.snapshot.queryParamMap.get('clientId'),
      });
    

    // Patch for edit/view mode
    if (this.editMode || this.viewOnly) {
      this.clientSalesoverFacade.current$
        .pipe(
          takeUntil(this.destroy$),
          filter((rec) => !!rec)
        )
        .subscribe((rec) => {
          this.addSalesTurnoverForm.patchValue({
            id: rec.id,
            clientId: this.route.snapshot.queryParamMap.get('clientId'),
            amount : rec.amount,
            date: new Date(rec.date)
          });
        });
    }

  }

  addOrEditClientSalesTurnover() {
    // 1) Log the full ActivatedRoute snapshot
    console.log('🛣️ Route snapshot:', this.route.snapshot);
    // 2) Extract both paramMap and queryParamMap in parallel
    const clientIdParam = this.route.snapshot.queryParamMap.get('clientId');
    console.log(`🔍 QueryParams → clientId = ${clientIdParam}`);
    // 3) Log the component’s mode flags
    console.log(
      `⚙️ mode = ${this.mode}, editMode = ${this.editMode}, viewOnly = ${this.viewOnly}`
    );

    // 4) Early return in view-only
    if (this.viewOnly) {
      console.warn('🚫 viewOnly mode — aborting submit');
      return;
    }

    // 5) Form validity
    if (this.addSalesTurnoverForm.invalid) {
      this.addSalesTurnoverForm.markAllAsTouched();
      return;
    }

    // 6) The actual payload
  const formValue = this.addSalesTurnoverForm.value;

  const data: Partial<ClientSalesTurnover> = {
    clientId: Number(this.route.snapshot.paramMap.get('clientId')),
    amount : formValue.amount,
    date: formValue.date
  };

  console.log(
    '🔄 Dispatching UPDATE id=',
    this.recordId,
    ' created  payload=',
    data
  );


    if (this.mode === 'add') {
  this.clientSalesoverFacade.create(data);
} 
else {
  const formValue = this.addSalesTurnoverForm.value;

  const updateData: ClientSalesTurnover = {
    id: this.recordId,
    clientId: this.parentClientId,
    amount : formValue.amount,
    date: formValue.date
  };

  console.log(
    '🔄 Dispatching UPDATE id=',
    this.recordId,
    ' UPDATED payload=',
    updateData
  );

  this.clientSalesoverFacade.update(this.recordId, updateData);
}
console.log('route',this.route.snapshot)

  if (clientIdParam) {
  console.log('➡️ Navigating back with PATH param:', clientIdParam);
  this.router.navigate(
    ['/crm/clients/view-sales-turnover', clientIdParam]
  );
} else {
  console.error('❌ Cannot navigate back: clientId is missing!');
}}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

