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
import { HttpClient } from '@angular/common/http';

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
    // ---- read params (with fallbacks) ----
    const getNum = (v: string | null) => {
      const n = Number(v);
      return Number.isFinite(n) ? n : undefined;
    };

    // support both ":mandateContactPersonId" and generic ":id"
    const getMandateCPId = () =>
      getNum(this.route.snapshot.paramMap.get('mandateContactPersonId')) ??
      getNum(this.route.snapshot.paramMap.get('id'));
    this.leasingId = getNum(this.route.snapshot.paramMap.get('leasingId'));
    this.leasingMandatesId = getNum(
      this.route.snapshot.paramMap.get('leasingMandatesId')
    );
    this.mandateContactPersonId = getMandateCPId();

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
          map((m) => {
            const mandate = m as {
              clientId?: number;
              clientView?: { clientId?: number };
            };
            return (mandate?.clientId ??
              mandate?.clientView?.clientId ??
              null) as number | null;
          }),
          filter((cid): cid is number => Number.isFinite(cid)),
          tap((clientId) => this.contactPersonsFacade.loadByClientId(clientId)),
          catchError((err) => {
            console.error('[Mandate→ClientId] failed:', err);
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
        const mandateContactPersonId =
          getNum(params.get('mandateContactPersonId')) ??
          getNum(params.get('id'));

        // robust detection: prefer routeConfig path, else url segments
        const routePath = this.route.snapshot.routeConfig?.path ?? '';
        const segments = url.map((s) => s.path);
        const isView =
          routePath.includes('/view') ||
          segments.includes('view') ||
          routePath.includes('view-mandate-contact-persons');
        const isEdit =
          routePath.includes('/edit') ||
          segments.includes('edit') ||
          (!!mandateContactPersonId && !isView);

        return { leasingId, mandateContactPersonId, isView, isEdit };
      }),
      tap(({ leasingId, isView, isEdit }) => {
        this.editMode = isEdit;
        this.viewOnly = isView;

        if (leasingId != null) {
          this.addMandateContactPersonForm.patchValue(
            { mandateId: leasingId },
            { emitEvent: false }
          );
        }

        // Apply disable/enable right away (idempotent)
        if (this.viewOnly) {
          this.addMandateContactPersonForm.disable({ emitEvent: false });
        } else {
          this.addMandateContactPersonForm.enable({ emitEvent: false });
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
          Number(params.get('mandateContactPersonId')) ||
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
        this.patchMandate(mcp);

        // enforce readonly if view mode
        if (this.viewOnly) {
          this.addMandateContactPersonForm.disable({ emitEvent: false });
        }
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
      `/crm/leasing-mandates/view-mandate-contact-persons/${leasingId}/${leasingMandatesId}`,
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
