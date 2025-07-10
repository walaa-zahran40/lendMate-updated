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
import { ClientAddressesEffects } from './store/client-addresses/client-addresses.effects';
import { clientAddressesReducer } from './store/client-addresses/client-addresses.reducer';
import { ClientSalesTurnoversEffects } from './store/client-sales-turnovers/client-sales-turnovers.effects';
import { clientSalesTurnoverReducer } from './store/client-sales-turnovers/client-sales-turnovers.reducer';
import { LegalFormLawEffects } from '../../legals/store/legal-form-law/legal-form-law.effects';
import { legalFormLawReducer } from '../../legals/store/legal-form-law/legal-form-law.reducer';
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
import { clientCRAuthorityOfficesReducer } from './store/client-cr-authority-office/client-cr-authority-office.reducer';
import { ClientCRAuthorityOfficesEffects } from './store/client-cr-authority-office/client-cr-authority-office.effects';
import { clientTaxOfficesReducer } from './store/client-tax-office/client-tax-office.reducer';
import { ClientTaxOfficesEffects } from './store/client-tax-office/client-tax-office.effects';
import { AddClientOnboardingComponent } from './components/clients/client-onboarding/add-client-onboarding/add-client-onboarding.component';
import { ViewClientsOnboardingComponent } from './components/clients/client-onboarding/view-clients-onboarding/view-clients-onboarding.component';
import { ClientsOnboardingEffects } from './store/_client-onboarding/allclients/clients-onboarding.effects';
import { clientCentralBankInfoReducer } from './store/client-central-bank-info/client-central-bank.reducer';

import { reducer as individualOnboardingReducer } from './store/_client-onboarding/individuals/individuals-onboarding.reducer';
import { clientContactPersonsReducer } from './store/client-contact-persons/client-contact-persons.reducer';
import { ClientContactPersonsEffects } from './store/client-contact-persons/client-contact-persons.effects';

