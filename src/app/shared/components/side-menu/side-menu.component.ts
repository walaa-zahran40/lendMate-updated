import { Component } from '@angular/core';
import { MenuToggleService } from '../../services/menu-toggle.service';
import { Subscription } from 'rxjs';
interface MenuItem {
  label: string;
  icon?: string;
  items?: {
    label: string;
    icon: string;
    active?: boolean;
    items?: { label: string; icon: string; active?: boolean }[];
  }[];
}
@Component({
  selector: 'app-side-menu',
  standalone: false,
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
})
export class SideMenuComponent {
  menuItems = [
    { id: 'crm', icon: 'pi pi-ico1', label: 'crm' },
    { id: 'business', icon: 'pi pi-ico2', label: 'business' },
    { id: 'assets', icon: 'pi pi-ico3', label: 'assets' },
    { id: 'orders', icon: 'pi pi-ico4', label: 'orders' },
    { id: 'settings', icon: 'pi pi-cog', label: 'Settings' },
  ];

  menuData: Record<string, MenuItem[]> = {
    crm: [
      {
        label: 'Client Operations',
        icon: 'pi pi-users',
        items: [
          { label: 'Quick Onboarding', icon: 'pi pi-user-plus' },
          { label: 'Clients', icon: 'pi pi-user-plus' },
          { label: 'Client Address', icon: 'pi pi-user-plus' },
          { label: 'ClientCentralBank', icon: 'pi pi-user-plus' },
          { label: 'ClientCompanyBusinessDetails', icon: 'pi pi-user-plus' },
          { label: 'ClientCRAuthorityOffice', icon: 'pi pi-user-plus' },
          { label: 'ClientDocumentType', icon: 'pi pi-user-plus' },
          { label: 'ClientGuarantor', icon: 'pi pi-user-plus' },
          { label: 'ClientIdentity', icon: 'pi pi-user-plus' },
          { label: 'ClientIndividualBusinessDetail', icon: 'pi pi-user-plus' },
          { label: 'ClientLegal', icon: 'pi pi-user-plus' },
          { label: 'ClientOfficer', icon: 'pi pi-user-plus' },
          { label: 'ClientPhoneNumber', icon: 'pi pi-user-plus' },
          { label: 'ClientSalesTurnovers', icon: 'pi pi-user-plus' },
          { label: 'ClientShareHolder', icon: 'pi pi-user-plus' },
          { label: 'ClientFile', icon: 'pi pi-user-plus' },
          { label: 'ClientTaxOffice', icon: 'pi pi-user-plus' },
          { label: 'ClientTMLOfficer', icon: 'pi pi-user-plus' },
          { label: 'ContactPerson', icon: 'pi pi-user-plus' },
        ],
      },
      {
        label: 'Communication',
        icon: 'pi pi-users',
        items: [
          { label: 'Call', icon: 'pi pi-user-plus' },
          { label: 'Meeting', icon: 'pi pi-user-plus' },
          { label: 'FollowUp', icon: 'pi pi-user-plus' },
          { label: 'FollowUpPoints', icon: 'pi pi-user-plus' },
          { label: 'CommunicationFollowUp', icon: 'pi pi-user-plus' },
          { label: 'MonitorFollowUps', icon: 'pi pi-user-plus' },
        ],
      },
      {
        label: 'Vendors',
        icon: 'pi pi-users',
        items: [
          { label: 'Vendors', icon: 'pi pi-user-plus' },
          { label: 'VendorAddress', icon: 'pi pi-user-plus' },
          { label: 'VendorCompanyBusinessDetails', icon: 'pi pi-user-plus' },
          { label: 'VendorCRAuthorityOffice', icon: 'pi pi-user-plus' },
          { label: 'VendorDocumentType', icon: 'pi pi-user-plus' },
          { label: 'VendorIdentity', icon: 'pi pi-user-plus' },
          { label: 'VendorLegal', icon: 'pi pi-user-plus' },
          { label: 'VendorOfficer', icon: 'pi pi-user-plus' },
          { label: 'VendorPhoneNumber', icon: 'pi pi-user-plus' },
          { label: 'VendorShareHolder', icon: 'pi pi-user-plus' },
          { label: 'VendorFile', icon: 'pi pi-user-plus' },
          { label: 'VendorTaxOffice', icon: 'pi pi-user-plus' },
          { label: 'ContactPerson', icon: 'pi pi-user-plus' },
        ],
      },
      {
        label: 'Guarantors',
        icon: 'pi pi-users',
        items: [
          { label: 'Guarantors', icon: 'pi pi-user-plus' },
          { label: 'GuarantorAddress', icon: 'pi pi-user-plus' },
          { label: 'GuarantorCompanyBusinessDetails', icon: 'pi pi-user-plus' },
          { label: 'GuarantorCRAuthorityOffice', icon: 'pi pi-user-plus' },
          { label: 'GuarantorDocumentType', icon: 'pi pi-user-plus' },
          { label: 'GuarantorIdentity', icon: 'pi pi-user-plus' },
          { label: 'GuarantorLegal', icon: 'pi pi-user-plus' },
          { label: 'GuarantorOfficer', icon: 'pi pi-user-plus' },
          { label: 'GuarantorPhoneNumber', icon: 'pi pi-user-plus' },
          { label: 'GuarantorShareHolder', icon: 'pi pi-user-plus' },
          { label: 'GuarantorFile', icon: 'pi pi-user-plus' },
          { label: 'GuarantorTaxOffice', icon: 'pi pi-user-plus' },
          { label: 'ContactPerson', icon: 'pi pi-user-plus' },
        ],
      },
    ],
    business: [
      {
        label: 'Leasing',
        icon: 'pi pi-users',
        items: [
          { label: 'Mandate', icon: 'pi pi-user-plus' },
          { label: 'MandateAdditionalTerm', icon: 'pi pi-user-plus' },
          { label: 'MandateFees', icon: 'pi pi-user-plus' },
          { label: 'MandateFinancialActivity', icon: 'pi pi-user-plus' },
        ],
      },
    ],
    assets: [
      {
        label: 'Leasing',
        icon: 'pi pi-users',
        items: [
          { label: 'Vehicle', icon: 'pi pi-user-plus' },
          { label: 'Machinery and Equipments', icon: 'pi pi-user-plus' },
          { label: 'Real Estate', icon: 'pi pi-user-plus' },
        ],
      },
      {
        label: 'Insurance Policies',
        icon: 'pi pi-users',
      },
    ],
    orders: [
      {
        label: 'Leasing',
        icon: 'pi pi-users',
        items: [{ label: 'Purchasing Order', icon: 'pi pi-user-plus' }],
      },
    ],
    settings: [
      {
        label: 'General',
        icon: 'pi pi-users',
        items: [
          { label: 'AppSettings', icon: 'pi pi-user-plus' },
          { label: 'BusinessLine', icon: 'pi pi-user-plus' },
          { label: 'Product', icon: 'pi pi-user-plus' },
          { label: 'Sector', icon: 'pi pi-user-plus' },
          { label: 'SubSector', icon: 'pi pi-user-plus' },
          { label: 'Tenants CRUD', icon: 'pi pi-user-plus' },
        ],
      },
      {
        label: 'Organization',
        icon: 'pi pi-users',
        items: [
          { label: 'Officer', icon: 'pi pi-user-plus' },
          { label: 'BranchesManagers', icon: 'pi pi-user-plus' },
          { label: 'BranchesOfficers', icon: 'pi pi-user-plus' },
          { label: 'DepartmentManager', icon: 'pi pi-user-plus' },
          { label: 'SignatoryOfficer', icon: 'pi pi-user-plus' },
          { label: 'TeamLeadOfficer', icon: 'pi pi-user-plus' },
          { label: 'TeamOfficer', icon: 'pi pi-user-plus' },
          { label: 'Department', icon: 'pi pi-user-plus' },
          { label: 'Team', icon: 'pi pi-user-plus' },
          { label: 'Branch', icon: 'pi pi-user-plus' },
        ],
      },
      {
        label: 'Legal',
        icon: 'pi pi-users',
        items: [
          { label: 'LegalForm', icon: 'pi pi-user-plus' },
          { label: 'LegalFormLaw', icon: 'pi pi-user-plus' },
          { label: 'CRAuthorityOffice', icon: 'pi pi-user-plus' },
          { label: 'TaxOffice', icon: 'pi pi-user-plus' },
          { label: 'SMEClientCode', icon: 'pi pi-user-plus' },
        ],
      },
      {
        label: 'Security',
        icon: 'pi pi-users',
        items: [
          { label: 'ApplicationRole', icon: 'pi pi-user-plus' },
          { label: 'ApplicationRoleClaim', icon: 'pi pi-user-plus' },
          { label: 'ApplicationUserRole', icon: 'pi pi-user-plus' },
          { label: 'Users', icon: 'pi pi-user-plus' },
          { label: 'PageOperations', icon: 'pi pi-user-plus' },
          { label: 'Operations CRUD', icon: 'pi pi-user-plus' },
          { label: 'Pages CRUD', icon: 'pi pi-user-plus' },
        ],
      },
      {
        label: 'Client WorkFlow',
        icon: 'pi pi-users',
        items: [
          { label: 'ClientStatus', icon: 'pi pi-user-plus' },
          { label: 'ClientStatusAction', icon: 'pi pi-user-plus' },
          {
            label: 'ClientStatusActionAuthorizationGroup',
            icon: 'pi pi-user-plus',
          },
          { label: 'MandateStatusActionCondition', icon: 'pi pi-user-plus' },
          {
            label: 'ClientStatusActionNotificationGroup',
            icon: 'pi pi-user-plus',
          },
          { label: 'MandateWorkFlowActions', icon: 'pi pi-user-plus' },
          { label: 'ClientNotificationGroupOfficer', icon: 'pi pi-user-plus' },
          { label: 'ClientAuthorizationGroup', icon: 'pi pi-user-plus' },
        ],
      },
      {
        label: 'Mandate WorkFlow',
        icon: 'pi pi-users',
        items: [
          { label: 'MandateStatus', icon: 'pi pi-user-plus' },
          { label: 'MandateStatusAction', icon: 'pi pi-user-plus' },
          {
            label: 'MandateStatusActionAuthorizationGroup',
            icon: 'pi pi-user-plus',
          },
          { label: 'MandateStatusActionCondition', icon: 'pi pi-user-plus' },
          {
            label: 'MandateStatusActionNotificationGroup',
            icon: 'pi pi-user-plus',
          },
          { label: 'MandateWorkFlowActions', icon: 'pi pi-user-plus' },
          { label: 'MandateNotificationGroupOfficer', icon: 'pi pi-user-plus' },
          { label: 'MandateAuthorizationGroup', icon: 'pi pi-user-plus' },
        ],
      },
      {
        label: 'Fees',
        icon: 'pi pi-users',
        items: [
          { label: 'FeesRange', icon: 'pi pi-user-plus' },
          { label: 'FeeCalculationType', icon: 'pi pi-user-plus' },
          { label: 'FeeType', icon: 'pi pi-user-plus' },
        ],
      },
      {
        label: 'Lookups',
        icon: 'pi pi-users',
        items: [
          { label: 'ClientOfficerType', icon: 'pi pi-user-plus' },
          { label: 'MandatePaymentSetting', icon: 'pi pi-user-plus' },
          { label: 'AddressType', icon: 'pi pi-user-plus' },
          { label: 'Area', icon: 'pi pi-user-plus' },
          { label: 'AssetType', icon: 'pi pi-user-plus' },
          { label: 'AssetTypeCategory', icon: 'pi pi-user-plus' },
          { label: 'AuthorizationGroup', icon: 'pi pi-user-plus' },
          { label: 'CallActionType', icon: 'pi pi-user-plus' },
          { label: 'CallType', icon: 'pi pi-user-plus' },
          { label: 'ClientIdentityType', icon: 'pi pi-user-plus' },
          { label: 'ClientType', icon: 'pi pi-user-plus' },
          { label: 'CommunicationFlowType', icon: 'pi pi-user-plus' },
          { label: 'CommunicationType', icon: 'pi pi-user-plus' },
          { label: 'CompanyType', icon: 'pi pi-user-plus' },
          { label: 'Condition', icon: 'pi pi-user-plus' },
          { label: 'ConditionExpression', icon: 'pi pi-user-plus' },
          { label: 'Country', icon: 'pi pi-user-plus' },
          { label: 'Currency', icon: 'pi pi-user-plus' },
          { label: 'CurrencyExchangeRate', icon: 'pi pi-user-plus' },
          { label: 'FollowUpType', icon: 'pi pi-user-plus' },
          { label: 'Governorate', icon: 'pi pi-user-plus' },
          { label: 'GracePeriodUnit', icon: 'pi pi-user-plus' },
          { label: 'IdentificationType', icon: 'pi pi-user-plus' },
          { label: 'InsuredBy', icon: 'pi pi-user-plus' },
          { label: 'InterestRateBenchmark', icon: 'pi pi-user-plus' },
          { label: 'InterestType', icon: 'pi pi-user-plus' },
          { label: 'LeasingType', icon: 'pi pi-user-plus' },
          { label: 'MandateValidityUnit', icon: 'pi pi-user-plus' },
          { label: 'MeetingTypes', icon: 'pi pi-user-plus' },
          { label: 'NotificationGroup', icon: 'pi pi-user-plus' },
          { label: 'PaymentMethod', icon: 'pi pi-user-plus' },
          { label: 'PaymentMonthDay', icon: 'pi pi-user-plus' },
          { label: 'PaymentPeriod', icon: 'pi pi-user-plus' },
          { label: 'PaymentTimingTerm', icon: 'pi pi-user-plus' },
          { label: 'PaymentType', icon: 'pi pi-user-plus' },
          { label: 'PhoneType', icon: 'pi pi-user-plus' },
          { label: 'Property', icon: 'pi pi-user-plus' },
          { label: 'PropertyType', icon: 'pi pi-user-plus' },
          { label: 'RentStructureType', icon: 'pi pi-user-plus' },
          { label: 'TMLOfficerType', icon: 'pi pi-user-plus' },
          { label: 'WorkflowActionType', icon: 'pi pi-user-plus' },
        ],
      },
    ],
  };

  activeMenu: string | null = null;
  activeMenuItem: string | null = null;
  searchTerm: string = '';
  filteredMenuItems: MenuItem[] = [];
  isVisible = true;
  subscription!: Subscription;

  constructor(private menuToggleService: MenuToggleService) {}

  ngOnInit() {
    this.subscription = this.menuToggleService.toggle$.subscribe(
      (isVisible) => (this.isVisible = isVisible)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  toggleMenu(item: any) {
    this.activeMenu = this.activeMenu === item.id ? null : item.id;
    this.activeMenuItem = null;
    this.filterMenuItems();
  }

  getActiveLabel(): string {
    return (
      this.menuItems.find((item) => item.id === this.activeMenu)?.label || ''
    );
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
      .map((section) => ({
        ...section,
        items:
          section.items?.filter((item) =>
            item.label.toLowerCase().includes(searchLower)
          ) || [],
      }))
      .filter(
        (section) =>
          section.label.toLowerCase().includes(searchLower) ||
          section.items.length > 0
      );
  }
  isMenuActive(): boolean {
    return this.activeMenu !== null;
  }
}
