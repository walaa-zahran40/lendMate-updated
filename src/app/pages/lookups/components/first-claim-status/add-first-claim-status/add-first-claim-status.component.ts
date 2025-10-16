import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, take } from 'rxjs';
import { arabicOnlyValidator } from '../../../../../shared/validators/arabic-only.validator';
import { loadAll } from '../../../store/sectors/sectors.actions';
import { FirstClaimStatusesFacade } from '../../../store/first-claim-statuses/first-claim-statuses.facade';
import { FirstClaimStatus } from '../../../store/first-claim-statuses/first-claim-status.model';

@Component({
  selector: 'app-add-first-claim-status',
  standalone: false,
  templateUrl: './add-first-claim-status.component.html',
  styleUrl: './add-first-claim-status.component.scss',
})
export class AddFirstClaimStatusComponent {
  editMode: boolean = false;
  viewOnly = false;
  addFirstClaimStatusesForm!: FormGroup;
  routeId: any;
  firstClaimStatuses$!: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private facade: FirstClaimStatusesFacade
  ) {}

  ngOnInit() {
    this.addFirstClaimStatusesForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required]],
      nameAR: ['', [Validators.required, arabicOnlyValidator]],
      isActive: [true],
    });
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
      if (id) {
        this.editMode = true;
        this.routeId = +id;

        if (this.viewOnly) {
          this.addFirstClaimStatusesForm.disable();
        }

        this.facade.loadById(this.routeId);
        this.facade.selected$
          .pipe(
            filter((ct) => !!ct),
            take(1)
          )
          .subscribe((ct) => {
            this.addFirstClaimStatusesForm.patchValue({
              id: ct!.id,
              name: ct!.name,
              nameAR: ct!.nameAR,
            });
          });
      } else {
        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) {
          this.addFirstClaimStatusesForm.disable();
        }
      }
    });
  }

  addOrEditFirstClaimStatus() {
    if (this.viewOnly) {
      return;
    }

    if (this.addFirstClaimStatusesForm.invalid) {
      this.addFirstClaimStatusesForm.markAllAsTouched();
      return;
    }

    const { name, nameAR } = this.addFirstClaimStatusesForm.value;
    const payload: Partial<FirstClaimStatus> = {
      name,
      nameAR,
    };
    const routeId = this.route.snapshot.paramMap.get('id');

    if (this.editMode) {
      const { id, name, nameAR, isActive } =
        this.addFirstClaimStatusesForm.value;
      const payload: FirstClaimStatus = {
        id,
        name,
        nameAR,
        isActive,
      };

      this.facade.update(id, payload);
    } else {
      this.facade.create(payload);
    }
    if (this.addFirstClaimStatusesForm.valid) {
      this.addFirstClaimStatusesForm.markAsPristine();
    }

    this.router.navigate(['/lookups/view-first-claim-statuses']);
  }
  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.addFirstClaimStatusesForm.dirty;
  }
}
