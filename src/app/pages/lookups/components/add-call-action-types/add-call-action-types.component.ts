import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, take } from 'rxjs';
import { CallActionType } from '../../store/call-action-types/call-action-type.model';
import { CallActionTypesFacade } from '../../store/call-action-types/call-action-types.facade';

@Component({
  selector: 'app-add-call-action-types',
  standalone: false,
  templateUrl: './add-call-action-types.component.html',
  styleUrl: './add-call-action-types.component.scss',
})
export class AddCallActionTypesComponent {
  editMode: boolean = false;
  viewOnly = false;
  addCallActionTypeForm!: FormGroup;
  clientId: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: CallActionTypesFacade,
    private router: Router
  ) {}

  ngOnInit() {
    this.addCallActionTypeForm = this.fb.group({
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
          this.addCallActionTypeForm.disable();
        }

        // 3. load the existing record & patch the form
        this.facade.loadById(this.clientId);
        this.facade.selected$
          .pipe(
            filter(
              (ct): ct is CallActionType => !!ct && ct.id === this.clientId
            ),
            take(1)
          )
          .subscribe((ct) => {
            this.addCallActionTypeForm.patchValue({
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
          this.addCallActionTypeForm.disable();
        }
      }
    });
  }

  addOrEditCallActionType() {
    console.log('💥 addCall-action-types() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addCallActionTypeForm.valid);
    console.log('  form touched:', this.addCallActionTypeForm.touched);
    console.log('  form raw value:', this.addCallActionTypeForm.getRawValue());

    // Print individual control errors
    const nameCtrl = this.addCallActionTypeForm.get('name');
    const nameARCtrl = this.addCallActionTypeForm.get('nameAR');
    console.log('  name.errors:', nameCtrl?.errors);
    console.log('  nameAR.errors:', nameARCtrl?.errors);

    if (this.viewOnly) {
      console.log('⚠️ viewOnly mode — aborting add');
      return;
    }

    if (this.addCallActionTypeForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addCallActionTypeForm.markAllAsTouched();
      return;
    }

    const { name, nameAR, isActive } = this.addCallActionTypeForm.value;
    const payload: Partial<CallActionType> = { name, nameAR, isActive };
    console.log('  → payload object:', payload);

    // Double-check your route param
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(clientId):', routeId);

    if (this.editMode) {
      const { id, name, nameAR, isActive } = this.addCallActionTypeForm.value;
      const payload: CallActionType = { id, name, nameAR, isActive };
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

    console.log('🧭 Navigating away to view-call-action-types');
    this.router.navigate(['/lookups/view-call-action-types']);
  }
}
