import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, distinctUntilChanged } from 'rxjs';
import { RolesFacade } from '../../../../organizations/store/roles/roles.facade';
import { Role } from '../../../../organizations/store/roles/role.model';

@Component({
  selector: 'app-add-role',
  standalone: false,
  templateUrl: './add-role.component.html',
  styleUrl: './add-role.component.scss',
})
export class AddRoleComponent {
  editMode: boolean = false;
  viewOnly = false;
  addRoleORGForm!: FormGroup;
  clientId: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: RolesFacade,
    private router: Router
  ) {}

  ngOnInit() {
    this.addRoleORGForm = this.fb.group({
      id: [null], // ← new hidden control
      name: [
        '',
        [Validators.required], // 2nd slot (sync)
      ],
      normalizedName: ['', [Validators.required]],
      isActive: [true], // ← new hidden control
    });
    // **—— Auto-populate normalizedName as uppercase ——**
    const nameCtrl = this.addRoleORGForm.get('name')!;
    const normCtrl = this.addRoleORGForm.get('normalizedName')!;

    nameCtrl.valueChanges
      .pipe(
        // only proceed for real strings and when changed
        filter((v) => typeof v === 'string'),
        distinctUntilChanged()
      )
      .subscribe((v) => {
        // set uppercase, but don’t re-trigger the name->normalized pipeline
        normCtrl.setValue(v.toUpperCase(), { emitEvent: false });
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
          this.addRoleORGForm.disable();
        }

        // 3. load the existing record & patch the form
        // this.facade.loadById(this.clientId);
        this.facade.loadById(this.clientId);
        // setTimeout(() => {
        // }, 2000);
        this.facade.selected$
          .pipe(
            filter((ct) => !!ct),
            distinctUntilChanged((prev, curr) => prev.id === curr.id)
          )
          .subscribe((ct) => {
            console.log(ct);
            this.addRoleORGForm.patchValue({
              id: ct!.id,
              name: ct!.name,
              normalizedName: ct!.normalizedName,
              isActive: ct!.isActive,
            });
          });
      } else {
        // no id → add mode: still check if ?mode=view
        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) {
          this.addRoleORGForm.disable();
        }
      }
    });
  }

  addOrEditRole() {
    console.log('💥 addRoles() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addRoleORGForm.valid);
    console.log('  form touched:', this.addRoleORGForm.touched);
    console.log('  form raw value:', this.addRoleORGForm.getRawValue());

    // Print individual control errors
    const nameCtrl = this.addRoleORGForm.get('name');
    const normalizedNameCtrl = this.addRoleORGForm.get('normalizedName');
    console.log('  name.errors:', nameCtrl?.errors);
    console.log('  normalizedName.errors:', normalizedNameCtrl?.errors);

    if (this.viewOnly) {
      console.log('⚠️ viewOnly mode — aborting add');
      return;
    }

    if (this.addRoleORGForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addRoleORGForm.markAllAsTouched();
      return;
    }

    const { name, normalizedName, isActive } = this.addRoleORGForm.value;
    const payload: Partial<Role> = { name, normalizedName, isActive };
    console.log('  → payload object:', payload);

    // Double-check your route param
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(clientId):', routeId);

    if (this.editMode) {
      const { id, name, normalizedName, isActive } = this.addRoleORGForm.value;
      const payload: Role = { id, name, normalizedName, isActive };
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
    console.log('🧭 Navigating away to view-roles');

    this.router.navigate(['/organizations/view-roles']);
  }
}
