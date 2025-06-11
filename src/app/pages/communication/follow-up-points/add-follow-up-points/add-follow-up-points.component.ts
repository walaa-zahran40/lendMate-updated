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

  followupIdParam!: number; 
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
      this.route.snapshot.queryParamMap.get('followupId')
    );
    if (this.editMode || this.viewOnly) {
      console.log('route add', this.route.snapshot);
      this.recordId = Number(this.route.snapshot.params['followupId']);
      this.raw = Number(this.route.snapshot.params['id']);
      this.followupFacade.loadOne(this.raw);
    }

    // Build form with followupId
    this.addFollowupPointsForm = this.fb.group({
      topic: [' ', Validators.required],
      details: [' ', Validators.required],
      dueDate: [null, Validators.required],
      date: [null, Validators.required],
    });

    this.addFollowupPointsForm.patchValue({
      followupId: this.route.snapshot.queryParamMap.get('followupId'),
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
            followupId: this.route.snapshot.queryParamMap.get('followupId'),
            topic: rec.topic,
            details: rec.details,
            dueDate: rec.dueDate,
          });
        });
    }
  }

  addOrEditFollowupPoint() {
    console.log('🛣️ Route snapshot:', this.route.snapshot);
    this.followupIdParam = Number(this.route.snapshot.queryParamMap.get('followupId'));
    console.log(`🔍 QueryParams → followupId = ${this.followupIdParam}`);
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

    console.log('arwaa', this.followupIdParam);
    const data: Partial<FollowupPoint> = {
      followUpId: this.followupIdParam,
      details: formValue.details,
      topic: formValue.topic,
      dueDate: formValue.dueDate,
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
        followUpId: this.parentClientId,
        details: formValue.details,
        topic: formValue.topic,
        dueDate: formValue.dueDate,
        officerId: 0,
        contactPersonId: 0,
        comments: '',
        isDone: true,
        isClientResponsibility: true
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

    console.log('➡️ Navigating back with PATH param:', this.followupIdParam);
    if (this.followupIdParam) {
      this.router.navigate(['/followup/view-follow-up-points', this.followupIdParam]);
    } else {
      console.error('❌ Cannot navigate back: followupId is missing!');
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
