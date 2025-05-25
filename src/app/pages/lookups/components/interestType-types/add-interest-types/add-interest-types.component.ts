import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilChanged, filter, take } from 'rxjs';
import { InterestTypesFacade } from '../../../store/interest-types/interest-types.facade';
import { InterestType } from '../../../store/interest-types/interest-type.model';


@Component({
  selector: 'app-add-interest-types',
  standalone: false,
  templateUrl: './add-interest-types.component.html',
  styleUrl: './add-interest-types.component.scss',
})
export class AddInterestTypesComponent {
  editMode: boolean = false;
  viewOnly = false;
  addInterestTypesLookupsForm!: FormGroup;
  clientId: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: InterestTypesFacade,
    private router: Router
  ) {}

  ngOnInit() {
    this.addInterestTypesLookupsForm = this.fb.group({
      id: [null], // ← new hidden control
      name: [
        '',
        [Validators.required], // 2nd slot (sync)
      ],
      nameAR: [
        '',
        [Validators.required, , Validators.pattern(/^[\u0600-\u06FF\s]+$/)],
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
          this.addInterestTypesLookupsForm.disable();
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
            this.addInterestTypesLookupsForm.patchValue({
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
          this.addInterestTypesLookupsForm.disable();
        }
      }
    });
  }

  addOrEditInterestType() {
    console.log('💥 addInterestTypes() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addInterestTypesLookupsForm.valid);
    console.log('  form touched:', this.addInterestTypesLookupsForm.touched);
    console.log(
      '  form raw value:',
      this.addInterestTypesLookupsForm.getRawValue()
    );

    // Print individual control errors
    const nameCtrl = this.addInterestTypesLookupsForm.get('name');
    const nameARCtrl = this.addInterestTypesLookupsForm.get('nameAR');
    console.log('  name.errors:', nameCtrl?.errors);
    console.log('  nameAR.errors:', nameARCtrl?.errors);

    if (this.viewOnly) {
      console.log('⚠️ viewOnly mode — aborting add');
      return;
    }

    if (this.addInterestTypesLookupsForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addInterestTypesLookupsForm.markAllAsTouched();
      return;
    }

    const { name, nameAR, isActive } = this.addInterestTypesLookupsForm.value;
    const payload: Partial<InterestType> = { name, nameAR, isActive };
    console.log('  → payload object:', payload);

    // Double-check your route param
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(clientId):', routeId);

    if (this.editMode) {
      const { id, name, nameAR, isActive } =
        this.addInterestTypesLookupsForm.value;
      const payload: InterestType = { id, name, nameAR, isActive };
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
    console.log('🧭 Navigating away to view-address-types');

    this.router.navigate(['/lookups/view-interest-types']);
  }
}
