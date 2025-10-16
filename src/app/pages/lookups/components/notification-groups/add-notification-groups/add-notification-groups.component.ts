import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilChanged, filter, take } from 'rxjs';
import { NotificationGroupsFacade } from '../../../store/notification-groups/notification-groups.facade';
import { NotificationGroup } from '../../../store/notification-groups/notification-group.model';

@Component({
  selector: 'app-add-notification-groups',
  standalone: false,
  templateUrl: './add-notification-groups.component.html',
  styleUrl: './add-notification-groups.component.scss',
})
export class AddNotificationGroupsComponent {
  editMode: boolean = false;
  viewOnly = false;
  addNotificationGroupsLookupsForm!: FormGroup;
  clientId: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: NotificationGroupsFacade,
    private router: Router
  ) {}

  ngOnInit() {
    this.addNotificationGroupsLookupsForm = this.fb.group({
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
          this.addNotificationGroupsLookupsForm.disable();
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
            this.addNotificationGroupsLookupsForm.patchValue({
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
          this.addNotificationGroupsLookupsForm.disable();
        }
      }
    });
  }

  addOrEditNotificationGroup() {
    console.log('💥 addNotificationGroups() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addNotificationGroupsLookupsForm.valid);
    console.log(
      '  form touched:',
      this.addNotificationGroupsLookupsForm.touched
    );
    console.log(
      '  form raw value:',
      this.addNotificationGroupsLookupsForm.getRawValue()
    );

    // Print individual control errors
    const nameCtrl = this.addNotificationGroupsLookupsForm.get('name');
    const nameARCtrl = this.addNotificationGroupsLookupsForm.get('nameAR');
    console.log('  name.errors:', nameCtrl?.errors);
    console.log('  nameAR.errors:', nameARCtrl?.errors);

    if (this.viewOnly) {
      console.log('⚠️ viewOnly mode — aborting add');
      return;
    }

    if (this.addNotificationGroupsLookupsForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addNotificationGroupsLookupsForm.markAllAsTouched();
      return;
    }

    const { name, nameAR, isActive } =
      this.addNotificationGroupsLookupsForm.value;
    const payload: Partial<NotificationGroup> = { name, nameAR, isActive };
    console.log('  → payload object:', payload);

    // Double-check your route param
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(clientId):', routeId);

    if (this.editMode) {
      const { id, name, nameAR, isActive } =
        this.addNotificationGroupsLookupsForm.value;
      const payload: NotificationGroup = { id, name, nameAR, isActive };
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
    console.log('🧭 Navigating away to view-notification-groups');
    if (this.addNotificationGroupsLookupsForm.valid) {
      this.addNotificationGroupsLookupsForm.markAsPristine();
    }

    this.router.navigate(['/lookups/view-notification-groups']);
  }
  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.addNotificationGroupsLookupsForm.dirty;
  }
}
