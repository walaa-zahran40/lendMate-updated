import { Component} from '@angular/core';
interface MenuItem {
  label: string;
  icon?: string;
  items?: { label: string; icon: string; active?: boolean, items?:{ label: string; icon: string; active?: boolean }[] }[];
}
@Component({
  selector: 'app-side-menu',
  standalone: false,
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
})
export class SideMenuComponent {

    menuItems = [
      { id: 'clients', icon: 'pi pi-ico1', label: 'clients' },
      { id: 'client', icon: 'pi pi-ico2', label: 'client' },
      { id: 'clien', icon: 'pi pi-ico3', label: 'clien' },
      { id: 'clie', icon: 'pi pi-ico4', label: 'clie' },
      { id: 'cli', icon: 'pi pi-ico5', label: 'cli' },
      { id: 'cl', icon: 'pi pi-ico6', label: 'cl' },
      {
          separator: true
      },
       { id: 'profile', icon: 'pi pi-user', label: 'Profile' },
      { id: 'settings', icon: 'pi pi-cog', label: 'Settings' }
    ];
  
    menuData: Record<string, MenuItem[]> = {
      clients: [
        {
          label: 'Clients',
          icon: 'pi pi-users',
          items: [
            { label: 'View Clients', icon: 'pi pi-eye',
              items: [ // Making it expandable
                { label: 'Active Clients', icon: 'pi pi-check' },
                { label: 'Inactive Clients', icon: 'pi pi-times' }
              ]
             },
            { label: 'Add Client', icon: 'pi pi-user-plus' }
          ]
        },
        {
          label: 'Clients Actions',
          icon: 'pi pi-users',
        },
        {
          label: 'More Actions',
          icon: 'pi pi-users',
          items: [
            { label: 'Import Clients', icon: 'pi pi-download' },
            { label: 'Export Clients', icon: 'pi pi-upload' }
          ]
        }
      ],
      client: [
        { label: 'Client Profile', items: [{ label: 'Edit Profile', icon: 'pi pi-user-edit' }, { label: 'Delete Client', icon: 'pi pi-trash' }] }
      ],
      cli: [
        { label: 'CLI Options', items: [{ label: 'Manage CLI', icon: 'pi pi-cog' }, { label: 'Settings', icon: 'pi pi-sliders-h' }] }
      ]
    };

    activeMenu: string | null = null;
    activeMenuItem: string | null = null;
    searchTerm: string = '';
    filteredMenuItems: MenuItem[] = [];
    toggleMenu(item: any) {
      this.activeMenu = this.activeMenu === item.id ? null : item.id;
      this.activeMenuItem = null;
      this.filterMenuItems();
    }
  
    getActiveLabel(): string {
      return this.menuItems.find(item => item.id === this.activeMenu)?.label || '';
    }
  
    getActiveMenuItems(): MenuItem[] {
      return this.menuData[this.activeMenu as keyof typeof this.menuData] || [];
    }
  
    setActiveMenuItem(event: any) {
      this.activeMenuItem = event.node.label;
    }
    filterMenuItems() {
      const activeItems = this.getActiveMenuItems();
      if (!this.searchTerm) {
        this.filteredMenuItems = activeItems;
        return;
      }
      const searchLower = this.searchTerm.toLowerCase();
      this.filteredMenuItems = activeItems
        .map(section => ({
          ...section,
          items: section.items?.filter(item => item.label.toLowerCase().includes(searchLower)) || []
        }))
        .filter(section => section.label.toLowerCase().includes(searchLower) || section.items.length > 0);
    }
    isMenuActive(): boolean {
      return this.activeMenu !== null;
    }
  }
  
  
