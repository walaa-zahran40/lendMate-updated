// resolvers/client-flag.resolver.ts
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ClientPresenceFlagResolver
  implements Resolve<{ hasClientInRoute: boolean; clientId?: number }>
{
  resolve(route: ActivatedRouteSnapshot) {
    const raw = route.paramMap.get('clientId');
    const clientId = raw ? Number(raw) : undefined;
    return {
      hasClientInRoute: Number.isFinite(clientId as any),
      clientId,
    };
  }
}
