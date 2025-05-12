import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, take } from 'rxjs';
import { arabicOnlyValidator } from '../../../../../shared/validators/arabic-only.validator';
import { MandateStatusesFacade } from '../../../store/mandate-statuses/mandate-statuses.facade';
import { MandateStatus } from '../../../store/mandate-statuses/mandate-status.model';

@Component({
  selector: 'app-add-mandate-statuses',
  standalone: false,
  templateUrl: './add-mandate-statuses.component.html',
  styleUrl: './add-mandate-statuses.component.scss',
})
export class AddMandateStatusesComponent {
  editMode: boolean = false;
  viewOnly = false;
  addMandateStatusesLookupsForm!: FormGroup;
  clientId: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: MandateStatusesFacade,
    private router: Router
  ) {}

  ngOnInit() {
    this.addMandateStatusesLookupsForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required]],
      nameAR: ['', [Validators.required, arabicOnlyValidator]],
      isInitial: [false, [Validators.required]],
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
          this.addMandateStatusesLookupsForm.disable();
        }

        this.facade.loadOne(this.clientId);
        this.facade.current$
          .pipe(
            filter(
              (ct): ct is MandateStatus => !!ct && ct.id === this.clientId
            ),
            take(1)
          )
          .subscribe((ct) => {
            this.addMandateStatusesLookupsForm.patchValue({
              id: ct!.id,
              name: ct!.name,
              nameAR: ct!.nameAR,
              isInitial: ct!.isInitial,
              isActive: ct!.isActive,
            });
          });
      } else {
        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) {
          this.addMandateStatusesLookupsForm.disable();
        }
      }
    });
  }

  addOrEditMandateStatus() {
    if (this.viewOnly) {
      return;
    }

    if (this.addMandateStatusesLookupsForm.invalid) {
      this.addMandateStatusesLookupsForm.markAllAsTouched();
      return;
    }

    const { name, nameAR, iso, isInitial } =
      this.addMandateStatusesLookupsForm.value;
    const payload: Partial<MandateStatus> = { name, nameAR, isInitial };
    console.log('  → payload object:', payload);

    if (this.editMode) {
      const { id, name, nameAR, isInitial, isActive } =
        this.addMandateStatusesLookupsForm.value;
      const payload: MandateStatus = {
        id,
        name,
        nameAR,
        isInitial,
        isActive,
        code: '',
      };
      console.log(
        '🔄 Dispatching UPDATE id=',
        this.clientId,
        ' payload=',
        payload
      );
      this.facade.update(id, payload);
    } else {
      console.log('➕ Dispatching CREATE payload=', payload);
      this.facade.create(payload);
    }

    console.log('🧭 Navigating away to view-company-types');
    this.router.navigate(['/lookups/view-mandate-statuses']);
  }
}
