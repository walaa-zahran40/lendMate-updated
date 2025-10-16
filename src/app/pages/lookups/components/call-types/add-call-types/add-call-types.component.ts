import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, take } from 'rxjs';
import { CallType } from '../../../store/call-types/call-type.model';
import { CallTypesFacade } from '../../../store/call-types/call-types.facade';

@Component({
  selector: 'app-add-call-types',
  standalone: false,
  templateUrl: './add-call-types.component.html',
  styleUrl: './add-call-types.component.scss',
})
export class AddCallTypesComponent {
  editMode: boolean = false;
  viewOnly = false;
  addCallTypeForm!: FormGroup;
  clientId: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: CallTypesFacade,
    private router: Router
  ) {}

  ngOnInit() {
    this.addCallTypeForm = this.fb.group({
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
          this.addCallTypeForm.disable();
        }

        // 3. load the existing record & patch the form
        this.facade.loadById(this.clientId);
        this.facade.selected$
          .pipe(
            filter((ct): ct is CallType => !!ct && ct.id === this.clientId),
            take(1)
          )
          .subscribe((ct) => {
            this.addCallTypeForm.patchValue({
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
          this.addCallTypeForm.disable();
        }
      }
    });
  }

  addOrEditCallType() {
    console.log('💥 addCall--types() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addCallTypeForm.valid);
    console.log('  form touched:', this.addCallTypeForm.touched);
    console.log('  form raw value:', this.addCallTypeForm.getRawValue());

    // Print individual control errors
    const nameCtrl = this.addCallTypeForm.get('name');
    const nameARCtrl = this.addCallTypeForm.get('nameAR');
    console.log('  name.errors:', nameCtrl?.errors);
    console.log('  nameAR.errors:', nameARCtrl?.errors);

    if (this.viewOnly) {
      console.log('⚠️ viewOnly mode — aborting add');
      return;
    }

    if (this.addCallTypeForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addCallTypeForm.markAllAsTouched();
      return;
    }

    const { name, nameAR, isActive } = this.addCallTypeForm.value;
    const payload: Partial<CallType> = { name, nameAR, isActive };
    console.log('  → payload object:', payload);

    // Double-check your route param
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(clientId):', routeId);

    if (this.editMode) {
      const { id, name, nameAR, isActive } = this.addCallTypeForm.value;
      const payload: CallType = { id, name, nameAR, isActive };
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
    if (this.addCallTypeForm.valid) {
      this.addCallTypeForm.markAsPristine();
    }
    console.log('🧭 Navigating away to view-call--types');
    this.router.navigate(['/lookups/view-call-types']);
  }
  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.addCallTypeForm.dirty;
  }
}
