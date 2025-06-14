import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, take } from 'rxjs';
import { ClientType } from '../../../store/client-types/client-type.model';
import { ClientTypesFacade } from '../../../store/client-types/client-types.facade';

@Component({
  selector: 'app-add-client-types',
  standalone: false,
  templateUrl: './add-client-types.component.html',
  styleUrl: './add-client-types.component.scss',
})
export class AddClientTypesComponent {
  editMode: boolean = false;
  viewOnly = false;
  addClientTypeForm!: FormGroup;
  clientId: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: ClientTypesFacade,
    private router: Router
  ) {}

  ngOnInit() {
    this.addClientTypeForm = this.fb.group({
      id: [null], // ← new hidden control
      name: [
        '',
        [Validators.required], // 2nd slot (sync)
      ],
      nameAR: [
        '',
        [Validators.required, Validators.pattern(/^[\u0600-\u06FF\s]+$/)],
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
          this.addClientTypeForm.disable();
        }

        // 3. load the existing record & patch the form
        this.facade.loadById(this.clientId);
        this.facade.selected$
          .pipe(
            filter((ct): ct is ClientType => !!ct && ct.id === this.clientId),
            take(1)
          )
          .subscribe((ct) => {
            this.addClientTypeForm.patchValue({
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
          this.addClientTypeForm.disable();
        }
      }
    });
  }

  addOrEditClientType() {
    console.log('💥 add ClientTypes()');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addClientTypeForm.valid);
    console.log('  form touched:', this.addClientTypeForm.touched);
    console.log('  form raw value:', this.addClientTypeForm.getRawValue());

    // Print individual control errors
    const nameCtrl = this.addClientTypeForm.get('name');
    const nameARCtrl = this.addClientTypeForm.get('nameAR');
    console.log('  name.errors:', nameCtrl?.errors);
    console.log('  nameAR.errors:', nameARCtrl?.errors);

    if (this.viewOnly) {
      console.log('⚠️ viewOnly mode — aborting add');
      return;
    }

    if (this.addClientTypeForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addClientTypeForm.markAllAsTouched();
      return;
    }

    const { name, nameAR, isActive } = this.addClientTypeForm.value;
    const payload: Partial<ClientType> = { name, nameAR, isActive };
    console.log('  → payload object:', payload);

    // Double-check your route param
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(clientId):', routeId);

    if (this.editMode) {
      const { id, name, nameAR, isActive } = this.addClientTypeForm.value;
      const payload: ClientType = { id, name, nameAR, isActive };
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
    if (this.addClientTypeForm.valid) {
      this.addClientTypeForm.markAsPristine();
    }

    console.log('🧭 Navigating away to view client types');
    this.router.navigate(['/lookups/view-client-types']);
  }
  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.addClientTypeForm.dirty;
  }
}
