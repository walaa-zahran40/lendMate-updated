import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, distinctUntilChanged } from 'rxjs';
import { OperationsFacade } from '../../../../organizations/store/operations/operations.facade';
import { Operation } from '../../../../organizations/store/operations/operation.model';

@Component({
  selector: 'app-add-operation',
  standalone: false,
  templateUrl: './add-operation.component.html',
  styleUrl: './add-operation.component.scss',
})
export class AddOperationComponent {
  editMode: boolean = false;
  viewOnly = false;
  addOperationsORGForm!: FormGroup;
  clientId: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: OperationsFacade,
    private router: Router
  ) {}

  ngOnInit() {
    this.addOperationsORGForm = this.fb.group({
      id: [null], // ← new hidden control
      name: ['', [Validators.required]],
      url: ['', [Validators.required]],
      description: ['', [Validators.required]],
      isActive: [true],
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
          this.addOperationsORGForm.disable();
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
            this.addOperationsORGForm.patchValue({
              id: ct!.id,
              name: ct!.name,
              url: ct!.url,
              description: ct!.description,
              isActive: ct!.isActive,
            });
          });
      } else {
        // no id → add mode: still check if ?mode=view
        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) {
          this.addOperationsORGForm.disable();
        }
      }
    });
  }

  addOrEditOperation() {
    console.log('💥 addOperations() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addOperationsORGForm.valid);
    console.log('  form touched:', this.addOperationsORGForm.touched);
    console.log('  form raw value:', this.addOperationsORGForm.getRawValue());

    if (this.viewOnly) {
      console.log('⚠️ viewOnly mode — aborting add');
      return;
    }

    if (this.addOperationsORGForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addOperationsORGForm.markAllAsTouched();
      return;
    }

    const { name, url, description, isActive } =
      this.addOperationsORGForm.value;
    const payload: Partial<Operation> = { name, url, isActive, description };
    console.log('  → payload object:', payload);

    // Double-check your route param
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(clientId):', routeId);

    if (this.editMode) {
      const { id, name, url, description, isActive } =
        this.addOperationsORGForm.value;
      const payload: Operation = { id, name, url, isActive, description };
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
    console.log('🧭 Navigating away to view-operations');
    if (this.addOperationsORGForm.valid) {
      this.addOperationsORGForm.markAsPristine();
    }

    this.router.navigate(['/organizations/view-operations']);
  }
  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.addOperationsORGForm.dirty;
  }
}
