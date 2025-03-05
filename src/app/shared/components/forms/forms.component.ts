import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-forms',
  standalone: false,
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss',
})
export class FormsComponent implements AfterViewInit {
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
  value53: string | undefined;
  value54: string | undefined;
  value55: string | undefined;
  value56: string | undefined;
  value57: string | undefined;
  value58: string | undefined;
  value59: string | undefined;
  value60: string | undefined;
  value61: string | undefined;
  value62: string | undefined;
  value63: string | undefined;
  value64: string | undefined;
  value65: string | undefined;
  value66: string | undefined;
  value67: string | undefined;
  value68: string | undefined;
  value69: string | undefined;
  value70: string | undefined;
  //options
  sectors!: any;
  crAuthorityOffices!: any;
  selectedSectors!: any;
  sectorsIndividual!: any;
  selectedSectorsIndividual!: any;
  legalFormLaw!: any;
  selectedLegalFormLaw!: any;
  subSectors!: any;
  selectedSubSectors!: any;
  currencyExchangeLookups!: any;
  selectedCurrencyExchangeLookups!: any;
  documents!: any;
  selectedDocuments!: any;
  areas!: any;
  selectedAreas!: any;
  codes!: any;
  selectedCodes!: any;
  governments!: any;
  selectedGovernments!: any;
  addresses!: any;
  selectedAddresses!: any;
  subSectorsIndividual!: any;
  selectedSubSectorsIndividual!: any;
  identityIndividual!: any;
  selectedIdentityIndividual!: any;
  selectedIsActiveContactPerson!: any;
  areasContactPerson!: any;
  governmentContactPerson!: any;
  countryContactPerson!: any;
  selectedIsMainContactPerson!: any;
  selectedGendersContactPerson!: any;
  addressTypeContactPerson!: any;
  selectIdentityTypeContactPerson!: any;
  selectedPhoneTypeContactPerson!: any;
  shareHolderNames!: any;
  selectedSectorsShowCompanyOnly!: any;
  selectedSubSectorsShowCompanyOnly!: any;
  selectedLegalFormLawCompanyViewOnly!: any;
  selectedLegalFormCompanyViewOnly!: any;
  selectedIsStampCompanyViewOnly!: any;
  stamps!: any;
  genders!: any;
  selectedGenders!: any;
  countries!: any;
  selectedCountries!: any;
  phoneTypes!: any;
  selectedPhoneTypes!: any;
  legalForm!: any;
  selectedLegalForm!: any;
  selectedDocumentTypes!: any;
  isMain!: any;
  selectedIsMain!: any;
  isActive!: any;
  selectedIsActive!: any;
  companyTypes!: any;
  shareHolderTypes!: any;
  officerNames!: any;
  officerTypes!: any;
  clientNames!: any;
  selectedClientNames!: any;
  selectedMandateValidityUnit!: any;
  products!: any;
  selectedProducts!: any;
  exchangeRateCurrencies!: any;
  selectedExchangeRateCurrencies!: any;
  insuredBy!: any;
  selectedInsuredBy!: any;
  leasingTypes!: any;
  selectedLeasingTypes!: any;
  actions!: any;
  selectedActions!: any;
  officerTypesMandates!: any;
  selectedOfficerTypesMandate!: any;
  selectedAssestTypesMandate!: any;
  assestTypesMandates!: any;
  selectedContactPersonTypesMandate!: any;
  contactPersonTypesMandates!: any;
  gracePeriodUnits!: any;
  selectedGracePeriodUnits!: any;
  paymentPeriods!: any;
  selectedPaymentPeriods!: any;
  currencyExchangeRate!: any;
  selectedCurrencyExchangeRate!: any;
  paymentMonthDays!: any;
  selectedPaymentMonthDays!: any;
  paymentMethods!: any;
  selectedPaymentMethods!: any;
  rentStructures!: any;
  selectedRentStructures!: any;
  paymentTimeTerms!: any;
  selectedPaymentTimeTerms!: any;
  interestRateBenchMarks!: any;
  selectedInterestRateBenchMarks!: any;
  isManualExchangeRates!: any;
  selectedIsManualExchangeRates!: any;
  meetingTypeAddMeeting!: any;
  selectedMeetingTypeAddMeeting!: any;
  communicationFlowAddMeeting!: any;
  selectedCommunicationFlowAddMeeting!: any;
  countryAddMeeting!: any;
  selectedCountryAddMeeting!: any;
  governorateAddMeeting!: any;
  selectedGovernorateAddMeeting!: any;
  areaAddMeeting!: any;
  selectedAreaAddMeeting!: any;
  officerAddMeeting!: any;
  selectedOfficerAddMeeting!: any;
  contactPersonsFollowupsPoints!: any;
  officersFollowupsPoints!: any;
  communicationFlowAddCall!: any;
  selectedCommunicationFlowAddCall!: any;
  callActionTypeAddCall!: any;
  selectedCallActionTypeAddCall!: any;
  callTypeAddCall!: any;
  selectedCallTypeAddCall!: any;
  departments!: any;
  teams!: any;
  pages!: any;
  selectedStamps!: any;
  //checkboxes
  selectedOfficers: any[] = [];
  selectedContactPersons = [];
  selectedAssestTypes = [];
  size: any = true;
  size1: any = true;

