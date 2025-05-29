import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil, filter } from 'rxjs';
import { MandateAdditionalTermsFacade } from '../../../../store/mandate-additional-terms/mandate-additional-terms.facade';
import { MandateAdditionalTerm } from '../../../../store/mandate-additional-terms/mandate-additional-term.model';

@Component({
  selector: 'app-add-mandate-additional-terms',
  standalone: false,
  templateUrl: './add-mandate-additional-terms.component.html',
  styleUrl: './add-mandate-additional-terms.component.scss',
})
export class AddMandateAdditionalTermsComponent implements OnInit, OnDestroy {
  // Flags driven by mode
  editMode = false;
  viewOnly = false;

  // Reactive form
  addMandateAdditionalTermForm!: FormGroup;

  // Lists and IDs
  mode!: 'add' | 'edit' | 'view';
  parentClientId!: number;
  recordId!: number;
  phoneTypes$!: any;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private mandateAdditionalTermFacade: MandateAdditionalTermsFacade,

    private router: Router
  ) {}

  ngOnInit() {

    // Read mode and set flags
    this.mode = (this.route.snapshot.queryParamMap.get('mode') as any) ?? 'add';
    this.editMode = this.mode === 'edit';
    this.viewOnly = this.mode === 'view';

    // Read IDs
    this.parentClientId = Number(
      this.route.snapshot.queryParamMap.get('mandateId')
    );
    if (this.editMode || this.viewOnly) {
      console.log('route add', this.route.snapshot);
      this.recordId = Number(this.route.snapshot.params['mandateId']);
      this.mandateAdditionalTermFacade.loadOne(this.recordId);
    }

    // Build form with mandateId
    this.addMandateAdditionalTermForm = this.fb.group({
      termKey: [null, Validators.required],
      description: [null],
    });

    this.addMandateAdditionalTermForm.patchValue({
      mandateId: this.route.snapshot.queryParamMap.get('mandateId'),
    });

              
    // Patch for edit/view mode
    if (this.editMode || this.viewOnly) {
      this.mandateAdditionalTermFacade.current$
        .pipe(
          takeUntil(this.destroy$),
          filter((rec) => !!rec)
        )
        .subscribe((rec) => {
          this.addMandateAdditionalTermForm.patchValue({
            id: rec.id,
            mandateId: this.route.snapshot.queryParamMap.get('mandateId'),
            termKey: rec.termKey,
            description: rec.description,
          });
        });
    }
  }

  addOrEditMandateAdditionalTerm() {
    console.log('🛣️ Route snapshot:', this.route.snapshot);
    const mandateIdParam = this.route.snapshot.queryParamMap.get('mandateId');
    console.log(`🔍 QueryParams → mandateId = ${mandateIdParam}`);
    console.log(
      `⚙️ mode = ${this.mode}, editMode = ${this.editMode}, viewOnly = ${this.viewOnly}`
    );

    // 4) Early return in view-only
    if (this.viewOnly) {
      console.warn('🚫 viewOnly mode — aborting submit');
      return;
    }

    // 5) Form validity
    if (this.addMandateAdditionalTermForm.invalid) {
      this.addMandateAdditionalTermForm.markAllAsTouched();
      return;
    }

    // 6) The actual payload
    const formValue = this.addMandateAdditionalTermForm.value;

    console.log('arwaa', formValue[0]);
    const data: Partial<MandateAdditionalTerm> = {
      mandateId: Number(this.route.snapshot.paramMap.get('mandateId')),
      termKey: formValue.termKey,
      description: formValue.description,
    };

    console.log(
      '🔄 Dispatching UPDATE id=',
      this.recordId,
      ' created  payload=',
      data
    );

    if (this.mode === 'add') {
      this.mandateAdditionalTermFacade.create(data);
    } else {
      const formValue = this.addMandateAdditionalTermForm.value;

      const updateData: MandateAdditionalTerm = {
        id: this.recordId,
        mandateId: this.parentClientId,
        termKey: formValue.termKey,
        description: formValue.description,
      };

      console.log(
        '🔄 Dispatching UPDATE id=',
        this.recordId,
        ' UPDATED payload=',
        updateData
      );

      this.mandateAdditionalTermFacade.update(this.recordId, updateData);
    }
    console.log('route', this.route.snapshot);

    if (mandateIdParam) {
      console.log('➡️ Navigating back with PATH param:', mandateIdParam);
      this.router.navigate(['/crm/leasing-mandates/view-mandate-additional-terms', mandateIdParam]);
    } else {
      console.error('❌ Cannot navigate back: mandateId is missing!');
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
