import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CompanyTypesFacade } from '../../store/company-types/company-types.facade';

@Component({
  selector: 'app-add-company-types',
  standalone: false,
  templateUrl: './add-company-types.component.html',
  styleUrl: './add-company-types.component.scss',
})
export class AddCompanyTypesComponent {
  clientId!: number;
  editMode: boolean = false;
  companyTypesForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: CompanyTypesFacade,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    console.log('[Route Snapshot] Full Params:', this.route.snapshot.paramMap);

    this.clientId = +this.route.snapshot.paramMap.get('clientId')!;

    console.log('[Init] clientId:', this.clientId);
    console.log('[Init] editMode:', this.editMode);

    this.companyTypesForm = this.fb.group({});

    if (this.editMode) {
      // this.facade.loadClientFileById(this.documentId!); // ✅ correct call
    }
  }

  addCompanyTypes() {
    console.log('Entered addCompanyTypes method');

    if (this.companyTypesForm.invalid) {
      this.companyTypesForm.markAllAsTouched();
      return;
    }

    if (this.editMode) {
      // 🎯 EDIT MODE: Send JSON body, not FormData
      const updatePayload = {};

      console.log('[Edit Mode] Sending update payload:', updatePayload);

      // this.facade.update(
      //    this.documentId!,
      //    updatePayload);

      this.messageService.add({
        severity: 'success',
        summary: 'Updated',
        detail: 'Document updated successfully',
      });

      this.router.navigate(['/crm/clients/view-upload-documents'], {
        queryParams: { id: this.clientId },
      });
    } else {
      // 🎯 ADD MODE

      const formData = new FormData();
      formData.append('clientId', this.clientId.toString());
      // formData.append('expiryDate', this.formatDateWithoutTime(expiryDate));
      // formData.append('documentTypeId', docTypeId.toString());
      // formData.append('file', file);

      // this.facade.uploadClientFile(formData, this.clientId);

      this.router.navigate(['/lookups/view-company-types'], {
        queryParams: { id: this.clientId },
      });
    }
  }
}
