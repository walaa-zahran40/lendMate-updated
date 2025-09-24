import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Observable,
  Subject,
  combineLatest,
  map,
  tap,
  switchMap,
  EMPTY,
  filter,
  take,
  takeUntil,
  catchError,
  of,
} from 'rxjs';
import { ClientContactPerson } from '../../../../../clients/store/client-contact-persons/client-contact-person.model';
import { MandateContactPerson } from '../../../../store/mandate-contact-persons/mandate-contact-person.model';
import { MandateContactPersonsFacade } from '../../../../store/mandate-contact-persons/mandate-contact-persons.facade';
import { ClientContactPersonsFacade } from '../../../../../clients/store/client-contact-persons/client-contact-persons.facade';
import { MandatesFacade } from '../../../../store/leasing-mandates/leasing-mandates.facade';
import { Mandate } from '../../../../store/leasing-mandates/leasing-mandate.model';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-add-mandate-contact-person',
  standalone: false,
  templateUrl: './add-mandate-contact-person.component.html',
  styleUrl: './add-mandate-contact-person.component.scss',
})
export class AddMandateContactPersonComponent {
  editMode = false;
  viewOnly = false;

  addMandateContactPersonForm!: FormGroup;

  contactPersons$!: Observable<ClientContactPerson[]>;

  leasingId!: number | undefined;
  leasingMandatesId!: number | undefined;
  mandateContactPersonId!: number | undefined;

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: MandateContactPersonsFacade,
    private contactPersonsFacade: ClientContactPersonsFacade,
    private http: HttpClient,
    private router: Router
  ) {
    // Build form: mandateId must equal leasingId
    this.addMandateContactPersonForm = this.fb.group({
      id: [null],
      mandateId: [this.leasingId, Validators.required],
      contactPersonId: [null, Validators.required],
      isActive: [true],
    });
  }

  ngOnInit() {
    // Read params once
    this.leasingId = this.num(this.route.snapshot.paramMap.get('leasingId'));
    this.leasingMandatesId = this.num(
      this.route.snapshot.paramMap.get('leasingMandatesId')
    );
    this.mandateContactPersonId = this.num(
      this.route.snapshot.paramMap.get('mandateContactPersonId')
    );

    // ✅ One-time fetch: mandate → clientId → contact persons
    if (this.leasingMandatesId != null) {
      this.http
        .get(
          `https://lendmate.corplease.com.eg:7070/api/LeasingMandates/LeasingMandateId?leasingMandate=${
            this.leasingMandatesId?.toString() ?? ''
          }`
        )
        .pipe(
          take(1),
          map(
            (m: any) =>
              (m?.clientId ?? m?.clientView?.clientId ?? null) as number | null
          ),
          filter((cid): cid is number => Number.isFinite(cid)),
          switchMap((clientId) => {
            // This dispatch hits: GET /api/ContactPersons/{ClientId}
            this.contactPersonsFacade.loadByClientId(clientId);
            return this.contactPersonsFacade.items$.pipe(take(1));
          }),
          catchError((err) => {
            console.error('[Mandate→ClientId] failed:', err);
            return of([]);
          })
        )
        .subscribe();
    }

    // bind dropdown
    this.contactPersons$ = this.contactPersonsFacade.items$;
    const route$ = combineLatest({
      params: this.route.paramMap,
      url: this.route.url,
    }).pipe(
      map(({ params, url }) => {
        const leasingId = this.num(params.get('leasingId'));
        const leasingMandatesId = this.num(params.get('leasingMandatesId'));
        const mandateContactPersonId = this.num(
          params.get('mandateContactPersonId')
        );
        const isView = url.some((s) => s.path === 'view'); // /.../view/...
        const isEdit = !!mandateContactPersonId && !isView; // /.../edit/:id

        // payload mandateId follows leasingId
        const mandateId = leasingId;

        return {
          leasingId,
          leasingMandatesId,
          mandateContactPersonId,
          mandateId,
          isEdit,
          isView,
        };
      }),
      tap(({ mandateId, isView, isEdit }) => {
        this.editMode = isEdit;
        this.viewOnly = isView;

        if (mandateId != null) {
          this.addMandateContactPersonForm.patchValue({ mandateId });
        }

        // apply disable/enable immediately on mode change
        if (this.viewOnly) {
          this.addMandateContactPersonForm.disable({ emitEvent: false });
        } else {
          this.addMandateContactPersonForm.enable({ emitEvent: false });
        }
      }),
      switchMap(({ mandateContactPersonId, isView, isEdit }) => {
        if (mandateContactPersonId == null || (!isEdit && !isView))
          return EMPTY;
        this.facade.loadOne(mandateContactPersonId);
        return this.facade
          .selectById(mandateContactPersonId)
          .pipe(filter(Boolean), take(1));
      })
    );

    route$.pipe(takeUntil(this.destroy$)).subscribe((contactPerson) => {
      this.patchMandate(contactPerson);
      // ensure disabled in view (idempotent)
      if (this.viewOnly)
        this.addMandateContactPersonForm.disable({ emitEvent: false });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private patchMandate(m: MandateContactPerson) {
    this.addMandateContactPersonForm.patchValue({
      id: m.id,
      mandateId: m.mandateId,
      contactPersonId: m.contactPersonId,
    });
  }

  onSubmit() {
    if (this.viewOnly) return;

    if (this.addMandateContactPersonForm.invalid) {
      this.addMandateContactPersonForm.markAllAsTouched();
      return;
    }

    const { id, mandateId, contactPersonId } =
      this.addMandateContactPersonForm.getRawValue() as MandateContactPerson;

    // Ensure mandateId is leasingId before sending (defensive)
    const payloadMandateId = this.leasingId ?? mandateId;

    if (this.editMode) {
      this.facade.update({ id, mandateId: payloadMandateId!, contactPersonId });
    } else {
      this.facade.create({ mandateId: payloadMandateId!, contactPersonId });
    }

    this.addMandateContactPersonForm.markAsPristine();
    this.navigateToView();
  }

  navigateToView() {
    // URL still expects both leasingId and leasingMandatesId
    const leasingId =
      this.leasingId ?? this.num(this.route.snapshot.paramMap.get('leasingId'));
    const leasingMandatesId =
      this.leasingMandatesId ??
      this.num(this.route.snapshot.paramMap.get('leasingMandatesId'));

    this.router.navigate([
      `/crm/leasing-mandates/view-mandate-contactPersons/${leasingId}/${leasingMandatesId}`,
    ]);
  }

  /** Guard hook */
  canDeactivate(): boolean {
    return !this.addMandateContactPersonForm.dirty;
  }

  private num(v: string | null): number | undefined {
    if (v == null) return undefined;
    const n = Number(v);
    return Number.isFinite(n) ? n : undefined;
  }
}
