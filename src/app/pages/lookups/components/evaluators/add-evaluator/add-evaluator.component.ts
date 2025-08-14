import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, distinctUntilChanged } from 'rxjs';
import { Evaluator } from '../../../store/evaluators/evaluator.model';
import { EvaluatorsFacade } from '../../../store/evaluators/evaluators.facade';

@Component({
  selector: 'app-add-evaluator',
  standalone: false,
  templateUrl: './add-evaluator.component.html',
  styleUrl: './add-evaluator.component.scss',
})
export class AddEvaluatorComponent {
  editMode: boolean = false;
  viewOnly = false;
  addEvaluatorsLookupsForm!: FormGroup;
  clientId: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: EvaluatorsFacade,

    private router: Router
  ) {}

  ngOnInit() {
    this.addEvaluatorsLookupsForm = this.fb.group({
      id: [null], // ← new hidden control
      name: [
        '',
        [Validators.required], // 2nd slot (sync)
      ],
      nameAR: ['', [Validators.required]],
      isActive: [true, [Validators.required]], // ← new hidden control
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
          this.addEvaluatorsLookupsForm.disable();
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
            this.addEvaluatorsLookupsForm.patchValue({
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
          this.addEvaluatorsLookupsForm.disable();
        }
      }
    });
  }

  addOrEditEvaluator() {
    console.log('💥 addEvaluators() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addEvaluatorsLookupsForm.valid);
    console.log('  form touched:', this.addEvaluatorsLookupsForm.touched);
    console.log(
      '  form raw value:',
      this.addEvaluatorsLookupsForm.getRawValue()
    );

    // Print individual control errors
    const nameCtrl = this.addEvaluatorsLookupsForm.get('name');
    const nameARCtrl = this.addEvaluatorsLookupsForm.get('nameAR');
    console.log('  name.errors:', nameCtrl?.errors);
    console.log('  nameAR.errors:', nameARCtrl?.errors);

    if (this.viewOnly) {
      console.log('⚠️ viewOnly mode — aborting add');
      return;
    }

    if (this.addEvaluatorsLookupsForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addEvaluatorsLookupsForm.markAllAsTouched();
      return;
    }

    const { name, nameAR, isActive } = this.addEvaluatorsLookupsForm.value;
    const payload: Partial<Evaluator> = {
      name,
      nameAR,
      isActive,
    };
    console.log('  → payload object:', payload);

    // Double-check your route param
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(clientId):', routeId);

    if (this.editMode) {
      const { id, name, nameAR, isActive } =
        this.addEvaluatorsLookupsForm.value;
      const payload: Evaluator = {
        id,
        name,
        nameAR,
        isActive,
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
    console.log('🧭 Navigating away to view-evaluators');
    if (this.addEvaluatorsLookupsForm.valid) {
      this.addEvaluatorsLookupsForm.markAsPristine();
    }

    this.router.navigate(['/lookups/view-evaluators']);
  }
  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.addEvaluatorsLookupsForm.dirty;
  }
}
