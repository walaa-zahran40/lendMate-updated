import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, Subject, take, takeUntil } from 'rxjs';
import { Officer } from '../../../store/officers/officer.model';
import { OfficersFacade } from '../../../store/officers/officers.facade';
import { SignatoryOfficer } from '../../../store/signatory-officers/signatory-officer.model';
import { SignatoryOfficersFacade } from '../../../store/signatory-officers/signatory-officers.facade';

@Component({
  selector: 'app-add-signatory-officer',
  standalone: false,
  templateUrl: './add-signatory-officer.component.html',
  styleUrl: './add-signatory-officer.component.scss',
})
export class AddSignatoryOfficerComponent {
  editMode: boolean = false;
  viewOnly = false;
  addSignatoryOfficersLookupsForm!: FormGroup;
  clientId: any;
  officers: Officer[] = [];

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: SignatoryOfficersFacade,
    private router: Router,
    private officersFacade: OfficersFacade
  ) {}

  ngOnInit() {
    this.addSignatoryOfficersLookupsForm = this.fb.group({
      id: [null],
      officerId: [null, Validators.required],
      startDate: [null, Validators.required],
      isActive: [true],
    });

    // Load officer dropdown
    this.officersFacade.loadAll();
    this.officersFacade.items$
      .pipe(takeUntil(this.destroy$))
      .subscribe((list) => (this.officers = list));

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        // we have an id → edit mode
        this.editMode = true;
        this.clientId = +id;

        // disable if it’s view mode via ?mode=view
        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) {
          this.addSignatoryOfficersLookupsForm.disable();
        }

        // 3. load the existing record & patch the form
        this.facade.loadById(this.clientId);
        this.facade.selected$
          .pipe(
            filter(
              (ct): ct is SignatoryOfficer => !!ct && ct.id === this.clientId
            ),
            take(1)
          )

          .subscribe((ct) => {
            this.addSignatoryOfficersLookupsForm.patchValue({
              id: ct!.id,
              officerId: ct!.officerId,
              startDate: new Date(ct!.startDate),
              isActive: ct!.isActive,
            });
          });
      } else {
        // no id → add mode: still check if ?mode=view
        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) {
          this.addSignatoryOfficersLookupsForm.disable();
        }
      }
    });
  }

  addOrEditSignatoryOfficer() {
    console.log('💥 addSignatoryOfficers() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addSignatoryOfficersLookupsForm.valid);
    console.log(
      '  form touched:',
      this.addSignatoryOfficersLookupsForm.touched
    );
    console.log(
      '  form raw value:',
      this.addSignatoryOfficersLookupsForm.getRawValue()
    );

    // Print individual control errors
    const nameCtrl = this.addSignatoryOfficersLookupsForm.get('name');
    const nameARCtrl = this.addSignatoryOfficersLookupsForm.get('nameAR');
    console.log('  name.errors:', nameCtrl?.errors);
    console.log('  nameAR.errors:', nameARCtrl?.errors);

    if (this.viewOnly) return;
    if (this.addSignatoryOfficersLookupsForm.invalid) {
      this.addSignatoryOfficersLookupsForm.markAllAsTouched();
      return;
    }

    const routeId = +this.route.snapshot.paramMap.get('id')!; // edit mode has this
    const { officerId, startDate, isActive } =
      this.addSignatoryOfficersLookupsForm.getRawValue();

    if (this.addSignatoryOfficersLookupsForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addSignatoryOfficersLookupsForm.markAllAsTouched();
      return;
    }

    const payload: Partial<SignatoryOfficer> = { officerId, startDate };
    console.log('  → payload object:', payload);

    console.log('  route.snapshot.paramMap.get(clientId):', routeId);

    if (this.editMode) {
      const routeId = +this.route.snapshot.paramMap.get('id')!;
      const { officerId, startDate, isActive } =
        this.addSignatoryOfficersLookupsForm.getRawValue();
      const payload: SignatoryOfficer = {
        id: routeId,
        officerId,
        startDate,
        isActive,
      };
      this.facade.update(routeId, payload);
    } else {
      const payload: Partial<SignatoryOfficer> = {
        officerId,
        startDate,
        isActive,
      };
      this.facade.create(payload);
    }
    if (this.addSignatoryOfficersLookupsForm.valid) {
      this.addSignatoryOfficersLookupsForm.markAsPristine();
    }

    console.log('🧭 Navigating away to view-signatory-officers');
    this.router.navigate(['/organizations/view-signatory-officers']);
  }
  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.addSignatoryOfficersLookupsForm.dirty;
  }
}
