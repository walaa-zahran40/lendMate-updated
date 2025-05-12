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

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.editMode = true;
        this.clientId = +id;

        console.log(this.viewOnly);

        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) {
          this.addLegalFormLawsForm.disable();
        }

        this.facade.loadOne(this.clientId);
        this.facade.current$
          .pipe(
            filter((ct): ct is LegalFormLaw => !!ct && ct.id === this.clientId),
            take(1)
          )
          .subscribe((ct) => {
            this.addLegalFormLawsForm.patchValue({
              id: ct!.id,
              name: ct!.name,
              nameAR: ct!.nameAR,
              isActive: ct!.isActive,
            });
          });
      } else {
        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) {
          this.addLegalFormLawsForm.disable();
        }
      }
    });
  }

  addOrEditLegalFormLaw() {
    if (this.viewOnly) {
      return;
    }

    if (this.addLegalFormLawsForm.invalid) {
      this.addLegalFormLawsForm.markAllAsTouched();
      return;
    }

    const { name, nameAR } = this.addLegalFormLawsForm.value;
    const payload: Partial<LegalFormLaw> = { name, nameAR };
    console.log('  → payload object:', payload);

    if (this.editMode) {
      const { id, name, nameAR, isActive } = this.addLegalFormLawsForm.value;
      const payload: LegalFormLaw = {
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

    this.router.navigate(['/legals/view-legal-form-laws']);
  }
}
