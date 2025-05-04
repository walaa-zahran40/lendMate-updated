import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, take } from 'rxjs';
import { arabicOnlyValidator } from '../../../../shared/validators/arabic-only.validator';
import { DocumentTypesFacade } from '../../store/document-types/document-types.facade';
import { DocumentType } from '../../store/document-types/document-type.model';

@Component({
  selector: 'app-add-document-types',
  standalone: false,
  templateUrl: './add-document-types.component.html',
  styleUrl: './add-document-types.component.scss',
})
export class AddDocumentTypesComponent {
  editMode: boolean = false;
  viewOnly = false;
  addDocumentTypesLookupsForm!: FormGroup;
  clientId: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: DocumentTypesFacade,
    private router: Router
  ) {}

  ngOnInit() {
    this.addDocumentTypesLookupsForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required]],
      nameAR: ['', [Validators.required, arabicOnlyValidator]],
      relatedFilesPath: ['', [Validators.required]],
      isActive: [true],
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {

        this.editMode = true;
        this.clientId = +id;

        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) {
          this.addDocumentTypesLookupsForm.disable();
        }

        this.facade.loadOne(this.clientId);
        this.facade.current$
          .pipe(
            filter((ct) => !!ct),
            take(1)
          )
          .subscribe((ct) => {
            this.addDocumentTypesLookupsForm.patchValue({
              id: ct!.id,
              name: ct!.name,
              nameAR: ct!.nameAR,
              relatedFilesPath: ct!.relatedFilesPath,
              isActive: ct!.isActive,
            });
          });
      } else {
        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) {
          this.addDocumentTypesLookupsForm.disable();
        }
      }
    });
  }

  addOrEditDocumentType() {
    if (this.viewOnly) {
      return;
    }

    if (this.addDocumentTypesLookupsForm.invalid) {
      this.addDocumentTypesLookupsForm.markAllAsTouched();
      return;
    }

    const { name, nameAR, relatedFilesPath } =
      this.addDocumentTypesLookupsForm.value;
    const payload: Partial<DocumentType> = { name, nameAR, relatedFilesPath};

    if (this.editMode) {
      const { id, name, nameAR, relatedFilesPath, isActive } =
        this.addDocumentTypesLookupsForm.value;
      const payload: DocumentType = {
        id,
        name,
        nameAR,
        relatedFilesPath,
        isActive,
        code: '',
      };
      this.facade.update(id, payload);
    } else {
      this.facade.create(payload);
    }

    this.router.navigate(['/lookups/view-document-types']);
  }
}
