import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { FeeRangesFacade } from '../../../store/fee-ranges/fee-ranges.facade';
import { FeeRange } from '../../../store/fee-ranges/fee-ranges.model';
import { FeeTypesFacade } from '../../../store/fee-types/fee-types.facade';

@Component({
  selector: 'app-add-fee-ranges',
  standalone: false,
  templateUrl: './add-fee-ranges.component.html',
  styleUrl: './add-fee-ranges.component.scss',
})
export class AddFeeRangesComponent {
  editMode: boolean = false;
  viewOnly = false;
  addFeeRangesForm!: FormGroup;
  clientId: any;
  feeTypes$!: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: FeeRangesFacade,
    private feesTypefacade: FeeTypesFacade,
    private router: Router,
  ) {}

  ngOnInit() {
    //Select Box
    this.feesTypefacade.loadAll(); 
    this.feeTypes$ = this.feesTypefacade.all$;
    
    this.addFeeRangesForm = this.fb.group({
      id: [null],
      criteriaField: [null],
      feeType : [null],
      feeTypeId : [null],
      defaultPercentage: [0],
      lowerBound: [0],
      upperBound: [0],
      defaultAmount: [0],
      isActive: [true],
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
      if (id) {
        this.editMode = true;
        this.clientId = +id;

        if (this.viewOnly) {
          this.addFeeRangesForm.disable();
        }

        this.facade.loadById(this.clientId);
        this.facade.selected$
          .pipe(
            filter((ct) => !!ct),
            take(1)
          )
          .subscribe((ct) => {
            this.addFeeRangesForm.patchValue({
              id: ct!.id,
              criteriaField: ct!.criteriaField,
              feeTypeId: ct!.feeTypeId,
              feeType: ct!.feeType,
              lowerBound: ct!.lowerBound,
              upperBound: ct!.upperBound,
              defaultAmount: ct!.defaultAmount,
              defaultPercentage: ct!.defaultPercentage,
            });
          });
      } else {
        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) {
          this.addFeeRangesForm.disable();
        }
      }
    });
  }

  addOrEditFeeRange() {
    if (this.viewOnly) {
      return;
    }

    if (this.addFeeRangesForm.invalid) {
      this.addFeeRangesForm.markAllAsTouched();
      return;
    }

    const {
      criteriaField,
      feeTypeId,
      defaultPercentage,
      lowerBound,
      upperBound,
      defaultAmount,
    } = this.addFeeRangesForm.value;
    const payload: Partial<FeeRange> = {
      criteriaField,
      feeTypeId,
      defaultPercentage,
      lowerBound,
      upperBound,
      defaultAmount,
    };
    const routeId = this.route.snapshot.paramMap.get('id');

    if (this.editMode) {
      const {
        id,
         criteriaField,
      feeTypeId,
      defaultPercentage,
      lowerBound,
      upperBound,
      defaultAmount,
        isActive,
      } = this.addFeeRangesForm.value;
      const payload: FeeRange = {
        id,
        criteriaField,
        feeTypeId,
        defaultPercentage,
        lowerBound,
        upperBound,
        defaultAmount,
        isActive,
      };

      this.facade.update(id, payload);
    } else {
      this.facade.create(payload);
    }

    this.router.navigate(['/lookups/view-fee-ranges']);
  }
}
