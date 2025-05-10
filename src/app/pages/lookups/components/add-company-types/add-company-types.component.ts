import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyTypesFacade } from '../../store/company-types/company-types.facade';
import { filter, take } from 'rxjs';
import { arabicOnlyValidator } from '../../../../shared/validators/arabic-only.validator';
import { CompanyType } from '../../store/company-types/company-type.model';

@Component({
  selector: 'app-add-company-types',
  standalone: false,
  templateUrl: './add-company-types.component.html',
  styleUrl: './add-company-types.component.scss',
})
export class AddCompanyTypesComponent {
  editMode: boolean = false;
  viewOnly = false;
  addCompanyTypesLookupsForm!: FormGroup;
  clientId: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: CompanyTypesFacade,
    private router: Router
  ) {}

  ngOnInit() {
    this.addCompanyTypesLookupsForm = this.fb.group({
      id: [null], // ← new hidden control
      name: [
        '',
        [Validators.required], // 2nd slot (sync)
      ],
      nameAR: ['', [Validators.required, arabicOnlyValidator]],
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
          this.addCompanyTypesLookupsForm.disable();
        }

        // 3. load the existing record & patch the form
        this.facade.loadById(this.clientId);
        this.facade.selected$
          .pipe(
            filter((ct): ct is CompanyType => !!ct && ct.id === this.clientId),
            take(1)
          )
          .subscribe((ct) => {
            this.addCompanyTypesLookupsForm.patchValue({
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
          this.addCompanyTypesLookupsForm.disable();
        }
      }
    });
  }

  addOrEditCompanyTypes() {
    console.log('💥 addCompanyTypes() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addCompanyTypesLookupsForm.valid);
    console.log('  form touched:', this.addCompanyTypesLookupsForm.touched);
    console.log(
      '  form raw value:',
      this.addCompanyTypesLookupsForm.getRawValue()
    );

    // Print individual control errors
    const nameCtrl = this.addCompanyTypesLookupsForm.get('name');
    const nameARCtrl = this.addCompanyTypesLookupsForm.get('nameAR');
    console.log('  name.errors:', nameCtrl?.errors);
    console.log('  nameAR.errors:', nameARCtrl?.errors);

    if (this.viewOnly) {
      console.log('⚠️ viewOnly mode — aborting add');
      return;
    }

    if (this.addCompanyTypesLookupsForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addCompanyTypesLookupsForm.markAllAsTouched();
      return;
    }

    const { name, nameAR, isActive } = this.addCompanyTypesLookupsForm.value;
    const payload: Partial<CompanyType> = { name, nameAR, isActive };
    console.log('  → payload object:', payload);

    // Double-check your route param
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(clientId):', routeId);

    if (this.editMode) {
      const { id, name, nameAR, isActive } =
        this.addCompanyTypesLookupsForm.value;
      const payload: CompanyType = { id, name, nameAR, isActive };
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

    console.log('🧭 Navigating away to view-company-types');
    this.router.navigate(['/lookups/view-company-types']);
  }
}
