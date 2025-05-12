import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, distinctUntilChanged } from 'rxjs';
import { AddressTypesFacade } from '../../../../lookups/store/address-types/address-types.facade';
import { AddressType } from '../../../../lookups/store/address-types/address-types.model';
import { NavigationService } from '../../../../../shared/services/navigation.service';

@Component({
  selector: 'app-add-page',
  standalone: false,
  templateUrl: './add-page.component.html',
  styleUrl: './add-page.component.scss',
})
export class AddPageComponent {
  editMode: boolean = false;
  viewOnly = false;
  addPageORGForm!: FormGroup;
  clientId: any;
  pagesList: any;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: AddressTypesFacade,
    private router: Router,
    private nav: NavigationService
  ) {}

  ngOnInit() {
    const paths = this.nav.getAllNestedPaths();
    this.pagesList = paths.map((p) => ({ label: p, value: p }));
    this.addPageORGForm = this.fb.group({
      id: [null], // ← new hidden control
      name: ['', [Validators.required]],
      nameAR: [
        '',
        [Validators.required, , Validators.pattern(/^[\u0600-\u06FF\s]+$/)],
      ],
      url: ['', [Validators.required]],
      page: ['', [Validators.required]],
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
          this.addPageORGForm.disable();
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
            this.addPageORGForm.patchValue({
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
          this.addPageORGForm.disable();
        }
      }
    });
  }

  addOrEditAddressType() {
    console.log('💥 addAddressTypes() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addPageORGForm.valid);
    console.log('  form touched:', this.addPageORGForm.touched);
    console.log('  form raw value:', this.addPageORGForm.getRawValue());

    // Print individual control errors
    const nameCtrl = this.addPageORGForm.get('name');
    const nameARCtrl = this.addPageORGForm.get('nameAR');
    console.log('  name.errors:', nameCtrl?.errors);
    console.log('  nameAR.errors:', nameARCtrl?.errors);

    if (this.viewOnly) {
      console.log('⚠️ viewOnly mode — aborting add');
      return;
    }

    if (this.addPageORGForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addPageORGForm.markAllAsTouched();
      return;
    }

    const { name, nameAR, isActive } = this.addPageORGForm.value;
    const payload: Partial<AddressType> = { name, nameAR, isActive };
    console.log('  → payload object:', payload);

    // Double-check your route param
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(clientId):', routeId);

    if (this.editMode) {
      const { id, name, nameAR, isActive } = this.addPageORGForm.value;
      const payload: AddressType = { id, name, nameAR, isActive };
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

    this.router.navigate(['/lookups/view-address-types']);
  }
}
