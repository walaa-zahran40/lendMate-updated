import { Injectable } from '@angular/core';
import { Router, Route } from '@angular/router';

@Injectable({ providedIn: 'root' })
@Injectable({ providedIn: 'root' })
export class NavigationService {
  constructor(private router: Router) {}

  public getAllNestedPaths(): string[] {
    return (
      this.flatten(this.router.config)
        // remove any that have "/:" in them
        .filter((path) => !path.includes('/:'))
    );
  }

  private flatten(routes: Route[], parent: string = ''): string[] {
    const result: string[] = [];

    for (const r of routes) {
      // skip blank, login, wildcard
      if (!r.path || r.path === 'login' || r.path === '**') continue;

      // full path so far
      const here = parent ? `${parent}/${r.path}` : r.path;

      // only record if it's nested under something
      if (parent) result.push(here);

      // descend into either eager children or preloaded lazy ones
      const kids: Route[] = r.children ?? (r as any)._loadedRoutes;
      if (kids?.length) {
        result.push(...this.flatten(kids, here));
      }
    }

    return result;
  }
}