  officers: any[] = [
    {
      name: 'Is Responsible',
      key: 'IR',
      description:
        'Is responsible to hold and run the meeting with other team members',
    },
    {
      name: 'Must Attend',
      key: 'MA',
      description:
        'Must attend to hold and run the meeting with other team members',
    },
  ];
  roles: any[] = [
    {
      name: 'Active',
      key: 'A',
    },
  ];

  selectedRoles: any[] = [
    {
      name: 'Active',
      key: 'A',
    },
  ];
  operations: any[] = [
    {
      name: 'Active',
      key: 'A',
    },
  ];
  selectedOperations: any[] = [
    {
      name: 'Active',
      key: 'A',
    },
  ];
  assestTypes: any[] = [
    {
      name: 'Is Active',
      key: 'IA',
      description:
        'Must attend to hold and run the meeting with other team members',
    },
  ];
  contactPersons: any[] = [
    {
      name: 'Must Attend',
      key: 'MA',
      description:
        'Must attend to hold and run the meeting with other team members',
    },
  ];
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
  date9 = '09/08/2025';
  date10 = '09/08/2025';
  date11 = '09/08/2025';
  date12 = '09/08/2025';
  date13 = '09/08/2025';
  date14 = '09/08/2025';
  date15 = '09/08/2025';
  date16 = '09/08/2025';
  date17 = '09/08/2025';
  date18 = '09/08/2025';
  date19 = '09/08/1997';
  date20 = '09/08/1997';
  date21 = '09/08/1997';
  date22 = '09/08/1997';
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
  @Input() leasingFinancialFormShowCurrencyForm!: boolean;
  @Input() leasingFinancialFormShowRatesForm!: boolean;
  @Input() leasingFinancialFormShowBasicForm!: boolean;
  @Input() addLegalsLegalForm!: boolean;
  @Input() addLegalsLegalFormLaw!: boolean;
  @Input() addCompanyTypesLookupsForm!: boolean;
  @Input() addMeetingShowBusinessInformationForm!: boolean;
  @Input() addMeetingShowAssetTypeForm!: boolean;
  @Input() addMeetingShowContactPersonsForm!: boolean;
  @Input() addMeetingShowOfficersForm!: boolean;
  @Input() addMeetingShowBasicForm!: boolean;
  @Input() addCallShowBusinessInformationForm!: boolean;
  @Input() addCallShowContactPersonsForm!: boolean;
  @Input() addCallShowOfficersForm!: boolean;
  @Input() addCallShowBasicForm!: boolean;
  @Input() addFollowUpsCommunicationForm!: boolean;
  @Input() addFollowUpsPointsCommunicationForm!: boolean;
  @Input() addMeetingTypesCommunicationForm!: boolean;
  @Input() addFollowUpTypesCommunicationForm!: boolean;
  @Input() addCallTypesCommunicationForm!: boolean;
  @Input() addDepartmentsORGForm!: boolean;
  @Input() addDepartmentManagerORGForm!: boolean;
  @Input() addTeamORGForm!: boolean;
  @Input() addTeamLeadORGForm!: boolean;
  @Input() addTeamMemberORGForm!: boolean;
  @Input() addRoleORGForm!: boolean;
  @Input() addOperationORGForm!: boolean;
  @Input() addPageOperationORGForm!: boolean;
  @Input() addOfficerORGForm!: boolean;
  @Input() addSignatoryOfficerORGForm!: boolean;
  @Input() addFeeCalculationTypesLookupsForm!: boolean;
  @Input() addMandateStatusesLookupsForm!: boolean;
  @Input() addInterestRateBenchmarksLookupsForm!: boolean;
  @Input() addFeesTypesLookupsForm!: boolean;
  @Input() addGracePeriodUnitsLookupsForm!: boolean;
  @Input() addRentStructureTypesLookupsForm!: boolean;
  @Input() addCurrenciesLookupsForm!: boolean;
  @Input() addCurrenciesExchangeLookupsForm!: boolean;
  @Input() addPaymentMethodsLookupsForm!: boolean;
  @Input() addPaymentTypesLookupsForm!: boolean;
  @Input() addPaymentMonthDaysLookupsForm!: boolean;
  @Input() addMeetingTypesLookupsForm!: boolean;
  @Input() addInsuredByLookupsForm!: boolean;
  @Input() addLeasingTypeLookupsForm!: boolean;
  @Input() addMandateValidityUnitLookupsForm!: boolean;
  @Input() addClientDocumentTypesLookupsForm!: boolean;
  @Input() addBranchLookupsForm!: boolean;
  @Input() addBranchManagersLookupsForm!: boolean;
  @Input() addBusinessLinesLookupsForm!: boolean;
  @Input() addBranchAddressesLookupsForm!: boolean;
  @Input() addBranchOfficersLookupsForm!: boolean;
  @Input() addAssestTypesLookupsForm!: boolean;
  @Input() addAssestTypeCategoriesLookupsForm!: boolean;
  @Input() addProductsLookupsForm!: boolean;
  @Input() addSectorsLookupsForm!: boolean;
  @Input() addClientStatusesLookupsForm!: boolean;
  @Input() addStatusActionsLookupsForm!: boolean;
  @Input() addSMEClientCodeLookupsForm!: boolean;
  @Input() addSubSectorsLookupsForm!: boolean;
  @Input() addClientTypesLookupsForm!: boolean;
  @Input() addAuthorityOfficesLookupsForm!: boolean;
  @Input() addPhoneTypesLookupsForm!: boolean;
  @Input() addAddressTypesLookupsForm!: boolean;
  @Input() addGovernoratesLookupsForm!: boolean;
  @Input() addCountriesLookupsForm!: boolean;
  @Input() addIdentificationTypesLookupsForm!: boolean;
  @Input() addAreasLookupsForm!: boolean;
  @Input() addTaxOfficesLookupsForm!: boolean;
  @Input() addTmlOfficerTypeLookupsForm!: boolean;
  @Input() addcallTypesLookupsForm!: boolean;
  @Input() addCommunicationTypesLookupsForm!: boolean;
  @Input() addCallActionTypeLookupsForm!: boolean;
  @Input() addCommunicationFlowTypeLookupsForm!: boolean;
  constructor(private cdr: ChangeDetectorRef) {}

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
    this.currencyExchangeRate = [{ name: 'USD', code: 'USD' }];
    this.selectedCurrencyExchangeRate = { name: 'USD', code: 'USD' };
    this.isManualExchangeRates = [{ name: 'YES', code: 'yes' }];
    this.selectedIsManualExchangeRates = { name: 'YES', code: 'yes' };
    this.interestRateBenchMarks = [{ name: 'Corridor', code: 'corridor' }];
    this.selectedInterestRateBenchMarks = {
      name: 'Corridor',
      code: 'corridor',
    };
    this.paymentTimeTerms = [{ name: 'In Arrear', code: 'inArrear' }];
    this.selectedPaymentTimeTerms = {
      name: 'In Arrear',
      code: 'inArrear',
    };
    this.paymentMethods = [{ name: 'BSO', code: 'bso' }];
    this.selectedPaymentMethods = {
      name: 'BSO',
      code: 'bso',
    };
    this.rentStructures = [{ name: 'FixedRent', code: 'fixedRent' }];
    this.selectedRentStructures = {
      name: 'FixedRent',
      code: 'fixedRent',
    };
    this.paymentMonthDays = [{ name: 'May', code: 'may' }];
    this.selectedPaymentMonthDays = { name: 'May', code: 'may' };
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
    this.selectedStamps = { name: 'Yes', code: '1' };
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
    this.selectedAreas = [{ name: 'Giza', code: 'giza' }];
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
    this.selectedCountries = [{ name: 'Egypt', code: 'egypt' }];
    this.codes = [{ name: 'Office', code: 'office' }];
    this.selectedCodes = [{ name: 'Office', code: 'office' }];

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
    this.selectedGracePeriodUnits = [{ name: '100', code: '100' }];
    this.gracePeriodUnits = [{ name: '100', code: '100' }];
    this.paymentPeriods = [{ name: '50', code: '50' }];

