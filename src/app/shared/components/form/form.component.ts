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
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CompanyLegalDetails } from '../../interfaces/company-legal-details.interface';
import {
  take,
  map,
  tap,
  filter,
  Observable,
  combineLatest,
  startWith,
  Subscription,
  debounceTime,
} from 'rxjs';
import { Sectors } from '../../interfaces/sectors.interface';
import { Store } from '@ngrx/store';
import { selectAllSectors } from '../../../pages/crm/clients/store/sector-drop-down/sector.selectors';
import { SubSectors } from '../../interfaces/sub-sector.interface';
import { selectAllSubSectors } from '../../../pages/crm/clients/store/sub-sector-drop-down/sub-sector.selectors';
import { LegalFormLaw } from '../../interfaces/legal-form-law.interface';
import * as sectorsActions from '../../../pages/crm/clients/store/sector-drop-down/sector.actions';
import * as subSectorsActions from '../../../pages/crm/clients/store/sub-sector-drop-down/sub-sector.actions';
import { setFormDirty } from '../../../pages/crm/clients/store/client-form/client-form.actions';
import { FileUpload } from 'primeng/fileupload';
import { LegalFormLawFacade } from '../../../pages/crm/clients/store/legal-form-law/legal-form-law.facade';
import { LegalFormsFacade } from '../../../pages/legals/store/legal-forms/legal-forms.facade';
import { PageOperation } from '../../../pages/organizations/store/page-operations/page-operation.model';
import { LegalForm } from '../../interfaces/legal-form.interface';
export interface IdentityEntry {
  identificationNumber: string;
  selectedIdentities: any[];
  isMain: boolean;
}
interface PageOperationGroup {
  pageName: string;
  pageOperations: PageOperation[];
}

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit, OnDestroy {
  @Input() formGroup!: FormGroup;
  @Input() viewOnly = false;
  companyLegalDetail: CompanyLegalDetails = {};
  @Output() addIdentity = new EventEmitter<void>();
  @Output() removeIdentity = new EventEmitter<number>();

  @Output() addPhoneType = new EventEmitter<void>();
  @Output() removePhoneType = new EventEmitter<number>();

  id!: string;
  @Input() applyReusable: boolean = false;
  @Input() selectedFile!: any;
  @Input() title: string = '';
  @Input() pageOperationGroups$!: Observable<PageOperationGroup[]>;

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
  @Input() phoneTypes: any;
  @Input() identityTypes: any;
  @Input() areas: any;
  @Input() countries: any;
  @Input() governorates: any;
  @Input() teamDepartments: any;
  @Input() governoratesList: any;
  @Input() areasList: any;
  @Input() currencies: { id: number; name: string }[] = [];
  @Input() selectedSectorId: number | null = null;
  @Input() selectedSubSectorId: number | null = null;
  @Input() legalFormLawIdControl!: number;
  selectedLegalFormLawId: number | null = null;
  @Input() legalFormId: number | null = null;
  @Input() officersList: any;
  @Input() clientsList: any;
  @Input() tmlOfficerTypesList: any;
  @Input() pageIds: any;
  selectedLegalForm: any;
  @Output() sectorChanged = new EventEmitter<number>();

  sectorsSafe$!: Observable<Sectors[]>;
  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};
  @Output() selectionChanged = new EventEmitter<any>();

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
  stamps!: any;
  genders = [
    { id: 1, value: 'Male' },
    { id: 2, value: 'Female' },
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
  @Input() addClientContactPersonForm!: boolean;
  @Input() addContactPersonShowMain!: boolean;
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
  @Input() addFeesRangesLookupsForm!: boolean;
  @Input() contactPersonDetailsViewShowForm!: boolean;
  @Input() addMandateShowMoreInformationForm!: boolean;
  @Input() addMandateShowAssetTypeForm!: boolean;
  @Input() addMandateShowContactPersonsForm!: boolean;
  @Input() addMandateShowOfficersForm!: boolean;
  @Input() addMandateShowBasicForm!: boolean;
  @Input() addCallActionTypeForm!: boolean;
  @Input() addChildMandateShowMoreInformationForm!: boolean;
  @Input() addChildMandateShowAssetTypeForm!: boolean;
  @Input() addChildMandateShowContactPersonsForm!: boolean;
  @Input() addChildMandateShowOfficersForm!: boolean;
  @Input() addChildMandateShowBasicForm!: boolean;
  @Input() addManageMandateTermsForm!: boolean;
  @Input() leasingFinancialFormShowCurrencyForm!: boolean;
  @Input() leasingFinancialFormShowRatesForm!: boolean;
  @Input() leasingFinancialFormShowBasicForm!: boolean;
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
  @Input() addDocTypesForm!: boolean;
  @Input() addDepartmentManagerORGForm!: boolean;
  @Input() addTeamORGForm!: boolean;
  @Input() addTeamLeadORGForm!: boolean;
  @Input() addRoleClaimORGForm!: boolean;
  @Input() addCommunicationFlowTypesLookupsForm!: boolean;
  @Input() addTeamOfficerORGForm!: boolean;
  @Input() addRoleORGForm!: boolean;
  @Input() addOperationsORGForm!: boolean;
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
  @Input() addPageORGForm!: boolean;
  currencyIdParam: any;
  branchIdParam: any;
  departmentIdParam: any;
  teamIdParam: any;
  clientIdParam: any;
  @Input() addPaymentTypesLookupsForm!: boolean;
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
  @Input() addSalesTurnoverForm!: boolean;
  @Input() addGovernoratesLookupsForm!: boolean;
  @Input() addCountriesLookupsForm!: boolean;
  @Input() addIdentificationTypesLookupsForm!: boolean;
  @Input() addAreasLookupsForm!: boolean;
  @Input() addTaxOfficesLookupsForm!: boolean;
  @Input() addTmlOfficerTypeLookupsForm!: boolean;
  @Input() addcallTypesLookupsForm!: boolean;
  @Input() addCommunicationTypesLookupsForm!: boolean;
  @Input() addCallActionTypeLookupsForm!: boolean;
  @Input() addClientGuarantorsShowIndividual!: boolean;
  @Input() addClientIdentitiesShowIndividual!: boolean;
  @Input() addWorkFlowActionTypesLookupsForm!: boolean;
  @Input() addLegalFormLawsForm!: boolean;
  @Input() addLegalFormsForm!: boolean;
  @Input() addOfficersForm!: boolean;
  @Input() addDepartmentsForm!: boolean;
  filteredSubSectors$!: Observable<SubSectors[]>;
  @Input() operationName!: string;

  legalFormLaws$: Observable<LegalFormLaw[]> = this.facade.legalFormLaws$;
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
  @Input() operationIdValue!: any;
  clientDocId!: any;
  clientId: any;
  constructor(
    private store: Store,
    private facade: LegalFormLawFacade,
    private facadeLegalForms: LegalFormsFacade,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.minDateOfBirth.setFullYear(this.minDateOfBirth.getFullYear() - 100);
    // 18 years ago:
    this.maxDateOfBirth.setFullYear(this.maxDateOfBirth.getFullYear() - 18);
    this.id = this.route.snapshot.paramMap.get('clientId')!;
    this.clientDocId = this.route.snapshot.params['clientId'];
    this.clientId = this.route.snapshot.queryParams['clientId']!;
    this.currencyIdParam = this.route.snapshot.queryParams['currencyId'];
    this.branchIdParam = this.route.snapshot.queryParams['branchId'];
    this.departmentIdParam = this.route.snapshot.queryParams['departmentId'];
    this.teamIdParam = this.route.snapshot.queryParams['teamId'];
    this.roleIdParam = this.route.snapshot.queryParams['roleId'];
    this.clientIdParam = this.route.snapshot.queryParams['clientId'];
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
      this.store.dispatch(sectorsActions.loadSectors());
      this.store.dispatch(subSectorsActions.loadSubSectors());

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
      if (this.addClientShowMain) {
        this.store.dispatch(sectorsActions.loadSectors());
        this.store.dispatch(subSectorsActions.loadSubSectors());
      }
      if (this.addClientShowLegal) {
        this.facade.loadLegalFormLaws();
        this.facadeLegalForms.loadAll();
      }
    }
    // Combine sectorId changes with all sub-sectors
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  get identities(): FormArray {
    return this.formGroup.get('identities') as FormArray;
  }

  onSectorChange(event: any) {
    const selectedId = event.value;
    this.sectorsSafe$
      .pipe(
        take(1),
        map((sectors) => sectors.find((s) => s.id === selectedId)),
        filter((sector): sector is Sectors => !!sector)
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
  viewBranchManagers() {
    this.router.navigate([
      `/organizations/view-branch-managers/${this.branchIdParam}`,
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
    console.log('rrrrr', this.branchIdParam);
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
    this.router.navigate(['/crm/clients/view-followup-types']);
  }
  viewOfficers() {
    this.router.navigate(['/crm/clients/view-officers']);
  }
  viewContactPersons() {
    this.router.navigate(['/crm/clients/view-contact-person']);
  }
  viewFollowUpsPoint() {
    this.router.navigate(['/communication/view-followup-points']);
  }
  viewFollowUps() {
    this.router.navigate(['/communication/view-followups']);
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
    this.router.navigate(['/crm/clients/view-tml-officer']);
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
    this.router.navigate(['/crm/clients/view-contact-person']);
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

  viewPaymentTypes() {
    this.router.navigate(['/lookups/view-payment-types']);
  }
  viewDocumentDetails(): void {
    this.router.navigate(['/crm/clients/view-upload-documents'], {
      queryParams: { id: this.id },
    });
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
    this.router.navigate(['/crm/clients/view-client-status-actions']);
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
  viewGovernorates() {
    this.router.navigate(['/lookups/view-governorates']);
  }
  viewCountries() {
    this.router.navigate(['/lookups/view-countries']);
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
  viewCommunicationFlowType() {
    this.router.navigate(['/lookups/view-communication-flow-types']);
  }
  viewWorkFlowActionTypes() {
    this.router.navigate(['/lookups/view-workflow-action-types']);
  }
  viewClientGuarantors() {
    this.router.navigate(['/crm/clients/view-client-guarantor']);
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
  onFileSelected(event: any): void {
    const file = event.files?.[0];
    if (file) {
      console.log('[FormComponent] File selected:', file);
      this.formGroup.patchValue({ file });
      this.formGroup.get('file')?.updateValueAndValidity();
    }
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
  close() {
    console.log('route', this.route.snapshot);
    this.router.navigate([`/crm/clients/view-upload-documents/${this.id}`]);
  }
}
