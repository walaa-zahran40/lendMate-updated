import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddClientFormService } from '../../../../shared/services/add-client-form.service';

@Component({
  selector: 'app-add-client',
  standalone: false,
  templateUrl: './add-client.component.html',
  styleUrl: './add-client.component.scss',
})
export class AddClientComponent {
  // COMPANY: 3 steps => 3 form groups
  companyMainForm!: FormGroup;
  companyLegalForm!: FormGroup;
  companyBusinessForm!: FormGroup;

  // INDIVIDUAL: 1 step => 1 form group
  individualForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private formService: AddClientFormService
  ) {}
  ngOnInit() {
    this.buildForms();
  }
  private buildForms() {
    // -----------------------------
    // Company - Main Information
    // -----------------------------
    this.companyMainForm = this.fb.group({
      nameEnglish: ['', [Validators.required]],
      nameArabic: ['', [Validators.required]],
      selectedSectors: [[], [Validators.required]], // Must select at least one?
      selectedSubSectors: [[], [Validators.required]], // same here
      businessActivity: ['', [Validators.required]],
      taxId: ['', [Validators.required]],
      shortName: [''], // optional
    });

    // -----------------------------
    // Company - Legal Information
    // -----------------------------
    this.companyLegalForm = this.fb.group({
      selectedLegalFormLaw: [[], [Validators.required]],
      selectedLegalForm: [[], [Validators.required]],
      stampDuty: [true, [Validators.required]],
    });

    // -----------------------------
    // Company - Business Information
    // -----------------------------
    this.companyBusinessForm = this.fb.group({
      mainShare: [''],
      marketShare: [''],
      establishedYear: [''],
      website: [''],
      marketSize: [''],
      noOfEmployees: [''],
    });

    // -----------------------------
    // Individual
    // -----------------------------
    this.individualForm = this.fb.group({
      nameEnglish: ['', [Validators.required]],
      nameArabic: ['', [Validators.required]],
      businessActivity: ['', [Validators.required]],
      selectedSectors: [[], [Validators.required]],
      selectedSubSectors: [[], [Validators.required]],
      shortName: [''],
      jobTitle: [''],
      taxId: ['', [Validators.required]],
      dateOfBirth: [''],
      gender: [''],
      identificationNumber: ['', [Validators.required]],
      selectedIdentity: [[], [Validators.required]],
    });
  }
  saveCompany() {
    // Usually we combine all 3 sub-forms into one object:
    const companyMainData = this.companyMainForm.value;
    const companyLegalData = this.companyLegalForm.value;
    const companyBusinessData = this.companyBusinessForm.value;

    const combinedCompanyData = {
      ...companyMainData,
      ...companyLegalData,
      ...companyBusinessData,
    };

    // Example: Store to localStorage
    localStorage.setItem('companyData', JSON.stringify(combinedCompanyData));

    // Or pass it to your fake-backend service
    // this.myService.saveCompanyData(combinedCompanyData);

    console.log('Saved Company Data =>', combinedCompanyData);
  }

  saveIndividual() {
    const individualData = this.individualForm.value;
    localStorage.setItem('individualData', JSON.stringify(individualData));
    console.log('Saved Individual Data =>', individualData);
  }
}
