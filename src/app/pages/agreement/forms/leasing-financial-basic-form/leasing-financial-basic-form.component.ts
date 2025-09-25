import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import {
  SafeUrl,
  DomSanitizer,
  SafeResourceUrl,
} from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { FileUpload, FileSelectEvent } from 'primeng/fileupload';
import {
  Observable,
  Subscription,
  debounceTime,
  combineLatest,
  startWith,
  map,
  take,
  filter,
} from 'rxjs';
import { CompanyLegalDetails } from '../../../../shared/interfaces/company-legal-details.interface';
import { setFormDirty } from '../../../crm/clients/store/client-form/client-form.actions';
import { LegalFormLawFacade } from '../../../legals/store/legal-form-law/legal-form-law.facade';
import { LegalFormsFacade } from '../../../legals/store/legal-forms/legal-forms.facade';
import { Currency } from '../../../lookups/store/currencies/currency.model';
import { IdentificationType } from '../../../lookups/store/identification-types/identification-type.model';
import { Sector } from '../../../lookups/store/sectors/sector.model';
import { selectAllSectors } from '../../../lookups/store/sectors/sectors.selectors';
import { SubSector } from '../../../lookups/store/sub-sectors/sub-sector.model';
import { selectAllSubSectors } from '../../../lookups/store/sub-sectors/sub-sectors.selectors';
import { PageOperation } from '../../../organizations/store/page-operations/page-operation.model';
export interface IdentityEntry {
  identificationNumber: string;
  selectedIdentities: any[];
  isMain: boolean;
}
export interface PageOperationGroup {
  pageName: string;
  pageOperations: PageOperation[];
}
type PreviewItem = {
  name: string;
  type: string;
  url: string;
  file: File;
  safeUrl?: SafeResourceUrl;
};

@Component({
  selector: 'app-leasing-financial-basic-form',
  standalone: false,
  templateUrl: './leasing-financial-basic-form.component.html',
  styleUrl: './leasing-financial-basic-form.component.scss',
})
export class LeasingFinancialBasicFormComponent implements OnInit, OnDestroy {
  @Input() formGroup: FormGroup = new FormGroup({});
  @Input() viewOnly = false;
  companyLegalDetail: CompanyLegalDetails = {};
  @Output() addIdentity = new EventEmitter<void>();
  @Output() downloadFile = new EventEmitter<any>();
  optionLabelKey = 'name';
  filterByField = 'name';
  @Input() existingFileName?: string;
  @Input() existingFileUrl?: string; // optional, only if you have a download endpoint
  @Input() existingFileId?: number;

  @Output() removeIdentity = new EventEmitter<number>();
  @Output() onCheckboxChange = new EventEmitter<any>();
  selectedPaymentPeriod: any;
  selectedGracePeriodUnit: any;
  @Input() addAgreementShowFeeForm!: boolean;
  @Input() phoneTypeOptions!: any;
  @Input() identityTypeOptions!: IdentificationType[];
  @Output() addPhoneType = new EventEmitter<void>();
  @Output() removePhoneType = new EventEmitter<number>();
  @Output() addCommunicationOfficer = new EventEmitter<void>();
  @Output() removeCommunicationOfficer = new EventEmitter<number>();
  @Input() addMandateContactPersonForm!: boolean;
  @Output() addCommunicationAssetType = new EventEmitter<void>();
  @Output() removeCommunicationAssetType = new EventEmitter<number>();

  @Output() addCommunicationContactPerson = new EventEmitter<void>();
  @Output() removeCommunicationContactPerson = new EventEmitter<number>();

  @Output() addOfficer = new EventEmitter<void>();
  @Output() removeOfficer = new EventEmitter<number>();
  @Output() addContactPerson = new EventEmitter<void>();
  @Output() removeContactPerson = new EventEmitter<number>();
  @Output() addAssetType = new EventEmitter<void>();
  @Output() removeAssetType = new EventEmitter<number>();
  @Output() addFee = new EventEmitter<void>();
  @Output() removeFee = new EventEmitter<number>();
  @Output() addGracePeriod = new EventEmitter<void>();
  @Output() removeGracePeriod = new EventEmitter<number>();
  @Output() viewContactPersons = new EventEmitter<number>();

  id!: string;
  @Input() applyReusable: boolean = false;
  @Input() selectedFile!: any;
  @Input() title: string = '';
  @Input() pageOperationGroups!: PageOperationGroup[];

