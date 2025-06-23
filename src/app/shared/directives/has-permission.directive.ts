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
  @Input('appHasPermission') permissionKey!: string;

  constructor(
    private tpl: TemplateRef<any>,
    private view: ViewContainerRef,
    private perms: PermissionService
  ) {}

  ngOnInit() {
    if (this.perms.hasPermission(this.permissionKey)) {
      this.view.createEmbeddedView(this.tpl);
    } else {
      this.view.clear();
    }
  }
}
