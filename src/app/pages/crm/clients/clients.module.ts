import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
import { AddAddressComponent } from './components/client-activities/add-address/add-address.component';
import { AddCentralBankInfoComponent } from './components/client-activities/add-central-bank-info/add-central-bank-info.component';
import { AddClientGuarantorComponent } from './components/client-activities/add-client-guarantor/add-client-guarantor.component';
import { AddClientIdentityComponent } from './components/client-activities/add-client-identity/add-client-identity.component';
import { AddClientStatusActionsComponent } from './components/client-activities/add-client-status-actions/add-client-status-actions.component';
import { AddClientStatusesComponent } from './components/client-activities/add-client-statuses/add-client-statuses.component';
import { AddContactPersonComponent } from './components/client-activities/add-contact-person/add-contact-person.component';
import { AddCrAuthorityOfficeComponent } from './components/client-activities/add-cr-authority-office/add-cr-authority-office.component';
import { AddPhoneNumberComponent } from './components/client-activities/add-phone-number/add-phone-number.component';
import { AddShareHoldersComponent } from './components/client-activities/add-share-holders/add-share-holders.component';
import { AddTaxAuthorityOfficeComponent } from './components/client-activities/add-tax-authority-office/add-tax-authority-office.component';
import { AddTmlOfficerComponent } from './components/client-activities/add-tml-officer/add-tml-officer.component';
import { UploadDocumentsComponent } from './components/client-activities/add-upload-documents/upload-documents.component';
import { ClientActivityWizardComponent } from './components/client-activities/client-activity-wizard/client-activity-wizard.component';
import { ContactPersonViewTableDataComponent } from './components/client-activities/contact-person-view-table-data/contact-person-view-table-data.component';
import { ViewAddressComponent } from './components/client-activities/view-address/view-address.component';
import { ViewCentralBankInfoComponent } from './components/client-activities/view-central-bank-info/view-central-bank-info.component';
import { ViewClientGuarantorComponent } from './components/client-activities/view-client-guarantor/view-client-guarantor.component';
import { ViewClientIdentityComponent } from './components/client-activities/view-client-identity/view-client-identity.component';
import { ViewClientStatusComponent } from './components/client-activities/view-client-status-actions/view-client-status.component';
import { ViewClientStatusesComponent } from './components/client-activities/view-client-statuses/view-client-statuses.component';
import { ViewContactPersonComponent } from './components/client-activities/view-contact-person/view-contact-person.component';
import { ViewCrAuthorityOfficeComponent } from './components/client-activities/view-cr-authority-office/view-cr-authority-office.component';
import { ViewPhoneNumberComponent } from './components/client-activities/view-phone-number/view-phone-number.component';
import { ViewSalesTurnoverComponent } from './components/client-activities/view-sales-turnover/view-sales-turnover.component';
import { ViewShareHolderComponent } from './components/client-activities/view-share-holder/view-share-holder.component';
import { ViewTaxAuthorityOfficeComponent } from './components/client-activities/view-tax-authority-office/view-tax-authority-office.component';
import { ViewTmlOfficerComponent } from './components/client-activities/view-tml-officer/view-tml-officer.component';
import { ViewUploadDocumentsComponent } from './components/client-activities/view-upload-documents/view-upload-documents.component';
import { WizardClientStatusComponent } from './components/client-activities/wizard-client-status/wizard-client-status.component';
import { AddClientComponent } from './components/clients/add-client/add-client.component';
import { ClientOnboardingComponent } from './components/clients/client-onboarding/client-onboarding.component';
import { CompanyViewOnlyComponent } from './components/clients/company-view-only/company-view-only.component';
import { ViewClientsComponent } from './components/clients/view-clients/view-clients.component';
import { ClientCentralBankEffects } from './store/client-central-bank-info/client-central-bank.effects';
import { ClientFileEffects } from './store/client-file/client-file.effects';
import { clientFileReducer } from './store/client-file/client-file.reducer';
import { LeaveEffects } from './store/client-form/client-form.effects';
import { clientFormReducer } from './store/client-form/client-form.reducer';
import { ClientGuarantorsEffects } from './store/client-guarantors/client-guarantors.effects';
import { clientGuarantorsReducer } from './store/client-guarantors/client-guarantors.reducer';
import { ClientIdentitiesEffects } from './store/client-identities/client-identities.effects';
import { clientIdentitiesReducer } from './store/client-identities/client-identities.reducer';
import { ClientIdentityTypesEffects } from './store/client-identity-types/client-identity-types.effects';
import {
  CLIENT_IDENTITY_TYPES_FEATURE_KEY,
  clientIdentityTypesReducer,
} from './store/client-identity-types/client-identity-types.reducer';
import { ClientShareholdersEffects } from './store/client-share-holders/client-share-holders.effects';
import { clientShareholdersReducer } from './store/client-share-holders/client-share-holders.reducer';
import { ClientTMLOfficersEffects } from './store/client-tml-officers/client-tml-officers.effects';
import { clientTMLOfficersReducer } from './store/client-tml-officers/client-tml-officers.reducer';
import { ClientsEffects } from './store/clients/clients.effects';
import { clientsReducer } from './store/clients/clients.reducer';
import { ContactPersonEffects } from './store/contact-person/contact-person.effects';
import {
  contactPersonsFeatureKey,
  contactPersonsReducer,
} from './store/contact-person/contact-person.reducer';
import { DocumentTypeEffects } from './store/document-type/document-type.effects';
import { documentTypeReducer } from './store/document-type/document-type.reducer';
import { IndividualEffects } from './store/individual/individual.effects';
import { individualReducer } from './store/individual/individual.reducer';
import { LegalFormLawEffects } from './store/legal-form-law/legal-form-law.effects';
import { legalFormLawReducer } from './store/legal-form-law/legal-form-law.reducer';
import { SectorEffects } from './store/sector-drop-down/sector.effects';
import { sectorReducer } from './store/sector-drop-down/sector.reducer';
import { SubSectorEffects } from './store/sub-sector-drop-down/sub-sector.effects';
import { subSectorReducer } from './store/sub-sector-drop-down/sub-sector.reducer';
import { ClientSalesTurnoversEffects } from './store/client-sales-turnovers/client-sales-turnovers.effects';
import { clientSalesTurnoverReducer } from './store/client-sales-turnovers/client-sales-turnovers.reducer';
import { SharedModule } from '../../../shared/shared.module';
import { ClientPhoneNumbersEffects } from './store/client-phone-numbers/client-phone-numbers.effects';
import { clientPhoneNumberReducer } from './store/client-phone-numbers/client-phone-numbers.reducer';

