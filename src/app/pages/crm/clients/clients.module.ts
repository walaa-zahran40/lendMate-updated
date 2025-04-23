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
import { AddTaxAuthorityOfficeComponent } from './components/add-tax-authority-office/add-tax-authority-office.component';
import { AddTmlOfficerComponent } from './components/add-tml-officer/add-tml-officer.component';
import { ClientOnboardingComponent } from './components/client-onboarding/client-onboarding.component';
import { CompanyViewOnlyComponent } from './components/company-view-only/company-view-only.component';
import { ContactPersonViewTableDataComponent } from './components/contact-person-view-table-data/contact-person-view-table-data.component';
import { UploadDocumentsComponent } from './components/upload-documents/upload-documents.component';
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
import { legalFormLawReducer } from '../../../shared/components/form/store/legal-form-law/legal-form-law.reducer';
import { legalFormReducer } from '../../../shared/components/form/store/legal-forms/legal-form.reducer';
import { LegalFormEffects } from '../../../shared/components/form/store/legal-forms/legal-form.effects';
import { LegalFormLawEffects } from '../../../shared/components/form/store/legal-form-law/legal-form-law.effects';
import { individualReducer } from './store/individual/individual.reducer';
import { IndividualEffects } from './store/individual/individual.effects';
import { LeaveEffects } from './store/client-form/client-form.effects';
import { clientFormReducer } from './store/client-form/client-form.reducer';
import { SectorEffects } from '../../../shared/components/form/store/sector-drop-down/sector.effects';
import { sectorReducer } from '../../../shared/components/form/store/sector-drop-down/sector.reducer';
import { SubSectorEffects } from '../../../shared/components/form/store/sub-sector-drop-down/sub-sector.effects';
import { subSectorReducer } from '../../../shared/components/form/store/sub-sector-drop-down/sub-sector.reducer';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { IdentityEffects } from './store/identity/identity.effects';
import { identityReducer } from './store/identity/identity.reducer';

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
    StoreModule.forFeature('identityTypes', identityReducer),
    EffectsModule.forFeature([IdentityEffects]),
  ],
})
export class ClientsModule {}
