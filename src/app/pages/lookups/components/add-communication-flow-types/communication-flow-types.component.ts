import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, take } from 'rxjs';
import { CommunicationFlowType } from '../../store/communication-flow-types/communication-flow-type.model';
import { CommunicationFlowTypesFacade } from '../../store/communication-flow-types/communication-flow-types.facade';

@Component({
  selector: 'app-communication-flow-types',
  standalone: false,
  templateUrl: './communication-flow-types.component.html',
  styleUrl: './communication-flow-types.component.scss',
})
export class AddCommunicationFlowTypesComponent {
  editMode: boolean = false;
  viewOnly = false;
  addCommunicationFlowTypesLookupsForm!: FormGroup;
  communicationFlowId: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: CommunicationFlowTypesFacade,
    private router: Router
  ) {}

  ngOnInit() {
    this.addCommunicationFlowTypesLookupsForm = this.fb.group({
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
        this.communicationFlowId = +id;

        // disable if it’s view mode via ?mode=view
        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) {
          this.addCommunicationFlowTypesLookupsForm.disable();
        }

        // 3. load the existing record & patch the form
        this.facade.loadById(this.communicationFlowId);
        this.facade.selected$
          .pipe(
            filter(
              (ct): ct is CommunicationFlowType =>
                !!ct && ct.id === this.communicationFlowId
            ),
            take(1)
          )
          .subscribe((ct) => {
            this.addCommunicationFlowTypesLookupsForm.patchValue({
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
          this.addCommunicationFlowTypesLookupsForm.disable();
        }
      }
    });
  }

  addOrEditCommunicationFlowType() {
    console.log('💥 add CommunicationFlowTypes()');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log(
      '  form valid:',
      this.addCommunicationFlowTypesLookupsForm.valid
    );
    console.log(
      '  form touched:',
      this.addCommunicationFlowTypesLookupsForm.touched
    );
    console.log(
      '  form raw value:',
      this.addCommunicationFlowTypesLookupsForm.getRawValue()
    );

    // Print individual control errors
    const nameCtrl = this.addCommunicationFlowTypesLookupsForm.get('name');
    const nameARCtrl = this.addCommunicationFlowTypesLookupsForm.get('nameAR');
    console.log('  name.errors:', nameCtrl?.errors);
    console.log('  nameAR.errors:', nameARCtrl?.errors);

    if (this.viewOnly) {
      console.log('⚠️ viewOnly mode — aborting add');
      return;
    }

    if (this.addCommunicationFlowTypesLookupsForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addCommunicationFlowTypesLookupsForm.markAllAsTouched();
      return;
    }

    const { name, nameAR, isActive } =
      this.addCommunicationFlowTypesLookupsForm.value;
    const payload: Partial<CommunicationFlowType> = { name, nameAR, isActive };
    console.log('  → payload object:', payload);

    // Double-check your route param
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(communicationFlowId):', routeId);

    if (this.editMode) {
      const { id, name, nameAR, isActive } =
        this.addCommunicationFlowTypesLookupsForm.value;
      const payload: CommunicationFlowType = { id, name, nameAR, isActive };
      console.log(
        '🔄 Dispatching UPDATE id=',
        this.communicationFlowId,
        ' payload=',
        payload
      );
      this.facade.update(id, payload);
    } else {
      console.log('➕ Dispatching CREATE payload=', payload);
      this.facade.create(payload);
    }

    console.log('🧭 Navigating away to view communication flow types');
    this.router.navigate(['/lookups/view-communication-flow-types']);
  }
}
