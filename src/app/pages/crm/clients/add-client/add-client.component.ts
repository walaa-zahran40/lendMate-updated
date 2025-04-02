import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  constructor(private fb: FormBuilder, private router: Router) {}
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
      dateOfBirth: ['', [Validators.required]],
      gender: ['', [Validators.required]],
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
    const clientTableData = {
      nameEN: combinedCompanyData.nameEnglish,
      nameAR: combinedCompanyData.nameArabic,
      businessActivity: combinedCompanyData.businessActivity,
      isIscore: true,
      taxName: combinedCompanyData.taxId,
    };

    const storedClients = localStorage.getItem('allClients');
    let clientArray = storedClients ? JSON.parse(storedClients) : [];
    clientArray.push(clientTableData);
    localStorage.setItem('allClients', JSON.stringify(clientArray));

    this.router.navigate(['/crm/clients/view-clients']);
  }

  saveIndividual() {
    const individualData = this.individualForm.value;
    const clientTableData = {
      nameEN: individualData.nameEnglish,
      nameAR: individualData.nameArabic,
      businessActivity: individualData.businessActivity,
      isIscore: true,
      taxName: individualData.taxId,
    };
    const storedClients = localStorage.getItem('allClients');
    let clientArray = storedClients ? JSON.parse(storedClients) : [];
    clientArray.push(clientTableData);
    localStorage.setItem('allClients', JSON.stringify(clientArray));
    this.router.navigate(['/crm/clients/view-clients']);
  }
}
