import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, take } from 'rxjs';
import { arabicOnlyValidator } from '../../../../shared/validators/arabic-only.validator';
import { CompanyType } from '../../store/governorates/governorate.model';
import { GovernorateFacade } from '../../store/governorates/governorate.facade';

@Component({
  selector: 'app-add-governorates',
  standalone: false,
  templateUrl: './add-governorates.component.html',
  styleUrl: './add-governorates.component.scss',
})
export class AddGovernoratesComponent {
  editMode: boolean = false;
  viewOnly = false;
  addGovernoratesLookupsForm!: FormGroup;
  retrivedId: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: GovernorateFacade,
    private router: Router
  ) {}

  ngOnInit() {
    this.addGovernoratesLookupsForm = this.fb.group({
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
        this.retrivedId = +id;

        // disable if it’s view mode via ?mode=view
        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) {
          this.addGovernoratesLookupsForm.disable();
        }

        // 3. load the existing record & patch the form
        this.facade.loadOne(this.retrivedId);
        this.facade.current$
          .pipe(
            filter((ct) => !!ct),
            take(1)
          )
          .subscribe((ct) => {
            this.addGovernoratesLookupsForm.patchValue({
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
          this.addGovernoratesLookupsForm.disable();
        }
      }
    });
  }

  addOrEditGovernorates() {
    console.log('💥 addGovernorates() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addGovernoratesLookupsForm.valid);
    console.log('  form touched:', this.addGovernoratesLookupsForm.touched);
    console.log(
      '  form raw value:',
      this.addGovernoratesLookupsForm.getRawValue()
    );

    // Print individual control errors
    const nameCtrl = this.addGovernoratesLookupsForm.get('name');
    const nameARCtrl = this.addGovernoratesLookupsForm.get('nameAR');
    console.log('  name.errors:', nameCtrl?.errors);
    console.log('  nameAR.errors:', nameARCtrl?.errors);

    if (this.viewOnly) {
      console.log('⚠️ viewOnly mode — aborting add');
      return;
    }

    if (this.addGovernoratesLookupsForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addGovernoratesLookupsForm.markAllAsTouched();
      return;
    }

    const { name, nameAR, isActive } = this.addGovernoratesLookupsForm.value;
    const payload: Partial<CompanyType> = { name, nameAR, isActive };
    console.log('  → payload object:', payload);

    // Double-check your route param
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(clientId):', routeId);

    if (this.editMode) {
      const { id, name, nameAR, isActive } =
        this.addGovernoratesLookupsForm.value;
      const payload: CompanyType = { id, name, nameAR, isActive };
      console.log(
        '🔄 Dispatching UPDATE id=',
        this.retrivedId,
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