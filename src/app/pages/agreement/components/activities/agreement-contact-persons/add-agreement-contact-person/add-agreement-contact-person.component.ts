import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Observable,
  Subject,
  map,
  filter,
  tap,
  takeUntil,
  switchMap,
  distinctUntilChanged,
  shareReplay,
} from 'rxjs';
import { ClientContactPerson } from '../../../../../crm/clients/store/client-contact-persons/client-contact-person.model';
import { ClientContactPersonsFacade } from '../../../../../crm/clients/store/client-contact-persons/client-contact-persons.facade';
import {
  AgreementContactPerson,
  CreateAgreementContactPersonDto,
  UpdateAgreementContactPersonDto,
} from '../../../../store/agreement-contact-persons/agreement-contact-person.model';
import { environment } from '../../../../../../../environments/environment';
import { AgreementContactPersonsFacade } from '../../../../store/agreement-contact-persons/agreement-contact-persons.facade';
import { AgreementContactPersonsActions as ACP } from '../../../../store/agreement-contact-persons/agreement-contact-persons.actions';
import { Action } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
const DEBUG = true;
const TAG = '[AddAgreementContactPersonComponent]';
const log = (...a: any[]) => DEBUG && console.log(TAG, ...a);
const warn = (...a: any[]) => DEBUG && console.warn(TAG, ...a);
const err = (...a: any[]) => console.error(TAG, ...a);

type AgreementDto = {
  agreementId: number;
  clientId: number;
  clientView: { clientId: number; clientName?: string; clientNameAr?: string };
};

@Component({
  selector: 'app-add-agreement-contact-person',
  standalone: false,
  templateUrl: './add-agreement-contact-person.component.html',
  styleUrl: './add-agreement-contact-person.component.scss',
})
export class AddAgreementContactPersonComponent {
  addAgreementContactPersonForm!: FormGroup;
  contactPersons$!: Observable<ClientContactPerson[]>;
  private destroy$ = new Subject<void>();
  editMode = false;
  viewOnly = false;
  routeId = this.route.snapshot.params['id'];
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private contactPersonsFacade: ClientContactPersonsFacade,
    private facade: AgreementContactPersonsFacade,
    private http: HttpClient,
    private actions$: Actions, // 👈 the effects Actions stream (observable)
    private router: Router
  ) {}

  ngOnInit() {
    log('ngOnInit');

    this.addAgreementContactPersonForm = this.fb.group({
      id: [null],
      agreementId: [null, Validators.required],
      contactPersonId: [null, Validators.required],
      isActive: [true],
    });

    // 1) read agreement id
    const agreementId$ = this.route.paramMap.pipe(
      tap((pm) =>
        log(
          'route paramMap:',
          Object.fromEntries(pm.keys.map((k) => [k, pm.get(k) as any]))
        )
      ),
      map((pm) => Number(pm.get('id') ?? pm.get('displayAgreementNumberId'))),
      tap((id) => log('parsed agreementId:', id)),
      filter((id) => {
        const ok = !!id && !Number.isNaN(id);
        if (!ok) warn('agreementId invalid:', id);
        return ok;
      }),
      distinctUntilChanged(),
      tap((id) => log('agreementId$ emit:', id)),
      shareReplay({ bufferSize: 1, refCount: true })
    );

    // 2) fetch agreement via HTTP -> patch form -> get clientId -> dispatch loadByClientId
    const clientId$ = agreementId$.pipe(
      switchMap((id) =>
        this.http
          .get<AgreementDto>(
            `${environment.apiUrl}LeasingAgreements/LeasingAgreementId?leasingAgreement=${id}`
          )
          .pipe(
            tap((ag) => log('agreement fetched:', ag)),
            tap((ag) =>
              this.addAgreementContactPersonForm.patchValue({
                agreementId: ag.agreementId,
              })
            ),
            map((ag) => ag.clientView?.clientId ?? ag.clientId),
            filter((clientId): clientId is number => {
              const ok = clientId != null && !Number.isNaN(clientId);
              if (!ok) warn('clientId missing/invalid from agreement');
              return ok;
            }),
            tap((clientId) => {
              log('dispatch loadByClientId:', clientId);
              this.contactPersonsFacade.loadByClientId(clientId);
            })
          )
      ),
      distinctUntilChanged(),
      tap((cid) => log('clientId$ emit:', cid)),
      shareReplay({ bufferSize: 1, refCount: true })
    );

    // 3) bind contacts filtered by clientId (local filter on items$)
    this.contactPersons$ = clientId$.pipe(
      switchMap((clientId) =>
        this.contactPersonsFacade.items$.pipe(
          tap((list) => log('items$ length:', list?.length ?? 0)),
          map((list) =>
            (list ?? []).filter((cp) => (cp as any).clientId === clientId)
          ),
          tap((list) =>
            log(
              'filtered contacts length for clientId',
              clientId,
              ':',
              list.length
            )
          )
        )
      ),
      takeUntil(this.destroy$)
    );

    // (Optional) subscribe once to ensure the pipeline runs even before template renders
    clientId$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (cid) => log('clientId$ subscription saw:', cid),
      error: (e) => err('clientId$ error:', e),
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private patchAgreement(m: AgreementContactPerson) {
    this.addAgreementContactPersonForm.patchValue({
      id: m.id,
      agreementId: m.agreementId,
      contactPersonId: m.contactPersonId,
    });
  }

  onSubmit() {
    const form = this.addAgreementContactPersonForm;
    if (form.invalid) {
      form.markAllAsTouched();
      warn('form invalid', form.value);
      return;
    }

    const raw = form.getRawValue() as {
      id: number | null;
      agreementId: number;
      contactPersonId: number;
      isActive: boolean;
    };

    if (raw.id) {
      // EDIT (PATCH)
      const dto: UpdateAgreementContactPersonDto = {
        id: raw.id,
        // keep agreementId if your backend requires it on update; otherwise you can omit it
        agreementId: raw.agreementId,
        contactPersonId: raw.contactPersonId,
      };
      log('UPDATE dto:', dto);
      this.facade.update(dto);
    } else {
      // ADD (CREATE)
      const dto: CreateAgreementContactPersonDto = {
        agreementId: raw.agreementId,
        contactPersonId: raw.contactPersonId,
      };
      log('CREATE dto:', dto);
      this.facade.create(dto);
    }
    this.actions$
      .pipe(
        ofType(ACP.createSucceeded, ACP.updateSucceeded), // 👈 both success actions
        takeUntil(this.destroy$)
      )
      .subscribe((action) => {
        // both actions carry { contactPerson }
        const cp = (
          action as { contactPerson?: { agreementId?: number; id: number } }
        ).contactPerson;
        const agreementId = cp?.agreementId;
        console.log('tro', this.route.snapshot);
        if (agreementId == null) {
          console.warn(
            '[ACP] Missing agreementId for post-success navigation',
            { action, form: this.addAgreementContactPersonForm.value }
          );
          return;
        }

        // ✅ adjust the route to your real one
        this.router.navigate([
          '/agreement/activities',

          'view-agreement-contact-persons',
          agreementId,
        ]);
        // or: this.router.navigate(['../view-agreements-contact-person'], { relativeTo: this.route });
      });
  }
}
