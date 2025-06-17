import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilChanged, filter, take } from 'rxjs';
import { ConditionsFacade } from '../../../store/conditions/conditions.facade';
import { Condition } from '../../../store/conditions/condition.model';
import { ConditionExpressionsFacade } from '../../../store/condition-expressions/condition-expressions.facade';

@Component({
  selector: 'app-add-conditions',
  standalone: false,
  templateUrl: './add-conditions.component.html',
  styleUrl: './add-conditions.component.scss',
})
export class AddConditionsComponent {
  editMode: boolean = false;
  viewOnly = false;
  addConditionsLookupsForm!: FormGroup;
  clientId: any;
  conditionExpressions$!: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: ConditionsFacade,
    private conditionExpressionsFacade: ConditionExpressionsFacade,

    private router: Router
  ) {}

  ngOnInit() {
    this.conditionExpressionsFacade.loadAll();
    this.conditionExpressions$ = this.conditionExpressionsFacade.all$;

    this.addConditionsLookupsForm = this.fb.group({
      id: [null], // ← new hidden control
      description: [
        '',
        [Validators.required], // 2nd slot (sync)
      ],
      functionName: ['', [Validators.required]],
      conditionType: 0, // ← new hidden control
      conditionExpressionId: 0, // ← new hidden control
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
          this.addConditionsLookupsForm.disable();
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
            this.addConditionsLookupsForm.patchValue({
              id: ct!.id,
              description: ct!.description,
              functionName: ct!.functionName,
              conditionType: ct!.conditionType,
              conditionExpressionId: ct!.conditionExpressionId,
            });
          });
      } else {
        // no id → add mode: still check if ?mode=view
        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) {
          this.addConditionsLookupsForm.disable();
        }
      }
    });
  }

  addOrEditCondition() {
    console.log('💥 addConditions() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addConditionsLookupsForm.valid);
    console.log('  form touched:', this.addConditionsLookupsForm.touched);
    console.log(
      '  form raw value:',
      this.addConditionsLookupsForm.getRawValue()
    );

    // Print individual control errors
    const nameCtrl = this.addConditionsLookupsForm.get('name');
    const nameARCtrl = this.addConditionsLookupsForm.get('nameAR');
    console.log('  name.errors:', nameCtrl?.errors);
    console.log('  nameAR.errors:', nameARCtrl?.errors);

    if (this.viewOnly) {
      console.log('⚠️ viewOnly mode — aborting add');
      return;
    }

    if (this.addConditionsLookupsForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addConditionsLookupsForm.markAllAsTouched();
      return;
    }

    const { description, functionName, conditionType, conditionExpressionId } =
      this.addConditionsLookupsForm.value;
    const payload: Partial<Condition> = {
      description,
      functionName,
      conditionType,
      conditionExpressionId,
    };
    console.log('  → payload object:', payload);

    // Double-check your route param
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(clientId):', routeId);

    if (this.editMode) {
      const {
        id,
        description,
        functionName,
        conditionType,
        conditionExpressionId,
      } = this.addConditionsLookupsForm.value;
      const payload: Condition = {
        id,
        description,
        functionName,
        conditionType,
        conditionExpressionId,
      };
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
    console.log('🧭 Navigating away to view-conditions');
    if (this.addConditionsLookupsForm.valid) {
      this.addConditionsLookupsForm.markAsPristine();
    }

    this.router.navigate(['/lookups/view-conditions']);
  }
  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.addConditionsLookupsForm.dirty;
  }
}
