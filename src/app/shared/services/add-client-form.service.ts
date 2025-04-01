import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AddClientFormService {
  // 1) Company data split by step for clarity.
  companyMain = {
    nameEnglish: '',
    nameArabic: '',
    selectedSectors: [],
    selectedSubSectors: [],
    businessActivity: '',
    taxId: '',
    shortName: '',
  };

  companyLegal = {
    selectedLegalFormLaw: [],
    selectedLegalForm: [],
    stampDuty: '',
  };

  companyBusiness = {
    mainShare: '',
    marketShare: '',
    establishedYear: '',
    website: '',
    marketSize: '',
    noOfEmployees: '',
  };

  // 2) Individual data
  individual = {
    nameEnglish: '',
    nameArabic: '',
    businessActivity: '',
    selectedSectors: [],
    selectedSubSectors: [],
    shortName: '',
    jobTitle: '',
    taxId: '',
    dateOfBirth: '',
    gender: '',
    identificationNumber: '',
    selectedIdentity: [],
  };

  constructor() {}

  // ---------------------------
  // Save to localStorage
  // ---------------------------
  saveCompanyToLocalStorage() {
    // Combine all company objects into one if needed:
    const fullCompanyData = {
      ...this.companyMain,
      ...this.companyLegal,
      ...this.companyBusiness,
    };
    localStorage.setItem('companyData', JSON.stringify(fullCompanyData));
  }

  saveIndividualToLocalStorage() {
    localStorage.setItem('individualData', JSON.stringify(this.individual));
  }

  // OPTIONAL: load from localStorage if you want
  // to pre-fill on page refresh, etc.
  loadCompanyFromLocalStorage() {
    const data = localStorage.getItem('companyData');
    if (!data) return;
    const parsed = JSON.parse(data);
    // Patch each partial object:
    Object.assign(this.companyMain, {
      nameEnglish: parsed.nameEnglish || '',
      nameArabic: parsed.nameArabic || '',
      selectedSectors: parsed.selectedSectors || [],
      selectedSubSectors: parsed.selectedSubSectors || [],
      businessActivity: parsed.businessActivity || '',
      taxId: parsed.taxId || '',
      shortName: parsed.shortName || '',
    });
    Object.assign(this.companyLegal, {
      selectedLegalFormLaw: parsed.selectedLegalFormLaw || [],
      selectedLegalForm: parsed.selectedLegalForm || [],
      stampDuty: parsed.stampDuty || '',
    });
    Object.assign(this.companyBusiness, {
      mainShare: parsed.mainShare || '',
      marketShare: parsed.marketShare || '',
      establishedYear: parsed.establishedYear || '',
      website: parsed.website || '',
      marketSize: parsed.marketSize || '',
      noOfEmployees: parsed.noOfEmployees || '',
    });
  }

  loadIndividualFromLocalStorage() {
    const data = localStorage.getItem('individualData');
    if (!data) return;
    const parsed = JSON.parse(data);
    Object.assign(this.individual, {
      nameEnglish: parsed.nameEnglish || '',
      nameArabic: parsed.nameArabic || '',
      businessActivity: parsed.businessActivity || '',
      selectedSectors: parsed.selectedSectors || [],
      selectedSubSectors: parsed.selectedSubSectors || [],
      shortName: parsed.shortName || '',
      jobTitle: parsed.jobTitle || '',
      taxId: parsed.taxId || '',
      dateOfBirth: parsed.dateOfBirth || '',
      gender: parsed.gender || '',
      identificationNumber: parsed.identificationNumber || '',
      selectedIdentity: parsed.selectedIdentity || [],
    });
  }
}
