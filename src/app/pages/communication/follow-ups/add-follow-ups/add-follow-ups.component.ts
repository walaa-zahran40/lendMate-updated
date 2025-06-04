import { Component, OnDestroy, OnInit } from '@angular/core';
import { FollowupsFacade } from '../../store/followups/followups.facade';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Followup } from '../../store/followups/followup.model';

@Component({
  selector: 'app-add-follow-ups',
  standalone: false,
  templateUrl: './add-follow-ups.component.html',
  styleUrl: './add-follow-ups.component.scss',
})
export class AddFollowupsComponent implements OnInit, OnDestroy {
  // Flags driven by mode
  editMode = false;
  viewOnly = false;

  // Reactive form
  addFollowupsForm!: FormGroup;

  // Lists and IDs
  mode!: 'add' | 'edit' | 'view';
  parentClientId!: number;
  recordId!: number;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private followupFacade: FollowupsFacade,
    private router: Router
  ) {}

  ngOnInit() {
    // Read mode and set flags
    this.mode = (this.route.snapshot.queryParamMap.get('mode') as any) ?? 'add';
    this.editMode = this.mode === 'edit';
    this.viewOnly = this.mode === 'view';

    // Read IDs
    this.parentClientId = Number(
      this.route.snapshot.queryParamMap.get('communicationId')
    );
    if (this.editMode || this.viewOnly) {
      console.log('route add', this.route.snapshot);
      this.recordId = Number(this.route.snapshot.params['communicationId']);
      this.followupFacade.loadOne(this.recordId);
    }

    // Build form with communicationId
    this.addFollowupsForm = this.fb.group({
      details: [null, Validators.required],
      date: [null, Validators.required],
    });

    this.addFollowupsForm.patchValue({
      communicationId: this.route.snapshot.queryParamMap.get('communicationId'),
    });

    // Patch for edit/view mode
    if (this.editMode || this.viewOnly) {
      this.followupFacade.current$
        .pipe(
          takeUntil(this.destroy$),
          filter((rec) => !!rec)
        )
        .subscribe((rec) => {
          this.addFollowupsForm.patchValue({
            id: rec.id,
            communicationId: this.route.snapshot.queryParamMap.get('communicationId'),
            details: rec.details,
            date: rec.date,
          });
        });
    }
  }

  addOrEditFollowup() {
    console.log('🛣️ Route snapshot:', this.route.snapshot);
    const communicationIdParam = this.route.snapshot.queryParamMap.get('communicationId');
    console.log(`🔍 QueryParams → communicationId = ${communicationIdParam}`);
    console.log(
      `⚙️ mode = ${this.mode}, editMode = ${this.editMode}, viewOnly = ${this.viewOnly}`
    );

    // 4) Early return in view-only
    if (this.viewOnly) {
      console.warn('🚫 viewOnly mode — aborting submit');
      return;
    }

    // 5) Form validity
    if (this.addFollowupsForm.invalid) {
      this.addFollowupsForm.markAllAsTouched();
      return;
    }

    // 6) The actual payload
    const formValue = this.addFollowupsForm.value;

    console.log('arwaa', formValue[0]);
    const data: Partial<Followup> = {
      communicationId: Number(this.route.snapshot.paramMap.get('communicationId')),
      details: formValue.details,
      date: formValue.date,
    };

    console.log(
      '🔄 Dispatching UPDATE id=',
      this.recordId,
      ' created  payload=',
      data
    );

    if (this.mode === 'add') {
      this.followupFacade.create(data);
    } else {
      const formValue = this.addFollowupsForm.value;

      const updateData: Followup = {
        id: this.recordId,
        communicationId: this.parentClientId,
        details: formValue.details,
        date: formValue.date
      };

      console.log(
        '🔄 Dispatching UPDATE id=',
        this.recordId,
        ' UPDATED payload=',
        updateData
      );

      this.followupFacade.update(this.recordId, updateData);
    }
    console.log('route', this.route.snapshot);

    console.log('➡️ Navigating back with PATH param:', communicationIdParam);
    if (communicationIdParam) {
      this.router.navigate(['/communication/view-follow-ups', communicationIdParam]);
    } else {
      console.error('❌ Cannot navigate back: communicationId is missing!');
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
