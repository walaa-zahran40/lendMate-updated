import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Observable, forkJoin, filter, take, takeUntil, map, distinctUntilChanged } from 'rxjs';
import { CallsFacade } from '../../store/calls/calls.facade';
import { Client } from '../../../crm/clients/store/_clients/allclients/client.model';
import { ClientsFacade } from '../../../crm/clients/store/_clients/allclients/clients.facade';
import { Officer } from '../../../organizations/store/officers/officer.model';
import { CallTypesFacade } from '../../../lookups/store/call-types/call-types.facade';
import { Call } from '../../store/calls/call.model';
import { CallType } from '../../../lookups/store/call-types/call-type.model';
import { CallActionType } from '../../../lookups/store/call-action-types/call-action-type.model';
import { CommunicationFlowType } from '../../../lookups/store/communication-flow-types/communication-flow-type.model';
import { CallActionTypesFacade } from '../../../lookups/store/call-action-types/call-action-types.facade';
import { CommunicationFlowTypesFacade } from '../../../lookups/store/communication-flow-types/communication-flow-types.facade';
import { OfficersFacade } from '../../../organizations/store/officers/officers.facade';
import { ClientContactPersonsFacade } from '../../../crm/clients/store/client-contact-persons/client-contact-persons.facade';
import { ClientContactPerson } from '../../../crm/clients/store/client-contact-persons/client-contact-person.model';


@Component({
  selector: 'app-add-calls',
  standalone: false,
  templateUrl: './add-calls.component.html',
  styleUrl: './add-calls.component.scss',
})
export class AddCallsComponent implements OnInit, OnDestroy {
  // Flags driven by mode
  editMode = false;
  viewOnly = false;

  // Reactive form
  addCallForm!: FormGroup;

  // Lists and IDs
  mode!: 'add' | 'edit' | 'view';
  parentClientId!: number;
  recordId!: number;
  private destroy$ = new Subject<void>();

  callTypes$!: Observable<CallType[]>;
  contactPersons$!: Observable<ClientContactPerson[]>;
  officers$!: Observable<Officer[]>;
  callActionTypes$!: Observable<CallActionType[]>;
  communicationFlowTypes$!: Observable<CommunicationFlowType[]>;
  clients$!: Observable<Client[]>;
  
  clientsList: Client[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private callFacade: CallsFacade,
    private clientsFacade: ClientsFacade,
    private callTypesFacade: CallTypesFacade,
    private callActionTypesFacade: CallActionTypesFacade,
    private communicationFlowTypesFacade: CommunicationFlowTypesFacade,
    private officersFacade: OfficersFacade,
    private contactPersonsFacade: ClientContactPersonsFacade,

    private router: Router
  ) {}

  ngOnInit() {
    //Drop Down Lists
    // Load all facade data
    this.callTypesFacade.loadAll();
    this.callTypes$ = this.callTypesFacade.all$;

    this.clientsFacade.loadAll();
    this.clients$ = this.clientsFacade.all$;

    this.callActionTypesFacade.loadAll();
    this.callActionTypes$ = this.callActionTypesFacade.all$;

    this.communicationFlowTypesFacade.loadAll();
    this.communicationFlowTypes$ = this.communicationFlowTypesFacade.all$;

    this.officersFacade.loadAll();
    this.officers$ = this.officersFacade.items$;
    
    this.contactPersonsFacade.loadAll();
    // this.contactPersons$ = this.contactPersonsFacade.items$;

     this.contactPersons$ = this.contactPersonsFacade.items$.pipe(
          map((list) => list || []));

    // Read mode and set flags
    this.mode = (this.route.snapshot.queryParamMap.get('mode') as any) ?? 'add';
    this.editMode = this.mode === 'edit';
    this.viewOnly = this.mode === 'view';


    // Build form with clientId
    this.addCallForm = this.fb.group({
      clientId: [null, Validators.required],
      callTypeId: [null, Validators.required],
      callActionTypeId: [null, Validators.required],
      communicationFlowId: [null],
      topic: [null, Validators.required],
      comments: [null],
      details: [null],
      date: [null, Validators.required],

      communicationContactPersons: this.fb.array([this.createContactPersonGroup()]),
      communicationOfficers: this.fb.array([this.createCommunicationOfficerGroup()]),
    });

  

    // Patch for edit/view mode
    if (this.editMode || this.viewOnly) {
      this.recordId = Number (this.route.snapshot.paramMap.get('id'));
      this.callFacade.loadById(this.recordId);
      this.callFacade.selected$
        .pipe(
          takeUntil(this.destroy$),
          filter((rec) => !!rec)
        )
        .subscribe({
          next: (rec) => {
            console.log('💾 Loaded calls record:', rec);
            console.log('🔑 rec keys:', Object.keys(rec));

            // 1) patch simple fields
            this.addCallForm.patchValue({
              id: rec.id,
              clientId: rec.clientId,
              callTypeId: rec.callTypeId,
              callActionTypeId: rec.callActionTypeId,
              communicationFlowId: rec.communicationFlowId,
              topic: rec.topic,
              comments: rec.comments,
              details: rec.details,
              date: rec.date    ,
            });
            console.log(
              '📝 After patchValue, form value:',
              this.addCallForm.value
            );

            // 2) communicationContactPersons
            const idArr = this.addCallForm.get(
              'communicationOfficers'
            ) as FormArray;
            console.log('👥 communicationContactPersons before clear:', idArr.length);
            idArr.clear();
            console.log('👥 communicationContactPersons after clear:', idArr.length);
            rec.communicationOfficers?.forEach((ci) => {
              idArr.push(
                this.fb.group({
                   officerId: [ci.officerId, Validators.required],
                   isAttend: [ci.isAttend, Validators.requiredTrue],
                   isResponsible: [ci.isResponsible, Validators.requiredTrue],
                })
              );
            });
            console.log('👥 communicationContactPersons after rebuild:', idArr.length);

            // 3) phone types
            const phArr = this.addCallForm.get(
              'communicationContactPersons'
            ) as FormArray;
            console.log('📞 officers before clear:', phArr.length);
            phArr.clear();
            console.log('📞 officers after clear:', phArr.length);
            rec.communicationContactPersons?.forEach((pp) => {
              phArr.push(
                this.fb.group({
                  contactPersonId: [pp.contactPersonId, Validators.required],  
                  isAttend: [pp.isAttend, Validators.requiredTrue], 
                })
              );
            });
            console.log('📞 officers after rebuild:', phArr.length);
          },
          error: (err) => {
            console.error('❌ Error loading calls from facade:', err);
          },
        });
    }

    this.addCallForm
          .get('clientId')!
          .valueChanges.pipe(
            filter((id) => !!id),
            distinctUntilChanged()
          )
          .subscribe((clientId) => {
            // load only that client’s people into “items”
            this.contactPersonsFacade.loadByClientId(clientId);
          });
  }

