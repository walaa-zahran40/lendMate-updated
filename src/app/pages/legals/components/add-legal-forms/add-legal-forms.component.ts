import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { arabicOnlyValidator } from '../../../../shared/validators/arabic-only.validator';
import { filter, take } from 'rxjs';
import { LegalFormsFacade } from '../../../lookups/store/legal-forms/legal-forms.facade';
import { LegalForm } from '../../../lookups/store/legal-forms/legal-form.model';

@Component({
  selector: 'app-add-legal-forms',
  standalone: false,
  templateUrl: './add-legal-forms.component.html',
  styleUrl: './add-legal-forms.component.scss',
})
export class AddLegalFormsComponent {
  editMode: boolean = false;
  viewOnly = false;
  addLegalFormsForm!: FormGroup;
  clientId: any;

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

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.editMode = true;
        this.clientId = +id;

        console.log(this.viewOnly);

        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) {
          this.addLegalFormsForm.disable();
        }

        this.facade.loadOne(this.clientId);
        this.facade.current$
          .pipe(
            filter((ct): ct is LegalForm => !!ct && ct.id === this.clientId),
            take(1)
          )
          .subscribe((ct) => {
            this.addLegalFormsForm.patchValue({
              id: ct!.id,
              name: ct!.name,
              nameAR: ct!.nameAR,
              isActive: ct!.isActive,
            });
          });
      } else {
        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) {
          this.addLegalFormsForm.disable();
        }
      }
    });
  }

  addOrEditLegalForm() {
    if (this.viewOnly) {
      return;
    }

    if (this.addLegalFormsForm.invalid) {
      this.addLegalFormsForm.markAllAsTouched();
      return;
    }

    const { name, nameAR } = this.addLegalFormsForm.value;
    const payload: Partial<LegalForm> = { name, nameAR };
    console.log('  → payload object:', payload);

    if (this.editMode) {
      const { id, name, nameAR, isActive } = this.addLegalFormsForm.value;
      const payload: LegalForm = {
        id,
        name,
        nameAR,
        isActive,
        code: '',
      };

      this.facade.update(id, payload);
    } else {
      this.facade.create(payload);
    }

    this.router.navigate(['/legals/view-legal-forms']);
  }
}
