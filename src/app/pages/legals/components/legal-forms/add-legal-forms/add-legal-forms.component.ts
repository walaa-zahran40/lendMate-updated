import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { arabicOnlyValidator } from '../../../../../shared/validators/arabic-only.validator';
import { filter, take } from 'rxjs';
import { LegalFormsFacade } from '../../../store/legal-forms/legal-forms.facade';
import { LegalForm } from '../../../store/legal-forms/legal-form.model';

@Component({
  selector: 'app-add-legal-forms',
  standalone: false,
  templateUrl: './add-legal-forms.component.html',
  styleUrl: './add-legal-forms.component.scss',
})
export class AddLegalFormsComponent {
  addLegalFormsForm!: FormGroup;
  editMode = false;
  viewOnly = false;
  private entityId?: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: LegalFormsFacade,
    private router: Router
  ) {}

  ngOnInit() {
    this.addLegalFormsForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required]],
      nameAR: ['', [Validators.required, arabicOnlyValidator]],
      isActive: [true],
    });

    // view mode
    this.viewOnly = this.route.snapshot.queryParamMap.get('mode') === 'view';
    if (this.viewOnly) this.addLegalFormsForm.disable();

    // resolved entity → edit mode
    const resolved = this.route.snapshot.data['legalForm'] as LegalForm | null;
    if (resolved) {
      this.editMode = true;
      this.entityId = resolved.id;
      this.addLegalFormsForm.patchValue({
        id: resolved.id,
        name: resolved.name,
        nameAR: resolved.nameAR,
        isActive: resolved.isActive,
      });
    }
  }

  addOrEditLegalForm() {
    if (this.viewOnly) return;

    if (this.addLegalFormsForm.invalid) {
      this.addLegalFormsForm.markAllAsTouched();
      return;
    }

    if (this.editMode && this.entityId != null) {
      const { id, name, nameAR, isActive } = this.addLegalFormsForm.value;
      const payload: LegalForm = { id, name, nameAR, isActive, code: '' };
      this.facade.update(id, payload);
    } else {
      const { name, nameAR } = this.addLegalFormsForm.value;
      this.facade.create({ name, nameAR });
    }

    this.addLegalFormsForm.markAsPristine();
    this.router.navigate(['/legals/view-legal-forms']);
  }

  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.addLegalFormsForm.dirty;
  }
}
