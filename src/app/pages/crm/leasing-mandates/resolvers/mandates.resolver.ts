import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { MandatesFacade } from '../store/leasing-mandates/leasing-mandates.facade';
import { firstValueFrom, filter, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MandatesListResolver implements Resolve<boolean> {
  constructor(private facade: MandatesFacade) {}
  async resolve(): Promise<boolean> {
    this.facade.loadAll();
    await firstValueFrom(this.facade.all$.pipe(take(1)));
    return true;
  }
}

@Injectable({ providedIn: 'root' })
export class MandatesByClientResolver implements Resolve<boolean> {
  constructor(private facade: MandatesFacade) {}
  async resolve(route: ActivatedRouteSnapshot): Promise<boolean> {
    const clientId = Number(route.paramMap.get('clientId'));
    if (Number.isFinite(clientId)) {
      this.facade.loadByClientId(clientId);
      await firstValueFrom(this.facade.all$.pipe(take(1)));
    }
    return true;
  }
}

@Injectable({ providedIn: 'root' })
export class MandateDetailResolver implements Resolve<boolean> {
  constructor(private facade: MandatesFacade) {}
  async resolve(route: ActivatedRouteSnapshot): Promise<boolean> {
    const leasingId = Number(route.paramMap.get('leasingId'));
    if (!Number.isFinite(leasingId)) return true;

    this.facade.clearSelected();
    this.facade.loadById(leasingId);

    await firstValueFrom(
      this.facade.selectedMandate$.pipe(
        filter((m) => !!m && m.id === leasingId),
        take(1)
      )
    );
    return true;
  }
}
