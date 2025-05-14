import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, Observable, ObservableInput, Subject, take, takeUntil } from 'rxjs';
import { arabicOnlyValidator } from '../../../../../shared/validators/arabic-only.validator';
import { Store } from '@ngrx/store';
import { LeasingMandatesFacade } from '../../../store/leasing-mandates/leasing-mandates.facade';
import { LeasingMandate } from '../../../store/leasing-mandates/leasing-mandate.model';
import { ProductsFacade } from '../../../../lookups/store/products/products.facade';
import { ClientsFacade } from '../../../clients/store/clients/clients.facade';
import { LeasingTypesFacade } from '../../../../lookups/store/leasing-types/leasing-types.facade';
import { InsuredByFacade } from '../../../../lookups/store/insured-by/insured-by.facade';
import { MandateValidityUnitsFacade } from '../../../../lookups/store/mandate-validity-units/mandate-validity-units.facade';

@Component({
selector: 'app-add-leasing-mandate',
  standalone: false,
  templateUrl: './add-leasing-mandate.component.html',
  styleUrl: './add-leasing-mandate.component.scss',
})
export class AddLeasingMandateComponent {
  editMode: boolean = false;
  viewOnly = false;
  addLeasingMandateForm!: FormGroup;
  recordId: any;

    clients$: any;
    products$: any;
    validityUnits$: any;
    leasingTypes$: any;
    insuredByList$: any;

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: LeasingMandatesFacade,
    private clientsFacade: ClientsFacade,
    private productsFacade: ProductsFacade,
    private validityUnitsFacade: MandateValidityUnitsFacade,
    private leasingTypesFacade: LeasingTypesFacade,
    private insuredByFacade: InsuredByFacade,
    private router: Router,
  ) {}

  ngOnInit() {
       // Load Client dropdown
        this.clientsFacade.loadClients();
        this.clients$ = this.clientsFacade.clients$;
        
        
        // Load products dropdown
        this.productsFacade.loadAll();
        this.products$ = this.productsFacade.all$;
        
        
        // Load Leasing types dropdown
        this.leasingTypesFacade.loadAll();
        this.leasingTypes$ = this.leasingTypesFacade.all$;
      
        
        // Load validity Units dropdown
        this.validityUnitsFacade.loadAll();
        this.validityUnits$ = this.validityUnitsFacade.all$;

        
        // Load insured By dropdown
        this.insuredByFacade.loadAll();
        this.insuredByList$ = this.insuredByFacade.all$;
        

    this.addLeasingMandateForm = this.fb.group({
      id: [null],
       date: [null],
       description: ['', [Validators.required]],
       parentMandateId: [null],
       validityCount: [0],
       client: [null],
       clientId: [null],
       validityUnit: [null],
       validityUnitId: [null],
       product: [null],
       productId: [null],
       leasingType: [null],
       leasingTypeId: [null],
       insuredBy: [null],
       insuredById: [null],
       notes: [''],
       isActive: [true],
       indicativeRentals: [0],
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
      if (id) {
        this.editMode = true;
        this.recordId = +id;

        if (this.viewOnly) {
          this.addLeasingMandateForm.disable();
        }

        this.facade.loadById(this.recordId);
        this.facade.selected$
          .pipe(
            filter((ct) => !!ct),
            take(1)
          )
          .subscribe((ct) => {
            this.addLeasingMandateForm.patchValue({
            id: ct!.id,
            description: ct!.description,
            date: ct!.date,
            validityCount: ct!.validityCount,
            parentMandateId: ct!.parentMandateId,
            indicativeRentals: ct!.indicativeRentals,
            clientId: ct!.clientId,
            validityUnitId: ct!.validityUnitId,
            productId: ct!.productId,
            leasingTypeId: ct!.leasingTypeId,
            insuredById: ct!.insuredById,
            notes: ct!.notes
            });
          });
      } else {
        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) {
          this.addLeasingMandateForm.disable();
        }
      }
    });
  }

  addOrEditLeasingMandate() {
    if (this.viewOnly) {
      return;
    }

    if (this.addLeasingMandateForm.invalid) {
      this.addLeasingMandateForm.markAllAsTouched();
      return;
    }

    const {
      description,
      date,
      validityCount,
      parentMandateId,
      indicativeRentals,
      clientId,
      validityUnitId, 
      productId, 
      leasingTypeId, 
      insuredById, 
      notes
    } = this.addLeasingMandateForm.value;
    const payload: Partial<LeasingMandate> = {
      description,
      date,
      validityCount,
      parentMandateId,
      indicativeRentals,
      clientId,
      validityUnitId,
      productId,
      leasingTypeId,
      insuredById,
      notes,
    };
    const routeId = this.route.snapshot.paramMap.get('id');

    if (this.editMode) {
      const {
        id,
       description,
      date,
      validityCount,
      parentMandateId,
      indicativeRentals,
      clientId,
      validityUnitId,
      productId,
      leasingTypeId,
      insuredById,
      notes,
        isActive,
      } = this.addLeasingMandateForm.value;
      const payload: LeasingMandate = {
        id,
        description,
      date,
      validityCount,
      parentMandateId,
      indicativeRentals,
      clientId,
      validityUnitId,
      productId,
      leasingTypeId,
      insuredById,
      notes,
        isActive,
      };

      this.facade.update(id, payload);
    } else {
      this.facade.create(payload);
    }

    this.router.navigate(['/crm/leasing-mandatesview-leasing-mandates']);
  }

  ngOnDestroy(): void {
  this.destroy$.next();
  this.destroy$.complete();
}

}
