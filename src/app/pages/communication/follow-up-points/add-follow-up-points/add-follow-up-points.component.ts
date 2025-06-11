import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, Observable, Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FollowupPointsFacade } from '../../store/followup-points/followup-points.facade';
import { FollowupPoint } from '../../store/followup-points/followup-point.model';
import { OfficersFacade } from '../../../organizations/store/officers/officers.facade';
import { Officer } from '../../../organizations/store/officers/officer.model';
import { ClientContactPersonsFacade } from '../../../crm/clients/store/client-contact-persons/client-contact-persons.facade';
import { ClientContactPerson } from '../../../crm/clients/store/client-contact-persons/client-contact-person.model';

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
    // Read mode and set flags
    this.mode = (this.route.snapshot.queryParamMap.get('mode') as any) ?? 'add';
    this.editMode = this.mode === 'edit';
    this.viewOnly = this.mode === 'view';

    this.officersFacade.loadAll(); 
    this.officers$ = this.officersFacade.items$;

     this.contactPersonsFacade.loadAll(); 
    this.contactPersons$ = this.contactPersonsFacade.items$;

     this.communicationIdParam = Number(this.route.snapshot.params['communicationId']);

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
      details: [' '],
      dueDate: [null, Validators.required],
      actualDate: [null, Validators.required],
      officerId: [null, Validators.required],
      contactPersonId : [null, Validators.required],
      comments: [null],
      isDone: [true],
      isClientResponsibility: [true],
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
            actualDate: rec.actualDate,
            officerId : rec.officerId,
            contactPersonId : rec.contactPersonId,
            comments : rec.comments,
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
       topic: formValue.topic,
       details: formValue.details,
       dueDate: formValue.dueDate,
       actualDate: formValue.actualDate,
      officerId : formValue.officerId,
      contactPersonId : formValue.contactPersonId,
      comments : formValue.comments,
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
        officerId: formValue.officerId,
        contactPersonId: formValue.contactPersonId ,
        comments: formValue.comments,
        isDone: formValue.isDone,
        isClientResponsibility: formValue.isClientResponsibility
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
    if (this.followupIdParam) {
      this.router.navigate(['/communication/view-follow-up-points', this.followupIdParam, this.communicationIdParam]);
    } else {
      console.error('❌ Cannot navigate back: followupId is missing!');
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