    this.selectedPaymentPeriods = { name: '50', code: '50' };
    this.gracePeriodUnits = [{ name: '100', code: '100' }];

    this.selectedGracePeriodUnits = { name: '100', code: '100' };
    this.meetingTypeAddMeeting = [{ name: 'Business', code: 'Business' }];
    this.selectedMeetingTypeAddMeeting = [
      { name: 'Business', code: 'Business' },
    ];
    this.communicationFlowAddMeeting = [
      { name: 'Technology', code: 'Technology' },
      { name: 'Programming', code: 'Programming' },
      { name: 'Machine Learning', code: 'MachineLearning' },
    ];
    this.selectedCommunicationFlowAddMeeting = [
      { name: 'Technology', code: 'Technology' },
      { name: 'Programming', code: 'Programming' },
      { name: 'Machine Learning', code: 'MachineLearning' },
    ];
    this.countryAddMeeting = [{ name: 'Egypt', code: 'Egypt' }];
    this.selectedCountryAddMeeting = [{ name: 'Egypt', code: 'Egypt' }];
    this.governorateAddMeeting = [{ name: 'Cairo', code: 'Cairo' }];
    this.selectedGovernorateAddMeeting = [{ name: 'Cairo', code: 'Cairo' }];
    this.areaAddMeeting = [{ name: 'New Cairo', code: 'New Cairo' }];
    this.selectedAreaAddMeeting = [{ name: 'New Cairo', code: 'New Cairo' }];
    this.officerAddMeeting = [{ name: 'Form Law 206', code: 'Form Law 206' }];
    this.selectedOfficerAddMeeting = [
      { name: 'Form Law 206', code: 'Form Law 206' },
    ];
    this.selectedOfficers = [this.officers[0]];

