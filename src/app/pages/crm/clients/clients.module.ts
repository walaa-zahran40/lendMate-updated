import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { StepperModule } from 'primeng/stepper';
import { TabsModule } from 'primeng/tabs';
import { LegalFormsEffects } from '../../legals/store/legal-forms/legal-forms.effects';
import { legalFormsReducer } from '../../legals/store/legal-forms/legal-forms.reducer';
import { AddSalesTurnoverComponent } from './components/client-activities/add-client-sales-turnover/add-client-sales-turnover.component';
import { AddClientCentralBankInfoComponent } from './components/client-activities/add-central-bank-info/add-central-bank-info.component';
import { AddClientGuarantorComponent } from './components/client-activities/add-client-guarantor/add-client-guarantor.component';
import { AddClientIdentityComponent } from './components/client-activities/add-client-identity/add-client-identity.component';
import { AddClientStatusActionsComponent } from './components/client-activities/add-client-status-actions/add-client-status-actions.component';
import { AddClientStatusesComponent } from './components/client-activities/add-client-statuses/add-client-statuses.component';
import { AddContactPersonComponent } from './components/client-activities/add-contact-person/add-contact-person.component';
import { AddPhoneNumberComponent } from './components/client-activities/add-phone-number/add-phone-number.component';
import { AddClientShareHoldersComponent } from './components/client-activities/add-share-holders/add-share-holders.component';
import { AddClientTaxAuthorityOfficesComponent } from './components/client-activities/add-tax-authority-office/add-tax-authority-office.component';
import { AddClientTMLOfficersComponent } from './components/client-activities/add-tml-officer/add-tml-officer.component';
import { AddUploadDocumentsComponent } from './components/client-activities/upload-documents/add-upload-documents/add-upload-documents.component';
import { ClientActivityWizardComponent } from './components/client-activities/client-activity-wizard/client-activity-wizard.component';
import { ContactPersonViewTableDataComponent } from './components/client-activities/contact-person-view-table-data/contact-person-view-table-data.component';
import { ViewClientCentralBankInfoComponent } from './components/client-activities/view-central-bank-info/view-central-bank-info.component';
import { ViewClientIdentityComponent } from './components/client-activities/view-client-identity/view-client-identity.component';
import { ViewClientStatusComponent } from './components/client-activities/view-client-status-actions/view-client-status.component';
import { ViewClientStatusesComponent } from './components/client-activities/view-client-statuses/view-client-statuses.component';
import { ViewContactPersonComponent } from './components/client-activities/view-contact-person/view-contact-person.component';
import { ViewPhoneNumberComponent } from './components/client-activities/view-phone-number/view-phone-number.component';
import { ViewSalesTurnoverComponent } from './components/client-activities/view-sales-turnover/view-sales-turnover.component';
import { ViewShareHoldersComponent } from './components/client-activities/view-share-holder/view-share-holder.component';
import { ViewTaxAuthorityOfficesComponent } from './components/client-activities/view-tax-authority-office/view-tax-authority-office.component';
import { ViewTMLOfficersComponent } from './components/client-activities/view-tml-officer/view-tml-officer.component';
import { ViewUploadDocumentsComponent } from './components/client-activities/upload-documents/view-upload-documents/view-upload-documents.component';
import { WizardClientStatusComponent } from './components/client-activities/wizard-client-status/wizard-client-status.component';
import { AddClientComponent } from './components/clients/company-individual/add-client/add-client.component';
import { CompanyViewOnlyComponent } from './components/clients/company-view-only/company-view-only.component';
import { ViewClientsComponent } from './components/clients/company-individual/view-clients/view-clients.component';
import { ClientCentralBankInfoEffects } from './store/client-central-bank-info/client-central-bank.effects';
import { ClientFilesEffects } from './store/client-file/client-files.effects';
import { clientFilesReducer } from './store/client-file/client-files.reducer';
import { LeaveEffects } from './store/client-form/client-form.effects';
import { clientFormReducer } from './store/client-form/client-form.reducer';
import { ClientGuarantorsEffects } from './store/client-guarantors/client-guarantors.effects';
import { clientGuarantorsReducer } from './store/client-guarantors/client-guarantors.reducer';
import { ClientTMLOfficersEffects } from './store/client-tml-officers/client-tml-officers.effects';
import { clientTMLOfficersReducer } from './store/client-tml-officers/client-tml-officers.reducer';
import { AddClientAddressesComponent } from './components/client-activities/add-client-address/add-client-address.component';
import { ViewClientAddressesComponent } from './components/client-activities/view-client-address/view-client-address.component';
import { ClientAddressesEffects } from './store/client-addresses/client-addresses.effects';
import { clientAddressesReducer } from './store/client-addresses/client-addresses.reducer';
import { ClientSalesTurnoversEffects } from './store/client-sales-turnovers/client-sales-turnovers.effects';
import { clientSalesTurnoverReducer } from './store/client-sales-turnovers/client-sales-turnovers.reducer';
import { LegalFormLawEffects } from './store/legal-form-law/legal-form-law.effects';
import { legalFormLawReducer } from './store/legal-form-law/legal-form-law.reducer';
import { SectorEffects } from './store/sector-drop-down/sector.effects';
import { sectorReducer } from './store/sector-drop-down/sector.reducer';
import { SubSectorEffects } from './store/sub-sector-drop-down/sub-sector.effects';
import { subSectorReducer } from './store/sub-sector-drop-down/sub-sector.reducer';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { ClientPhoneNumbersEffects } from './store/client-phone-numbers/client-phone-numbers.effects';
import { clientPhoneNumberReducer } from './store/client-phone-numbers/client-phone-numbers.reducer';
import { ClientIdentityTypesEffects } from './store/client-identity-types/client-identity-types.effects';
import { reducer as clientIdentityTypesReducer } from './store/client-identity-types/client-identity-types.reducer';
import { reducer as clientsReducer } from './store/_clients/allclients/clients.reducer';
import { reducer as individualReducer } from './store/_clients/individuals/individuals.reducer';
import { ClientsEffects } from './store/_clients/allclients/clients.effects';
import { IndividualsEffects } from './store/_clients/individuals/individuals.effects';
import { AddClientCRAuthorityOfficesComponent } from './components/client-activities/add-cr-authority-office/add-cr-authority-office.component';
import { ViewCRAuthorityOfficesComponent } from './components/client-activities/view-cr-authority-office/view-cr-authority-office.component';
import { clientCRAuthorityOfficesReducer } from './store/client-cr-authority-office/client-cr-authority-office.reducer';
import { ClientCRAuthorityOfficesEffects } from './store/client-cr-authority-office/client-cr-authority-office.effects';
import { clientTaxOfficesReducer } from './store/client-tax-office/client-tax-office.reducer';
import { ClientTaxOfficesEffects } from './store/client-tax-office/client-tax-office.effects';
import { AddClientOnboardingComponent } from './components/clients/client-onboarding/add-client-onboarding/add-client-onboarding.component';
import { ViewClientsOnboardingComponent } from './components/clients/client-onboarding/view-clients-onboarding/view-clients-onboarding.component';
import { ClientsOnboardingEffects } from './store/_client-onboarding/allclients/clients-onboarding.effects';
import { clientCentralBankInfoReducer } from './store/client-central-bank-info/client-central-bank.reducer';

