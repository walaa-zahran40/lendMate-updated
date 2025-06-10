import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FollowupPointsFacade } from '../../store/followup-points/followup-points.facade';
import { FollowupPoint } from '../../store/followup-points/followup-point.model';

@Component({
  selector: 'app-add-follow-up-points',
  standalone: false,
  templateUrl: './add-follow-up-points.component.html',
  styleUrl: './add-follow-up-points.component.scss',
})
export class AddFollowupPointsComponent implements OnInit, OnDestroy {
  // Flags driven by mode
  editMode = false;
  viewOnly = false;

  // Reactive form
  addFollowupPointsForm!: FormGroup;

  // Lists and IDs
  mode!: 'add' | 'edit' | 'view';
  parentClientId!: number;
  recordId!: number;
  raw!: number;
  private destroy$ = new Subject<void>();

  communicationIdParam!: number; 
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private followupFacade: FollowupPointsFacade,
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
      this.raw = Number(this.route.snapshot.params['id']);
      this.followupFacade.loadOne(this.raw);
    }

    // Build form with communicationId
    this.addFollowupPointsForm = this.fb.group({
      topic: [' ', Validators.required],
      details: [' ', Validators.required],
      date: [null, Validators.required],
    });

    this.addFollowupPointsForm.patchValue({
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
          this.addFollowupPointsForm.patchValue({
            id: this.raw,
            communicationId: this.route.snapshot.queryParamMap.get('communicationId'),
            topic: rec.topic,
            details: rec.details,
            date: rec.date,
          });
        });
    }
  }

  addOrEditFollowupPoint() {
    console.log('🛣️ Route snapshot:', this.route.snapshot);
    this.communicationIdParam = Number(this.route.snapshot.queryParamMap.get('communicationId'));
    console.log(`🔍 QueryParams → communicationId = ${this.communicationIdParam}`);
    console.log(
      `⚙️ mode = ${this.mode}, editMode = ${this.editMode}, viewOnly = ${this.viewOnly}`
    );

    // 4) Early return in view-only
    if (this.viewOnly) {
      console.warn('🚫 viewOnly mode — aborting submit');
      return;
    }

    // 5) Form validity
    if (this.addFollowupPointsForm.invalid) {
      this.addFollowupPointsForm.markAllAsTouched();
      return;
    }

    // 6) The actual payload
    const formValue = this.addFollowupPointsForm.value;

    console.log('arwaa', this.communicationIdParam);
    const data: Partial<FollowupPoint> = {
      communicationId: this.communicationIdParam,
      details: formValue.details,
      topic: formValue.topic,
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
      const formValue = this.addFollowupPointsForm.value;

      const updateData: FollowupPoint = {
        id: this.raw,
        communicationId: this.parentClientId,
        details: formValue.details,
        topic: formValue.topic,
        date: formValue.date
      };

      console.log(
        '🔄 Dispatching UPDATE id=',
        this.recordId,
        ' UPDATED payload=',
        updateData
      );

      this.followupFacade.update(this.raw, updateData);
    }
    console.log('route', this.route.snapshot);

    console.log('➡️ Navigating back with PATH param:', this.communicationIdParam);
    if (this.communicationIdParam) {
      this.router.navigate(['/communication/view-follow-up-points', this.communicationIdParam]);
    } else {
      console.error('❌ Cannot navigate back: communicationId is missing!');
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
