import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../../../shared/interfaces/client.interface';

@Component({
  selector: 'app-add-client',
  standalone: false,
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss'],
})
export class AddClientComponent implements OnInit {
  // If you stored IDs as strings:
  clientId?: string;
  editMode = false;
  activeTabIndex = 0;
  // COMPANY: 3 steps => 3 form groups
  companyMainForm!: FormGroup;
  companyLegalForm!: FormGroup;
  companyBusinessForm!: FormGroup;

  // INDIVIDUAL: 1 step => 1 form group
  individualForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // 1) Always build forms
    this.buildForms();

    // 2) Check if there's an ID in the route
    this.clientId = this.route.snapshot.paramMap.get('id') || undefined;
    if (this.clientId) {
      this.editMode = true;
      this.loadClientData(this.clientId);
    }
  }

  /**
   * Build all form groups (both company and individual).
   * Always do this, even in edit mode,
   * so forms exist before we patch them.
   */
  private buildForms() {
    // -----------------------------
    // Company - Main Information
    // -----------------------------
    this.companyMainForm = this.fb.group({
      nameEnglish: ['', [Validators.required]],
      nameArabic: ['', [Validators.required]],
      selectedSectors: [[], [Validators.required]],
      selectedSubSectors: [[], [Validators.required]],
      businessActivity: ['', [Validators.required]],
      taxId: ['', [Validators.required]],
      shortName: [''],
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

  /**
   * Load an existing client's data from localStorage and patch it into the forms.
   */
  loadClientData(id: string) {
    const storedClients = localStorage.getItem('allClients');
    if (!storedClients) return;

    const clientArray = JSON.parse(storedClients);
    const existingClient = clientArray.find((c: any) => c.id === id);
    if (!existingClient) return;

    if (existingClient.clientType === 'company') {
      this.activeTabIndex = 0;
      this.patchCompanyForms(existingClient.fullData);
    } else {
      this.activeTabIndex = 1;
      this.patchIndividualForm(existingClient.fullData);
    }
  }

  patchCompanyForms(fullData: {
    mainData: any;
    legalData: any;
    businessData: any;
  }) {
    this.companyMainForm.patchValue(fullData.mainData);
    this.companyLegalForm.patchValue(fullData.legalData);
    this.companyBusinessForm.patchValue(fullData.businessData);
  }

  patchIndividualForm(fullData: any) {
    this.individualForm.patchValue(fullData);
  }

  /**
   * Generate a random string ID (used if you're adding a brand new client).
   */
  private generateUniqueId(): string {
    return Math.random().toString(36).substring(2, 9); // e.g. 'k9z1dk3'
  }

  /**
   * Save / Update "Company" Data
   * Checks if we're editing or creating new, merges sub-forms,
   * and updates localStorage accordingly.
   */
  saveCompany() {
    // Merge 3 sub-forms
    const companyMainData = this.companyMainForm.value;
    const companyLegalData = this.companyLegalForm.value;
    const companyBusinessData = this.companyBusinessForm.value;
    const fullCompanyData = {
      mainData: companyMainData,
      legalData: companyLegalData,
      businessData: companyBusinessData,
    };

    // For the table, let's store minimal columns:
    const idToUse =
      this.editMode && this.clientId ? this.clientId : this.generateUniqueId();

    const tableFields = {
      id: idToUse,
      nameEN: companyMainData.nameEnglish,
      nameAR: companyMainData.nameArabic,
      businessActivity: companyMainData.businessActivity,
      taxName: companyMainData.taxId,
      isIscore: true,
    };
    const clientObject = {
      ...tableFields,
      // Attach *all* data here so we can patch forms on edit
      fullData: fullCompanyData,
      clientType: 'company',
    };
    // Load or init the array
    const storedClients = localStorage.getItem('allClients');
    let clientArray: Client[] = storedClients ? JSON.parse(storedClients) : [];

    if (this.editMode && this.clientId) {
      // We're editing => replace existing
      const index = clientArray.findIndex((c: any) => c.id === this.clientId);
      if (index !== -1) {
        clientArray[index] = clientObject;
      }
    } else {
      // Adding a new client
      clientArray.push(clientObject);
    }

    localStorage.setItem('allClients', JSON.stringify(clientArray));
    this.router.navigate(['/crm/clients/view-clients']);
  }

  /**
   * Save / Update "Individual" Data
   * Similar logic to saveCompany, but with individualForm fields.
   */
  saveIndividual() {
    const individualData = this.individualForm.value;

    const idToUse =
      this.editMode && this.clientId ? this.clientId : this.generateUniqueId();

    const tableFields = {
      id: idToUse,
      nameEN: individualData.nameEnglish,
      nameAR: individualData.nameArabic,
      businessActivity: individualData.businessActivity,
      taxName: individualData.taxId,
      isIscore: true,
    };

    const clientObject = {
      ...tableFields,
      fullData: individualData,
      clientType: 'individual',
    };

    // Same localStorage update logic
    const storedClients = localStorage.getItem('allClients');
    let clientArray = storedClients ? JSON.parse(storedClients) : [];

    if (this.editMode && this.clientId) {
      const index = clientArray.findIndex((c: any) => c.id === this.clientId);
      if (index !== -1) {
        clientArray[index] = clientObject;
      }
    } else {
      clientArray.push(clientObject);
    }

    localStorage.setItem('allClients', JSON.stringify(clientArray));
    this.router.navigate(['/crm/clients/view-clients']);
  }
}
