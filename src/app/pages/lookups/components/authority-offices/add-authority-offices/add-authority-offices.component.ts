import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, take } from 'rxjs';
import { arabicOnlyValidator } from '../../../../../shared/validators/arabic-only.validator';
import { AuthorityOfficesFacade } from '../../../store/authority-offices/authority-offices.facade';
import { AuthorityOffice } from '../../../store/authority-offices/authority-office.model';

@Component({
  selector: 'app-add-authority-offices',
  standalone: false,
  templateUrl: './add-authority-offices.component.html',
  styleUrl: './add-authority-offices.component.scss',
})
export class AddAuthorityOfficesComponent {
  editMode: boolean = false;
  viewOnly = false;
  addAuthorityOfficesLookupsForm!: FormGroup;
  clientId: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: AuthorityOfficesFacade,
    private router: Router
  ) {}

  ngOnInit() {
    this.addAuthorityOfficesLookupsForm = this.fb.group({
      id: [null], // ← new hidden control
      name: [
        '',
        [Validators.required], // 2nd slot (sync)
      ],
      nameAR: ['', [Validators.required]],
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
          this.addAuthorityOfficesLookupsForm.disable();
        }

        // 3. load the existing record & patch the form
        this.facade.loadById(this.clientId);
        this.facade.selected$
          .pipe(
            filter(
              (ct): ct is AuthorityOffice => !!ct && ct.id === this.clientId
            ),
            take(1)
          )
          .subscribe((ct) => {
            this.addAuthorityOfficesLookupsForm.patchValue({
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
          this.addAuthorityOfficesLookupsForm.disable();
        }
      }
    });
  }

  addOrEditAuthorityOffice() {
    console.log('💥 addAuthorityOffices() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addAuthorityOfficesLookupsForm.valid);
    console.log('  form touched:', this.addAuthorityOfficesLookupsForm.touched);
    console.log(
      '  form raw value:',
      this.addAuthorityOfficesLookupsForm.getRawValue()
    );

    // Print individual control errors
    const nameCtrl = this.addAuthorityOfficesLookupsForm.get('name');
    const nameARCtrl = this.addAuthorityOfficesLookupsForm.get('nameAR');
    console.log('  name.errors:', nameCtrl?.errors);
    console.log('  nameAR.errors:', nameARCtrl?.errors);

    if (this.viewOnly) {
      console.log('⚠️ viewOnly mode — aborting add');
      return;
    }

    if (this.addAuthorityOfficesLookupsForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addAuthorityOfficesLookupsForm.markAllAsTouched();
      return;
    }

    const { name, nameAR, isActive } =
      this.addAuthorityOfficesLookupsForm.value;
    const payload: Partial<AuthorityOffice> = { name, nameAR, isActive };
    console.log('  → payload object:', payload);

    // Double-check your route param
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(clientId):', routeId);

    if (this.editMode) {
      const { id, name, nameAR, isActive } =
        this.addAuthorityOfficesLookupsForm.value;
      const payload: AuthorityOffice = { id, name, nameAR, isActive };
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
    if (this.addAuthorityOfficesLookupsForm.valid) {
      this.addAuthorityOfficesLookupsForm.markAsPristine();
    }

    console.log('🧭 Navigating away to view-address-types');
    this.router.navigate(['/lookups/view-authority-offices']);
  }
  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.addAuthorityOfficesLookupsForm.dirty;
  }
}
