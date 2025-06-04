import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, take } from 'rxjs';
import { arabicOnlyValidator } from '../../../../../shared/validators/arabic-only.validator';
import { MandateStatus } from '../../../store/mandate-statuses/mandate-statuses/mandate-status.model';
import { MandateStatusesFacade } from '../../../store/mandate-statuses/mandate-statuses/mandate-statuses.facade';
@Component({
  selector: 'app-add-mandate-status',
  standalone: false,
  templateUrl: './add-mandate-status.component.html',
  styleUrl: './add-mandate-status.component.scss',
})
export class AddMandateStatusesComponent {
  editMode: boolean = false;
  viewOnly = false;
  addMandateStatusesLookupsForm!: FormGroup;
  mandateId: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: MandateStatusesFacade,
    private router: Router
  ) {}

  ngOnInit() {
    this.addMandateStatusesLookupsForm = this.fb.group({
      id: [null], // ← new hidden control
      name: [
        '',
        [Validators.required], // 2nd slot (sync)
      ],
      nameAR: ['', [Validators.required, Validators.pattern(/^[\u0600-\u06FF\s]+$/)]],
      isActive: [true], // ← new hidden control
      isInitial: [false],
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        // we have an id → edit mode
        this.editMode = true;
        this.mandateId = +id;

        // disable if it’s view mode via ?mode=view
        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) {
          this.addMandateStatusesLookupsForm.disable();
        }

        // 3. load the existing record & patch the form
        this.facade.loadOne(this.mandateId);
        this.facade.current$
          .pipe(
            filter((ct) => !!ct),
            take(1)
          )
          .subscribe((ct) => {
            this.addMandateStatusesLookupsForm.patchValue({
              id: ct!.id,
              name: ct!.name,
              nameAR: ct!.nameAR,
              isActive: ct!.isActive,
              isInitial: ct!.isInitial,
            });
          });
      } else {
        // no id → add mode: still check if ?mode=view
        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) {
          this.addMandateStatusesLookupsForm.disable();
        }
      }
    });
  }

  addOrEditMandateStatuses() {
    console.log('💥 addMandateStatuses() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addMandateStatusesLookupsForm.valid);
    console.log('  form touched:', this.addMandateStatusesLookupsForm.touched);
    console.log(
      '  form raw value:',
      this.addMandateStatusesLookupsForm.getRawValue()
    );

    // Print individual control errors
    const nameCtrl = this.addMandateStatusesLookupsForm.get('name');
    const nameARCtrl = this.addMandateStatusesLookupsForm.get('nameAR');
    console.log('  name.errors:', nameCtrl?.errors);
    console.log('  nameAR.errors:', nameARCtrl?.errors);

    if (this.viewOnly) {
      console.log('⚠️ viewOnly mode — aborting add');
      return;
    }

    if (this.addMandateStatusesLookupsForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addMandateStatusesLookupsForm.markAllAsTouched();
      return;
    }

    const { name, nameAR, isActive, isInitial } =
      this.addMandateStatusesLookupsForm.value;
    const payload: Partial<MandateStatus> = {
      name,
      nameAR,
      isActive,
      isInitial,
    };
    console.log('  → payload object:', payload);

    // Double-check your route param
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(mandateId):', routeId);

    if (this.editMode) {
      const { id, name, nameAR, isActive, isInitial } =
        this.addMandateStatusesLookupsForm.value;
      const payload: MandateStatus = { id, name, nameAR, isActive, isInitial };
      console.log(
        '🔄 Dispatching UPDATE id=',
        this.mandateId,
        ' payload=',
        payload
      );
      this.facade.update(id, payload);
    } else {
      console.log('➕ Dispatching CREATE payload=', payload);
      this.facade.create(payload);
    }

    console.log('🧭 Navigating away to view-mandate-statuses');
    this.router.navigate(['/lookups/view-mandate-statuses']);
  }
}
