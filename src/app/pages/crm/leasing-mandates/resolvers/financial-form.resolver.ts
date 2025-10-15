import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { FinancialFormsFacade } from '../store/financial-form/financial-forms.facade';

@Injectable({ providedIn: 'root' })
export class FinancialFormByMandateResolver implements Resolve<boolean> {
  constructor(private facade: FinancialFormsFacade) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<boolean> {
    const leasingId = Number(route.paramMap.get('leasingId'));
    if (!Number.isFinite(leasingId)) return true;

    // If the facade method exists, trigger it, but DO NOT await any stream.
    try {
      this.facade.loadByLeasingMandateId?.(leasingId);
    } catch (e) {
      // swallow – we don’t want to block
      console.warn('[FinancialFormResolver] load skipped/failed:', e);
    }

    return true; // ⬅️ non-blocking
  }
}
