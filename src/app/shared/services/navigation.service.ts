import { Injectable } from '@angular/core';
import { Router, Route } from '@angular/router';

@Injectable({ providedIn: 'root' })
@Injectable({ providedIn: 'root' })
export class NavigationService {
  constructor(private router: Router) {}

  public getAllNestedPaths(): string[] {
    return this.flatten(this.router.config).filter(
      (path) => !path.includes('/:')
    );
  }

  private flatten(routes: Route[], parent: string = ''): string[] {
    const result: string[] = [];

    for (const r of routes) {
      if (!r.path || r.path === 'login' || r.path === '**') continue;

      const here = parent ? `${parent}/${r.path}` : r.path;

      if (parent) result.push(here);

      const kids: Route[] = r.children ?? (r as any)._loadedRoutes;
      if (kids?.length) {
        result.push(...this.flatten(kids, here));
      }
    }

    return result;
  }
}
