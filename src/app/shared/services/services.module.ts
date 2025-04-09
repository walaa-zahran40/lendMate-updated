import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressTypeService } from './address-type.service';
import { AddressesService } from './addresses.service';
import { AreaService } from './area.service';
import { AssetTypeCategoriesService } from './asset-type-categories.service';
import { AssetTypeService } from './asset-type.service';
import { AuthService } from './auth.service';
import { BranchService } from './branch.service';
import { BusinessLineService } from './business-line.service';
import { CallActionTypeService } from './call-action-type.service';
import { CallTypeService } from './call-type.service';
import { CallService } from './call.service';
import { ClientCentralBankService } from './client-central-bank.service';
import { ClientDocumentTypeService } from './client-document-type.service';
import { ClientGuarantorsService } from './client-guarantors.service';
import { ClientIdentityService } from './client-identity.service';
import { ClientShareHoldersService } from './client-share-holders.service';
import { ClientStatusService } from './client-status.service';
import { ClientTaxService } from './client-tax.service';
import { ClientTmlOfficersService } from './client-tml-officers.service';
import { CommunicationFlowTypeService } from './communication-flow-type.service';
import { CommunicationTypeService } from './communication-type.service';
import { CompanyTypeService } from './company-type.service';
import { CompanyService } from './company.service';
import { ContactPersonService } from './contact-person.service';
import { CountriesService } from './countries.service';
import { CrAuthorityOfficeService } from './cr-authority-office.service';
import { CrService } from './cr.service';
import { CurrenciesService } from './currencies.service';
import { CurrencyExchangeRateService } from './currency-exchange-rate.service';
import { DataService } from './data.service';
import { DepartmentManagerService } from './department-manager.service';
import { DepartmentService } from './department.service';
import { ExportService } from './export.service';
import { FeeCalculationTypeService } from './fee-calculation-type.service';
import { FeeTypeService } from './fee-type.service';
import { FollowUpPointService } from './follow-up-point.service';
import { FollowUpTypeService } from './follow-up-type.service';
import { GovernatesService } from './governates.service';
import { GracePeriodUnitService } from './grace-period-unit.service';
import { IdentificationTypeService } from './identification-type.service';
import { IdentificationTypesService } from './identification-types.service';
import { InsuredByService } from './insured-by.service';
import { InterestRateBenchmarkService } from './interest-rate-benchmark.service';
import { LeasingMandateService } from './leasing-mandate.service';
import { LeasingTypeService } from './leasing-type.service';
import { LegalFormLawService } from './legal-form-law.service';
import { LegalFormService } from './legal-form.service';
import { MandateAdditionalTermService } from './mandate-additional-term.service';
import { MandateStatusActionsService } from './mandate-status-actions.service';
import { MandateStatusesService } from './mandate-statuses.service';
import { MandateValidityUnitService } from './mandate-validity-unit.service';
import { MandateService } from './mandate.service';
import { MeetingTypeService } from './meeting-type.service';
import { MeetingService } from './meeting.service';
import { MonitorFollowUpService } from './monitor-follow-up.service';
import { OfficerService } from './officer.service';
import { OperationService } from './operation.service';
import { PageOperationService } from './page-operation.service';
import { PageService } from './page.service';
import { PaymentMethodService } from './payment-method.service';
import { PaymentMonthDayService } from './payment-month-day.service';
import { PaymentPeriodsService } from './payment-periods.service';
import { PaymentTimingTermService } from './payment-timing-term.service';
import { PaymentTypeService } from './payment-type.service';
import { PermissionService } from './permission.service';
import { PhoneNumberService } from './phone-number.service';
import { PhoneTypeService } from './phone-type.service';
import { RentStructureTypeService } from './rent-structure-type.service';
import { RoleService } from './role.service';
import { SectorsService } from './sectors.service';
import { SignatoryOfficerService } from './signatory-officer.service';
import { SmeClientCodeService } from './sme-client-code.service';
import { SmeService } from './sme.service';
import { SubSectorService } from './sub-sector.service';
import { TaxOfficeService } from './tax-office.service';
import { TeamLeadService } from './team-lead.service';
import { TeamOfficerService } from './team-officer.service';
import { TeamService } from './team.service';
import { TmlOfficerTypeService } from './tml-officer-type.service';
import { TurnOverService } from './turn-over.service';
import { TypeService } from './types.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    AddressTypeService,
    AddressesService,
    AreaService,
    AssetTypeCategoriesService,
    AssetTypeService,
    AuthService,
    BranchService,
    BusinessLineService,
    CallActionTypeService,
    CallTypeService,
    CallService,
    ClientCentralBankService,
    ClientDocumentTypeService,
    ClientGuarantorsService,
    ClientIdentityService,
    ClientShareHoldersService,
    ClientStatusService,
    ClientTaxService,
    ClientTmlOfficersService,
    CommunicationFlowTypeService,
    CommunicationTypeService,
    CompanyTypeService,
    CompanyService,
    ContactPersonService,
    CountriesService,
    ContactPersonService,
    CountriesService,
    CrAuthorityOfficeService,
    CrService,
    CurrenciesService,
    CurrencyExchangeRateService,
    DataService,
    DepartmentManagerService,
    DepartmentService,
    ExportService,
    FeeCalculationTypeService,
    FeeTypeService,
    FollowUpPointService,
    FollowUpTypeService,
    GovernatesService,
    GracePeriodUnitService,
    IdentificationTypeService,
    IdentificationTypesService,
    InsuredByService,
    InterestRateBenchmarkService,
    LeasingMandateService,
    LeasingTypeService,
    LegalFormLawService,
    LegalFormService,
    MandateAdditionalTermService,
    MandateStatusActionsService,
    MandateStatusesService,
    MandateValidityUnitService,
    MandateService,
    MeetingTypeService,
    MeetingService,
    MonitorFollowUpService,
    OfficerService,
    OperationService,
    PageOperationService,
    PageService,
    PaymentMethodService,
    PaymentMonthDayService,
    PaymentPeriodsService,
    PaymentTimingTermService,
    PaymentTypeService,
    PermissionService,
    PhoneNumberService,
    PhoneTypeService,
    RentStructureTypeService,
    RoleService,
    SectorsService,
    SignatoryOfficerService,
    SmeClientCodeService,
    SmeService,
    SubSectorService,
    TaxOfficeService,
    TeamLeadService,
    TeamOfficerService,
    TeamService,
    TmlOfficerTypeService,
    TurnOverService,
    TypeService,
  ],
})
export class ServicesModule {}
