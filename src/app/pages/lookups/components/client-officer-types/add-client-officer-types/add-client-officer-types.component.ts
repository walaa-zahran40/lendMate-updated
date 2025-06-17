import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, take } from 'rxjs';
import { ClientOfficerType } from '../../../store/client-officer-types/client-officer-type.model';
import { ClientOfficerTypesFacade } from '../../../store/client-officer-types/client-officer-types.facade';

@Component({
  selector: 'app-add-client-officer-types',
  standalone: false,
  templateUrl: './add-client-officer-types.component.html',
  styleUrl: './add-client-officer-types.component.scss',
})
export class AddClientOfficerTypesComponent {
  editMode: boolean = false;
  viewOnly = false;
  addClientOfficerTypeForm!: FormGroup;
  clientId: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: ClientOfficerTypesFacade,
    private router: Router
  ) {}

  ngOnInit() {
    this.addClientOfficerTypeForm = this.fb.group({
      id: [null], // ← new hidden control
      name: [
        '',
        [Validators.required], // 2nd slot (sync)
      ],
      nameAR: [
        '',
        [Validators.required, Validators.pattern(/^[\u0600-\u06FF\s0-9\u0660-\u0669]+$/)],
      ],
      isActive: [true], // ← new hidden control
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        // we have an id → edit mode
        this.editMode = true;
        this.clientId = +id;

        // disable if it’s view mode via ?mode=view
        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) {
          this.addClientOfficerTypeForm.disable();
        }

        // 3. load the existing record & patch the form
        this.facade.loadById(this.clientId);
        this.facade.selected$
          .pipe(
            filter(
              (ct): ct is ClientOfficerType => !!ct && ct.id === this.clientId
            ),
            take(1)
          )
          .subscribe((ct) => {
            this.addClientOfficerTypeForm.patchValue({
              id: ct!.id,
              name: ct!.name,
              nameAR: ct!.nameAR,
              isActive: ct!.isActive,
            });
          });
      } else {
        // no id → add mode: still check if ?mode=view
        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) {
          this.addClientOfficerTypeForm.disable();
        }
      }
    });
  }

  addOrEditClientOfficerType() {
    console.log('💥 addCall-action-types() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addClientOfficerTypeForm.valid);
    console.log('  form touched:', this.addClientOfficerTypeForm.touched);
    console.log(
      '  form raw value:',
      this.addClientOfficerTypeForm.getRawValue()
    );

    // Print individual control errors
    const nameCtrl = this.addClientOfficerTypeForm.get('name');
    const nameARCtrl = this.addClientOfficerTypeForm.get('nameAR');
    console.log('  name.errors:', nameCtrl?.errors);
    console.log('  nameAR.errors:', nameARCtrl?.errors);

    if (this.viewOnly) {
      console.log('⚠️ viewOnly mode — aborting add');
      return;
    }

    if (this.addClientOfficerTypeForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addClientOfficerTypeForm.markAllAsTouched();
      return;
    }

    const { name, nameAR, isActive } = this.addClientOfficerTypeForm.value;
    const payload: Partial<ClientOfficerType> = { name, nameAR, isActive };
    console.log('  → payload object:', payload);

    // Double-check your route param
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(clientId):', routeId);

    if (this.editMode) {
      const { id, name, nameAR, isActive } =
        this.addClientOfficerTypeForm.value;
      const payload: ClientOfficerType = { id, name, nameAR, isActive };
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
    if (this.addClientOfficerTypeForm.valid) {
      this.addClientOfficerTypeForm.markAsPristine();
    }

    console.log('🧭 Navigating away to view-client-officer-types');
    this.router.navigate(['/lookups/view-client-officer-types']);
  }
  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.addClientOfficerTypeForm.dirty;
  }
}
