import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilChanged, filter, take } from 'rxjs';
import { arabicOnlyValidator } from '../../../../../shared/validators/arabic-only.validator';
import { AuthorizationGroupsFacade } from '../../../store/authorization-groups/authorization-groups.facade';
import { AuthorizationGroup } from '../../../store/authorization-groups/authorization-group.model';

@Component({
  selector: 'app-add-authorization-groups',
  standalone: false,
  templateUrl: './add-authorization-groups.component.html',
  styleUrl: './add-authorization-groups.component.scss',
})
export class AddAuthorizationGroupsComponent {
  editMode: boolean = false;
  viewOnly = false;
  addAuthorizationGroupsLookupsForm!: FormGroup;
  clientId: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: AuthorizationGroupsFacade,
    private router: Router
  ) {}

  ngOnInit() {
    this.addAuthorizationGroupsLookupsForm = this.fb.group({
      id: [null], // ← new hidden control
      name: [
        '',
        [Validators.required], // 2nd slot (sync)
      ],
      nameAR: [
        '',
        [Validators.required, , Validators.pattern(/^[\u0600-\u06FF\s0-9\u0660-\u0669]+$/)],
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
          this.addAuthorizationGroupsLookupsForm.disable();
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
            this.addAuthorizationGroupsLookupsForm.patchValue({
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
          this.addAuthorizationGroupsLookupsForm.disable();
        }
      }
    });
  }

  addOrEditAuthorizationGroup() {
    console.log('💥 addAuthorizationGroups() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addAuthorizationGroupsLookupsForm.valid);
    console.log(
      '  form touched:',
      this.addAuthorizationGroupsLookupsForm.touched
    );
    console.log(
      '  form raw value:',
      this.addAuthorizationGroupsLookupsForm.getRawValue()
    );

    // Print individual control errors
    const nameCtrl = this.addAuthorizationGroupsLookupsForm.get('name');
    const nameARCtrl = this.addAuthorizationGroupsLookupsForm.get('nameAR');
    console.log('  name.errors:', nameCtrl?.errors);
    console.log('  nameAR.errors:', nameARCtrl?.errors);

    if (this.viewOnly) {
      console.log('⚠️ viewOnly mode — aborting add');
      return;
    }

    if (this.addAuthorizationGroupsLookupsForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addAuthorizationGroupsLookupsForm.markAllAsTouched();
      return;
    }

    const { name, nameAR, isActive } =
      this.addAuthorizationGroupsLookupsForm.value;
    const payload: Partial<AuthorizationGroup> = { name, nameAR, isActive };
    console.log('  → payload object:', payload);

    // Double-check your route param
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(clientId):', routeId);

    if (this.editMode) {
      const { id, name, nameAR, isActive } =
        this.addAuthorizationGroupsLookupsForm.value;
      const payload: AuthorizationGroup = { id, name, nameAR, isActive };
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
    console.log('🧭 Navigating away to view-authorization-groups');
    if (this.addAuthorizationGroupsLookupsForm.valid) {
      this.addAuthorizationGroupsLookupsForm.markAsPristine();
    }

    this.router.navigate(['/lookups/view-authorization-groups']);
  }
  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.addAuthorizationGroupsLookupsForm.dirty;
  }
}
