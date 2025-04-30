import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, take } from 'rxjs';
import { BranchesFacade } from '../../store/branches/branches.facade';
import { Branch } from '../../store/branches/branch.model';

@Component({
  selector: 'app-add-branch',
  standalone: false,
  templateUrl: './add-branch.component.html',
  styleUrl: './add-branch.component.scss',
})
export class AddBranchComponent {
  editMode: boolean = false;
  viewOnly = false;
  addBranchLookupsForm!: FormGroup;
  clientId: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: BranchesFacade,
    private router: Router
  ) {}

  ngOnInit() {
    this.addBranchLookupsForm = this.fb.group({
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
          this.addBranchLookupsForm.disable();
        }

        // 3. load the existing record & patch the form
        this.facade.loadOne(this.clientId);
        this.facade.selectedBranch$
          .pipe(
            filter((ct) => !!ct),
            take(1)
          )
          .subscribe((ct) => {
            this.addBranchLookupsForm.patchValue({
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
          this.addBranchLookupsForm.disable();
        }
      }
    });
  }

  addOrEditBranch() {
    console.log('💥 addBranches() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addBranchLookupsForm.valid);
    console.log('  form touched:', this.addBranchLookupsForm.touched);
    console.log('  form raw value:', this.addBranchLookupsForm.getRawValue());

    // Print individual control errors
    const nameCtrl = this.addBranchLookupsForm.get('name');
    const nameARCtrl = this.addBranchLookupsForm.get('nameAR');
    console.log('  name.errors:', nameCtrl?.errors);
    console.log('  nameAR.errors:', nameARCtrl?.errors);

    if (this.viewOnly) {
      console.log('⚠️ viewOnly mode — aborting add');
      return;
    }

    if (this.addBranchLookupsForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addBranchLookupsForm.markAllAsTouched();
      return;
    }

    const { name, nameAR, isActive } = this.addBranchLookupsForm.value;
    const payload: Partial<Branch> = { name, nameAR, isActive };
    console.log('  → payload object:', payload);

    // Double-check your route param
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(clientId):', routeId);

    if (this.editMode) {
      const { id, name, nameAR, isActive } = this.addBranchLookupsForm.value;
      const payload: Branch = { id, name, nameAR, isActive };
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

    console.log('🧭 Navigating away to view-branches');
    this.router.navigate(['/lookups/view-branches']);
  }
}
