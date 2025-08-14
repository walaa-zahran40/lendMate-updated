import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, Observable, Subject, take } from 'rxjs';
import { EvaluationInformationFacade } from '../../../../../store/evaluation-information/evaluation-information.facade';
import { EvaluationInformation } from '../../../../../store/evaluation-information/evaluation-information.model';

@Component({
  selector: 'app-add-evaluation-information',
  standalone: false,
  templateUrl: './add-evaluation-information.component.html',
  styleUrl: './add-evaluation-information.component.scss',
})
export class AddEvaluationInformationComponent {
  mode!: 'add' | 'edit' | 'view';
  editMode: boolean = false;
  viewOnly = false;
  addEvaluationInformationForm!: FormGroup;
  retrivedId: any;
  routeId: any;
  recordId!: number;
  private destroy$ = new Subject<void>();
  evaluators$!: Observable<EvaluationInformation[]>;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: EvaluationInformationFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('🟢 ngOnInit start');
    // 1️⃣ Read route parameters
    console.log(this.route.snapshot, 'route');
    this.facade.loadAll();
    this.evaluators$ = this.facade.all$;

    this.routeId = Number(this.route.snapshot.params['id']);

    this.mode =
      (this.route.snapshot.queryParamMap.get('mode') as
        | 'add'
        | 'edit'
        | 'view') ?? 'add';
    this.editMode = this.mode === 'edit';
    this.viewOnly = this.mode === 'view';
    console.log('🔍 Params:', {
      routeId: this.routeId,
      mode: this.mode,
      editMode: this.editMode,
      viewOnly: this.viewOnly,
    });

    // 5️⃣ Build the form
    this.addEvaluationInformationForm = this.fb.group({
      id: [null],
      evaluatorId: [null, Validators.required],
      assetId: [null, Validators.required],
      assetEvaluationDescription: [null, Validators.required],
      evaluationDate: [null, Validators.required],
      isActive: [true],
    });
    console.log(
      '🛠️ Form initialized with defaults:',
      this.addEvaluationInformationForm.value
    );

    // 6️⃣ If add mode, seed routeId
    if (this.mode === 'add') {
      this.addEvaluationInformationForm.patchValue({
        routeId: this.routeId,
      });
      console.log('✏️ Add mode → patched routeId:', this.routeId);
    }
    // 8️⃣ If editing or viewing, load & patch
    if (this.editMode || this.viewOnly) {
      console.log('edit ', this.editMode, 'route', this.route.snapshot);
      this.recordId = Number(this.route.snapshot.paramMap.get('id'));
      console.log('🔄 Loading existing record id=', this.recordId);
      this.facade.loadById(this.recordId);

      this.facade.selected$
        .pipe(
          filter((ct) => !!ct && ct.id === this.recordId),
          take(1)
        )
        .subscribe((ct) => {
          console.log('🛰️ facade.current$ emitted:', ct);
          // patch form
          this.addEvaluationInformationForm.patchValue({
            id: ct?.id,
            evaluatorId: ct?.evaluatorId,
            assetId: ct?.assetId,
            assetEvaluationDescription: ct?.assetEvaluationDescription,
            evaluationDate: ct?.evaluationDate,
            isActive: ct?.isActive,
          });
          console.log(
            '📝 Form after patchValue:',
            this.addEvaluationInformationForm.value
          );
          if (this.viewOnly) {
            console.log('🔐 viewOnly → disabling form');
            this.addEvaluationInformationForm.disable();
          }
        });
    } else if (this.viewOnly) {
      console.log('🔐 viewOnly (no id) → disabling form');
      this.addEvaluationInformationForm.disable();
    }
  }

  addOrEditEvaluationInformation() {
    const assetParam = this.route.snapshot.paramMap.get('id');

    console.log('💥 addEvaluationInformation() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addEvaluationInformationForm.valid);
    console.log('  form touched:', this.addEvaluationInformationForm.touched);
    console.log(
      '  form raw value:',
      this.addEvaluationInformationForm.getRawValue()
    );

    if (this.addEvaluationInformationForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addEvaluationInformationForm.markAllAsTouched();
      return;
    }

    this.addEvaluationInformationForm.patchValue({
      routeId: assetParam,
    });

    const {
      evaluatorId,
      assetId,
      assetEvaluationDescription,
      evaluationDate,

      isActive,
    } = this.addEvaluationInformationForm.value;
    const payload: Partial<EvaluationInformation> = {
      evaluatorId,
      assetId,
      assetEvaluationDescription,
      evaluationDate,

      isActive,
    };
    console.log('  → payload object:', payload);

    const data = this.addEvaluationInformationForm
      .value as Partial<EvaluationInformation>;
    console.log('📦 Payload going to facade:', data);

    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(retrivedId):', routeId);

    if (this.mode === 'add') {
      console.log('➕ Dispatching CREATE');
      this.facade.create(payload);
    } else {
      console.log('✏️ Dispatching UPDATE id=', data.id);
      this.facade.update(data.id!, data);
    }
    if (this.addEvaluationInformationForm.valid) {
      this.addEvaluationInformationForm.markAsPristine();
    }

    this.router.navigate([
      `/purchasing/assets/activities/view-evaluation-information/${assetParam}`,
    ]);
  }
  close() {
    console.log('Navigating back to view-evaluation-information');
    this.router.navigate([
      `/purchasing/assets/activities/view-evaluation-information/${this.routeId}`,
    ]);
  }
  /** Called by the guard. */
  canDeactivate(): boolean {
    console.log('🛡️ canDeactivate called');
    return !this.addEvaluationInformationForm.dirty;
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
