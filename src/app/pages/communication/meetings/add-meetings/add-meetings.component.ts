import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Observable, forkJoin, filter, take, takeUntil, map, distinctUntilChanged } from 'rxjs';
import { MeetingsFacade } from '../../store/meetings/meetings.facade';
import { Client } from '../../../crm/clients/store/_clients/allclients/client.model';
import { ClientsFacade } from '../../../crm/clients/store/_clients/allclients/clients.facade';
import { Officer } from '../../../organizations/store/officers/officer.model';
import { MeetingTypesFacade } from '../../../lookups/store/meeting-types/meeting-types.facade';
import { Meeting } from '../../store/meetings/meeting.model';
import { MeetingType } from '../../../lookups/store/meeting-types/meeting-type.model';
import { CommunicationFlowType } from '../../../lookups/store/communication-flow-types/communication-flow-type.model';
import { CommunicationFlowTypesFacade } from '../../../lookups/store/communication-flow-types/communication-flow-types.facade';
import { OfficersFacade } from '../../../organizations/store/officers/officers.facade';
import { ClientContactPersonsFacade } from '../../../crm/clients/store/client-contact-persons/client-contact-persons.facade';
import { ClientContactPerson } from '../../../crm/clients/store/client-contact-persons/client-contact-person.model';
import { AssetTypesFacade } from '../../../lookups/store/asset-types/asset-types.facade';
import { AssetType } from '../../../lookups/store/asset-types/asset-type.model';
import { start } from '@popperjs/core';


@Component({
  selector: 'app-add-meetings',
  standalone: false,
  templateUrl: './add-meetings.component.html',
  styleUrl: './add-meetings.component.scss',
})
export class AddMeetingsComponent implements OnInit, OnDestroy {
  // Flags driven by mode
  editMode = false;
  viewOnly = false;

  // Reactive form
  addMeetingForm!: FormGroup;

  // Lists and IDs
  mode!: 'add' | 'edit' | 'view';
  parentClientId!: number;
  recordId!: number;
  private destroy$ = new Subject<void>();

  meetingTypes$!: Observable<MeetingType[]>;
  assetTypes$!: Observable<AssetType[]>;
  contactPersons$!: Observable<ClientContactPerson[]>;
  officers$!: Observable<Officer[]>;
  communicationFlowTypes$!: Observable<CommunicationFlowType[]>;
  clients$!: Observable<Client[]>;
  
  clientsList: Client[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private meetingFacade: MeetingsFacade,
    private assetTypesFacade: AssetTypesFacade,
    private clientsFacade: ClientsFacade,
    private meetingTypesFacade: MeetingTypesFacade,
    private communicationFlowTypesFacade: CommunicationFlowTypesFacade,
    private officersFacade: OfficersFacade,
    private contactPersonsFacade: ClientContactPersonsFacade,

    private router: Router
  ) {}

