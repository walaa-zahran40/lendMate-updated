import {
  Directive,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { PermissionService } from '../../pages/login/store/permissions/permission.service';

@Directive({
  selector: '[appHasPermission]',
  standalone: false, // optional, false is the default
})
export class HasPermissionDirective implements OnInit, OnChanges {
  /** can be either:
   *   - "PERM_KEY"
   *   - "KEY1,KEY2,KEY3"
   *   - ["KEY1","KEY2","KEY3"]
   */
  @Input('appHasPermission') permissionKeys?: string | string[];

  private hasView = false;

  constructor(
    private tpl: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private perms: PermissionService
  ) {}

  ngOnInit() {
    this.updateView();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['permissionKeys']) {
      this.updateView();
    }
  }

  private updateView() {
    // If no key(s) passed → clear out
    if (!this.permissionKeys) {
      this.viewContainer.clear();
      this.hasView = false;
      return;
    }

    // Normalize into an array of non-empty strings
    const keys = Array.isArray(this.permissionKeys)
      ? this.permissionKeys
      : this.permissionKeys
          .split(',')
          .map((k) => k.trim())
          .filter((k) => !!k);

    // If they passed an empty string or empty array, treat as "no permission"
    if (keys.length === 0) {
      this.viewContainer.clear();
      this.hasView = false;
      return;
    }

    // Only show if _all_ keys pass
    const hasAll = keys.every((k) => this.perms.hasPermission(k));

    if (hasAll && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.tpl);
      this.hasView = true;
    } else if (!hasAll && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
