import { Injectable } from '@angular/core';
import { Router, Route } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  constructor(private router: Router) {}

  /**
   * Returns every nested path in the form "parent/child/...".
   * Skips top-level-only entries and any blank/login/** routes.
   */
  public getAllNestedPaths(): string[] {
    return this.flatten(this.router.config);
  }

  private flatten(routes: Route[], parent: string = ''): string[] {
    const result: string[] = [];

    for (const r of routes) {
      if (!r.path || r.path === 'login' || r.path === '**') {
        continue;
      }
      const here = parent ? `${parent}/${r.path}` : r.path;
      if (parent) {
        result.push(here);
      }
      const children: Route[] = r.children ?? (r as any)._loadedRoutes;
      if (children?.length) {
        result.push(...this.flatten(children, here));
      }
      console.log('🚀 NavigationService: flattening routes:', here);
    }

    return result;
  }
}
