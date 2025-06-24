export interface MenuItem {
  label: string;
  icon?: string;
  routerLink?: string;
  items?: MenuItem[];
  /** the exact claim key in your JWT, e.g. "/Clients/GetAll" */
  permissionKey?: string | string[];
}
