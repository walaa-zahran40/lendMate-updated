import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil, filter } from 'rxjs';
import { ClientSalesTurnoversFacade } from '../../../../../../store/client-sales-turnovers/client-sales-turnovers.facade';
import { ClientSalesTurnover } from '../../../../../../store/client-sales-turnovers/client-sales-turnovers.model';
import { ClientSalesTurnoverBundle } from '../../../../../../../resolvers/client-sales-turnover-bundle.resolver';

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
    const bundle = this.route.snapshot.data[
      'bundle'
    ] as ClientSalesTurnoverBundle;

    this.mode = bundle.mode;
    this.editMode = this.mode === 'edit';
    this.viewOnly = this.mode === 'view';

    // parent client id for add, or from the record in edit/view
    this.parentClientId =
      bundle.parentClientId ??
      Number(this.route.snapshot.paramMap.get('clientId'));

    // build form
    this.addSalesTurnoverForm = this.fb.group({
      amount: [null, [Validators.required, Validators.min(0.01)]],
      date: [null, Validators.required],
    });

    // patch in edit/view
    if (bundle.record) {
      this.recordId = bundle.record.id;
      this.addSalesTurnoverForm.patchValue({
        amount: bundle.record.amount,
        date: new Date(bundle.record.date),
      });
    }

    if (this.viewOnly) {
      this.addSalesTurnoverForm.disable();
    }
  }

  addOrEditClientSalesTurnover() {
    if (this.viewOnly) return;
    if (this.addSalesTurnoverForm.invalid) {
      this.addSalesTurnoverForm.markAllAsTouched();
      return;
    }

    const formValue = this.addSalesTurnoverForm.value;
    const data: Partial<ClientSalesTurnover> = {
      clientId: this.parentClientId,
      amount: formValue.amount,
      date: formValue.date,
    };

    if (this.mode === 'add') {
      this.clientSalesoverFacade.create(data);
    } else {
      this.clientSalesoverFacade.update(this.recordId, {
        id: this.recordId,
        ...data,
      });
    }

    this.addSalesTurnoverForm.markAsPristine();
    this.router.navigate([
      '/crm/clients/view-sales-turnovers',
      this.parentClientId,
    ]);
  }

  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.addSalesTurnoverForm.dirty;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
