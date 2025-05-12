import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, take } from 'rxjs';
import { CommunicationType } from '../../../store/communication-types/communication-type.model';
import { CommunicationTypesFacade } from '../../../store/communication-types/communication-types.facade';

@Component({
  selector: 'app-add-communication-types',
  standalone: false,
  templateUrl: './add-communication-types.component.html',
  styleUrl: './add-communication-types.component.scss',
})
export class AddCommunicationTypesComponent {
  editMode: boolean = false;
  viewOnly = false;
  addCommunicationTypesLookupsForm!: FormGroup;
  communicationId: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: CommunicationTypesFacade,
    private router: Router
  ) {}

  ngOnInit() {
    this.addCommunicationTypesLookupsForm = this.fb.group({
      id: [null], // ← new hidden control
      name: [
        '',
        [Validators.required], // 2nd slot (sync)
      ],
      nameAR: [
        '',
        [Validators.required, Validators.pattern(/^[\u0600-\u06FF\s]+$/)],
      ],
      isActive: [true], // ← new hidden control
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        // we have an id → edit mode
        this.editMode = true;
        this.communicationId = +id;

        // disable if it’s view mode via ?mode=view
        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) {
          this.addCommunicationTypesLookupsForm.disable();
        }

        // 3. load the existing record & patch the form
        this.facade.loadById(this.communicationId);
        this.facade.selected$
          .pipe(
            filter(
              (ct): ct is CommunicationType =>
                !!ct && ct.id === this.communicationId
            ),
            take(1)
          )
          .subscribe((ct) => {
            this.addCommunicationTypesLookupsForm.patchValue({
              id: ct!.id,
              name: ct!.name,
              nameAR: ct!.nameAR,
              isActive: ct!.isActive,
            });
          });
      } else {
        // no id → add mode: still check if ?mode=view
        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) {
          this.addCommunicationTypesLookupsForm.disable();
        }
      }
    });
  }

  addOrEditCommunicationType() {
    console.log('💥 add CommunicationTypes()');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addCommunicationTypesLookupsForm.valid);
    console.log(
      '  form touched:',
      this.addCommunicationTypesLookupsForm.touched
    );
    console.log(
      '  form raw value:',
      this.addCommunicationTypesLookupsForm.getRawValue()
    );

    // Print individual control errors
    const nameCtrl = this.addCommunicationTypesLookupsForm.get('name');
    const nameARCtrl = this.addCommunicationTypesLookupsForm.get('nameAR');
    console.log('  name.errors:', nameCtrl?.errors);
    console.log('  nameAR.errors:', nameARCtrl?.errors);

    if (this.viewOnly) {
      console.log('⚠️ viewOnly mode — aborting add');
      return;
    }

    if (this.addCommunicationTypesLookupsForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addCommunicationTypesLookupsForm.markAllAsTouched();
      return;
    }

    const { name, nameAR, isActive } =
      this.addCommunicationTypesLookupsForm.value;
    const payload: Partial<CommunicationType> = { name, nameAR, isActive };
    console.log('  → payload object:', payload);

    // Double-check your route param
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(communicationId):', routeId);

    if (this.editMode) {
      const { id, name, nameAR, isActive } =
        this.addCommunicationTypesLookupsForm.value;
      const payload: CommunicationType = { id, name, nameAR, isActive };
      console.log(
        '🔄 Dispatching UPDATE id=',
        this.communicationId,
        ' payload=',
        payload
      );
      this.facade.update(id, payload);
    } else {
      console.log('➕ Dispatching CREATE payload=', payload);
      this.facade.create(payload);
    }

    console.log('🧭 Navigating away to view communication  types');
    this.router.navigate(['/lookups/view-communication-types']);
  }
}
