import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { LegalFormLaw } from '../../legals/store/legal-form-laws/legal-form-law.model';
import { LegalFormLawsService } from '../../legals/store/legal-form-laws/legal-form-laws.service';
import { LegalForm } from '../../legals/store/legal-forms/legal-form.model';
import { LegalFormsService } from '../../legals/store/legal-forms/legal-forms.service';
import { ClientLegal } from '../clients/store/client-legals/client-legal.model';
import { ClientLegalsService } from '../clients/store/client-legals/client-legals.service';

export interface ClientLegalsListData {
  clientId: number;
  items: ClientLegal[];
  legalForms: LegalForm[];
  legalFormLaws: LegalFormLaw[];
}

@Injectable({ providedIn: 'root' })
export class ClientLegalsListResolver implements Resolve<ClientLegalsListData> {
  constructor(
    private api: ClientLegalsService,
    private formsApi: LegalFormsService,
    private lawsApi: LegalFormLawsService
  ) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<ClientLegalsListData> {
    const clientId = Number(route.paramMap.get('clientId'));

    const [items, formsPaged, lawsPaged] = await Promise.all([
      firstValueFrom(this.api.getByClientId(clientId)),
      firstValueFrom(this.formsApi.getAll()),
      firstValueFrom(this.lawsApi.getAll()),
    ]);

    const legalForms = formsPaged.items ?? formsPaged;
    const legalFormLaws = lawsPaged.items ?? lawsPaged;

    return { clientId, items, legalForms, legalFormLaws };
  }
}
