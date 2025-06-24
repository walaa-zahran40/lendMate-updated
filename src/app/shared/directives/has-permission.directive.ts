import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { PermissionService } from '../../pages/login/store/permissions/permission.service';

@Directive({
  selector: '[appHasPermission]',
  standalone: false,
})
export class HasPermissionDirective implements OnInit {
  /** can be either:
   *   - "PERM_KEY"
   *   - "KEY1,KEY2,KEY3"
   *   - ["KEY1","KEY2","KEY3"]
   */
  @Input('appHasPermission') permissionKeys!: string | string[];

  constructor(
    private tpl: TemplateRef<any>,
    private view: ViewContainerRef,
    private vc: ViewContainerRef,
    private perms: PermissionService
  ) {}

  ngOnInit() {
    // Normalize into an array of non-empty strings
    let keys: string[];
    if (Array.isArray(this.permissionKeys)) {
      keys = this.permissionKeys;
    } else {
      keys = this.permissionKeys
        .split(',')
        .map((k) => k.trim())
        .filter((k) => !!k);
    }

    // Only show if _all_ keys pass
    const hasAll = keys.every((k) => this.perms.hasPermission(k));

    if (hasAll) {
      this.view.createEmbeddedView(this.tpl);
    } else {
      this.view.clear();
    }
  }
}
