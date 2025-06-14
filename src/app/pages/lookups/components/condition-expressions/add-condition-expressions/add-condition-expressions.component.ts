import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilChanged, filter, take } from 'rxjs';
import { ConditionExpressionsFacade } from '../../../store/condition-expressions/condition-expressions.facade';
import { ConditionExpression } from '../../../store/condition-expressions/condition-expressions.model';

@Component({
  selector: 'app-add-condition-expressions',
  standalone: false,
  templateUrl: './add-condition-expressions.component.html',
  styleUrl: './add-condition-expressions.component.scss',
})
export class AddConditionExpressionsComponent {
  editMode: boolean = false;
  viewOnly = false;
  addConditionExpressionsLookupsForm!: FormGroup;
  clientId: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: ConditionExpressionsFacade,
    private router: Router
  ) {}

  ngOnInit() {
    this.addConditionExpressionsLookupsForm = this.fb.group({
      id: [null], // ← new hidden control
      fieldName: [
        '',
        [Validators.required], // 2nd slot (sync)
      ],
      value: ['', [Validators.required]],
      operator: 0, // ← new hidden control
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
          this.addConditionExpressionsLookupsForm.disable();
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
            this.addConditionExpressionsLookupsForm.patchValue({
              id: ct!.id,
              fieldName: ct!.fieldName,
              value: ct!.value,
              operator: ct!.operator,
            });
          });
      } else {
        // no id → add mode: still check if ?mode=view
        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) {
          this.addConditionExpressionsLookupsForm.disable();
        }
      }
    });
  }

  addOrEditConditionExpression() {
    console.log('💥 addConditionExpressions() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addConditionExpressionsLookupsForm.valid);
    console.log(
      '  form touched:',
      this.addConditionExpressionsLookupsForm.touched
    );
    console.log(
      '  form raw value:',
      this.addConditionExpressionsLookupsForm.getRawValue()
    );

    // Print individual control errors
    const nameCtrl = this.addConditionExpressionsLookupsForm.get('name');
    const nameARCtrl = this.addConditionExpressionsLookupsForm.get('nameAR');
    console.log('  name.errors:', nameCtrl?.errors);
    console.log('  nameAR.errors:', nameARCtrl?.errors);

    if (this.viewOnly) {
      console.log('⚠️ viewOnly mode — aborting add');
      return;
    }

    if (this.addConditionExpressionsLookupsForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addConditionExpressionsLookupsForm.markAllAsTouched();
      return;
    }

    const { fieldName, value, operator } =
      this.addConditionExpressionsLookupsForm.value;
    const payload: Partial<ConditionExpression> = {
      fieldName,
      value,
      operator,
    };
    console.log('  → payload object:', payload);

    // Double-check your route param
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(clientId):', routeId);

    if (this.editMode) {
      const { id, fieldName, value, operator } =
        this.addConditionExpressionsLookupsForm.value;
      const payload: ConditionExpression = { id, fieldName, value, operator };
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
    console.log('🧭 Navigating away to view-condition-expressions');
    if (this.addConditionExpressionsLookupsForm.valid) {
      this.addConditionExpressionsLookupsForm.markAsPristine();
    }

    this.router.navigate(['/lookups/view-condition-expressions']);
  }
  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.addConditionExpressionsLookupsForm.dirty;
  }
}
