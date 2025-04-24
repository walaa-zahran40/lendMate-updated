import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegalFormLawService } from '../../pages/crm/clients/services/legal-form-law.service';
import { LegalFormService } from '../../pages/crm/clients/services/legal-form.service';
import { TypeService } from '../../pages/crm/clients/services/types.service';
import { MenuToggleService } from './menu-toggle.service';
import { SharedService } from './shared.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    LegalFormLawService,
    LegalFormService,
    TypeService,
    MenuToggleService,
    SharedService,
  ],
})
export class ServicesModule {}
