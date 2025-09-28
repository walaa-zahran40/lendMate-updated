import { Component, OnDestroy, OnInit } from '@angular/core';
import { FollowupsFacade } from '../../../../../../../../communication/store/followups/followups.facade';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Followup } from '../../../../../../../../communication/store/followups/followup.model';

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
  raw!: number;
  private destroy$ = new Subject<void>();
  routeId: any;
  communicationIdParam!: number;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private followupFacade: FollowupsFacade,
    private router: Router
  ) {}

  ngOnInit() {
    // Read mode and set flags
    this.mode = (this.route.snapshot.queryParamMap.get('mode') as any) || 'add';
    this.editMode = this.mode === 'edit';
    this.viewOnly = this.mode === 'view';

    // ALWAYS read the path param for communicationId:
    const commRaw = this.route.snapshot.paramMap.get('communicationId');
    if (!commRaw) {
      console.error('Missing communicationId in URL!');
      return;
    }
    this.communicationIdParam = Number(commRaw);
    if (isNaN(this.communicationIdParam)) {
      console.error('Invalid communicationId:', commRaw);
      return;
    }

    if (this.editMode || this.viewOnly) {
      // For edit, also read the ":id" param
      const idRaw = this.route.snapshot.paramMap.get('id');
      this.raw = idRaw ? Number(idRaw) : NaN;
      this.followupFacade.loadOne(this.raw);
    }

    // Build form with communicationId
    this.addFollowupsForm = this.fb.group({
      topic: [' ', Validators.required],
      details: [' ', Validators.required],
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
            id: this.raw,
            communicationId:
              this.route.snapshot.queryParamMap.get('communicationId'),
            topic: rec.topic,
            details: rec.details,
            date: rec.date,
          });
        });
    }
  }

  addOrEditFollowup() {
    console.log('🛣️ Route snapshot:', this.route.snapshot);
    this.communicationIdParam = Number(
      this.route.snapshot.paramMap.get('communicationId')
    );
    this.routeId = Number(this.route.snapshot.paramMap.get('communicationId'));
    console.log(
      `🔍 QueryParams → communicationId = ${this.communicationIdParam}`
    );
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

    console.log('arwaa', this.communicationIdParam);
    const data: Partial<Followup> = {
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
      const formValue = this.addFollowupsForm.value;

      const updateData: Followup = {
        id: this.raw,
        communicationId: this.communicationIdParam,
        details: formValue.details,
        topic: formValue.topic,
        date: formValue.date,
      };

      console.log(
        '🔄 Dispatching UPDATE id=',
        this.recordId,
        ' UPDATED payload=',
        updateData
      );

      this.followupFacade.update(this.raw, updateData);
    }

    console.log(
      '➡️ Navigating back with PATH param:',
      this.communicationIdParam
    );
    if (this.addFollowupsForm.valid) {
      this.addFollowupsForm.markAsPristine();
    }
    if (!this.communicationIdParam || isNaN(this.communicationIdParam)) {
      console.error('Cannot navigate: communicationId is invalid');
      return;
    }
    this.router.navigate([
      '/communication/view-follow-ups',
      this.communicationIdParam,
    ]);
  }
  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.addFollowupsForm.dirty;
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