  ngOnInit() {
    //Drop Down Lists
    // Load all facade data
    this.meetingTypesFacade.loadAll();
    this.meetingTypes$ = this.meetingTypesFacade.all$;

    this.assetTypesFacade.loadAll();
    this.assetTypes$ = this.assetTypesFacade.all$;

    this.clientsFacade.loadAll();
    this.clients$ = this.clientsFacade.all$;

    this.communicationFlowTypesFacade.loadAll();
    this.communicationFlowTypes$ = this.communicationFlowTypesFacade.all$;

    this.officersFacade.loadAll();
    this.officers$ = this.officersFacade.items$;
    
    this.contactPersonsFacade.loadAll();

     this.contactPersons$ = this.contactPersonsFacade.items$.pipe(
          map((list) => list || []));

    // Read mode and set flags
    this.mode = (this.route.snapshot.queryParamMap.get('mode') as any) ?? 'add';
    this.editMode = this.mode === 'edit';
    this.viewOnly = this.mode === 'view';


    // Build form with clientId
    this.addMeetingForm = this.fb.group({
      clientId: [null, Validators.required],
      meetingTypeId: [null, Validators.required],
      communicationFlowId: [null],
      addressLocation: [null],

      communicationContactPersons: this.fb.array([this.createContactPersonGroup()]),
      communicationOfficers: this.fb.array([this.createCommunicationOfficerGroup()]),
      communicationAssetTypes: this.fb.array([this.createCommunicationAssetTypeGroup()]),

      topic: [null, Validators.required],
      details: [null],
      startDate : [null, Validators.required],
      endDate : [null, Validators.required],
      comments: [null],
    });

    // Patch for edit/view mode
    if (this.editMode || this.viewOnly) {
      this.recordId = Number (this.route.snapshot.paramMap.get('id'));
      this.meetingFacade.loadById(this.recordId);
      this.meetingFacade.selected$
        .pipe(
          takeUntil(this.destroy$),
          filter((rec) => !!rec)
        )
        .subscribe({
          next: (rec) => {
            console.log('💾 Loaded meetings record:', rec);
            console.log('🔑 rec keys:', Object.keys(rec));

            // 1) patch simple fields
            this.addMeetingForm.patchValue({
              id: rec.id,
              clientId: rec.clientId,
              meetingTypeId: rec.meetingTypeId,
              communicationFlowId: rec.communicationFlowId,
              addressLocation : rec.addressLocation,
              topic: rec.topic,
              details: rec.details,
              startDate : rec.startDate,
              endDate : rec.endDate,
              comments: rec.comments
            });
            console.log(
              '📝 After patchValue, form value:',
              this.addMeetingForm.value
            );

            const assetArr = this.addMeetingForm.get(
              'communicationAssetTypes'
            ) as FormArray;
            assetArr.clear();
            rec.communicationAssetTypes?.forEach((pp) => {
              assetArr.push(
                this.fb.group({
                  assetTypeId: [pp.assetTypeId, Validators.required],  
                })
              );
            });

            // 2) communicationContactPersons
            const idArr = this.addMeetingForm.get(
              'communicationOfficers'
            ) as FormArray;
            console.log('👥 communicationContactPersons before clear:', idArr.length);
            idArr.clear();
            rec.communicationOfficers?.forEach((ci) => {
              idArr.push(
                this.fb.group({
                   officerId: [ci.officerId, Validators.required],
                   isAttend: [ci.isAttend, Validators.requiredTrue],
                   isResponsible: [ci.isResponsible, Validators.requiredTrue],
                })
              );
            });

            // 3) phone types
            const phArr = this.addMeetingForm.get(
              'communicationContactPersons'
            ) as FormArray;
            phArr.clear();
            rec.communicationContactPersons?.forEach((pp) => {
              phArr.push(
                this.fb.group({
                  contactPersonId: [pp.contactPersonId, Validators.required],  
                  isAttend: [pp.isAttend, Validators.requiredTrue], 
                })
              );
            });

            
          },
          error: (err) => {
            console.error('❌ Error loading meetings from facade:', err);
          },
        });
    }

    this.addMeetingForm
          .get('clientId')!
          .valueChanges.pipe(
            filter((id) => !!id),
            distinctUntilChanged()
          )
          .subscribe((clientId) => {
            this.contactPersonsFacade.loadByClientId(clientId);
          });
  }

  get communicationContactPersons(): FormArray {
    return this.addMeetingForm.get('communicationContactPersons') as FormArray;
  }

  addCommunicationContactPerson() {
    console.log('Adding new identity group');
    this.communicationContactPersons.push(this.createContactPersonGroup());
  }

  removeCommunicationContactPerson(i: number) {
    console.log('Removing identity group at index', i);
    if (this.communicationContactPersons.length > 1) {
      this.communicationContactPersons.removeAt(i);
    }
  }

  get officers(): FormArray {
    return this.addMeetingForm.get('communicationOfficers') as FormArray;
  }

  get assetTypes(): FormArray {
    return this.addMeetingForm.get('communicationAssetTypes') as FormArray;
  }

  addCommunicationOfficer() {
    console.log('Adding new identity group');
    this.officers.push(this.createCommunicationOfficerGroup());
  }

  addCommunicationAssetType() {
    console.log('Adding new identity group');
    this.assetTypes.push(this.createCommunicationAssetTypeGroup());
  }

  removeCommunicationOfficer(i: number) {
    console.log('Removing identity group at index', i);
    if (this.officers.length > 1) {
      this.officers.removeAt(i);
    }
  }

    removeCommunicationAssetType(i: number) {
    console.log('Removing identity group at index', i);
    if (this.assetTypes.length > 1) {
      this.assetTypes.removeAt(i);
    }
  }


