import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, take } from 'rxjs';
import { arabicOnlyValidator } from '../../../../../shared/validators/arabic-only.validator';
import { ClientStatus } from '../../../store/client-statuses/client-status.model';
import { ClientStatusesFacade } from '../../../store/client-statuses/client-statuses.facade';
@Component({
  selector: 'app-add-client-status',
  standalone: false,
  templateUrl: './add-client-status.component.html',
  styleUrl: './add-client-status.component.scss',
})
export class AddClientStatusesComponent {
  editMode: boolean = false;
  viewOnly = false;
  addClientStatusesLookupsForm!: FormGroup;
  clientId: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: ClientStatusesFacade,
    private router: Router
  ) {}

  ngOnInit() {
    this.addClientStatusesLookupsForm = this.fb.group({
      id: [null], // ← new hidden control
      name: [
        '',
        [Validators.required], // 2nd slot (sync)
      ],
      nameAR: ['', [Validators.required, arabicOnlyValidator]],
      isActive: [true], // ← new hidden control
      isInitial: [false],
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
          this.addClientStatusesLookupsForm.disable();
        }

        // 3. load the existing record & patch the form
        this.facade.loadOne(this.clientId);
        this.facade.current$
          .pipe(
            filter((ct) => !!ct),
            take(1)
          )
          .subscribe((ct) => {
            this.addClientStatusesLookupsForm.patchValue({
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
          this.addClientStatusesLookupsForm.disable();
        }
      }
    });
  }

  addOrEditClientStatuses() {
    console.log('💥 addClientStatuses() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addClientStatusesLookupsForm.valid);
    console.log('  form touched:', this.addClientStatusesLookupsForm.touched);
    console.log(
      '  form raw value:',
      this.addClientStatusesLookupsForm.getRawValue()
    );

    // Print individual control errors
    const nameCtrl = this.addClientStatusesLookupsForm.get('name');
    const nameARCtrl = this.addClientStatusesLookupsForm.get('nameAR');
    console.log('  name.errors:', nameCtrl?.errors);
    console.log('  nameAR.errors:', nameARCtrl?.errors);

    if (this.viewOnly) {
      console.log('⚠️ viewOnly mode — aborting add');
      return;
    }

    if (this.addClientStatusesLookupsForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addClientStatusesLookupsForm.markAllAsTouched();
      return;
    }

    const { name, nameAR, isActive, isInitial } =
      this.addClientStatusesLookupsForm.value;
    const payload: Partial<ClientStatus> = {
      name,
      nameAR,
      isActive,
      isInitial,
    };
    console.log('  → payload object:', payload);

    // Double-check your route param
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(clientId):', routeId);

    if (this.editMode) {
      const { id, name, nameAR, isActive, isInitial } =
        this.addClientStatusesLookupsForm.value;
      const payload: ClientStatus = { id, name, nameAR, isActive, isInitial };
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

    console.log('🧭 Navigating away to view-client-statuses');
    this.router.navigate(['/lookups/view-client-statuses']);
  }
}
