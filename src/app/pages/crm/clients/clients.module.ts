import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddAddressComponent } from './components/add-address/add-address.component';
import { AddCentralBankInfoComponent } from './components/add-central-bank-info/add-central-bank-info.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { AddContactPersonComponent } from './components/add-contact-person/add-contact-person.component';
import { AddCrAuthorityOfficeComponent } from './components/add-cr-authority-office/add-cr-authority-office.component';
import { AddPhoneNumberComponent } from './components/add-phone-number/add-phone-number.component';
import { AddSalesTurnoverComponent } from './components/add-sales-turnover/add-sales-turnover.component';
import { AddShareHoldersComponent } from './components/add-share-holders/add-share-holders.component';
import {
  reducer as clientCRAuthorityOfficesReducer,
  clientCRAuthorityOfficesFeatureKey,
} from './store/client-cr-authority-office/client-cr-authority-office.reducer';
import { AddTaxAuthorityOfficeComponent } from './components/add-tax-authority-office/add-tax-authority-office.component';
import { AddTmlOfficerComponent } from './components/add-tml-officer/add-tml-officer.component';
import { ClientOnboardingComponent } from './components/client-onboarding/client-onboarding.component';
import { CompanyViewOnlyComponent } from './components/company-view-only/company-view-only.component';
import { ContactPersonViewTableDataComponent } from './components/contact-person-view-table-data/contact-person-view-table-data.component';
import { UploadDocumentsComponent } from './components/add-upload-documents/upload-documents.component';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { StepperModule } from 'primeng/stepper';
import { TabsModule } from 'primeng/tabs';
import { SharedModule } from '../../../shared/shared.module';
import { ViewClientsComponent } from './components/view-clients/view-clients.component';
import { ViewUploadDocumentsComponent } from './components/view-upload-documents/view-upload-documents.component';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { ViewAddressComponent } from './components/view-address/view-address.component';
import { ViewSalesTurnoverComponent } from './components/view-sales-turnover/view-sales-turnover.component';
import { ViewPhoneNumberComponent } from './components/view-phone-number/view-phone-number.component';
import { ViewContactPersonComponent } from './components/view-contact-person/view-contact-person.component';
import { ViewCrAuthorityOfficeComponent } from './components/view-cr-authority-office/view-cr-authority-office.component';
import { ViewTaxAuthorityOfficeComponent } from './components/view-tax-authority-office/view-tax-authority-office.component';
import { ViewCentralBankInfoComponent } from './components/view-central-bank-info/view-central-bank-info.component';
import { ViewShareHolderComponent } from './components/view-share-holder/view-share-holder.component';
import { ViewTmlOfficerComponent } from './components/view-tml-officer/view-tml-officer.component';
import { ClientActivityWizardComponent } from './components/client-activity-wizard/client-activity-wizard.component';
import { ViewClientGuarantorComponent } from './components/view-client-guarantor/view-client-guarantor.component';
import { AddClientGuarantorComponent } from './components/add-client-guarantor/add-client-guarantor.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ClientsEffects } from './store/clients/clients.effects';
import { clientsReducer } from './store/clients/clients.reducer';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewClientIdentityComponent } from './components/view-client-identity/view-client-identity.component';
import { AddClientIdentityComponent } from './components/add-client-identity/add-client-identity.component';
import { ClientTypesEffects } from './store/client-types/client-types.effects';
import { clientTypesReducer } from './store/client-types/client-types.reducer';
import { legalFormReducer } from '../../../shared/store/legal-forms/legal-form.reducer';
import { LegalFormEffects } from '../../../shared/store/legal-forms/legal-form.effects';
import { individualReducer } from './store/individual/individual.reducer';
import { IndividualEffects } from './store/individual/individual.effects';
import { LeaveEffects } from './store/client-form/client-form.effects';
import { clientFormReducer } from './store/client-form/client-form.reducer';
import { SectorEffects } from '../../../shared/store/sector-drop-down/sector.effects';
import { sectorReducer } from '../../../shared/store/sector-drop-down/sector.reducer';
import { SubSectorEffects } from '../../../shared/store/sub-sector-drop-down/sub-sector.effects';
import { subSectorReducer } from '../../../shared/store/sub-sector-drop-down/sub-sector.reducer';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { clientFileReducer } from './store/client-file/client-file.reducer';
import { ClientFileEffects } from './store/client-file/client-file.effects';
import { documentTypeReducer } from './store/document-type/document-type.reducer';
import { DocumentTypeEffects } from './store/document-type/document-type.effects';
import { ClientSalesTurnoversEffects } from './store/turnover/client-sales-turnovers.effects';
import {
  clientSalesTurnoversFeatureKey,
  reducer,
} from './store/turnover/client-sales-turnovers.reducer';
import { ContactPersonEffects } from './store/contact-person/contact-person.effects';
import {
  contactPersonsFeatureKey,
  contactPersonsReducer,
} from './store/contact-person/contact-person.reducer';
import { ClientCRAuthorityOfficeEffects } from './store/client-cr-authority-office/client-cr-authority-office.effects';
import { ClientCentralBankEffects } from './store/client-central-bank-info/client-central-bank.effects';
import { clientCentralBankFeatureKey } from './store/client-central-bank-info/client-central-bank.state';
import { ClientShareholdersEffects } from './store/client-share-holders/client-share-holders.effects';
import { clientShareholdersReducer } from './store/client-share-holders/client-share-holders.reducer';
import { ClientGuarantorsEffects } from './store/client-guarantors/client-guarantors.effects';
import { clientGuarantorsReducer } from './store/client-guarantors/client-guarantors.reducer';
import { ClientTMLOfficersEffects } from './store/client-tml-officers/client-tml-officers.effects';
import { clientTMLOfficersReducer } from './store/client-tml-officers/client-tml-officers.reducer';
import { LegalFormLawEffects } from './store/legal-form-law/legal-form-law.effects';
import { legalFormLawReducer } from './store/legal-form-law/legal-form-law.reducer';
import { ClientIdentitiesEffects } from './store/client-identities/client-identities.effects';
import { clientIdentitiesReducer } from './store/client-identities/client-identities.reducer';
import {
  CLIENT_IDENTITY_TYPES_FEATURE_KEY,
  clientIdentityTypesReducer,
} from './store/client-identity-types/client-identity-types.reducer';
import { ClientIdentityTypesEffects } from './store/client-identity-types/client-identity-types.effects';

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
    ViewClientsComponent,
    ViewUploadDocumentsComponent,
    ViewAddressComponent,
    ViewSalesTurnoverComponent,
    ViewPhoneNumberComponent,
    ViewContactPersonComponent,
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
    StoreModule.forFeature('clientTypes', clientTypesReducer),
    EffectsModule.forFeature([ClientTypesEffects]),
    StoreModule.forFeature('legalFormLaw', legalFormLawReducer),
    EffectsModule.forFeature([LegalFormLawEffects]),
    StoreModule.forFeature('legalForm', legalFormReducer),
    EffectsModule.forFeature([LegalFormEffects]),
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
    StoreModule.forFeature(clientSalesTurnoversFeatureKey, reducer),
    EffectsModule.forFeature([ClientSalesTurnoversEffects]),
    StoreModule.forFeature(contactPersonsFeatureKey, contactPersonsReducer),
    EffectsModule.forFeature([ContactPersonEffects]),
    StoreModule.forFeature(
      clientCRAuthorityOfficesFeatureKey,
      clientCRAuthorityOfficesReducer
    ),
    EffectsModule.forFeature([ClientCRAuthorityOfficeEffects]),
    StoreModule.forFeature(clientCentralBankFeatureKey, reducer),
    EffectsModule.forFeature([ClientCentralBankEffects]),
    StoreModule.forFeature('clientShareholders', clientShareholdersReducer),
    EffectsModule.forFeature([ClientShareholdersEffects]),
    StoreModule.forFeature('clientGuarantors', clientGuarantorsReducer),
    EffectsModule.forFeature([ClientGuarantorsEffects]),
    StoreModule.forFeature('clientTMLOfficers', clientTMLOfficersReducer),
    EffectsModule.forFeature([ClientTMLOfficersEffects]),
    StoreModule.forFeature('clientIdentities', clientIdentitiesReducer),
    EffectsModule.forFeature([ClientIdentitiesEffects]),
    StoreModule.forFeature(
      CLIENT_IDENTITY_TYPES_FEATURE_KEY,
      clientIdentityTypesReducer
    ),
    EffectsModule.forFeature([ClientIdentityTypesEffects]),
  ],
})
export class ClientsModule {}