import { reducer as clientsOnboardingReducer } from './store/_client-onboarding/allclients/clients-onboarding.reducer';
import { IndividualOnboardingsEffects } from './store/_client-onboarding/individuals/individuals-onboarding.effects';
import { ClientShareHoldersEffects } from './store/client-share-holders/client-share-holders.effects';
import { clientShareHoldersReducer } from './store/client-share-holders/client-share-holders.reducer';
import { AddClientAddressesComponent } from './components/client-activities/wizard/activities/client-addresses/add-client-address/add-client-address.component';
import { ViewClientAddressesComponent } from './components/client-activities/wizard/activities/client-addresses/view-client-addresses/view-client-address.component';
import { AddClientCentralBankInfoComponent } from './components/client-activities/wizard/activities/client-central-bank-info/add-central-bank-info/add-central-bank-info.component';
import { ViewClientCentralBankInfoComponent } from './components/client-activities/wizard/activities/client-central-bank-info/view-central-bank-info/view-central-bank-info.component';
import { AddContactPersonComponent } from './components/client-activities/wizard/activities/client-contact-persons/add-contact-person/add-contact-person.component';
import { AddClientCRAuthorityOfficesComponent } from './components/client-activities/wizard/activities/client-cr-authority-offices/add-cr-authority-office/add-cr-authority-office.component';
import { ViewCRAuthorityOfficesComponent } from './components/client-activities/wizard/activities/client-cr-authority-offices/view-cr-authority-offices/view-cr-authority-office.component';
import { AddClientGuarantorComponent } from './components/client-activities/wizard/activities/client-guarantors/add-client-guarantor/add-client-guarantor.component';
import { AddClientIdentityComponent } from './components/client-activities/wizard/activities/client-identities/add-client-identity/add-client-identity.component';
import { ViewClientIdentityComponent } from './components/client-activities/wizard/activities/client-identities/view-client-identity/view-client-identity.component';
import { AddPhoneNumberComponent } from './components/client-activities/wizard/activities/client-phone-numbers/add-phone-number/add-phone-number.component';
import { ViewPhoneNumberComponent } from './components/client-activities/wizard/activities/client-phone-numbers/view-phone-numbers/view-phone-number.component';
import { AddSalesTurnoverComponent } from './components/client-activities/wizard/activities/client-sales-turnovers/add-client-sales-turnover/add-client-sales-turnover.component';
import { ViewSalesTurnoverComponent } from './components/client-activities/wizard/activities/client-sales-turnovers/view-client-sales-turnovers/view-sales-turnover.component';
import { AddClientShareHoldersComponent } from './components/client-activities/wizard/activities/client-share-holders/add-share-holder/add-share-holders.component';
import { ViewShareHoldersComponent } from './components/client-activities/wizard/activities/client-share-holders/view-share-holders/view-share-holder.component';
import { AddClientTaxAuthorityOfficesComponent } from './components/client-activities/wizard/activities/client-tax-authority-offices/add-tax-authority-office/add-tax-authority-office.component';
import { ViewTaxAuthorityOfficesComponent } from './components/client-activities/wizard/activities/client-tax-authority-offices/view-tax-authority-offices/view-tax-authority-office.component';
import { AddClientTMLOfficersComponent } from './components/client-activities/wizard/activities/client-tml-officers/add-tml-officer/add-tml-officer.component';
import { ViewTMLOfficersComponent } from './components/client-activities/wizard/activities/client-tml-officers/view-tml-officers/view-tml-officer.component';
import { AddUploadDocumentsComponent } from './components/client-activities/wizard/activities/client-upload-documents/add-upload-documents/add-upload-documents.component';
import { ViewUploadDocumentsComponent } from './components/client-activities/wizard/activities/client-upload-documents/view-upload-documents/view-upload-documents.component';
import { AddClientComponent } from './components/clients/company-individual/add-client/add-client.component';
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
import { ViewContactPersonComponent } from './components/client-activities/wizard/activities/client-contact-persons/view-contact-person/view-contact-person.component';
import { ViewGuarantorsComponent } from './components/client-activities/wizard/activities/client-guarantors/view-client-guarantors/view-client-guarantor.component';
import { AddClientOfficersComponent } from './components/client-activities/wizard/activities/client-officers/add-client-officer/add-client-officer.component';
import { ViewClientOfficersComponent } from './components/client-activities/wizard/activities/client-officers/view-client-officers/view-client-officer.component';
import { clientOfficersReducer } from './store/client-officers/client-officers.reducer';
import { ClientOfficersEffects } from './store/client-officers/client-officers.effects';
import { AddClientLegalsComponent } from './components/client-activities/wizard/activities/client-legals/add-client-legal/add-client-legal.component';
import { ViewClientLegalsComponent } from './components/client-activities/wizard/activities/client-legals/view-client-legal/view-client-legal.component';
import { clientLegalsReducer } from './store/client-legals/client-legals.reducer';
import { ClientLegalsEffects } from './store/client-legals/client-legals.effects';
import { clientIdentityReducer } from './store/client-identities/client-identities.reducer';
import { ClientIdentitiesEffects } from './store/client-identities/client-identities.effects';
import { reducer as sectorsReducer } from '../../lookups/store/sectors/sectors.reducer';
import { SectorsEffects } from '../../lookups/store/sectors/sectors.effects';
import { reducer as subSectorsReducer } from '../../lookups/store/sub-sectors/sub-sectors.reducer';
import { SubSectorsEffects } from '../../lookups/store/sub-sectors/sub-sectors.effects';
import { AddMandateComponent } from './components/client-activities/wizard/activities/client-leasing-mandates/add-mandate/add-mandate.component';
import { ViewMandatesComponent } from './components/client-activities/wizard/activities/client-leasing-mandates/view-mandates/view-mandates.component';
import { reducer as leasingMandatesReducer } from './store/client-leasing-mandates/client-leasing-mandates.reducer';
import { MandatesEffects } from './store/client-leasing-mandates/client-leasing-mandates.effects';
import { WizardComponent } from './components/client-activities/wizard/activities/client-leasing-mandates/wizard/wizard.component';
import { AddChildMandateComponent } from './components/client-activities/wizard/activities/client-leasing-mandates/activities/clone/add-child-mandate/add-child-mandate.component';
import { ViewChildMandatesComponent } from './components/client-activities/wizard/activities/client-leasing-mandates/activities/clone/view-child-mandates/view-child-mandates.component';
import { LeasingFinancialFormCompoundComponent } from './components/client-activities/wizard/activities/client-leasing-mandates/activities/leasing-financial-form/leasing-financial-form-compound.component';
import { ClientsClonesEffects } from './store/client-leasing-mandates/activities/clone/client-clones.effects';
import { reducer as clientsClonesReducer } from './store/client-leasing-mandates/activities/clone/client-clones.reducer';
import { reducer as ClientsMandateAdditionalTermsReducer } from './store/client-leasing-mandates/activities/mandate-additional-terms/client-mandate-additional-terms.reducer';
import { ClientsMandateAdditionalTermsEffects } from './store/client-leasing-mandates/activities/mandate-additional-terms/client-mandate-additional-terms.effects';
import { debugState } from './store/client-leasing-mandates/activities/mandate-additional-terms/client-mandate-additional-terms.reducer';
import { AddMandateAdditionalTermsComponent } from './components/client-activities/wizard/activities/client-leasing-mandates/activities/mandate-additional-terms/add-mandate-additional-terms/add-mandate-additional-terms.component';
import { ViewMandateAdditionalTermsComponent } from './components/client-activities/wizard/activities/client-leasing-mandates/activities/mandate-additional-terms/view-mandate-additional-terms/view-mandate-additional-terms.component';
import { ClientActivityWizardComponent } from './components/client-activities/wizard/wizard.component';
import { ViewMandateWorkFlowHistoryComponent } from './components/client-activities/wizard/activities/client-leasing-mandates/activities/mandate-work-flow-history/view-mandate-additional-terms/view-mandate-work-flow-history.component';