  get communicationContactPersons(): FormArray {
    return this.addCallForm.get('communicationContactPersons') as FormArray;
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
    return this.addCallForm.get('officersList') as FormArray;
  }

  addCommunicationOfficer() {
    console.log('Adding new identity group');
    this.officers.push(this.createCommunicationOfficerGroup());
  }

  removeCommunicationOfficer(i: number) {
    console.log('Removing identity group at index', i);
    if (this.officers.length > 1) {
      this.officers.removeAt(i);
    }
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


  addOrEditCall() {
    console.log('🛣️ Route snapshot:', this.route.snapshot);
    const recordId = this.route.snapshot.queryParamMap.get('id');

    // 4) Early return in view-only
    if (this.viewOnly) {
      console.warn('🚫 viewOnly mode — aborting submit');
      return;
    }

    // 5) Form validity
    if (this.addCallForm.invalid) {
      this.addCallForm.markAllAsTouched();
      return;
    }

    // 6) The actual payload
    const formValue = this.addCallForm.value;
    const contactPersonPayload = formValue.communicationContactPersons?.map(
      (i: any) => {
        const entry: any = {
          contactPersonId : i.contactPersonId,
          isAttend: i.isAttend,
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

    console.log('arwaa', formValue[0]);
    const data: Partial<Call> = {
      clientId: formValue.clientId,
      callTypeId: formValue.callTypeId,
      callActionTypeId: formValue.callActionTypeId,
      communicationFlowId: formValue.communicationFlowId,
      topic: formValue.topic,
      comments: formValue.comments,
      details: formValue.details,
      date: formValue.date,
      communicationOfficers: communicationOfficersPayload,
      communicationContactPersons: contactPersonPayload,
    };

    console.log(
      '🔄 Dispatching UPDATE id=',
      this.recordId,
      ' created  payload=',
      data
    );

    if (this.mode === 'add') {
      this.callFacade.create({
        ...data,
      });
    } else {
      const formValue = this.addCallForm.value;

      const updateData: Call = {
        id: this.recordId,
       clientId: formValue.clientId,
      callTypeId: formValue.callTypeId,
      callActionTypeId: formValue.callActionTypeId,
      communicationFlowId: formValue.communicationFlowId,
      topic: formValue.topic,
      comments: formValue.comments,
      details: formValue.details,
      date: formValue.date,
      communicationOfficers: communicationOfficersPayload,
      communicationContactPersons: contactPersonPayload,
      };

      console.log(
        '🔄 Dispatching UPDATE id=',
        this.recordId,
        ' UPDATED payload=',
        updateData
      );

      this.callFacade.update(this.recordId, {
        ...updateData,
        communicationOfficers: communicationOfficersPayload,
        communicationContactPersons : contactPersonPayload,
      });
    }
    console.log('route', this.route.snapshot);

    this.router.navigate(['/communication/view-calls']);
  }

  get communicationOfficersArray(): FormArray {
  return this.addCallForm.get('communicationOfficers') as FormArray;
}

get communicationContactPersonsArray(): FormArray {
  return this.addCallForm.get('communicationContactPersons') as FormArray;
}



  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