    createCommunicationAssetTypeGroup(): FormGroup {
  return this.fb.group({
    assetTypeId : [null, Validators.required]
  });
}

  createContactPersonGroup(): FormGroup {
  return this.fb.group({
    contactPersonId: [null, Validators.required],
    isAttend: [true, Validators.requiredTrue],
  });
}

createCommunicationOfficerGroup(): FormGroup {
  return this.fb.group({
    officerId: [null, Validators.required],
    isAttend: [true, Validators.requiredTrue],
    isResponsible: [true, Validators.requiredTrue],
  });
}

  addOrEditMeeting() {
    console.log('🛣️ Route snapshot:', this.route.snapshot);
    const recordId = this.route.snapshot.queryParamMap.get('id');

    // 4) Early return in view-only
    if (this.viewOnly) {
      console.warn('🚫 viewOnly mode — aborting submit');
      return;
    }

    // 5) Form validity
    if (this.addMeetingForm.invalid) {
      this.addMeetingForm.markAllAsTouched();
      return;
    }

    // 6) The actual payload
    const formValue = this.addMeetingForm.value;
    const contactPersonPayload = formValue.communicationContactPersons?.map(
      (i: any) => {
        const entry: any = {
          contactPersonId : i.contactPersonId,
          isAttend: i.isAttend,
        };
        return entry;
      }
    );

    const assetTypesPayload = formValue.communicationAssetTypes?.map(
      (i: any) => {
        const entry: any = {
          assetTypeId : i.assetTypeId,
        };
        return entry;
      }
    );

    const communicationOfficersPayload = formValue.communicationOfficers?.map(
      (i: any) => {
        const entry: any = {
          officerId : i.officerId,
          isAttend: i.isAttend,
          isResponsible: i.isResponsible,
        };
        return entry;
      }
    );

    const data: Partial<Meeting> = {
      clientId: formValue.clientId,
      meetingTypeId: formValue.meetingTypeId,
      communicationFlowId: formValue.communicationFlowId,

      addressLocation : formValue.addressLocation,
      topic: formValue.topic,
      details: formValue.details,
      startDate: formValue.startDate,
      endDate: formValue.endDate,
      comments: formValue.comments,

      communicationOfficers: communicationOfficersPayload,
      communicationContactPersons: contactPersonPayload,
      communicationAssetTypes: assetTypesPayload
    };

    console.log(
      '🔄 Dispatching UPDATE id=',
      this.recordId,
      ' created  payload=',
      data
    );

    if (this.mode === 'add') {
      this.meetingFacade.create({
        ...data,
      });
    } else {
      const formValue = this.addMeetingForm.value;

      const updateData: Meeting = {
        id: this.recordId,
        clientId: formValue.clientId,
        meetingTypeId: formValue.meetingTypeId,
        communicationFlowId: formValue.communicationFlowId,
        topic: formValue.topic,
        comments: formValue.comments,
        details: formValue.details,
        communicationOfficers: communicationOfficersPayload,
        communicationContactPersons: contactPersonPayload,
        startDate: formValue.startDate,
        endDate: formValue.endDate,
        onlineURL: formValue.onlineURL,
        addressLocation: formValue.addressLocation,
        reserveCar: formValue.reserveCar,
        driverName: formValue.driverName,
        adminComments: formValue.adminComments
      };

      console.log(
        '🔄 Dispatching UPDATE id=',
        this.recordId,
        ' UPDATED payload=',
        updateData
      );

      this.meetingFacade.update(this.recordId, {
        ...updateData,
        communicationOfficers: communicationOfficersPayload,
        communicationContactPersons : contactPersonPayload,
        communicationAssetTypes : assetTypesPayload,
      });
    }
    console.log('route', this.route.snapshot);

    this.router.navigate(['/communication/view-meetings']);
  }

  
  get communicationOfficersArray(): FormArray {
  return this.addMeetingForm.get('communicationOfficers') as FormArray;
}

get communicationContactPersonsArray(): FormArray {
  return this.addMeetingForm.get('communicationContactPersons') as FormArray;
}

get communicationAssetTypesArray(): FormArray {
  return this.addMeetingForm.get('communicationAssetTypes') as FormArray;
}

ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}