import { reducer as individualOnboardingReducer } from './store/_client-onboarding/individuals/individuals-onboarding.reducer';

import { reducer as clientsOnboardingReducer } from './store/_client-onboarding/allclients/clients-onboarding.reducer';
import { IndividualOnboardingsEffects } from './store/_client-onboarding/individuals/individuals-onboarding.effects';
import { ClientShareHoldersEffects } from './store/client-share-holders/client-share-holders.effects';
import { clientShareHoldersReducer } from './store/client-share-holders/client-share-holders.reducer';
@NgModule({
  declarations: [
    AddClientComponent,
    AddUploadDocumentsComponent,
    AddClientOnboardingComponent,
    ViewClientsOnboardingComponent,
    AddClientAddressesComponent,
    AddSalesTurnoverComponent,
    AddContactPersonComponent,
    AddPhoneNumberComponent,
    AddClientCRAuthorityOfficesComponent,
    AddClientTaxAuthorityOfficesComponent,
    AddClientCentralBankInfoComponent,
    AddClientShareHoldersComponent,
    ContactPersonViewTableDataComponent,
    CompanyViewOnlyComponent,
    ViewUploadDocumentsComponent,
    ViewClientAddressesComponent,
    ViewSalesTurnoverComponent,
    ViewPhoneNumberComponent,
    ViewContactPersonComponent,
    WizardClientStatusComponent,
    ViewCRAuthorityOfficesComponent,
    ViewTaxAuthorityOfficesComponent,
    ViewClientCentralBankInfoComponent,
    ViewShareHoldersComponent,
    ViewTMLOfficersComponent,
    ClientActivityWizardComponent,
    AddClientGuarantorComponent,
    ViewClientIdentityComponent,
    AddClientIdentityComponent,
    AddClientStatusActionsComponent,
    ViewClientStatusesComponent,
    ViewClientStatusComponent,
    ViewClientsComponent,
    AddClientStatusesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    StepperModule,
    ButtonModule,
    TabsModule,
    ConfirmDialogModule,
    FileUploadModule,
    IconField,
    InputIcon,
    ReactiveFormsModule,
    StoreModule.forFeature('clients', clientsReducer),
    EffectsModule.forFeature([ClientsEffects]),
    StoreModule.forFeature('clientsOnboarding', clientsOnboardingReducer),
    EffectsModule.forFeature([ClientsOnboardingEffects]),
    StoreModule.forFeature('legalFormLaw', legalFormLawReducer),
    EffectsModule.forFeature([LegalFormLawEffects]),
    StoreModule.forFeature('legalForm', legalFormsReducer),
    EffectsModule.forFeature([LegalFormsEffects]),
    StoreModule.forFeature('clientForm', clientFormReducer),
    EffectsModule.forFeature([LeaveEffects]),
    StoreModule.forFeature('clientSalesTurnovers', clientSalesTurnoverReducer),
    EffectsModule.forFeature([ClientSalesTurnoversEffects]),
    StoreModule.forFeature('sector', sectorReducer),
    EffectsModule.forFeature([SectorEffects]),
    StoreModule.forFeature('subSector', subSectorReducer),
    EffectsModule.forFeature([SubSectorEffects]),
    StoreModule.forFeature('individuals', individualReducer),
    EffectsModule.forFeature([IndividualsEffects]),
    StoreModule.forFeature('clientFile', clientFilesReducer),
    EffectsModule.forFeature([ClientFilesEffects]),
    // StoreModule.forFeature('documentTypes', documentTypeReducer),
    // EffectsModule.forFeature([DocumentTypesEffects]),

    EffectsModule.forFeature([ClientCentralBankInfoEffects]),
    StoreModule.forFeature(
      'individualOnboardings',
      individualOnboardingReducer
    ),
    EffectsModule.forFeature([IndividualOnboardingsEffects]),

    StoreModule.forFeature('clientFiles', clientFilesReducer),
    EffectsModule.forFeature([ClientFilesEffects]),
    EffectsModule.forFeature([ClientCentralBankInfoEffects]),
    StoreModule.forFeature('clientShareHolders', clientShareHoldersReducer),
    EffectsModule.forFeature([ClientShareHoldersEffects]),
    StoreModule.forFeature('clientGuarantors', clientGuarantorsReducer),
    EffectsModule.forFeature([ClientGuarantorsEffects]),
    StoreModule.forFeature('clientTMLOfficers', clientTMLOfficersReducer),
    EffectsModule.forFeature([ClientTMLOfficersEffects]),
    StoreModule.forFeature('clientIdentityTypes', clientIdentityTypesReducer),
    EffectsModule.forFeature([ClientIdentityTypesEffects]),
    StoreModule.forFeature('clientPhoneNumbers', clientPhoneNumberReducer),
    EffectsModule.forFeature([ClientPhoneNumbersEffects]),
    StoreModule.forFeature('clientSalesTurnovers', clientSalesTurnoverReducer),
    EffectsModule.forFeature([ClientSalesTurnoversEffects]),
    StoreModule.forFeature('clientAddresses', clientAddressesReducer),
    EffectsModule.forFeature([ClientAddressesEffects]),
    StoreModule.forFeature(
      'clientCRAuthorityOffices',
      clientCRAuthorityOfficesReducer
    ),
    EffectsModule.forFeature([ClientCRAuthorityOfficesEffects]),

    StoreModule.forFeature('clientTaxOffices', clientTaxOfficesReducer),
    EffectsModule.forFeature([ClientTaxOfficesEffects]),

    StoreModule.forFeature(
      'clientCentralBankInfo',
      clientCentralBankInfoReducer
    ),
    EffectsModule.forFeature([ClientCentralBankInfoEffects]),
  ],
})
export class ClientsModule {}
