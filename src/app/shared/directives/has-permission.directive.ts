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
  standalone: false,
})
export class HasPermissionDirective implements OnInit, OnChanges {
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
    if (!this.permissionKeys) {
      this.viewContainer.clear();
      this.hasView = false;
      return;
    }

    const keys = Array.isArray(this.permissionKeys)
      ? this.permissionKeys
      : this.permissionKeys
          .split(',')
          .map((k) => k.trim())
          .filter((k) => !!k);

    if (keys.length === 0) {
      this.viewContainer.clear();
      this.hasView = false;
      return;
    }

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
