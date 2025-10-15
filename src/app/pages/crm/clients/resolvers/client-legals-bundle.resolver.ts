import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { LegalFormLaw } from '../../../legals/store/legal-form-laws/legal-form-law.model';
import { LegalFormLawsService } from '../../../legals/store/legal-form-laws/legal-form-laws.service';
import { LegalForm } from '../../../legals/store/legal-forms/legal-form.model';
import { LegalFormsService } from '../../../legals/store/legal-forms/legal-forms.service';
import { ClientLegal } from '../../clients/store/client-legals/client-legal.model';
import { ClientLegalsService } from '../../clients/store/client-legals/client-legals.service';
export interface ClientLegalsBundle {
  mode: 'add' | 'edit' | 'view';
  record?: ClientLegal;
  legalForms: LegalForm[];
  legalFormLaws: LegalFormLaw[];
  clientIdFromQP?: number;
}

@Injectable({ providedIn: 'root' })
export class ClientLegalsBundleResolver implements Resolve<ClientLegalsBundle> {
  constructor(
    private api: ClientLegalsService,
    private formsApi: LegalFormsService,
    private lawsApi: LegalFormLawsService
  ) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<ClientLegalsBundle> {
    const mode =
      (route.queryParamMap.get('mode') as 'add' | 'edit' | 'view') ?? 'add';
    const clientIdFromQP = route.queryParamMap.get('clientId')
      ? Number(route.queryParamMap.get('clientId'))
      : undefined;
    const id = Number(route.paramMap.get('id'));

    const [formsPaged, lawsPaged, record] = await Promise.all([
      firstValueFrom(this.formsApi.getAll()),
      firstValueFrom(this.lawsApi.getAll()),
      mode !== 'add' && id
        ? firstValueFrom(this.api.getById(id))
        : Promise.resolve(undefined),
    ]);

    const legalForms = formsPaged.items ?? formsPaged;
    const legalFormLaws = lawsPaged.items ?? lawsPaged;

    return { mode, record, legalForms, legalFormLaws, clientIdFromQP };
  }
}
