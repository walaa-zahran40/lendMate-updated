import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilChanged, filter, take } from 'rxjs';
import { FollowupTypesFacade } from '../../../store/followup-types/followup-types.facade';
import { FollowupType } from '../../../store/followup-types/folllowup-type.model';

@Component({
  selector: 'app-add-followup-types',
  standalone: false,
  templateUrl: './add-followup-types.component.html',
  styleUrl: './add-followup-types.component.scss',
})
export class AddFollowupTypesComponent {
  editMode: boolean = false;
  viewOnly = false;
  addFollowUpTypesCommunicationForm!: FormGroup;
  clientId: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: FollowupTypesFacade,
    private router: Router
  ) {}

  ngOnInit() {
    this.addFollowUpTypesCommunicationForm = this.fb.group({
      id: [null], // ← new hidden control
      name: [
        '',
        [Validators.required], // 2nd slot (sync)
      ],
      nameAR: [
        '',
        [Validators.required, , Validators.pattern(/^[\u0600-\u06FF\s]+$/)],
      ],
      isActive: [true], // ← new hidden control
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        // we have an id → edit mode
        this.editMode = true;
        this.clientId = +id;

        // disable if it’s view mode via ?mode=view
        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) {
          this.addFollowUpTypesCommunicationForm.disable();
        }

        // 3. load the existing record & patch the form
        // this.facade.loadById(this.clientId);
        this.facade.loadById(this.clientId);
        // setTimeout(() => {
        // }, 2000);
        this.facade.selected$
          .pipe(
            filter((ct) => !!ct),
            distinctUntilChanged((prev, curr) => prev.id === curr.id)
          )
          .subscribe((ct) => {
            console.log(ct);
            this.addFollowUpTypesCommunicationForm.patchValue({
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
          this.addFollowUpTypesCommunicationForm.disable();
        }
      }
    });
  }

  addOrEditFollowupType() {
    console.log('💥 addFollowupTypes() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addFollowUpTypesCommunicationForm.valid);
    console.log(
      '  form touched:',
      this.addFollowUpTypesCommunicationForm.touched
    );
    console.log(
      '  form raw value:',
      this.addFollowUpTypesCommunicationForm.getRawValue()
    );

    // Print individual control errors
    const nameCtrl = this.addFollowUpTypesCommunicationForm.get('name');
    const nameARCtrl = this.addFollowUpTypesCommunicationForm.get('nameAR');
    console.log('  name.errors:', nameCtrl?.errors);
    console.log('  nameAR.errors:', nameARCtrl?.errors);

    if (this.viewOnly) {
      console.log('⚠️ viewOnly mode — aborting add');
      return;
    }

    if (this.addFollowUpTypesCommunicationForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addFollowUpTypesCommunicationForm.markAllAsTouched();
      return;
    }

    const { name, nameAR, isActive } =
      this.addFollowUpTypesCommunicationForm.value;
    const payload: Partial<FollowupType> = { name, nameAR, isActive };
    console.log('  → payload object:', payload);

    // Double-check your route param
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(clientId):', routeId);

    if (this.editMode) {
      const { id, name, nameAR, isActive } =
        this.addFollowUpTypesCommunicationForm.value;
      const payload: FollowupType = { id, name, nameAR, isActive };
      console.log(
        '🔄 Dispatching UPDATE id=',
        this.clientId,
        ' payload=',
        payload
      );
      this.facade.update(id, payload);
    } else {
      console.log('➕ Dispatching CREATE payload=', payload);
      this.facade.create(payload);
    }
    if (this.addFollowUpTypesCommunicationForm.valid) {
      this.addFollowUpTypesCommunicationForm.markAsPristine();
    }

    this.router.navigate(['/lookups/view-followup-types']);
  }
  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.addFollowUpTypesCommunicationForm.dirty;
  }
}
