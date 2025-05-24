import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil, filter } from 'rxjs';
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
    console.log('🟢 ngOnInit start');
    // 1️⃣ Read route parameters
    console.log(this.route.snapshot, 'route');
    this.clientId = Number(this.route.snapshot.queryParams['clientId']);

    this.mode =
      (this.route.snapshot.queryParamMap.get('mode') as
        | 'add'
        | 'edit'
        | 'view') ?? 'add';
    this.editMode = this.mode === 'edit';
    this.viewOnly = this.mode === 'view';
    console.log('🔍 Params:', {
      clientId: this.clientId,
      mode: this.mode,
      editMode: this.editMode,
      viewOnly: this.viewOnly,
    });

    this.addClientLegalsLookupsForm = this.fb.group({
      id: [null],
      clientId: [null, [Validators.required]],
      legalFormId: [null, [Validators.required]],
      legalFormLawId: [null, [Validators.required]],
      isActive: [true],
      isStampDuty: [true],
    });
    console.log(
      '🛠️ Form initialized with defaults:',
      this.addClientLegalsLookupsForm.value
    );
    // 2️⃣ Dispatch actions to load lookup data
    console.log('🚀 Dispatching lookup loads');
    this.store.dispatch(loadLegalForms());
    this.store.dispatch(loadLegalFormLaws());

    this.legalFormsList$ = this.store.select(selectLegalForms);
    this.legalFormLawsList$ = this.store.select(selectLegalFormLaws);

    // Patch for add mode
    if (this.mode === 'add') {
      this.addClientLegalsLookupsForm.patchValue({
        clientId: this.clientId,
      });
      console.log('✏️ Add mode → patched clientId:', this.clientId);
    }

    // Patch for edit/view mode
    if (this.editMode || this.viewOnly) {
      this.recordId = Number(this.route.snapshot.paramMap.get('id'));
      this.facade.loadOne(this.recordId);

      this.facade.current$
        .pipe(
          takeUntil(this.destroy$),
          filter((rec) => !!rec)
        )
        .subscribe((ct) => {
          console.log('red', ct);
          this.addClientLegalsLookupsForm.patchValue({
            id: ct?.id,
            legalFormId: ct?.legalFormId,
            legalFormLawId:ct?.legalFormLawId,
            clientId: this.clientId,
            isActive: ct?.isActive,
            isStampDuty: ct?.isStampDuty
          });
        });
    }
  }

  addOrEditClientLegals() {
    const clientParamQP = this.route.snapshot.queryParamMap.get('clientId');

    console.log('💥 addClientLegals() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addClientLegalsLookupsForm.valid);
    console.log(
      '  form touched:',
      this.addClientLegalsLookupsForm.touched
    );
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

    const {legalFormId,legalFormLawId,isStampDuty, clientId, isActive } =
      this.addClientLegalsLookupsForm.value;
    const payload: Partial<ClientLegal> = {
      legalFormId,
      legalFormLawId,
      isStampDuty,
      clientId,
      isActive,
    };
    console.log('  → payload object:', payload);

    const data = this.addClientLegalsLookupsForm
      .value as Partial<ClientLegal>;
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

    if (clientParamQP) {
      console.log('➡️ Navigating back with PATH param:', clientParamQP);
      this.router.navigate([
        '/crm/clients/view-client-legals',
        clientParamQP,
      ]);
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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
