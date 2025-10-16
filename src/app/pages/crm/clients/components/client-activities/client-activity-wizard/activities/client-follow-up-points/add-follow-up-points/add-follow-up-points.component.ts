import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, Observable, Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FollowupPointsFacade } from '../../../../../../../../communication/store/followup-points/followup-points.facade';
import { FollowupPoint } from '../../../../../../../../communication/store/followup-points/followup-point.model';
import { OfficersFacade } from '../../../../../../../../organizations/store/officers/officers.facade';
import { Officer } from '../../../../../../../../organizations/store/officers/officer.model';
import { ClientContactPersonsFacade } from '../../../../../../store/client-contact-persons/client-contact-persons.facade';
import { ClientContactPerson } from '../../../../../../store/client-contact-persons/client-contact-person.model';

@Component({
  selector: 'app-add-follow-up-points',
  standalone: false,
  templateUrl: './add-follow-up-points.component.html',
  styleUrl: './add-follow-up-points.component.scss',
})
export class AddFollowupPointsComponent implements OnInit, OnDestroy {
  editMode = false;
  viewOnly = false;

  addFollowupPointsForm!: FormGroup;

  mode!: 'add' | 'edit' | 'view';
  parentClientId!: number;
  recordId!: number;
  raw!: number;
  private destroy$ = new Subject<void>();
  officers$!: Observable<Officer[]>;
  contactPersons$!: Observable<ClientContactPerson[]>;

  communicationIdParam!: any;

  followupIdParam!: number;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private followupFacade: FollowupPointsFacade,
    private officersFacade: OfficersFacade,
    private contactPersonsFacade: ClientContactPersonsFacade,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('log', this.route.snapshot);
    this.mode = (this.route.snapshot.queryParamMap.get('mode') as any) ?? 'add';
    this.editMode = this.mode === 'edit';
    this.viewOnly = this.mode === 'view';

    this.officersFacade.loadAll();
    this.officers$ = this.officersFacade.items$;

    this.contactPersonsFacade.loadAll();
    this.contactPersons$ = this.contactPersonsFacade.items$;

    this.communicationIdParam = Number(
      this.route.snapshot.params['communicationId']
    );

    this.parentClientId = Number(
      this.route.snapshot.queryParamMap.get('followupId')
    );
    if (this.editMode || this.viewOnly) {
      console.log('route add', this.route.snapshot);

      this.recordId = Number(this.route.snapshot.params['followupId']);
      this.raw = Number(this.route.snapshot.params['id']);
      this.followupFacade.loadOne(this.raw);
    }

    this.addFollowupPointsForm = this.fb.group({
      topic: [' ', Validators.required],
      details: [' '],
      dueDate: [null, Validators.required],
      actualDate: [null],
      officerId: [null, Validators.required],
      contactPersonId: [null, Validators.required],
      comments: [null],
      isDone: [true],
      isClientResponsibility: [true],
    });

    this.addFollowupPointsForm.patchValue({
      followupId: this.route.snapshot.queryParamMap.get('followupId'),
    });
    if (this.editMode || this.viewOnly) {
      this.raw = Number(this.route.snapshot.params['id']);

      this.followupIdParam = Number(
        this.route.snapshot.queryParamMap.get('followupId')
      );
    }
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
            actualDate: rec.actualDate,
            officerId: rec.officerId,
            contactPersonId: rec.contactPersonId,
            comments: rec.comments,
          });
        });
    }
  }

  addOrEditFollowupPoint() {
    console.log('🛣️ Route snapshot:', this.route.snapshot);
    this.followupIdParam = Number(
      this.route.snapshot.queryParamMap.get('followupId')
    );
    console.log(`🔍 QueryParams → followupId = ${this.followupIdParam}`);
    console.log(
      `⚙️ mode = ${this.mode}, editMode = ${this.editMode}, viewOnly = ${this.viewOnly}`
    );

    if (this.viewOnly) {
      console.warn('🚫 viewOnly mode — aborting submit');
      return;
    }

    if (this.addFollowupPointsForm.invalid) {
      this.addFollowupPointsForm.markAllAsTouched();
      return;
    }

    const formValue = this.addFollowupPointsForm.value;

    console.log('arwaa', this.followupIdParam);
    const data: Partial<FollowupPoint> = {
      followUpId: this.followupIdParam,
      topic: formValue.topic,
      details: formValue.details,
      dueDate: formValue.dueDate,
      actualDate: formValue.actualDate,
      officerId: formValue.officerId,
      contactPersonId: formValue.contactPersonId,
      comments: formValue.comments,
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
        actualDate: formValue.actualDate,
        officerId: formValue.officerId,
        contactPersonId: formValue.contactPersonId,
        comments: formValue.comments,
        isDone: formValue.isDone,
        isClientResponsibility: formValue.isClientResponsibility,
      };

      console.log(
        '🔄 Dispatching UPDATE id=',
        this.route.snapshot.params['id'],
        ' UPDATED payload=',
        updateData
      );

      this.followupFacade.update(this.route.snapshot.params['id'], updateData);
    }

    console.log(
      '➡️ Navigating back with PATH param:',
      this.communicationIdParam
    );
    console.log('➡️ Navigating back with PATH param:', this.followupIdParam);
    if (this.addFollowupPointsForm.valid) {
      this.addFollowupPointsForm.markAsPristine();
    }
    if (this.followupIdParam) {
      this.router.navigate([
        '/communication/view-follow-up-points',
        this.followupIdParam,
        this.communicationIdParam,
      ]);
    } else {
      console.error('❌ Cannot navigate back: followupId is missing!');
    }
  }
  canDeactivate(): boolean {
    return !this.addFollowupPointsForm.dirty;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
