import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Observable,
  Subject,
  take,
  map,
  filter,
  tap,
  catchError,
  of,
  combineLatest,
  takeUntil,
  switchMap,
  EMPTY,
} from 'rxjs';
import { ClientContactPerson } from '../../../../../crm/clients/store/client-contact-persons/client-contact-person.model';
import { ClientContactPersonsFacade } from '../../../../../crm/clients/store/client-contact-persons/client-contact-persons.facade';
import { AgreementContactPersonsFacade } from '../../../../store/agreement-contact-persons/agreement-contact-persons.facade';
import { AgreementContactPerson } from '../../../../store/agreement-contact-persons/agreement-contact-person.model';

@Component({
  selector: 'app-add-agreement-contact-person',
  standalone: false,
  templateUrl: './add-agreement-contact-person.component.html',
  styleUrl: './add-agreement-contact-person.component.scss',
})
export class AddAgreementContactPersonComponent {
  editMode = false;
  viewOnly = false;

  addAgreementContactPersonForm!: FormGroup;

  contactPersons$!: Observable<ClientContactPerson[]>;

  leasingId!: number | undefined;
  leasingAgreementsId!: number | undefined;
  agreementContactPersonId!: number | undefined;

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: AgreementContactPersonsFacade,
    private contactPersonsFacade: ClientContactPersonsFacade,
    private http: HttpClient,
    private router: Router
  ) {
    // Build form: agreementId must equal leasingId
    this.addAgreementContactPersonForm = this.fb.group({
      id: [null],
      agreementId: [this.leasingId, Validators.required],
      contactPersonId: [null, Validators.required],
      isActive: [true],
    });
  }

  ngOnInit() {
    // ---- read params (with fallbacks) ----
    const getNum = (v: string | null) => {
      const n = Number(v);
      return Number.isFinite(n) ? n : undefined;
    };

    // support both ":agreementContactPersonId" and generic ":id"
    const getAgreementCPId = () =>
      getNum(this.route.snapshot.paramMap.get('id'));

    this.agreementContactPersonId = getAgreementCPId();

    // ✅ One-time fetch: agreement → clientId → contact persons
    if (this.leasingAgreementsId != null) {
      this.http
        .get(
          `https://lendmate.corplease.com.eg:7070/api/LeasingAgreements/LeasingAgreementId?leasingAgreement=${
            this.leasingAgreementsId?.toString() ?? ''
          }`
        )
        .pipe(
          take(1),
          map((m) => {
            const agreement = m as {
              clientId?: number;
              clientView?: { clientId?: number };
            };
            return (agreement?.clientId ??
              agreement?.clientView?.clientId ??
              null) as number | null;
          }),
          filter((cid): cid is number => Number.isFinite(cid)),
          tap((clientId) => this.contactPersonsFacade.loadByClientId(clientId)),
          catchError((err) => {
            console.error('[Agreement→ClientId] failed:', err);
            return of(null);
          })
        )
        .subscribe();
    }

    // bind dropdown
    this.contactPersons$ = this.contactPersonsFacade.items$;
    // ---- MODE & basic form patch should always run (separate subscription) ----
    const mode$ = combineLatest({
      params: this.route.paramMap,
      url: this.route.url,
    }).pipe(
      map(({ params, url }) => {
        const leasingId = getNum(params.get('leasingId'));
        const agreementContactPersonId =
          getNum(params.get('agreementContactPersonId')) ??
          getNum(params.get('id'));

        // robust detection: prefer routeConfig path, else url segments
        const routePath = this.route.snapshot.routeConfig?.path ?? '';
        const segments = url.map((s) => s.path);
        const isView =
          routePath.includes('/view') ||
          segments.includes('view') ||
          routePath.includes('view-agreement-contact-persons');
        const isEdit =
          routePath.includes('/edit') ||
          segments.includes('edit') ||
          (!!agreementContactPersonId && !isView);

        return { leasingId, agreementContactPersonId, isView, isEdit };
      }),
      tap(({ leasingId, isView, isEdit }) => {
        this.editMode = isEdit;
        this.viewOnly = isView;

        if (leasingId != null) {
          this.addAgreementContactPersonForm.patchValue(
            { agreementId: leasingId },
            { emitEvent: false }
          );
        }

        // Apply disable/enable right away (idempotent)
        if (this.viewOnly) {
          this.addAgreementContactPersonForm.disable({ emitEvent: false });
        } else {
          this.addAgreementContactPersonForm.enable({ emitEvent: false });
        }
      })
    );

    // subscribe so the tap above always executes
    mode$.pipe(takeUntil(this.destroy$)).subscribe();

    // ---- When editing/viewing, wait for BOTH entity and options, then patch ----
    const entity$ = combineLatest({
      params: this.route.paramMap,
      url: this.route.url,
    }).pipe(
      switchMap(({ params, url }) => {
        const id =
          Number(params.get('agreementContactPersonId')) ||
          Number(params.get('id')) ||
          undefined;
        const isView = url.map((s) => s.path).includes('view');
        const isEdit = !!id && !isView;
        if (!id || (!isEdit && !isView)) return EMPTY;
        this.facade.loadOne(id);
        return this.facade.selectById(id).pipe(filter(Boolean));
      })
    );
    combineLatest([entity$, this.contactPersons$])
      .pipe(takeUntil(this.destroy$), take(1))
      .subscribe(([mcp]) => {
        // ensure options exist, then patch
        this.patchAgreement(mcp);

        // enforce readonly if view mode
        if (this.viewOnly) {
          this.addAgreementContactPersonForm.disable({ emitEvent: false });
        }
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
    if (this.viewOnly) return;

    if (this.addAgreementContactPersonForm.invalid) {
      this.addAgreementContactPersonForm.markAllAsTouched();
      return;
    }

    const { id, agreementId, contactPersonId } =
      this.addAgreementContactPersonForm.getRawValue() as AgreementContactPerson;
    this.leasingId = +this.route.snapshot.params['id'];
    // Ensure agreementId is leasingId before sending (defensive)
    const payloadAgreementId = this.leasingId ?? agreementId;

    if (this.editMode) {
      this.facade.update({
        id,
        agreementId: payloadAgreementId!,
        contactPersonId,
      });
    } else {
      this.facade.create({ agreementId: payloadAgreementId!, contactPersonId });
    }

    this.addAgreementContactPersonForm.markAsPristine();
    this.navigateToView();
  }

  navigateToView() {
    // URL still expects both leasingId and leasingAgreementsId
    const leasingId =
      this.leasingId ?? this.num(this.route.snapshot.paramMap.get('leasingId'));
    const leasingAgreementsId =
      this.leasingAgreementsId ??
      this.num(this.route.snapshot.paramMap.get('leasingAgreementsId'));

    this.router.navigate([
      `/crm/leasing-agreements/view-agreement-contact-persons/${leasingId}/${leasingAgreementsId}`,
    ]);
  }

  /** Guard hook */
  canDeactivate(): boolean {
    return !this.addAgreementContactPersonForm.dirty;
  }

  private num(v: string | null): number | undefined {
    if (v == null) return undefined;
    const n = Number(v);
    return Number.isFinite(n) ? n : undefined;
  }
}
