import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  combineLatest,
  map,
  tap,
  switchMap,
  filter,
  take,
  Observable,
  Subject,
  takeUntil,
} from 'rxjs';
import { MandateOfficer } from '../../../../store/mandate-officers/mandate-officer.model';
import { MandateOfficersFacade } from '../../../../store/mandate-officers/mandate-officers.facade';
import { OfficersFacade } from '../../../../../../organizations/store/officers/officers.facade';
import { Officer } from '../../../../../../organizations/store/officers/officer.model';

@Component({
  selector: 'app-add-mandate-officer',
  standalone: false,
  templateUrl: './add-mandate-officer.component.html',
  styleUrl: './add-mandate-officer.component.scss',
})
export class AddMandateOfficerComponent implements OnInit, OnDestroy {
  editMode = false;
  viewOnly = false;

  addMandateOfficerForm!: FormGroup;

  officers$!: Observable<Officer[]>;

  // route context
  leasingId!: number | undefined; // source of TRUTH for mandateId in payload
  leasingMandatesId!: number | undefined; // still used for the list page URL
  mandateOfficerId!: number | undefined;

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: MandateOfficersFacade,
    private officersFacade: OfficersFacade,
    private router: Router
  ) {}

  ngOnInit() {
    // Read params once
    this.leasingId = this.num(this.route.snapshot.paramMap.get('leasingId'));
    this.leasingMandatesId = this.num(
      this.route.snapshot.paramMap.get('leasingMandatesId')
    );
    this.mandateOfficerId = this.num(
      this.route.snapshot.paramMap.get('mandateOfficerId')
    );

    // Build form: mandateId must equal leasingId
    this.addMandateOfficerForm = this.fb.group({
      id: [null],
      mandateId: [this.leasingId, Validators.required], // <-- from leasingId
      officerId: [null, Validators.required],
    });

    // Load officers dropdown
    this.officersFacade.loadAll();
    this.officers$ = this.officersFacade.items$;

    // React to route changes (params + query)
    const route$ = combineLatest({
      params: this.route.paramMap,
      query: this.route.queryParamMap,
    }).pipe(
      map(({ params, query }) => {
        const leasingId = this.num(params.get('leasingId'));
        const leasingMandatesId = this.num(params.get('leasingMandatesId'));
        const mandateOfficerId = this.num(params.get('mandateOfficerId'));
        const mode = (query.get('mode') || 'add').toLowerCase();

        // mandateId in payload should follow leasingId
        const mandateId = leasingId;

        return {
          leasingId,
          leasingMandatesId,
          mandateOfficerId,
          mandateId,
          mode,
        };
      }),
      tap(({ mode, mandateId }) => {
        this.editMode = mode === 'edit';
        this.viewOnly = mode === 'view';

        // keep form mandateId synced to leasingId
        if (mandateId != null)
          this.addMandateOfficerForm.patchValue({ mandateId });

        // load by mandateId (which equals leasingId)
        if (mandateId != null) this.facade.loadByMandate(mandateId);
      })
    );

    // If editing/viewing, find the record by :mandateOfficerId from the by-mandate list
    route$
      .pipe(
        switchMap(({ mandateId, mandateOfficerId }) => {
          if (mandateId == null || mandateOfficerId == null) return [];
          return this.facade.selectOfficersByMandate(mandateId).pipe(
            map((items) => items.find((x) => x.id === mandateOfficerId)),
            filter((x): x is MandateOfficer => !!x),
            take(1)
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((item) => {
        this.patchMandate(item);
        if (this.viewOnly) this.addMandateOfficerForm.disable();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private patchMandate(m: MandateOfficer) {
    this.addMandateOfficerForm.patchValue({
      id: m.id,
      mandateId: m.mandateId, // already equals leasingId by our convention
      officerId: m.officerId,
    });
  }

  onSubmit() {
    if (this.viewOnly) return;

    if (this.addMandateOfficerForm.invalid) {
      this.addMandateOfficerForm.markAllAsTouched();
      return;
    }

    const { id, mandateId, officerId } =
      this.addMandateOfficerForm.getRawValue() as MandateOfficer;

    // Ensure mandateId is leasingId before sending (defensive)
    const payloadMandateId = this.leasingId ?? mandateId;

    if (this.editMode) {
      this.facade.update({ id, mandateId: payloadMandateId!, officerId });
    } else {
      this.facade.create({ mandateId: payloadMandateId!, officerId });
    }

    this.addMandateOfficerForm.markAsPristine();
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
      `/crm/leasing-mandates/view-mandate-officers/${leasingId}/${leasingMandatesId}`,
    ]);
  }

  /** Guard hook */
  canDeactivate(): boolean {
    return !this.addMandateOfficerForm.dirty;
  }

  private num(v: string | null): number | undefined {
    if (v == null) return undefined;
    const n = Number(v);
    return Number.isFinite(n) ? n : undefined;
  }
}
