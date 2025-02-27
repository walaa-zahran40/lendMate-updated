import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-forms',
  standalone: false,
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss',
})
export class FormsComponent {
  //ngModel Values
  value: string | undefined;
  value1: string | undefined;
  value2: string | undefined;
  value3: string | undefined;
  value4: string | undefined;
  value5: string | undefined;
  value6: string | undefined;
  value7: string | undefined;
  value8: string | undefined;
  value9: string | undefined;
  value10: string | undefined;
  value11: string | undefined;
  value12: string | undefined;
  value13: string | undefined;
  value14: string | undefined;
  value15: string | undefined;
  value16: string | undefined;
  value17: string | undefined;
  value18: string | undefined;
  value19: string | undefined;
  value20: string | undefined;
  value21: string | undefined;
  value22: string | undefined;
  value23: string | undefined;
  value24: string | undefined;
  value25: string | undefined;
  value26: string | undefined;
  value27: string | undefined;
  value28: string | undefined;
  value29: string | undefined;
  value30: string | undefined;
  value31: string | undefined;
  value32: string | undefined;
  value33: string | undefined;
  value34: string | undefined;
  value35: string | undefined;
  value36: string | undefined;
  value37: string | undefined;
  value38: string | undefined;
  value39: string | undefined;
  value40: string | undefined;
  value41: string | undefined;
  value42: string | undefined;
  value43: string | undefined;
  value44: string | undefined;
  value45: string | undefined;
  value46: string | undefined;
  value47: string | undefined;
  value48: string | undefined;
  value49: string | undefined;
  value50: string | undefined;
  value51: string | undefined;
  value52: string | undefined;
  //options
  sectors!: any[];
  crAuthorityOffices!: any[];
  selectedSectors!: any[];
  sectorsIndividual!: any[];
  selectedSectorsIndividual!: any[];
  legalFormLaw!: any[];
  selectedLegalFormLaw!: any[];
  subSectors!: any[];
  selectedSubSectors!: any[];
  documents!: any[];
  selectedDocuments!: any[];
  areas!: any[];
  selectedAreas!: any[];
  governments!: any[];
  selectedGovernments!: any[];
  addresses!: any[];
  selectedAddresses!: any[];
  subSectorsIndividual!: any[];
  selectedSubSectorsIndividual!: any[];
  identityIndividual!: any[];
  selectedIdentityIndividual!: any[];
  selectedIsActiveContactPerson!: any[];
  areasContactPerson!: any[];
  governmentContactPerson!: any[];
  countryContactPerson!: any[];
  selectedIsMainContactPerson!: any[];
  selectedGendersContactPerson!: any[];
  addressTypeContactPerson!: any[];
  selectIdentityTypeContactPerson!: any[];
  selectedPhoneTypeContactPerson!: any[];
  shareHolderNames!: any[];
  selectedSectorsShowCompanyOnly!: any[];
  selectedSubSectorsShowCompanyOnly!: any[];
  selectedLegalFormLawCompanyViewOnly!: any[];
  selectedLegalFormCompanyViewOnly!: any[];
  selectedIsStampCompanyViewOnly!: any[];
  stamps!: any[];
  genders!: any[];
  selectedGenders!: any[];
  countries!: any[];
  selectedCountries!: any[];
  phoneTypes!: any[];
  selectedPhoneTypes!: any[];
  legalForm!: any[];
  selectedLegalForm!: any[];
  selectedDocumentTypes!: any[];
  isMain!: any[];
  selectedIsMain!: any[];
  isActive!: any[];
  selectedIsActive!: any[];
  companyTypes!: any[];
  shareHolderTypes!: any[];
  officerNames!: any[];
  officerTypes!: any[];
  clientNames!: any[];
  selectedClientNames!: any[];
  selectedMandateValidityUnit!: any[];
  products!: any[];
  selectedProducts!: any[];
  insuredBy!: any[];
  selectedInsuredBy!: any[];
  leasingTypes!: any[];
  selectedLeasingTypes!: any[];
  actions!: any[];
  selectedActions!: any[];
  officerTypesMandates!: any[];
  selectedOfficerTypesMandate!: any[];
  selectedAssestTypesMandate!: any[];
  assestTypesMandates!: any[];
  selectedContactPersonTypesMandate!: any[];
  contactPersonTypesMandates!: any[];
  //dates
  date: Date | undefined;
  date1: Date | undefined;
  date2: Date | undefined;
  date3: Date | undefined;
  date4: Date | undefined;
  date5: Date | undefined;
  date6: Date | undefined;
  date7: Date | undefined;
  date8: Date | undefined;
  //inputs
  @Input() title!: string;
  @Input() titleIndividual!: string;
  @Input() descriptionIndividual!: string;
  @Input() addClient!: boolean;
  @Input() description!: string;
  @Input() addClientShowMain!: boolean;
  @Input() addAddressShowMain!: boolean;
  @Input() clientOnboardingCompanyShowMain!: boolean;
  @Input() clientOnboardingIndividualShowMain!: boolean;
  @Input() addCRAuthorityOfficeShowMain!: boolean;
  @Input() uploadDocumentsShowMain!: boolean;
  @Input() addSalesShowMain!: boolean;
  @Input() addPhoneNumbersShowMain!: boolean;
  @Input() addContactPersonShowMain!: boolean;
  @Input() addClientShowLegal!: boolean;
  @Input() addClientShowBusiness!: boolean;
  @Input() addClientShowIndividual!: boolean;
  @Input() clientOnboarding!: boolean;
  @Input() clientOnboardingShowIndividual!: boolean;
  @Input() addTaxAuthorityOfficeShowMain!: boolean;
  @Input() addCentralBankInfoShowMain!: boolean;
  @Input() addShareHolderShowMain!: boolean;
  @Input() addTMLOfficerShowMain!: boolean;
  @Input() addClientCompanyViewShowMain!: boolean;
  @Input() addClientCompanyViewShowLegal!: boolean;
  @Input() addClientCompanyViewShowBusiness!: boolean;
  @Input() contactPersonDetailsView!: boolean;
  @Input() contactPersonDetailsViewShowForm!: boolean;
  @Input() addMandateShowMoreInformationForm!: boolean;
  @Input() addMandateShowAssetTypeForm!: boolean;
  @Input() addMandateShowContactPersonsForm!: boolean;
  @Input() addMandateShowOfficersForm!: boolean;
  @Input() addMandateShowBasicForm!: boolean;
  @Input() addChildMandateShowMoreInformationForm!: boolean;
  @Input() addChildMandateShowAssetTypeForm!: boolean;
  @Input() addChildMandateShowContactPersonsForm!: boolean;
  @Input() addChildMandateShowOfficersForm!: boolean;
  @Input() addChildMandateShowBasicForm!: boolean;
  @Input() addManageMandateTermsForm!: boolean;
  constructor() {}
  ngOnInit() {
    this.sectors = [
      { name: 'Technology', code: 'T' },
      { name: 'Programming', code: 'P' },
      { name: 'Machine Learning', code: 'ML' },
    ];
    this.selectedSectorsShowCompanyOnly = [
      { name: 'Technology', code: 'T' },
      { name: 'Programming', code: 'P' },
      { name: 'Machine Learning', code: 'ML' },
    ];
    this.selectedSubSectorsShowCompanyOnly = [
      { name: 'AI', code: 'AI' },
      { name: 'Marketing Field', code: 'MF' },
    ];
    this.sectorsIndividual = [
      { name: 'Technology', code: 'T' },
      { name: 'Programming', code: 'P' },
      { name: 'Machine Learning', code: 'ML' },
    ];
    this.subSectors = [
      { name: 'AI', code: 'AI' },
      { name: 'Marketing Field', code: 'MF' },
    ];

    this.subSectorsIndividual = [
      { name: 'AI', code: 'AI' },
      { name: 'Marketing Field', code: 'MF' },
    ];
    this.legalFormLaw = [{ name: 'Form Law 206', code: '206' }];
    this.selectedLegalFormLawCompanyViewOnly = [
      { name: 'Form Law 206', code: '206' },
    ];
    this.legalForm = [{ name: 'Form Law 105', code: '105' }];
    this.selectedLegalFormCompanyViewOnly = [
      { name: 'Form Law 105', code: '105' },
    ];
    this.selectedIsStampCompanyViewOnly = [{ name: 'Yes', code: '1' }];
    this.stamps = [
      { name: 'Yes', code: '1' },
      { name: 'No', code: '0' },
    ];
    this.phoneTypes = [{ name: 'Phone Type', code: 'pt' }];
    this.companyTypes = [{ name: 'Type', code: 'type' }];
    this.documents = [
      { name: 'PDF', code: 'pdf' },
      { name: 'Word', code: 'word' },
    ];
    this.areas = [
      { name: 'Haram', code: 'haram' },
      { name: 'Andalus', code: 'andalus' },
    ];
    this.governments = [
      { name: 'Giza', code: 'giza' },
      { name: 'New Cairo', code: 'nc' },
    ];
    this.genders = [
      { name: 'Male', code: 'male' },
      { name: 'Female', code: 'female' },
    ];
    this.identityIndividual = [{ name: 'Identity', code: 'identity' }];
    this.addresses = [{ name: 'Address Type', code: 'adType' }];
    this.countries = [
      { name: 'Egypt', code: 'egypt' },
      { name: 'UAE', code: 'uae' },
    ];
    this.isActive = [
      { name: 'Yes', code: 'yes' },
      { name: 'NO', code: 'no' },
    ];
    this.isMain = [
      { name: 'Yes', code: 'yes' },
      { name: 'NO', code: 'no' },
    ];
    this.crAuthorityOffices = [
      {
        name: 'CENTRAL BANK OF EGYPT - CUSTOMER CODE',
        code: 'CC',
      },
    ];
    this.shareHolderNames = [
      {
        name: 'Name',
        code: 'name',
      },
    ];
    this.shareHolderTypes = [
      {
        name: 'Type',
        code: 'type',
      },
    ];
    this.officerNames = [
      {
        name: 'Name',
        code: 'name',
      },
    ];
    this.officerTypes = [
      {
        name: 'Type',
        code: 'type',
      },
    ];
    this.clientNames = [
      {
        name: 'Google.com',
        code: 'google',
      },
    ];
    this.selectedClientNames = [
      {
        name: 'Google.com',
        code: 'google',
      },
    ];
    this.products = [
      {
        name: 'Software',
        code: 'software',
      },
    ];
    this.selectedProducts = [
      {
        name: 'Software',
        code: 'software',
      },
    ];
    this.selectedMandateValidityUnit = [{ name: 'Technology', code: 'T' }];
    this.officerTypesMandates = [{ name: 'Officer', code: 'o' }];
    this.selectedOfficerTypesMandate = [{ name: 'Officer', code: 'o' }];
    this.actions = [{ name: 'Identity', code: 'id' }];
    this.selectedActions = [{ name: 'Identity', code: 'id' }];

    this.insuredBy = [{ name: 'Microsoft', code: 'M' }];
    this.selectedInsuredBy = [{ name: 'Microsoft', code: 'M' }];
    this.leasingTypes = [{ name: 'LeasingType', code: 'LT' }];
    this.selectedLeasingTypes = [{ name: 'LeasingType', code: 'LT' }];
  }
}