@NgModule({
  declarations: [
    AddClientComponent,
    UploadDocumentsComponent,
    ClientOnboardingComponent,
    AddAddressComponent,
    AddSalesTurnoverComponent,
    AddContactPersonComponent,
    AddPhoneNumberComponent,
    AddCrAuthorityOfficeComponent,
    AddTaxAuthorityOfficeComponent,
    AddCentralBankInfoComponent,
    AddShareHoldersComponent,
    AddTmlOfficerComponent,
    ContactPersonViewTableDataComponent,
    CompanyViewOnlyComponent,
    ViewUploadDocumentsComponent,
    ViewAddressComponent,
    ViewSalesTurnoverComponent,
    ViewPhoneNumberComponent,
    ViewContactPersonComponent,
    WizardClientStatusComponent,
    ViewCrAuthorityOfficeComponent,
    ViewTaxAuthorityOfficeComponent,
    ViewCentralBankInfoComponent,
    ViewShareHolderComponent,
    ViewTmlOfficerComponent,
    ClientActivityWizardComponent,
    ViewClientGuarantorComponent,
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
    StoreModule.forFeature('legalFormLaw', legalFormLawReducer),
    EffectsModule.forFeature([LegalFormLawEffects]),
    StoreModule.forFeature('legalForm', legalFormsReducer),
    EffectsModule.forFeature([LegalFormsEffects]),
    StoreModule.forFeature('clientForm', clientFormReducer),
    EffectsModule.forFeature([LeaveEffects]),
    StoreModule.forFeature('sector', sectorReducer),
    EffectsModule.forFeature([SectorEffects]),
    StoreModule.forFeature('subSector', subSectorReducer),
    EffectsModule.forFeature([SubSectorEffects]),
    StoreModule.forFeature('individual', individualReducer),
    EffectsModule.forFeature([IndividualEffects]),
    StoreModule.forFeature('clientFile', clientFileReducer),
    EffectsModule.forFeature([ClientFileEffects]),
    StoreModule.forFeature('documentTypes', documentTypeReducer),
    EffectsModule.forFeature([DocumentTypeEffects]),
    StoreModule.forFeature(contactPersonsFeatureKey, contactPersonsReducer),
    EffectsModule.forFeature([ContactPersonEffects]),

    EffectsModule.forFeature([ClientCentralBankEffects]),
    StoreModule.forFeature('clientShareholders', clientShareholdersReducer),
    EffectsModule.forFeature([ClientShareholdersEffects]),
    StoreModule.forFeature('clientGuarantors', clientGuarantorsReducer),
    EffectsModule.forFeature([ClientGuarantorsEffects]),
    StoreModule.forFeature('clientTMLOfficers', clientTMLOfficersReducer),
    EffectsModule.forFeature([ClientTMLOfficersEffects]),
    StoreModule.forFeature('clientIdentities', clientIdentitiesReducer),
    EffectsModule.forFeature([ClientIdentitiesEffects]),
    StoreModule.forFeature('clientSalesTurnovers', clientSalesTurnoverReducer),
    EffectsModule.forFeature([ClientSalesTurnoversEffects]),

    StoreModule.forFeature('clientPhoneNumbers', clientPhoneNumberReducer),
    EffectsModule.forFeature([ClientPhoneNumbersEffects]),

    StoreModule.forFeature(
      CLIENT_IDENTITY_TYPES_FEATURE_KEY,
      clientIdentityTypesReducer
    ),
    EffectsModule.forFeature([ClientIdentityTypesEffects]),
  ],
})
export class ClientsModule {}
