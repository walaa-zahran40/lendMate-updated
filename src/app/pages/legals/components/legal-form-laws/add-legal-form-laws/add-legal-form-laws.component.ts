import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { arabicOnlyValidator } from '../../../../../shared/validators/arabic-only.validator';
import { filter, take } from 'rxjs';
import { LegalFormLawsFacade } from '../../../store/legal-form-laws/legal-form-laws.facade';
import { LegalFormLaw } from '../../../store/legal-form-laws/legal-form-law.model';

@Component({
  selector: 'app-add-legal-forms-laws',
  standalone: false,
  templateUrl: './add-legal-form-laws.component.html',
  styleUrl: './add-legal-form-laws.component.scss',
})
export class AddLegalFormLawsComponent {
  editMode: boolean = false;
  viewOnly = false;
  addLegalFormLawsForm!: FormGroup;
  clientId: any;
  entityId?: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: LegalFormLawsFacade,
    private router: Router
  ) {}

  ngOnInit() {
    this.addLegalFormLawsForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required]],
      nameAR: ['', [Validators.required, arabicOnlyValidator]],
      isActive: [true],
    });

    // mode=view → disable form
    this.viewOnly = this.route.snapshot.queryParamMap.get('mode') === 'view';
    if (this.viewOnly) this.addLegalFormLawsForm.disable();

    // If resolver delivered an entity → edit mode
    const resolved = this.route.snapshot.data[
      'legalFormLaw'
    ] as LegalFormLaw | null;
    if (resolved) {
      this.editMode = true;
      this.entityId = resolved.id;
      this.addLegalFormLawsForm.patchValue({
        id: resolved.id,
        name: resolved.name,
        nameAR: resolved.nameAR,
        isActive: resolved.isActive,
      });
    }
  }

  addOrEditLegalFormLaw() {
    if (this.viewOnly) return;

    if (this.addLegalFormLawsForm.invalid) {
      this.addLegalFormLawsForm.markAllAsTouched();
      return;
    }

    if (this.editMode && this.entityId != null) {
      const { id, name, nameAR, isActive } = this.addLegalFormLawsForm.value;
      const payload: LegalFormLaw = { id, name, nameAR, isActive, code: '' };
      this.facade.update(id, payload);
    } else {
      const { name, nameAR } = this.addLegalFormLawsForm.value;
      this.facade.create({ name, nameAR });
    }

    this.addLegalFormLawsForm.markAsPristine();
    this.router.navigate(['/legals/view-legal-form-laws']);
  }

  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.addLegalFormLawsForm.dirty;
  }
}
