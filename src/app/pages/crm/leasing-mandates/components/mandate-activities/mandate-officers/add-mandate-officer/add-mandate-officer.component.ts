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
  EMPTY,
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
  ) {
    // Build form: mandateId must equal leasingId
    this.addMandateOfficerForm = this.fb.group({
      id: [null],
      mandateId: [this.leasingId, Validators.required], // <-- from leasingId
      officerId: [null, Validators.required],
      isActive: [true],
    });
  }

  ngOnInit() {
    // Read params once
    this.leasingId = this.num(this.route.snapshot.paramMap.get('leasingId'));
    this.leasingMandatesId = this.num(
      this.route.snapshot.paramMap.get('leasingMandatesId')
    );
    this.mandateOfficerId = this.num(
      this.route.snapshot.paramMap.get('mandateOfficerId')
    );

    // Load officers dropdown
    this.officersFacade.loadAll();
    this.officers$ = this.officersFacade.items$;

    const route$ = combineLatest({
      params: this.route.paramMap,
      url: this.route.url,
    }).pipe(
      map(({ params, url }) => {
        const leasingId = this.num(params.get('leasingId'));
        const leasingMandatesId = this.num(params.get('leasingMandatesId'));
        const mandateOfficerId = this.num(params.get('mandateOfficerId'));
        const isView = url.some((s) => s.path === 'view'); // /.../view/...
        const isEdit = !!mandateOfficerId && !isView; // /.../edit/:id

        // payload mandateId follows leasingId
        const mandateId = leasingId;

        return {
          leasingId,
          leasingMandatesId,
          mandateOfficerId,
          mandateId,
          isEdit,
          isView,
        };
      }),
      tap(({ mandateId, isView, isEdit }) => {
        this.editMode = isEdit;
        this.viewOnly = isView;

        if (mandateId != null) {
          this.addMandateOfficerForm.patchValue({ mandateId });
        }

        // apply disable/enable immediately on mode change
        if (this.viewOnly) {
          this.addMandateOfficerForm.disable({ emitEvent: false });
        } else {
          this.addMandateOfficerForm.enable({ emitEvent: false });
        }
      }),
      switchMap(({ mandateOfficerId, isView, isEdit }) => {
        // For both edit and view, load the row when :mandateOfficerId exists
        if (mandateOfficerId == null || (!isEdit && !isView)) return EMPTY;

        this.facade.loadOne(mandateOfficerId); // dispatch

        // read it from store and patch once it arrives
        return this.facade.selectById(mandateOfficerId).pipe(
          filter((x): x is MandateOfficer => !!x),
          take(1)
        );
      })
    );

    route$.pipe(takeUntil(this.destroy$)).subscribe((officer) => {
      this.patchMandate(officer);
      // ensure disabled in view (idempotent)
      if (this.viewOnly)
        this.addMandateOfficerForm.disable({ emitEvent: false });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private patchMandate(m: MandateOfficer) {
    this.addMandateOfficerForm.patchValue({
      id: m.id,
      mandateId: m.mandateId,
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
