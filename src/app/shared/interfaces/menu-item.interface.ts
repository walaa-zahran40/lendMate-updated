export interface MenuItem {
  id?: string;
  label: string;
  icon?: string;
  routerLink?: string;
  items?: MenuItem[];
  permission?: string; // <-- which claim toggles *this* item
}
