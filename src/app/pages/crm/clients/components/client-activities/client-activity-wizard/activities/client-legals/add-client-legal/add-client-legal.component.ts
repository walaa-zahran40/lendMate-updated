import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil, filter, of } from 'rxjs';
import { LegalForm } from '../../../../../../../../legals/store/legal-forms/legal-form.model';
import { LegalFormLaw } from '../../../../../../../../legals/store/legal-form-laws/legal-form-law.model';
import { ClientLegalsFacade } from '../../../../../../store/client-legals/client-legals.facade';
import { loadLegalFormLaws } from '../../../../../../../../legals/store/legal-form-laws/legal-form-laws.actions';
import { loadLegalForms } from '../../../../../../../../legals/store/legal-forms/legal-forms.actions';
import { selectLegalForms } from '../../../../../../../../legals/store/legal-forms/legal-forms.selectors';
import { selectLegalFormLaws } from '../../../../../../../../legals/store/legal-form-laws/legal-form-laws.selectors';
import { ClientLegal } from '../../../../../../store/client-legals/client-legal.model';

@Component({
  selector: 'app-add-client-legal',
  standalone: false,
  templateUrl: './add-client-legal.component.html',
  styleUrl: './add-client-legal.component.scss',
})
export class AddClientLegalsComponent {
  mode!: 'add' | 'edit' | 'view';
  editMode: boolean = false;
  viewOnly = false;
  addClientLegalsLookupsForm!: FormGroup;
  retrivedId: any;
  legalFormsList$!: Observable<LegalForm[]>;
  legalFormLawsList$!: Observable<LegalFormLaw[]>;
  clientId: any;
  recordId!: number;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: ClientLegalsFacade,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    const bundle = this.route.snapshot.data['bundle'] as {
      mode: 'add' | 'edit' | 'view';
      record?: ClientLegal;
      legalForms: LegalForm[];
      legalFormLaws: LegalFormLaw[];
      clientIdFromQP?: number;
    };

    this.mode = bundle.mode;
    this.editMode = this.mode === 'edit';
    this.viewOnly = this.mode === 'view';
    this.clientId =
      bundle.clientIdFromQP ??
      Number(this.route.snapshot.paramMap.get('clientId'));

    this.addClientLegalsLookupsForm = this.fb.group({
      id: [null],
      clientId: [null, [Validators.required]],
      legalFormId: [null, [Validators.required]],
      legalFormLawId: [null, [Validators.required]],
      isActive: [true],
      isStampDuty: [true],
    });

    // Resolver-fed lookups:
    this.legalFormsList$ = of(bundle.legalForms);
    this.legalFormLawsList$ = of(bundle.legalFormLaws);

    if (this.mode === 'add') {
      this.addClientLegalsLookupsForm.patchValue({ clientId: this.clientId });
    } else if (bundle.record) {
      const r = bundle.record;
      this.retrivedId = r.id;
      this.addClientLegalsLookupsForm.patchValue({
        id: r.id,
        clientId: this.clientId,
        legalFormId: r.legalFormId,
        legalFormLawId: r.legalFormLawId,
        isActive: r.isActive ?? true,
        isStampDuty: r.isStampDuty ?? true,
      });
      if (this.viewOnly) this.addClientLegalsLookupsForm.disable();
    }
  }

  addOrEditClientLegals() {
    const clientParamQP = this.route.snapshot.queryParamMap.get('clientId');

    console.log('💥 addClientLegals() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addClientLegalsLookupsForm.valid);
    console.log('  form touched:', this.addClientLegalsLookupsForm.touched);
    console.log(
      '  form raw value:',
      this.addClientLegalsLookupsForm.getRawValue()
    );

    if (this.addClientLegalsLookupsForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addClientLegalsLookupsForm.markAllAsTouched();
      return;
    }

    this.addClientLegalsLookupsForm.patchValue({
      clientId: clientParamQP,
    });

    const { legalFormId, legalFormLawId, isStampDuty, clientId, isActive } =
      this.addClientLegalsLookupsForm.value;
    const payload: Partial<ClientLegal> = {
      legalFormId,
      legalFormLawId,
      isStampDuty,
      clientId,
      isActive,
    };
    console.log('  → payload object:', payload);

    const data = this.addClientLegalsLookupsForm.value as Partial<ClientLegal>;
    console.log('📦 Payload going to facade:', data);

    // Double-check your route param
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(retrivedId):', routeId);

    // 7) Create vs. update
    if (this.mode === 'add') {
      console.log('➕ Dispatching CREATE');
      this.facade.create(payload);
    } else {
      console.log('✏️ Dispatching UPDATE id=', data.id);
      this.facade.update(data.id!, data);
    }

    if (this.addClientLegalsLookupsForm.valid) {
      this.addClientLegalsLookupsForm.markAsPristine();
    }
    if (clientParamQP) {
      console.log('➡️ Navigating back with PATH param:', clientParamQP);
      this.router.navigate(['/crm/clients/view-client-legals', clientParamQP]);
    } else if (clientParamQP) {
      console.log(
        '➡️ Navigating back with QUERY param fallback:',
        clientParamQP
      );
      this.router.navigate([
        `/crm/clients/view-client-legals/${clientParamQP}`,
      ]);
    } else {
      console.error('❌ Cannot navigate back: clientId is missing!');
    }
    // console.log('🧭 Navigating away to view-client-addresses');
    // this.router.navigate(['/organizations/view-client-addresses']);
  }
  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.addClientLegalsLookupsForm.dirty;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
