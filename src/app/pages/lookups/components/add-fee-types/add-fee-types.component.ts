import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, Observable, take } from 'rxjs';
import { arabicOnlyValidator } from '../../../../shared/validators/arabic-only.validator';
import { FeeTypesFacade } from '../../store/fee-types/fee-types.facade';
import { Store } from '@ngrx/store';
import { FeeType } from '../../store/fee-types/fee-type.model';
import { loadAll } from '../../store/fee-calculation-types/fee-calculation-types.actions';
import { selectAllFeeCalculationTypes } from '../../store/fee-calculation-types/fee-calculation-types.selectors';

@Component({
  selector: 'app-add-fee-types',
  standalone: false,
  templateUrl: './add-fee-types.component.html',
  styleUrl: './add-fee-types.component.scss',
})
export class AddFeeTypesComponent {
  editMode: boolean = false;
  viewOnly = false;
  addFeesTypesLookupsForm!: FormGroup;
  clientId: any;
  feeCalculationTypes$!: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: FeeTypesFacade,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    //Select Box
        console.log('🔵 ngOnInit: start');
        this.store.dispatch(loadAll({pageNumber : 1}));
        this.feeCalculationTypes$ = this.store.select(selectAllFeeCalculationTypes);

        this.feeCalculationTypes$.subscribe((data: any) =>
          console.log('🧪 selectFeeCalculationTypes$ from store:', data)
        );

    this.addFeesTypesLookupsForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required]],
      nameAR: ['', [Validators.required, arabicOnlyValidator]],
      description: [null, [Validators.required]],
      descriptionAR: [null],
      feeCalculationType: [null],
      feeCalculationTypeId: [null],
      defaultPrecentage: [0],
      defaultAmount: [0],
      isDefault: [true],
      isActive : [true],
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.editMode = true;
        this.clientId = +id;

        console.log(this.viewOnly);

        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) {
          this.addFeesTypesLookupsForm.disable();
        }

        this.facade.loadOne(this.clientId);
        this.facade.current$
          .pipe(
            filter((ct) => !!ct),
            take(1)
          )
          .subscribe((ct) => {
            this.addFeesTypesLookupsForm.patchValue({
              id: ct!.id,
              name: ct!.name,
              nameAR: ct!.nameAR,
              description: ct!.description,
              descriptionAR: ct!.descriptionAR,
              feeCalculationType: ct!.feeCalculationType,
              feeCalculationTypeId: ct!.feeCalculationTypeId,
              defaultAmount: ct!.defaultAmount,
              defaultPrecentage: ct!.defaultPrecentage,
            });
          });
      } else {

        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) {
          this.addFeesTypesLookupsForm.disable();
        }
      }
    });
  }

  addOrEditFeeType() {
    if (this.viewOnly) {
      return;
    }

    if (this.addFeesTypesLookupsForm.invalid) {
      this.addFeesTypesLookupsForm.markAllAsTouched();
      return;
    }

    const { name, nameAR, description , descriptionAR ,feeCalculationTypeId,
      defaultAmount, defaultPrecentage } =
      this.addFeesTypesLookupsForm.value;
    const payload: Partial<FeeType> = { name, nameAR, description , descriptionAR , feeCalculationTypeId, defaultAmount , defaultPrecentage };
    const routeId = this.route.snapshot.paramMap.get('id');

    if (this.editMode) {
      const { id, name, nameAR, description , descriptionAR ,feeCalculationTypeId, defaultAmount, defaultPrecentage , isActive } =
        this.addFeesTypesLookupsForm.value;
      const payload: FeeType = {
        id,
        name,
        nameAR,
        description,
        descriptionAR,
        feeCalculationTypeId,
        defaultAmount: 0,
        defaultPrecentage: 0,
        isActive
      };
      
      this.facade.update(id, payload);
    } else {
      this.facade.create(payload);
    }

    this.router.navigate(['/lookups/view-fee-types']);
  }
}