    this.contactPersonsFollowupsPoints = [{ name: 'Officer', code: 'Officer' }];
    this.officersFollowupsPoints = [{ name: 'Officer', code: 'Officer' }];
    this.callTypeAddCall = [{ name: 'Business', code: 'Business' }];
    this.selectedCallTypeAddCall = [{ name: 'Business', code: 'Business' }];
    this.callActionTypeAddCall = [{ name: 'Egypt', code: 'Egypt' }];
    this.selectedCallActionTypeAddCall = [{ name: 'Egypt', code: 'Egypt' }];
    this.communicationFlowAddCall = [
      { name: 'Technology', code: 'Technology' },
      { name: 'Programming', code: 'Programming' },
      { name: 'Machine Learning', code: 'MachineLearning' },
    ];
    this.selectedCommunicationFlowAddCall = [
      { name: 'Technology', code: 'Technology' },
      { name: 'Programming', code: 'Programming' },
      { name: 'Machine Learning', code: 'MachineLearning' },
    ];
    this.departments = [{ name: 'Department', code: 'Department' }];
    this.teams = [{ name: 'Team', code: 'Team' }];
    this.pages = [
      {
        name: 'Page',
        key: 'page',
      },
    ];
    this.selectedCurrencyExchangeLookups = [
      {
        name: 'EGP',
        key: 'eGP',
      },
    ];
    this.currencyExchangeLookups = [
      {
        name: 'EGP',
        key: 'eGP',
      },
    ];
    this.exchangeRateCurrencies = [
      {
        name: '50%',
        key: '50%',
      },
    ];
    this.selectedExchangeRateCurrencies = [
      {
        name: '50%',
        key: '50%',
      },
    ];
  }
  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
}
