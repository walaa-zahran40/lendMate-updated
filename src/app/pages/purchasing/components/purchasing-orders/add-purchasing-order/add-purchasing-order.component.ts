import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, take } from 'rxjs';
import { arabicOnlyValidator } from '../../../../../shared/validators/arabic-only.validator';
import { LegalFormLaw } from '../../../../legals/store/legal-form-laws/legal-form-law.model';
import { PurchasingOrdersFacade } from '../../../store/purchasing-orders/purchasing-orders.facade';
import { PurchaseOrder } from '../../../store/purchasing-orders/purchasing-order.model';

@Component({
  selector: 'app-add-purchasing-order',
  standalone: false,
  templateUrl: './add-purchasing-order.component.html',
  styleUrl: './add-purchasing-order.component.scss',
})
export class AddPurchasingOrderComponent {
  editMode: boolean = false;
  viewOnly = false;
  addPurchasingOrdersForm!: FormGroup;
  clientId: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: PurchasingOrdersFacade,
    private router: Router
  ) {}

  ngOnInit() {
    this.addPurchasingOrdersForm = this.fb.group({
      id: [null],
      firstClaimStatusId: ['', [Validators.required]],
      isActive: [true],
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.editMode = true;
        this.clientId = +id;

        console.log(this.viewOnly);

        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) {
          this.addPurchasingOrdersForm.disable();
        }

        this.facade.loadById(this.clientId);
        this.facade.selected$
          .pipe(
            filter(
              (ct): ct is PurchaseOrder => !!ct && ct.id === this.clientId
            ),
            take(1)
          )
          .subscribe((ct) => {
            this.addPurchasingOrdersForm.patchValue({
              id: ct!.id,

              isActive: ct!.isActive,
            });
          });
      } else {
        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) {
          this.addPurchasingOrdersForm.disable();
        }
      }
    });
  }

  addOrEditPurchasingOrder() {
    if (this.viewOnly) {
      return;
    }

    if (this.addPurchasingOrdersForm.invalid) {
      this.addPurchasingOrdersForm.markAllAsTouched();
      return;
    }

    const { name, nameAR } = this.addPurchasingOrdersForm.value;
    const payload: Partial<LegalFormLaw> = { name, nameAR };
    console.log('  → payload object:', payload);

    if (this.editMode) {
      const { id, name, nameAR, isActive } = this.addPurchasingOrdersForm.value;
      const payload: LegalFormLaw = {
        id,
        name,
        nameAR,
        isActive,
        code: '',
      };

      this.facade.update(id, payload);
    } else {
      this.facade.create(payload);
    }
    if (this.addPurchasingOrdersForm.valid) {
      this.addPurchasingOrdersForm.markAsPristine();
    }

    this.router.navigate([
      '/purchasing/purchasing-orders/view-purchasing-orders',
    ]);
  }
  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.addPurchasingOrdersForm.dirty;
  }
}