@NgModule({
  declarations: [
    AddClientComponent,
    AddUploadDocumentsComponent,
    AddClientOnboardingComponent,
    ViewClientsOnboardingComponent,
    AddClientTMLOfficersComponent,
    AddClientOfficersComponent,
    AddClientLegalsComponent,
    AddMandateAdditionalTermsComponent,
    ViewMandateAdditionalTermsComponent,
    ViewMandateWorkFlowHistoryComponent,

    AddClientAddressesComponent,
    AddSalesTurnoverComponent,
    AddChildMandateComponent,
    ViewChildMandatesComponent,
    LeasingFinancialFormCompoundComponent,
    AddContactPersonComponent,
    AddPhoneNumberComponent,
    WizardComponent,
    AddClientCRAuthorityOfficesComponent,
    AddClientTaxAuthorityOfficesComponent,
    AddClientCentralBankInfoComponent,
    AddClientShareHoldersComponent,
    ViewUploadDocumentsComponent,
    ViewClientAddressesComponent,
    ViewSalesTurnoverComponent,
    ViewPhoneNumberComponent,
    ViewContactPersonComponent,
    ViewCRAuthorityOfficesComponent,
    ViewTaxAuthorityOfficesComponent,
    ViewClientCentralBankInfoComponent,
    ViewShareHoldersComponent,
    ViewTMLOfficersComponent,
    ViewClientOfficersComponent,
    ViewClientLegalsComponent,
    ClientActivityWizardComponent,
    ViewGuarantorsComponent,
    AddClientGuarantorComponent,
    ViewClientIdentityComponent,
    AddClientIdentityComponent,
    ViewClientsComponent,
    AddMandateComponent,
    ViewMandatesComponent,
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
    StoreModule.forFeature('mandatesClient', leasingMandatesReducer),
    EffectsModule.forFeature([MandatesEffects]),
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
    StoreModule.forFeature('sector', sectorsReducer),
    EffectsModule.forFeature([SectorsEffects]),
    StoreModule.forFeature('subSector', subSectorsReducer),
    EffectsModule.forFeature([SubSectorsEffects]),
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
    StoreModule.forFeature('clientIdentities', clientIdentityReducer),
    EffectsModule.forFeature([ClientIdentitiesEffects]),
    StoreModule.forFeature('clientSalesTurnovers', clientSalesTurnoverReducer),
    EffectsModule.forFeature([ClientSalesTurnoversEffects]),
    StoreModule.forFeature('clientAddresses', clientAddressesReducer),
    EffectsModule.forFeature([ClientAddressesEffects]),
    StoreModule.forFeature('clientsClones', clientsClonesReducer),
    EffectsModule.forFeature([ClientsClonesEffects]),
    StoreModule.forFeature(
      'clientsMandateAdditionalTerms',
      ClientsMandateAdditionalTermsReducer,
      { metaReducers: [debugState] }
    ),
    EffectsModule.forFeature([ClientsMandateAdditionalTermsEffects]),

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
    StoreModule.forFeature('clientOfficers', clientOfficersReducer),
    EffectsModule.forFeature([ClientOfficersEffects]),
    StoreModule.forFeature('clientLegals', clientLegalsReducer),
    EffectsModule.forFeature([ClientLegalsEffects]),
    StoreModule.forFeature('clientSalesTurnovers', clientSalesTurnoverReducer),
    EffectsModule.forFeature([ClientSalesTurnoversEffects]),
    StoreModule.forFeature('clientContactPersons', clientContactPersonsReducer),
    EffectsModule.forFeature([ClientContactPersonsEffects]),
  ],
})
export class ClientsModule {}