  @Input() description: string = '';
  @Input() addClientShowMain?: boolean;
  @Input() addClientShowLegal?: boolean;
  @Input() addClientShowBusiness?: boolean;
  @Input() addClientOnboardingForm?: boolean;
  @Input() addClientShowIndividual?: boolean;
  @Input() addClient?: boolean;
  //Select Box
  @Input() sectorsList: any;
  @Input() businessLinesList: any;
  @Input() departments: any;
  @Input() subSectorsData: any;
  @Input() subSectorsList: any[] = [];
  @Input() countriesList: any;
  @Input() addressTypesList: any;
  @Input() addressTypes: any;
  @Input() authorityOfficesList: any;
  @Input() companyTypesList: any;
  @Input() smeClientCodesList: any;
  @Input() taxOfficesList: any;
  @Input() assetTypeCategories: any;
  @Input() feeCalculationTypes: any;
  @Input() notificationGroups: any;
  @Input() phoneTypes: any;
  @Input() identityTypes: any;
  @Input() areas: any;
  @Input() identificationTypes: any;
  @Input() countries: any;
  @Input() callActionTypes: any;
  @Input() governorates: any;
  @Input() teamDepartments: any;
  @Input() governoratesList: any;
  @Input() feeTypes: any;
  @Input() assetTypes: any;
  @Input() meetingTypes: any;
  @Input() authorizationGroups: any;
  @Input() areasList: any;
  @Input() currencies: any;
  @Input() currencyExchangeRates: any;
  @Input() manualExchangeRates: any;
  @Input() selectedSectorId: number | null = null;
  @Input() selectedSubSectorId: number | null = null;
  @Input() legalFormLawIdControl!: number;
  selectedLegalFormLawId: number | null = null;
  @Input() legalFormId: number | null = null;
  @Input() conditionExpressions: any;
  @Input() officersList: any;
  @Input() clientsList: any;
  @Input() tmlOfficerTypesList: any;
  @Input() clientOfficerTypesList: any;
  @Input() legalFormsList: any;
  @Input() legalFormLawsList: any;
  @Input() pageIds: any;
  @Input() authorizationGroupsList: any;
  @Input() notificationGroupsList: any;
  @Input() paymentPeriods: any;
  @Input() gracePeriodUnits: any;
  selectedLegalForm: any;
  @Output() sectorChanged = new EventEmitter<number>();
  selectedCurrency: Currency | null = null;
  @Input() addMandateShowFinancialActivityForm!: boolean;
  sectorsSafe$!: Observable<Sector[]>;
  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};
  @Output() selectionChanged = new EventEmitter<any>();
  @Output() selectionChangedPaymentPeriod = new EventEmitter<any>();
  @Output() selectionChangedGracePeriod = new EventEmitter<any>();
  @Output() selectionChangedCurrency = new EventEmitter<any>();
  @Output() selectionChangedCurrencyExchange = new EventEmitter<any>();
  @Output() selectionChangedRateBenchmark = new EventEmitter<any>();
  @Output() selectionChangedPaymentTimingTerm = new EventEmitter<any>();
  @Output() selectionChangedRentStructure = new EventEmitter<any>();
  @Output() selectionChangedPaymentMethod = new EventEmitter<any>();
  @Output() selectionChangedPaymentMonthDay = new EventEmitter<any>();
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
  selectedDocuments!: any;
  @Input() documents: any[] = [];
  @ViewChild('fileUploader') fileUploader!: FileUpload;
  operationField: 'name' | 'nameAR' = 'name';

  selectedAreas!: any;
  codes!: any;
  selectedCodes!: any;
  governments!: any;
  selectedGovernments!: any;
  addresses!: any;
  selectedAddresses!: any;
  subSectorsIndividual!: any;
  selectedSubSectorsIndividual!: any;
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
  @Input() paymentTimingTerms!: any;
  @Input() interestRateBenchmarks!: any;

  stamps!: any;
  genders = [
    { id: 1, value: 'Male' },
    { id: 2, value: 'Female' },
  ];

  conditionTypes = [
    { id: 1, value: 'Expression' },
    { id: 2, value: 'Function' },
    { id: 3, value: 'Both' },
  ];

  expiryDate!: Date;
  selectedGenders!: any;
  selectedCountries!: any;
  selectedPhoneTypes!: any;
  legalForm!: any;
  selectedDocumentTypes!: any;
  isMain!: any;
  maxDateOfBirth = new Date(); // today
  minDateOfBirth = new Date();
  selectedIsMain!: any;
  isActive!: any;
  @Input() rentStructureTypes!: any;
  selectedPaymentTimingTerm: any;
  selectedRentStructureType: any;
  selectedPaymentMethod: any;
  selectedPaymentMonthDay: any;
  existingFileSafeUrl?: SafeUrl;
  selectedIsActive!: any;
  companyTypes!: any;
  shareHolderTypes!: any;
  officerNames!: any;
  officerTypes!: any;
  @Input() clientNames!: any;
  @Input() validityUnits!: any;
  @Input() products!: any;
  @Input() leasingTypes!: any;
  @Input() insuredBy!: any;
  @Input() officers!: any;
  @Input() contactPersonsList!: any;
  @Input() assetTypesList!: any;
  @Input() feesList!: any;
  @Input() contactPersons!: any;
  @Input() callTypes!: any;
  @Input() gracePeriodUnitsList!: any;
  selectedClientNames!: any;
  selectedMandateValidityUnit!: any;
  selectedProducts!: any;
  exchangeRateCurrencies!: any;
  selectedExchangeRateCurrencies!: any;
  selectedInsuredBy!: any;
  selectedLeasingTypes!: any;
  actions!: any;
  selectedActions!: any;
  officerTypesMandates!: any;
  selectedOfficerTypesMandate!: any;
  selectedAssestTypesMandate!: any;
  assestTypesMandates!: any;
  selectedContactPersonTypesMandate!: any;
  contactPersonTypesMandates!: any;
  selectedGracePeriodUnits!: any;
  selectedPaymentPeriods!: any;
  currencyExchangeRate!: any;
  selectedCurrencyExchangeRate!: any;
  @Input() paymentMonthDays!: any;
  selectedPaymentMonthDays!: any;
  @Input() paymentMethods!: any;
  @Input() previewUrl: any;
  selectedPaymentMethods!: any;
  @Input() rentStructures!: any;
  selectedRentStructures!: any;
  @Input() paymentTimeTerms!: any;
  selectedPaymentTimeTerms!: any;
  @Input() interestRateBenchMarks!: any;
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
  teams!: any;
  pages!: any;
  selectedStamps!: any;
  selectedCompanyTypes!: any;
  //checkboxes
  selectedOfficers: any[] = [];
  selectedContactPersons = [];
  selectedAssestTypes = [];
  size: any = true;
  size1: any = true;

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
  @Input() titleIndividual!: string;
  @Input() descriptionIndividual!: string;
  @Input() addClientAddressesLookupsForm!: boolean;
  @Input() clientOnboardingCompanyShowMain!: boolean;
  @Input() clientOnboardingIndividualShowMain!: boolean;
  @Input() addCRAuthorityOfficeShowMain!: boolean;
  @Input() uploadDocumentsShowMain!: any;
  @Input() addSalesShowMain!: boolean;
  @Input() addPhoneNumbersShowMain!: boolean;
  @Input() addClientPhoneNumberForm!: boolean;
  @Input() addClientIdentityForm!: boolean;
  @Input() addClientContactPersonForm!: boolean;
  @Input() addContactPersonShowMain!: boolean;
  @Input() clientOnboarding!: boolean;
  @Input() clientOnboardingShowIndividual!: boolean;
  @Input() addTaxAuthorityOfficeShowMain!: boolean;
  @Input() addCentralBankInfoShowMain!: boolean;
  @Input() addShareHolderShowMain!: boolean;
  @Input() addTMLOfficerShowMain!: boolean;
  @Input() statusList: any;
  @Input() communicationFlowTypes: any;
  @Input() workflowActionTypeList: any;
  @Input() addClientCompanyViewShowMain!: boolean;
  @Input() addClientCompanyViewShowLegal!: boolean;
  @Input() addClientCompanyViewShowBusiness!: boolean;
  @Input() contactPersonDetailsView!: boolean;
  @Input() contactPersonDetailsViewShowForm!: boolean;
  //Leasing Mandates
  @Input() addMandateShowMoreInformationForm!: boolean;
  @Input() addMandateShowAssetTypeForm!: boolean;
  @Input() addMandateShowContactPersonsForm!: boolean;
  @Input() addMandateShowOfficersForm!: boolean;
  @Input() addMandateShowBasicForm!: boolean;
  //Child Leasing Mandates
  @Input() addChildMandateShowBasicForm!: boolean;
  @Input() addChildMandateShowContactPersonsForm!: boolean;
  @Input() addChildMandateShowOfficersForm!: boolean;
  @Input() addChildMandateShowMoreInformationForm!: boolean;
  @Input() addChildMandateShowAssetTypeForm!: boolean;
  //----
  @Input() addConditionsLookupsForm!: boolean;
  @Input() addCallActionTypeForm!: boolean;
  @Input() addMandateAdditionalTermForm!: boolean;
  @Input() addConditionExpressionsLookupsForm!: boolean;
  @Input() addManageMandateTermsForm!: boolean;
  @Input() leasingFinancialCurrencyForm!: boolean;
  @Input() leasingFinancialRateForm!: boolean;
  @Input() leasingFinancialBasicForm!: boolean;
  @Input() addMeetingForm!: boolean;
  @Input() addCompanyTypesLookupsForm!: boolean;
  @Input() addMeetingShowBusinessInformationForm!: boolean;
  @Input() addMeetingShowAssetTypeForm!: boolean;
  @Input() addMeetingShowContactPersonsForm!: boolean;
  @Input() addMeetingShowOfficersForm!: boolean;
  @Input() addMeetingShowBasicForm!: boolean;
  @Input() addCallShowBusinessInformationForm!: boolean;
  @Input() addMandateFeeForm!: boolean;
  @Input() addCallShowContactPersonsForm!: boolean;
  @Input() addCallShowOfficersForm!: boolean;
  @Input() addCallShowBasicForm!: boolean;
  @Input() addFollowupsForm!: boolean;
  @Input() addFollowupPointsForm!: boolean;
  @Input() addMeetingTypesCommunicationForm!: boolean;
  @Input() addFollowUpTypesCommunicationForm!: boolean;
  @Input() addCallTypesCommunicationForm!: boolean;
  @Input() addDepartmentsORGForm!: boolean;
  @Input() addDocTypesForm!: boolean;
  @Input() addDepartmentManagerORGForm!: boolean;
  @Input() addTeamORGForm!: boolean;
  @Input() addTeamLeadORGForm!: boolean;
  @Input() addMandateShowFeeForm!: boolean;
  @Input() addRoleClaimORGForm!: boolean;
  @Input() addCommunicationFlowTypesLookupsForm!: boolean;
  @Input() addTeamOfficerORGForm!: boolean;
  @Input() addRoleORGForm!: boolean;
  @Input() addMandateOfficerForm!: boolean;
  @Input() addOperationsORGForm!: boolean;
  @Input() addPageOperationORGForm!: boolean;
  @Input() addOfficerORGForm!: boolean;
  @Input() addSignatoryOfficerORGForm!: boolean;
  @Input() addFeeCalculationTypesLookupsForm!: boolean;
  @Input() addMandateStatusesLookupsForm!: boolean;
  @Input() addMandateStatusActionsLookupsForm!: boolean;
  @Input() addInterestRateBenchmarksLookupsForm!: boolean;
  @Input() addFeesTypesLookupsForm!: boolean;
  @Input() addGracePeriodUnitsLookupsForm!: boolean;
  @Input() addRentStructureTypesLookupsForm!: boolean;
  @Input() addCurrenciesLookupsForm!: boolean;
  @Input() addCurrenciesExchangeLookupsForm!: boolean;
  @Input() addPaymentMethodsLookupsForm!: boolean;
  @Input() addPageORGForm!: boolean;
  @Input() addActionAuthorizationGroupForm!: boolean;
  @Input() addActionNotificationGroupForm!: boolean;
  @Input() addCallForm!: boolean;
  @Input() show: boolean = false;
  @Input() editShow: boolean = false;
  currencyIdParam: any;
  branchIdParam: any;
  departmentIdParam: any;
  teamIdParam: any;
  clientIdParam: any;
  communicationIdParam: any;
  followupIdParam: any;
  clientStatusActionIdParam: any;
  mandateStatusActionIdParam: any;
  @Input() addPaymentTypesLookupsForm!: boolean;
  @Input() addPaymentTimingTermsLookupsForm!: boolean;
  @Input() addPaymentPeriodsLookupsForm!: boolean;
  @Input() addPaymentMonthDaysLookupsForm!: boolean;
  @Input() addMeetingTypesLookupsForm!: boolean;
  @Input() addInsuredByLookupsForm!: boolean;
  @Input() addLeasingTypesLookupsForm!: boolean;
  @Input() addMandateValidityUnitLookupsForm!: boolean;
  @Input() addClientDocumentTypesLookupsForm!: boolean;
  @Input() addBranchLookupsForm!: boolean;
  @Input() addBranchManagersLookupsForm!: boolean;
  @Input() addBusinessLinesLookupsForm!: boolean;
  @Input() addBranchAddressesLookupsForm!: boolean;
  @Input() addBranchOfficersLookupsForm!: boolean;
  @Input() addAssetTypesLookupsForm!: boolean;
  @Input() addAssetTypeCategoriesLookupsForm!: boolean;
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
  @Input() addAuthorizationGroupsLookupsForm!: boolean;
  @Input() addNotificationGroupsLookupsForm!: boolean;
  @Input() addNotificationGroupOfficersLookupsForm!: boolean;
  @Input() addAuthorizationGroupOfficersLookupsForm!: boolean;
  @Input() addInterestTypesLookupsForm!: boolean;
  @Input() addFollowupTypesLookupsForm!: boolean;
  @Input() addFeeRangesForm!: boolean;
  @Input() addSalesTurnoverForm!: boolean;
  @Input() addFollowupTypesCommunicationForm!: boolean;
  @Input() addGovernoratesLookupsForm!: boolean;
  @Input() addCountriesLookupsForm!: boolean;
  @Input() addIdentificationTypesLookupsForm!: boolean;
  @Input() addAreasLookupsForm!: boolean;
  @Input() addTaxOfficesLookupsForm!: boolean;
  @Input() addTmlOfficerTypeLookupsForm!: boolean;
  @Input() addcallTypesLookupsForm!: boolean;
  @Input() addCommunicationTypesLookupsForm!: boolean;
  @Input() addCallActionTypeLookupsForm!: boolean;
  @Input() addClientOfficerTypeLookupsForm!: boolean;
  @Input() addClientGuarantorsShowIndividual!: boolean;
  @Input() addClientIdentities!: boolean;
  @Input() addWorkFlowActionTypesLookupsForm!: boolean;
  @Input() addLegalFormLawsForm!: boolean;
  @Input() addLegalFormsForm!: boolean;
  @Input() addOfficersForm!: boolean;
  @Input() addClientOfficerShowMain!: boolean;
  @Input() addClientLegalShowMain!: boolean;
  @Input() addDepartmentsForm!: boolean;
  @Input() addMandateActionAuthorizationGroupForm!: boolean;
  @Input() addMandateActionNotificationGroupForm!: boolean;

  @Input() currentClientId?: number;

  filteredSubSectors$!: Observable<SubSector[]>;
  @Input() operationName!: string;
  clientStatusIdParam!: any;
  mandateStatusIdParam!: any;
  legalFormLaws$: Observable<any[]> = this.facade.legalFormLaws$;
  legalForms$ = this.facadeLegalForms.items$;

  // legalForms$ = this.facadeLegalForms.legalForms$;
  @Input() identityIndividual: {
    name: string;
    nameAR: string;
    isActive: boolean;
  }[] = [];
  @Output() submitDocument = new EventEmitter<{
    expiryDate: Date;
    documentTypeIds: number[];
    file: File;
  }>();
  @Output() onFileSelect = new EventEmitter<any>();
  @Output() submitForm = new EventEmitter<void>();
  @Input() editMode: boolean = false;
  private sub!: Subscription;
  roleIdParam: any;
  @Input() pagesList: any;
  @Input() operationsList: any;
  @Input() operationsList$!: any;
  @Input() addClientGuarantorsLookupsForm!: boolean;
  routeId = this.route.snapshot.params['leasingId'];
  leasingRouteId = this.route.snapshot.params['leasingMandatesId'];
  communicationId = this.route.snapshot.params['communicationId'];
  previews: PreviewItem[] = [];
  @Input() operationIdValue!: any;
  clientDocId!: any;
  clientId: any;
  @Input() submitAttempted = false;
  @Input() financialCustom!: boolean;
  @Input() currencyCustom!: boolean;
  constructor(
    private store: Store,
    private facade: LegalFormLawFacade,
    private facadeLegalForms: LegalFormsFacade,
    public route: ActivatedRoute,
    public router: Router,
    private messageService: MessageService,
    private sanitizer: DomSanitizer,

    private translate: TranslateService
  ) {
    this.setOptionLabelKey(this.translate.currentLang);
    this.setFilterByBasedOnLanguage();
    this.setOperationBasedOnLanguage();
    this.translate.onLangChange.subscribe((event) => {
      this.setOptionLabelKey(event.lang);
      this.setFilterByBasedOnLanguage();
      this.setOperationBasedOnLanguage();
    });
  }

  ngOnInit() {
    console.log('route', this.route.snapshot);

    console.log('💡 pageOperationGroups input:', this.pageOperationGroups);

    this.minDateOfBirth.setFullYear(this.minDateOfBirth.getFullYear() - 100);
    // 18 years ago:
    this.maxDateOfBirth.setFullYear(this.maxDateOfBirth.getFullYear() - 18);
    this.id = this.route.snapshot.paramMap.get('clientId')!;
    this.communicationIdParam = this.route.snapshot.params['communicationId'];
    this.followupIdParam = this.route.snapshot.queryParams['followupId'];

    this.clientDocId = this.route.snapshot.params['clientId'];
    this.clientId = this.route.snapshot.queryParams['clientId']!;
    this.currencyIdParam = this.route.snapshot.queryParams['currencyId'];
    this.branchIdParam = this.route.snapshot.queryParams['branchId'];
    this.departmentIdParam = this.route.snapshot.queryParams['departmentId'];
    this.teamIdParam = this.route.snapshot.queryParams['teamId'];
    this.roleIdParam = this.route.snapshot.queryParams['roleId'];
    this.clientIdParam = this.route.snapshot.queryParams['clientId'];
    this.clientStatusActionIdParam =
      this.route.snapshot.queryParams['clientStatusActionId'];
    this.clientStatusIdParam = this.route.snapshot.params['id'];
    this.mandateStatusIdParam = this.route.snapshot.params['id'];
    this.mandateStatusActionIdParam =
      this.route.snapshot.queryParams['mandateStatusActionId'];
    this.sub = this.formGroup?.valueChanges
      .pipe(debounceTime(300))
      .subscribe(() => {
        this.store.dispatch(setFormDirty({ dirty: this.formGroup.dirty }));
      });

    if (
      this.addClientShowMain ||
      this.addClientShowBusiness ||
      this.addClientShowLegal ||
      this.addClientShowIndividual ||
      this.addClientOnboardingForm
    ) {
      this.sectorsSafe$ = this.store.select(selectAllSectors);
      const sectorCtrl = this.formGroup.get('sectorId');
      if (sectorCtrl) {
        this.filteredSubSectors$ = combineLatest([
          this.formGroup
            ?.get('sectorId')!
            .valueChanges.pipe(
              startWith(this.formGroup.get('sectorId')!.value)
            ),
          this.store.select(selectAllSubSectors),
        ]).pipe(
          map(([sectorId, subSectors]) =>
            subSectors.filter((s) => s.sectorId === sectorId)
          )
        );
      }

      if (this.addClientShowLegal) {
        this.facade.loadLegalFormLaws();
        this.facadeLegalForms.loadAll();
      }
    }

    // Combine sectorId changes with all sub-sectors
  }
  ngOnDestroy() {
    // cleanup any remaining URLs
    for (const p of this.previews) URL.revokeObjectURL(p.url);

    this.sub.unsubscribe();
  }
  private setFilterByBasedOnLanguage(): void {
    this.filterByField =
      this.translate.currentLang === 'ar' ? 'nameAR' : 'name';
  }

  get identities(): FormArray {
    return this.formGroup.get('identities') as FormArray;
  }
  viewAgreementDetails() {
    this.router.navigate(['/agreement/view-agreements']);
  }
  get mandateOfficers(): FormArray {
    return this.formGroup.get('mandateOfficers') as FormArray;
  }
  get mandateContactPersons(): FormArray {
    return this.formGroup.get('mandateContactPersons') as FormArray;
  }
  get mandateAssetTypes(): FormArray {
    return this.formGroup.get('mandateAssetTypes') as FormArray;
  }
  get mandateFees(): FormArray {
    return this.formGroup.get('mandateFees') as FormArray;
  }
  get mandateGracePeriodSettingView(): FormGroup {
    return this.formGroup.get('mandateGracePeriodSettingView') as FormGroup;
  }
  onDownloadClick() {
    this.downloadFile.emit(); // ✅ this is correct
  }
  private setOptionLabelKey(lang: string) {
    this.optionLabelKey = lang === 'ar' ? 'nameAR' : 'name';
  }
  onSectorChange(event: any) {
    const selectedId = event.value;
    this.sectorsSafe$
      ?.pipe(
        take(1),
        map((sectors) => sectors.find((s) => s.id === selectedId)),
        filter((sector): sector is Sector => !!sector)
      )
      .subscribe((sector) => {
        this.value = selectedId;
        this.onChange(this.value);
        this.onTouched();
        this.selectionChanged.emit(sector);
        this.sectorChanged.emit(selectedId);
        // ← add this block to clear sub-sector selections:
        const subCtrl = this.formGroup.get('subSectorIdList');
        if (subCtrl) {
          subCtrl.setValue([]); // remove all IDs
          subCtrl.markAsUntouched(); // reset touched state if you like
          subCtrl.updateValueAndValidity();
        }
      });
  }
  get operationsLabel(): string {
    if (!this.operationsList || this.operationsList.length === 0) {
      return 'Select an operation';
    }
    return this.operationsList.map((po: any) => po.operation.name).join(', ');
  }
  get phoneTypesArray(): FormArray {
    return this.formGroup.get('phoneTypes') as FormArray;
  }
  get subSectorList(): FormControl {
    return this.formGroup.get('subSectorIdList') as FormControl;
  }
  get legalFormIdControl(): FormControl {
    return this.formGroup.get('legalFormLawId') as FormControl;
  }
  get legalFormList(): FormControl {
    return this.formGroup.get('legalFormId') as FormControl;
  }
  onLegalFormLawSelectionChange(law: any) {
    this.selectedLegalFormLawId = law?.id || null;

    // Optional: reset the legal form dropdown when law changes
    this.formGroup.get('legalFormId')?.reset();
  }

  onSubSectorDropdown(event: any): void {
    this.companyLegalDetail.legalFormLawId = event?.id;
    console.log('Sub Sector selected:', event?.id);
  }
  onLegalFormSelectionChange(event: any): void {
    this.companyLegalDetail.legalFormId = event?.id;
    console.log('Legal Form selected:', event?.id);
  }
  viewAddress() {
    this.router.navigate(['/crm/clients/view-address']);
  }

  viewMandateFees() {
    this.router.navigate([
      `/crm/leasing-mandates/view-mandate-fees/${this.routeId}/${this.leasingRouteId}`,
    ]);
  }
  viewCentralBankInfo() {
    this.router.navigate([
      `/crm/clients/view-client-central-bank-info/${this.clientId}`,
    ]);
  }
  viewCRAuthority() {
    this.router.navigate([
      `/crm/clients/view-client-cr-authority-offices/${this.clientId}`,
    ]);
  }
  viewBusinessLines() {
    this.router.navigate(['/lookups/view-business-lines']);
  }

  viewConditions() {
    this.router.navigate(['/lookups/view-conditions']);
  }

  viewAuthorizationOfficersGroup() {
    this.router.navigate(['/lookups/view-authorization-group-officers']);
  }

  viewConditionExpressions() {
    this.router.navigate(['/lookups/view-condition-expressions']);
  }

  viewNotificationOfficersGroup() {
    this.router.navigate(['/lookups/view-notification-group-officers']);
  }

  viewInterestTypes() {
    this.router.navigate(['/lookups/view-interest-types']);
  }

  viewFeesRnages() {
    this.router.navigate(['/lookups/view-fee-ranges']);
  }

  viewPaymentPeriods() {
    this.router.navigate(['/lookups/view-payment-periods']);
  }

  viewBranchManagers() {
    this.router.navigate([
      `/organizations/view-branch-managers/${this.branchIdParam}`,
    ]);
  }

  viewMeetings() {
    this.router.navigate([`/communication/view-meetings`]);
  }

  viewMandateAdditionalTerms() {
    this.router.navigate([
      `/crm/leasing-mandates/view-mandate-additional-terms/${this.routeId}/${this.leasingRouteId}`,
    ]);
  }

  viewDepartmentManager() {
    this.router.navigate([]);
  }

  viewTeamLeadOfficers() {
    this.router.navigate([
      `/organizations/view-team-lead-officers/${this.teamIdParam}`,
    ]);
  }

  viewCalls() {
    this.router.navigate([`/communication/view-calls`]);
  }

  viewTeamOfficers() {
    this.router.navigate([
      `/organizations/view-team-officers/${this.teamIdParam}`,
    ]);
  }
  onOpToggle(opId: number, checked: any) {
    const ctrl = this.formGroup.get('operationIds')!;
    const selected: number[] = [...ctrl.value];
    if (checked) {
      if (!selected.includes(opId)) selected.push(opId);
    } else {
      const idx = selected.indexOf(opId);
      if (idx >= 0) selected.splice(idx, 1);
    }
    ctrl.setValue(selected);
  }

  viewBranchOfficers() {
    this.router.navigate([]);
  }
  viewBranchAddress() {
    this.router.navigate([
      `/organizations/view-branch-addresses/${this.branchIdParam}`,
    ]);
  }
  viewBranch() {
    this.router.navigate(['/organizations/view-branches']);
  }
  viewClientDocument() {
    this.router.navigate(['/lookups/view-client-document-types']);
  }
  viewMandateValidity() {
    this.router.navigate(['/lookups/view-mandate-validity-unit']);
  }
  viewLeasingType() {
    this.router.navigate(['/lookups/view-leasing-types']);
  }
  viewInsuredBy() {
    this.router.navigate(['/lookups/view-insured-by']);
  }
  viewMeetingTypes() {
    this.router.navigate(['/lookups/view-meeting-types']);
  }
  viewPaymentMonthDays() {
    this.router.navigate(['/lookups/view-payment-month-days']);
  }
  viewPaymentMethod() {
    this.router.navigate(['/lookups/view-payment-methods']);
  }

  viewPaymentTimingTerms() {
    this.router.navigate(['/lookups/view-payment-timing-terms']);
  }

  viewCurrencyExchange() {
    this.router.navigate([
      `/lookups/view-currency-exchange-rates/${this.currencyIdParam}`,
    ]);
  }
  viewCurrencies() {
    this.router.navigate(['/lookups/view-currencies']);
  }
  viewRentStructure() {
    this.router.navigate(['/lookups/view-rent-structure-types']);
  }
  viewGracePeriod() {
    this.router.navigate(['/lookups/view-period-units']);
  }
  viewFeesTypes() {
    this.router.navigate(['/lookups/view-fee-types']);
  }
  viewNotificationGroup() {
    this.router.navigate(['/lookups/view-notification-groups']);
  }
  viewInterestRate() {
    this.router.navigate(['/lookups/view-interest-rate-benchmarks']);
  }
  viewMandateStatuses() {
    this.router.navigate(['/lookups/view-mandate-statuses']);
  }
  viewFeesCalculationType() {
    this.router.navigate(['/lookups/view-fee-calculation-types']);
  }
  viewSignatoryOfficer() {
    this.router.navigate(['/organizations/view-signatory-officers']);
  }
  viewOfficer() {
    this.router.navigate(['/organizations/view-officers']);
  }
  viewPageOperation() {
    this.router.navigate(['/organizations/view-page-operations']);
  }
  viewOperations() {
    this.router.navigate(['/organizations/view-operations']);
  }
  viewRoles() {
    this.router.navigate(['/organizations/view-roles']);
  }
  viewRoleClaims() {
    this.router.navigate([
      `/organizations/view-role-claims/${this.roleIdParam}`,
    ]);
  }
  viewTeamMember() {
    this.router.navigate(['/crm/clients/view-team-member']);
  }
  viewTeamLead() {
    this.router.navigate(['/crm/clients/view-team-lead']);
  }
  viewTeams() {
    this.router.navigate(['organizations/view-teams']);
  }
  viewManager() {
    this.router.navigate(['/crm/clients/view-manager']);
  }
  viewDepartment() {
    this.router.navigate(['/organizations/view-departments']);
  }
  viewCallTypes() {
    this.router.navigate(['/lookups/view-call-types']);
  }
  viewFollowupTypes() {
    this.router.navigate(['/lookups/view-followup-types']);
  }

  viewOfficers() {
    this.router.navigate(['/organizations/view-officers']);
  }
  onViewContactPersonsClick() {
    console.log('Client ID:', this.currentClientId);
    if (this.currentClientId) {
      this.viewContactPersons.emit(this.currentClientId);
    }
  }

  viewFollowUps() {
    console.log('follow up clicked   ', this.communicationIdParam);
    this.router.navigate([
      `/communication/view-follow-ups/${this.communicationIdParam}`,
    ]);
  }

  viewFollowUpPoints() {
    console.log('follow up clicked   ', this.communicationIdParam);
    console.log('follow up clicked   ', this.followupIdParam);
    this.router.navigate([
      `/communication/view-follow-up-points/${this.followupIdParam}/${this.communicationIdParam}`,
    ]);
  }
  viewAssestType() {
    this.router.navigate(['/crm/clients/view-assest-type']);
  }
  viewCompanyTypes() {
    this.router.navigate(['/lookups/view-company-types']);
  }
  viewLegalFormLaw() {
    this.router.navigate(['/legals/view-legal-form-laws']);
  }
  viewLegalForm() {
    this.router.navigate(['/legals/view-legal-forms']);
  }
  viewTMLOfficer() {
    this.router.navigate([
      `/crm/clients/view-client-tml-officers/${this.clientId}`,
    ]);
  }
  viewClientOfficer() {
    this.router.navigate([
      `/crm/clients/view-client-officers/${this.clientId}`,
    ]);
  }
  viewClientLegal() {
    this.router.navigate([`/crm/clients/view-client-legals/${this.clientId}`]);
  }
  viewShareHolder() {
    this.router.navigate([
      `/crm/clients/view-client-share-holders/${this.clientId}`,
    ]);
  }
  viewTaxAuthority() {
    this.router.navigate([
      `/crm/clients/view-client-tax-authority-offices/${this.clientId}`,
    ]);
  }
  viewContactDetails() {
    this.router.navigate([
      `/crm/clients/view-contact-persons/${this.clientId}`,
    ]);
  }
  viewPhoneNumber() {
    this.router.navigate([`/crm/clients/view-phone-numbers/${this.clientId}`]);
  }
  viewSalesTurnover() {
    console.log('hello from arwa ', this.clientId);
    this.router.navigate(['/crm/clients/view-sales-turnovers/', this.clientId]);
  }
  viewClientAddressDetails() {
    this.router.navigate([
      `/crm/clients/view-client-addresses/${this.clientIdParam}`,
    ]);
  }

  viewClientIdentity() {
    this.router.navigate([
      `/crm/clients/view-client-identity/${this.clientIdParam}`,
    ]);
  }

  viewPaymentTypes() {
    this.router.navigate(['/lookups/view-payment-types']);
  }
  viewDocumentDetails(): void {
    this.router.navigate([
      `/crm/clients/view-upload-documents/${this.clientDocId}`,
    ]);
  }
  viewAssetTypes() {
    this.router.navigate(['/lookups/view-asset-types']);
  }
  viewAssetTypeCategories() {
    this.router.navigate(['/lookups/view-asset-type-categories']);
  }
  viewProducts() {
    this.router.navigate(['/lookups/view-products']);
  }
  viewOfficerORG() {
    this.router.navigate(['/organizations/view-officer']);
  }
  viewSectors() {
    this.router.navigate(['/lookups/view-sectors']);
  }
  viewClientStatuses() {
    this.router.navigate(['/lookups/view-client-statuses']);
  }
  viewClientStatusActions() {
    this.router.navigate(['/lookups/view-client-status-actions']);
  }
  viewMandateStatusActions() {
    this.router.navigate(['/lookups/view-mandate-status-actions']);
  }
  viewActionAuthorizationGroup() {
    this.router.navigate([
      `/lookups/view-action-authorizationGroups/${this.clientStatusActionIdParam}`,
    ]);
  }
  viewActionNotificationGroup() {
    this.router.navigate([
      `/lookups/view-action-notificationGroups/${this.clientStatusActionIdParam}`,
    ]);
  }
  viewMandateActionAuthorizationGroup() {
    this.router.navigate([
      `/lookups/view-mandate-action-authorizationGroups/${this.mandateStatusActionIdParam}`,
    ]);
  }
  viewMandateActionNotificationGroup() {
    this.router.navigate([
      `/lookups/view-mandate-action-notificationGroups/${this.mandateStatusActionIdParam}`,
    ]);
  }
  viewSMEClientCode() {
    this.router.navigate(['/lookups/view-sme-client-codes']);
  }
  viewSubSectors() {
    this.router.navigate(['/lookups/view-sub-sectors']);
  }
  viewClientTypes() {
    this.router.navigate(['/lookups/view-client-types']);
  }
  viewAuthorityOffices() {
    this.router.navigate(['/lookups/view-authority-offices']);
  }
  viewPhoneTypes() {
    this.router.navigate(['/lookups/view-phone-types']);
  }
  viewAddressTypes() {
    this.router.navigate(['/lookups/view-address-types']);
  }
  viewAuthorizationGroups() {
    this.router.navigate(['/lookups/view-authorization-groups']);
  }
  viewGovernorates() {
    this.router.navigate(['/lookups/view-governorates']);
  }
  viewCountries() {
    this.router.navigate(['/lookups/view-countries']);
  }
  /** Copies a Windows UNC path so the user can paste it in File Explorer. */
  copyPath() {
    const raw = this.existingFileUrl || ''; // e.g. "file://srvhqtest02/uploads/..." OR "D:\\uploads\\...\\file.pdf" OR "/uploads/..."
    const unc = this.toWindowsUncPath(raw);
    if (!unc) return;

    navigator.clipboard.writeText(unc).then(
      () =>
        this.messageService.add({
          severity: 'success',
          summary: 'Path copied',
          detail: 'Paste into New Tab ',
          life: 4000,
        }),
      () =>
        this.messageService.add({
          severity: 'warn',
          summary: 'Could not copy',
          detail: 'Select and copy the path manually.',
          life: 4000,
        })
    );
  }
  /** Converts stored paths to a Windows UNC path like: \\srvhqtest02\uploads\...\file.pdf */
  private toWindowsUncPath(input: string): string {
    if (!input) return '';

    // 1) Remove scheme/host if present
    let rest = input;

    // file://srvhqtest02/...  -> keep only the path part
    rest = rest.replace(/^file:\/\/srvhqtest02\/?/i, '');

    // file:///D:/... or file:///uploads/... -> strip "file:///"
    rest = rest.replace(/^file:\/\/\//i, '');

    // generic file://something/... -> strip "file://something/"
    rest = rest.replace(/^file:\/\/[^/]+\/?/i, '');

    // 2) Normalize slashes
    rest = rest.replace(/\\/g, '/');

    // 3) Strip any leading drive letter like "D:" or "/D:"
    rest = rest.replace(/^\/?[A-Za-z]:/, '');

    // 4) Ensure single leading slash
    if (!rest.startsWith('/')) rest = '/' + rest;

    // 5) Collapse duplicate slashes (just in case)
    rest = rest.replace(/\/{2,}/g, '/'); // remove trailing slash if any
    rest = rest.replace(/D:/g, '');
    // 6) Return canonical UNC file URL (no drive)
    return `file://srvhqtest02${rest}`;
  }
  viewIdentificationTypes() {
    this.router.navigate(['/lookups/view-identification-types']);
  }
  viewAreas() {
    this.router.navigate(['/lookups/view-areas']);
  }
  viewTaxOffices() {
    this.router.navigate(['/lookups/view-tax-offices']);
  }
  viewPageDetails() {
    this.router.navigate(['/organizations/view-pages']);
  }
  viewDocTypes() {
    this.router.navigate(['/lookups/view-document-types']);
  }
  viewTMLOfficerType() {
    this.router.navigate(['/lookups/view-tml-officer-types']);
  }
  viewCommunicationTypes() {
    this.router.navigate(['/lookups/view-communication-types']);
  }
  viewCallActionType() {
    this.router.navigate(['/lookups/view-call-action-types']);
  }
  viewClientOfficerType() {
    this.router.navigate(['/lookups/view-client-officer-types']);
  }
  viewCommunicationFlowType() {
    this.router.navigate(['/lookups/view-communication-flow-types']);
  }
  viewWorkFlowActionTypes() {
    this.router.navigate(['/lookups/view-workflow-action-types']);
  }
  viewClientGuarantors() {
    this.router.navigate([
      `/crm/clients/view-client-guarantors/${this.clientIdParam}`,
    ]);
  }
  onSubSectorChange(event: any): void {
    const selectedIds: number[] = event.value;
    this.subSectorList.setValue(selectedIds);
    this.subSectorList.markAsTouched();
  }

  // updateValue(value: LegalFormLaw, value1: LegalForm): void {
  //   this.selectedLegalFormLaw = value;
  //   this.selectedLegalForm = value1;
  //   this.onChange(value);
  //   this.onTouched();
  //   this.selectionChanged.emit(value);
  // }
  onFileSelected(event: any) {
    const file: File = event.files?.[0] ?? event.target?.files?.[0];
    if (!file) {
      this.formGroup.patchValue({ file: null });
      this.onFileSelect.emit(null);
      return;
    }

    this.formGroup.patchValue({ file });
    this.onFileSelect.emit(file);
  }

  onFileRemoved(event: any): void {
    // reset the form control
    this.formGroup.patchValue({ file: null });
    this.formGroup.get('file')!.updateValueAndValidity();
  }
  onAddClick() {
    if (
      !this.expiryDate ||
      !this.selectedDocuments.length ||
      !this.selectedFile
    ) {
      return;
    }
    this.submitDocument.emit({
      expiryDate: this.expiryDate,
      documentTypeIds: this.selectedDocuments.map((d: { id: any }) => d.id),
      file: this.selectedFile,
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['viewOnly']) {
      if (this.viewOnly) {
        this.formGroup.disable();
      } else {
        this.formGroup.enable();
      }
    }
    if (changes['existingFileUrl']) {
      const raw = changes['existingFileUrl'].currentValue as string | undefined;
      const unc = this.toUncFileUrl(raw);
      const encoded = this.encodeUrl(unc);
      this.existingFileSafeUrl = this.sanitizer.bypassSecurityTrustUrl(encoded);
    }
  }
  private toUncFileUrl(input?: string | null): string {
    if (!input) return '';

    if (input.startsWith('file:///')) {
      return 'file://srvhqtest02/' + input.replace(/^file:\/\/\//, '');
    }

    let p = input.replace(/\\/g, '/'); // D:\uploads\... -> D:/uploads/...
    p = p.replace(/^[A-Za-z]:/, ''); // strip drive letter
    if (!p.startsWith('/')) p = '/' + p; // ensure leading slash
    return 'file://srvhqtest02' + p; // file://srvhqtest02/uploads/...
  }

  private encodeUrl(u: string): string {
    return u ? encodeURI(u) : '';
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      // mark everything so the errors become visible
      this.formGroup.markAllAsTouched();
      return;
    }
    // bubble up to the parent
    this.submitForm.emit();
  }

  get communicationOfficersArray(): FormArray {
    return this.formGroup.get('communicationOfficers') as FormArray;
  }

  get communicationContactPersonsArray(): FormArray {
    return this.formGroup.get('communicationContactPersons') as FormArray;
  }

  get communicationAssetTypesArray(): FormArray {
    return this.formGroup.get('communicationAssetTypes') as FormArray;
  }

  close() {
    console.log('route', this.route.snapshot);
    this.router.navigate([`/crm/clients/view-upload-documents/${this.id}`]);
  }
  closeNotificationGroups() {
    this.router.navigate(['/lookups/view-notification-group-officers']);
  }
  navigateAssetCat() {
    this.router.navigate(['/lookups/view-asset-type-categories']);
  }
  navigateCurrencies() {
    this.router.navigate(['/lookups/view-currencies']);
  }
  navigateActionNGroup() {
    this.router.navigate([
      `/lookups/view-action-notificationGroups/${this.clientStatusActionIdParam}`,
    ]);
  }
  removePreview(item: PreviewItem) {
    // 1) UI list: remove only this item
    const idxPrev = this.previews.findIndex((p) => p === item);
    if (idxPrev > -1) {
      URL.revokeObjectURL(this.previews[idxPrev].url);
      this.previews.splice(idxPrev, 1);
    }

    // 2) Form control (File[])
    const current: File[] = this.formGroup.get('file')?.value ?? [];
    const next = current.filter((f) => f !== item.file);
    this.formGroup.get('file')?.setValue(next);
    this.formGroup.get('file')?.markAsDirty();
    this.formGroup.get('file')?.updateValueAndValidity();

    // 3) PrimeNG internal queue
    if (this.fileUploader?.files) {
      const i = this.fileUploader.files.findIndex(
        (f) =>
          f === item.file ||
          (f.name === item.name &&
            f.size === item.file.size &&
            f.type === item.file.type)
      );
      if (i > -1) {
        this.fileUploader.files.splice(i, 1);
      }

      // When nothing left, clear the native input and internal state
      if (this.fileUploader.files.length === 0) {
        this.fileUploader.clear(); // clears the input value & queue
      }
    }
  }
  onFileLinkClick(e: MouseEvent) {
    // let the default <a> click happen; if the browser blocks it, we show a tip
    window.setTimeout(() => {
      this.messageService.add({
        severity: 'info',
        summary: 'If the file didn’t open',
        detail:
          'Your browser may block file:// links from a web app. Click "Copy path" and paste it in File Explorer.',
        life: 8000,
      });
    }, 700);
  }
  navigateSign() {
    this.router.navigate(['/organizations/view-signatory-officers']);
  }
  navigateAuthorization() {
    this.router.navigate(['/lookups/view-authorization-group-officers']);
  }
  onPaymentPeriodChange(event: { originalEvent: Event; value: any }) {
    // Because we removed optionValue, `event.value` is the full PaymentPeriod object
    this.selectedPaymentPeriod = event.value;
    this.selectionChangedPaymentPeriod.emit(this.selectedPaymentPeriod);
    this.onChange(this.selectedPaymentPeriod);
    console.log('Selected Payment Period:', this.selectedPaymentPeriod);
  }
  onGracePeriodUnitChange(event: { originalEvent: Event; value: any }) {
    // event.value is the full object (has name, id, etc.)
    this.selectedGracePeriodUnit = event.value;
    this.selectionChangedGracePeriod.emit(this.selectedGracePeriodUnit);
    this.onChange(this.selectedGracePeriodUnit);
    console.log('Selected Grace Period Unit:', this.selectedGracePeriodUnit);
  }
  onCurrencyChange(event: { originalEvent: Event; value: any }) {
    this.selectedCurrency = event.value;
    this.selectionChangedCurrency.emit(this.selectedCurrency);
    this.onChange(this.selectedCurrency);
    console.log('Selected Currency:', this.selectedCurrency);
  }
  onCurrencyExchangeRateChange(event: { originalEvent: Event; value: any }) {
    this.selectedCurrencyExchangeRate = event.value;
    this.selectionChangedCurrencyExchange.emit(
      this.selectedCurrencyExchangeRate
    );
    this.onChange(this.selectedCurrencyExchangeRate);
    console.log('Selected Currency:', this.selectedCurrencyExchangeRate);
  }

  onInterestRateBenchmarkChange(event: { originalEvent: Event; value: any }) {
    // event.value === the primitive ID (e.g. 10)
    const selectedId = event.value;

    // Find the full object from the array you passed in
    const fullObj = this.interestRateBenchMarks?.find(
      (b: any) => b.id === selectedId
    );

    // If you need to keep a local “selected” for template display,
    // you could store the full object here:
    this.selectedInterestRateBenchMarks = fullObj;

    // Now emit the full object up to the parent
    if (fullObj) {
      this.selectionChangedRateBenchmark.emit(fullObj);
      this.onChange(fullObj);
    }

    console.log('Selected Benchmark object:', fullObj);
  }

  onPaymentTimingTermChange(event: { originalEvent: Event; value: any }) {
    // event.value === the primitive ID (e.g. 10)
    const selectedId = event.value;
    const fullObj = this.paymentTimeTerms?.find(
      (b: any) => b.id === selectedId
    );

    this.selectedPaymentTimingTerm = fullObj;
    if (fullObj) {
      this.selectionChangedPaymentTimingTerm.emit(fullObj);
      this.onChange(fullObj);
    }
    console.log('Selected Payment Term:', fullObj);
  }
  onRentStructureTypeChange(event: { originalEvent: Event; value: any }) {
    // event.value === the primitive ID (e.g. 10)
    const selectedId = event.value;
    const fullObj = this.rentStructures?.find((b: any) => b.id === selectedId);

    this.selectedRentStructureType = fullObj;
    if (fullObj) {
      this.selectionChangedRentStructure.emit(fullObj);
      this.onChange(fullObj);
    }
    console.log('Selected selectionChangedRentStructure:', fullObj);
  }
  onPaymentMethodChange(event: { originalEvent: Event; value: any }) {
    // event.value === the primitive ID (e.g. 10)
    const selectedId = event.value;
    const fullObj = this.paymentMethods?.find((b: any) => b.id === selectedId);

    this.selectedPaymentMethod = fullObj;
    if (fullObj) {
      this.selectionChangedPaymentMethod.emit(fullObj);
      this.onChange(fullObj);
    }
    console.log('Selected selectionChangedPaymentMethod:', fullObj);
  }
  onPaymentMonthDayChange(event: { originalEvent: Event; value: any }) {
    // event.value === the primitive ID (e.g. 10)
    const selectedId = event.value;
    const fullObj = this.paymentMonthDays?.find(
      (b: any) => b.id === selectedId
    );

    this.selectedPaymentMonthDay = fullObj;
    if (fullObj) {
      this.selectionChangedPaymentMonthDay.emit(fullObj);
      this.onChange(fullObj);
    }
    console.log('Selected selectionChangedPaymentMonthDay:', fullObj);
  }
  onSelect(event: FileSelectEvent) {
    const files: File[] = event.files ?? [];
    const current: File[] = [...(this.formGroup.get('file')?.value ?? [])];

    for (const file of files) {
      const url = URL.createObjectURL(file);
      const item: PreviewItem = { name: file.name, type: file.type, url, file };
      if (file.type === 'application/pdf') {
        item.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      }
      this.previews.push(item);
      current.push(file);
    }

    this.formGroup.get('file')?.setValue(current);
    this.formGroup.get('file')?.markAsDirty();
    this.formGroup.get('file')?.updateValueAndValidity();
  }

  private setOperationBasedOnLanguage(): void {
    this.operationField =
      this.translate.currentLang === 'ar' ? 'nameAR' : 'name';
  }
  getLocalizedName(obj?: any): string {
    if (!obj) return '';
    return this.translate.currentLang === 'ar'
      ? obj.nameAR ?? obj.name
      : obj.name;
  }
  onNgModelChange(value: number) {
    console.log('📊 [ngModelChange] selectedCurrencyExchangeRate →', value);
  }
}
