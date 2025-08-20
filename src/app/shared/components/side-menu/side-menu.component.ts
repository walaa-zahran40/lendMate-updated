import { Component } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  Subject,
  Subscription,
  takeUntil,
} from 'rxjs';
import { MenuItem } from '../../interfaces/menu-item.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { InteractionStatus } from '@azure/msal-browser';
import { PermissionService } from '../../../pages/login/store/permissions/permission.service';
import { TranslateService } from '@ngx-translate/core';
type MenuLeaf = {
  i18nKey: string;
  icon?: string;
  routerLink?: string | string[];
  permission?: string;
};

type MenuGroup = {
  i18nKey: string;
  icon?: string;
  permission?: string;
  items?: MenuLeaf[];
  // leaf support:
  routerLink?: string | string[];
};

type TopButton = {
  id: string;
  icon: string;
  i18nKey: string;
  permission?: string;
};

@Component({
  selector: 'app-side-menu',
  standalone: false,
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
})
export class SideMenuComponent {
  isLoggedIn = false;
  private permsSub!: Subscription;
  private destroyed$ = new Subject<void>();
  private activeLocalized: any[] = []; // localized model for current section (no search)
  filteredMenuItemsLocalized: any[] = []; // localized filtered results
  displayModel: any[] = []; // what the template binds to

  private search$ = new Subject<string>(); // debounced search stream

  menuItems: TopButton[] = [
    {
      id: 'CRM',
      icon: 'pi pi-ico1',
      i18nKey: 'MENU.CRM',
      permission: '/Clients/GetAll',
    },

    { id: 'Purchasing', icon: 'pi pi-ico4', i18nKey: 'MENU.PURCHASING' },

    {
      id: 'Business',
      icon: 'pi pi-ico3',
      i18nKey: 'MENU.BUSINESS',
      permission: '/LeasingMandates/GetAll',
    },

    // {
    //   id: 'Assets',
    //   icon: 'pi pi-ico6',
    //   i18nKey: 'MENU.ASSETS',
    //   permission: '/LeasingMandates/GetAll',
    // },

    {
      id: 'Settings',
      icon: 'pi pi-ico5',
      i18nKey: 'MENU.SETTINGS',
      permission: '/ApplicationRoles/GetAll',
    },
  ];
  raw = this.route.snapshot.paramMap.get('teamId');
  private destroy$ = new Subject<void>();
  claims: Record<string, any> = {};

  activeMenuItem: string | null = null;
  filteredMenuItems: MenuItem[] = [];
  isVisible = true;
  private toggleSub!: Subscription;
  clientId: string | null = null;
  rawTeamId: string | null = null;
  menuData: Record<string, MenuGroup[]> = {
    CRM: [
      {
        i18nKey: 'CRM.CLIENT_OPERATIONS',

        permission: '/Clients/GetAll', // show this group if user can read clients
        items: [
          {
            i18nKey: 'CRM.QUICK_ONBOARDING',
            icon: 'pi pi-user-plus',
            routerLink: '/crm/clients/view-clients-onboarding',
            permission: '/Clients/GetAll',
          },
          {
            i18nKey: 'CRM.CLIENTS',
            icon: 'pi pi-user-plus',
            routerLink: '/crm/clients/view-clients',
            permission: '/Clients/GetAll',
          },
        ],
      },
      {
        i18nKey: 'COMMUNICATION._ROOT',

        items: [
          {
            i18nKey: 'COMMUNICATION.MEETINGS',

            routerLink: '/communication/view-meetings',
            permission: '/Meetings/GetAll',
          },
          {
            i18nKey: 'COMMUNICATION.CALENDAR',

            routerLink: '/communication/save-meeting',
            permission: '/Meetings/GetAll',
          },
        ],
      },
      // {
      //   label: 'Communication',
      //
      //   items: [
      //     {
      //       label: 'Call',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/communication/view-calls',
      //     },
      //     {
      //       label: 'Meeting',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/communication/view-meetings',
      //     },
      // {
      //   label: 'FollowUp',
      //   icon: 'pi pi-user-plus',
      //   routerLink: '/communication/view-followups',
      // },
      // {
      //   label: 'FollowUpPoints',
      //   icon: 'pi pi-user-plus',
      //   routerLink: '/communication/view-followup-points',
      // },
      // {
      //   label: 'CommunicationFollowUp',
      //   icon: 'pi pi-user-plus',
      //   routerLink: '/communication/view-followups',
      // },
      // {
      //   label: 'MonitorFollowUps',
      //   icon: 'pi pi-user-plus',
      //   routerLink: '/communication/view-monitor-followups',
      // },
      //   ],
      // },
      // {
      //   label: 'Vendors',
      //
      //   items: [
      //     {
      //       label: 'Vendors',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/communication/view-callss',
      //     },
      //     {
      //       label: 'VendorAddress',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/communication/view-callss',
      //     },
      //     {
      //       label: 'VendorCompanyBusinessDetails',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/communication/view-callss',
      //     },
      //     {
      //       label: 'VendorCRAuthorityOffice',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/communication/view-callss',
      //     },
      //     {
      //       label: 'VendorDocumentType',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/communication/view-callss',
      //     },
      //     {
      //       label: 'VendorIdentity',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/communication/view-callss',
      //     },
      //     {
      //       label: 'VendorLegal',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/communication/view-callss',
      //     },
      //     {
      //       label: 'VendorOfficer',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/communication/view-callss',
      //     },
      //     {
      //       label: 'VendorPhoneNumber',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/communication/view-callss',
      //     },
      //     {
      //       label: 'VendorShareHolder',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/communication/view-callss',
      //     },
      //     {
      //       label: 'VendorFile',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/communication/view-callss',
      //     },
      //     {
      //       label: 'VendorTaxOffice',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/communication/view-callss',
      //     },
      //     {
      //       label: 'ContactPerson',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/communication/view-callss',
      //     },
      //   ],
      // },
      // {
      //   label: 'Guarantors',
      //
      //   items: [
      //     {
      //       label: 'Guarantors',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/communication/view-callss',
      //     },
      //     {
      //       label: 'GuarantorAddress',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/communication/view-callss',
      //     },
      //     {
      //       label: 'GuarantorCompanyBusinessDetails',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/communication/view-callss',
      //     },
      //     {
      //       label: 'GuarantorCRAuthorityOffice',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/communication/view-callss',
      //     },
      //     {
      //       label: 'GuarantorDocumentType',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/communication/view-callss',
      //     },
      //     {
      //       label: 'GuarantorIdentity',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/communication/view-callss',
      //     },
      //     {
      //       label: 'GuarantorLegal',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/communication/view-callss',
      //     },
      //     {
      //       label: 'GuarantorOfficer',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/communication/view-callss',
      //     },
      //     {
      //       label: 'GuarantorPhoneNumber',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/communication/view-callss',
      //     },
      //     {
      //       label: 'GuarantorShareHolder',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/communication/view-callss',
      //     },
      //     {
      //       label: 'GuarantorFile',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/communication/view-callss',
      //     },
      //     {
      //       label: 'GuarantorTaxOffice',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/communication/view-callss',
      //     },
      //     {
      //       label: 'ContactPerson',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/communication/view-callss',
      //     },
      //   ],
      // },
    ],
    Purchasing: [
      {
        i18nKey: 'PURCHASING.ASSETS',

        routerLink: '/purchasing/assets/view-assets',
      },
      {
        i18nKey: 'PURCHASING.PURCHASING_ORDERS',

        routerLink: '/purchasing/purchasing-orders/view-purchasing-orders',
      },

      // {
      //   label: 'Communication',
      //
      //   items: [
      //     {
      //       label: 'Call',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/communication/view-calls',
      //     },
      //     {
      //       label: 'Meeting',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/communication/view-meetings',
      //     },
      // {
      //   label: 'FollowUp',
      //   icon: 'pi pi-user-plus',
      //   routerLink: '/communication/view-followups',
      // },
      // {
      //   label: 'FollowUpPoints',
      //   icon: 'pi pi-user-plus',
      //   routerLink: '/communication/view-followup-points',
      // },
      // {
      //   label: 'CommunicationFollowUp',
      //   icon: 'pi pi-user-plus',
      //   routerLink: '/communication/view-followups',
      // },
      // {
      //   label: 'MonitorFollowUps',
      //   icon: 'pi pi-user-plus',
      //   routerLink: '/communication/view-monitor-followups',
      // },
      //   ],
      // },
      // {
      //   label: 'Vendors',
      //
      //   items: [
      //     {
      //       label: 'Vendors',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/communication/view-callss',
      //     },
      //     {
      //       label: 'VendorAddress',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/communication/view-callss',
      //     },
      //     {
      //       label: 'VendorCompanyBusinessDetails',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/communication/view-callss',
      //     },
      //     {
      //       label: 'VendorCRAuthorityOffice',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/communication/view-callss',
      //     },
      //     {
      //       label: 'VendorDocumentType',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/communication/view-callss',
      //     },
      //     {
      //       label: 'VendorIdentity',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/communication/view-callss',
      //     },
      //     {
      //       label: 'VendorLegal',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/communication/view-callss',
      //     },
      //     {
      //       label: 'VendorOfficer',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/communication/view-callss',
      //     },
      //     {
      //       label: 'VendorPhoneNumber',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/communication/view-callss',
      //     },
      //     {
      //       label: 'VendorShareHolder',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/communication/view-callss',
      //     },
      //     {
      //       label: 'VendorFile',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/communication/view-callss',
      //     },
      //     {
      //       label: 'VendorTaxOffice',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/communication/view-callss',
      //     },
      //     {
      //       label: 'ContactPerson',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/communication/view-callss',
      //     },
      //   ],
      // },
      // {
      //   label: 'Guarantors',
      //
      //   items: [
      //     {
      //       label: 'Guarantors',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/communication/view-callss',
      //     },
      //     {
      //       label: 'GuarantorAddress',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/communication/view-callss',
      //     },
      //     {
      //       label: 'GuarantorCompanyBusinessDetails',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/communication/view-callss',
      //     },
      //     {
      //       label: 'GuarantorCRAuthorityOffice',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/communication/view-callss',
      //     },
      //     {
      //       label: 'GuarantorDocumentType',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/communication/view-callss',
      //     },
      //     {
      //       label: 'GuarantorIdentity',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/communication/view-callss',
      //     },
      //     {
      //       label: 'GuarantorLegal',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/communication/view-callss',
      //     },
      //     {
      //       label: 'GuarantorOfficer',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/communication/view-callss',
      //     },
      //     {
      //       label: 'GuarantorPhoneNumber',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/communication/view-callss',
      //     },
      //     {
      //       label: 'GuarantorShareHolder',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/communication/view-callss',
      //     },
      //     {
      //       label: 'GuarantorFile',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/communication/view-callss',
      //     },
      //     {
      //       label: 'GuarantorTaxOffice',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/communication/view-callss',
      //     },
      //     {
      //       label: 'ContactPerson',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/communication/view-callss',
      //     },
      //   ],
      // },
    ],
    Business: [
      {
        i18nKey: 'BUSINESS.LEASING',

        items: [
          {
            i18nKey: 'BUSINESS.MANDATE',
            icon: 'pi pi-user-plus',
            routerLink: '/crm/leasing-mandates/view-mandates',
            permission: '/LeasingMandates/GetAll',
          },

          // {
          //   label: 'MandateAdditionalTerm',
          //   icon: 'pi pi-user-plus',
          //   routerLink: '/crm/leasing-mandates/view-manage-mandate-terms',
          // },
          // {
          //   label: 'MandateFees',
          //   icon: 'pi pi-user-plus',
          //   routerLink: '/crm/leasing-mandates/view-manage-mandate-termss',
          // },
          // {
          //   label: 'MandateFinancialActivity',
          //   icon: 'pi pi-user-plus',
          //   routerLink: '/crm/leasing-mandates/leasing-financial-form-compound',
          // },
        ],
      },
    ],
    Contracts: [
      {
        i18nKey: 'CONTRACTS.CONTRACTS',

        routerLink: '/contracts/view-contracts',
      },
    ],
    // Assets: [
    //   {
    //     i18nKey: 'ASSETS.ASSETS',
    //
    //     routerLink: '/purchasing/assets/view-assets',
    //   },
    // ],
    // Orders: [
    //   {
    //     label: 'Leasing',
    //
    //     items: [
    //       {
    //         label: 'Purchasing Order',
    //         icon: 'pi pi-user-plus',
    //         routerLink: '/crm/leasing-mandates/view-manage-mandate-termss',
    //       },
    //     ],
    //   },
    // ],
    Settings: [
      {
        i18nKey: 'SETTINGS.GENERAL',

        items: [
          // {
          //   label: 'AppSettings',
          //   icon: 'pi pi-user-plus',
          //   routerLink: '/crm/leasing-mandates/view-manage-mandate-termss',
          // },
          {
            i18nKey: 'LOOKUPS.BUSINESS_LINES',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-business-lines',
            permission: '/BusinessLines/GetAll',
          },
          {
            i18nKey: 'LOOKUPS.PRODUCTS',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-products',
            permission: '/Products/GetAll',
          },
          {
            i18nKey: 'LOOKUPS.SECTORS',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-sectors',
            permission: '/Sectors/GetAll',
          },
          {
            i18nKey: 'LOOKUPS.SUB_SECTORS',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-sub-sectors',
            permission: '/SubSectors/GetAll',
          },

          // {
          //   label: 'Tenants ',
          //   icon: 'pi pi-user-plus',
          //   routerLink: '/crm/leasing-mandates/view-manage-mandate-termss',
          // },
        ],
      },
      {
        i18nKey: 'SETTINGS.ORGANIZATIONS',

        items: [
          {
            i18nKey: 'ORGANIZATION.BRANCHES',
            icon: 'pi pi-user-plus',
            routerLink: '/organizations/view-branches',
            permission: '/Branches/GetAll',
          },
          {
            i18nKey: 'ORGANIZATION.DEPARTMENTS',
            icon: 'pi pi-user-plus',
            routerLink: '/organizations/view-departments',
            permission: '/Departments/GetAll',
          },
          {
            i18nKey: 'ORGANIZATION.OFFICERS',
            icon: 'pi pi-user-plus',
            routerLink: '/organizations/view-officers',
            permission: '/Officers/GetAll',
          },

          {
            i18nKey: 'ORGANIZATION.SIGNATORY',
            icon: 'pi pi-user-plus',
            routerLink: '/organizations/view-signatory-officers',
            permission: '/SignatoryOfficers/GetAll',
          },

          // {
          //   label: 'TeamLeadOfficer',
          //   icon: 'pi pi-user-plus',
          //   routerLink: `/organizations/view-team-lead-officers/${this.raw}`,
          // },
          // {
          //   label: 'TeamOfficer',
          //   icon: 'pi pi-user-plus',
          //   routerLink: `/organizations/view-team-officers/${this.raw}`,
          // },

          {
            i18nKey: 'ORGANIZATION.TEAMS',
            icon: 'pi pi-user-plus',
            routerLink: '/organizations/view-teams',
            permission: '/Teams/GetAll',
          },
        ],
      },
      {
        i18nKey: 'SETTINGS.LEGALS',

        items: [
          {
            i18nKey: 'LEGALS.LEGAL_FORMS',
            icon: 'pi pi-user-plus',
            routerLink: '/legals/view-legal-forms',
            permission: '/LegalForms/GetAll',
          },
          {
            i18nKey: 'LEGALS.LEGAL_FORM_LAWS',
            icon: 'pi pi-user-plus',
            routerLink: '/legals/view-legal-form-laws',
            permission: '/LegalFormLaws/GetAll',
          },
          {
            i18nKey: 'LEGALS.CR_OFFICES',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-authority-offices',
            permission: '/CRAuthorityOffices/GetAll',
          },
          {
            i18nKey: 'LEGALS.TAX_OFFICES',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-tax-offices',
            permission: '/TaxOffices/GetAll',
          },
          {
            i18nKey: 'LEGALS.SME_CLIENT_CODES',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-sme-client-codes',
            permission: '/SMEClientCodes/GetAll',
          },
        ],
      },
      {
        i18nKey: 'SETTINGS.SECURITY',

        items: [
          {
            i18nKey: 'SECURITY.APPLICATION_ROLES',
            icon: 'pi pi-user-plus',
            routerLink: '/organizations/view-roles',
            permission: '/ApplicationRoles/GetAll',
          },

          // {
          //   label: 'Application Role Claims',
          //   icon: 'pi pi-user-plus',
          //   routerLink: '/organizations/view-role-claims',
          // },
          // {
          //   label: 'ApplicationUserRole',
          //   icon: 'pi pi-user-plus',
          //   routerLink: '/lookups/view-sme-client-codes',
          // },
          // {
          //   label: 'Users',
          //   icon: 'pi pi-user-plus',
          //   routerLink: '/lookups/view-sme-client-codes',
          // },
          {
            i18nKey: 'SECURITY.PAGE_OPERATIONS',
            icon: 'pi pi-user-plus',
            routerLink: '/organizations/view-page-operations',
            permission: '/PageOperations/GetAll',
          },
          {
            i18nKey: 'SECURITY.OPERATIONS',
            icon: 'pi pi-user-plus',
            routerLink: '/organizations/view-operations',
            permission: '/Operations/GetAll',
          },
          {
            i18nKey: 'SECURITY.PAGES',
            icon: 'pi pi-user-plus',
            routerLink: '/organizations/view-pages',
            permission: '/Pages/GetAll',
          },
        ],
      },
      {
        i18nKey: 'SETTINGS.CLIENT_WORKFLOW',

        items: [
          {
            i18nKey: 'CLIENT_WORKFLOW.CLIENT_STATUS',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-client-statuses',
            permission: '/ClientStatuses/GetAll',
          },
          {
            i18nKey: 'CLIENT_WORKFLOW.CLIENT_STATUS_ACTION',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-client-status-actions',
            permission: '/ClientStatusActions/GetAll',
          },
        ],
      },
      {
        i18nKey: 'SETTINGS.MANDATE_WORKFLOW',

        items: [
          {
            i18nKey: 'MANDATE_WORKFLOW.MANDATE_STATUS',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-mandate-statuses',
            permission: '/MandateStatuses/GetAll',
          },
          {
            i18nKey: 'MANDATE_WORKFLOW.MANDATE_STATUS_ACTION',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-mandate-status-actions',
            permission: '/MandateStatusActions/GetAll',
          },
        ],
      },
      {
        i18nKey: 'SETTINGS.FEES',

        items: [
          {
            i18nKey: 'FEES.FEE_RANGES',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-fee-ranges',
            permission: '/FeesRanges/GetAll',
          },
          {
            i18nKey: 'FEES.FEE_CALC_TYPES',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-fee-calculation-types',
            permission: '/FeeCalculationTypes/GetAll',
          },
          {
            i18nKey: 'FEES.FEE_TYPES',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-fee-types',
            permission: '/FeeTypes/GetAll',
          },
        ],
      },
      {
        i18nKey: 'SETTINGS.LOOKUPS',

        items: [
          {
            i18nKey: 'LOOKUPS.ADDRESS_TYPES',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-address-types',
            permission: '/AddressTypes/GetAll',
          },
          {
            i18nKey: 'LOOKUPS.AREAS',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-areas',
            permission: '/Areas/GetAll',
          },
          {
            i18nKey: 'LOOKUPS.ASSET_TYPES',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-asset-types',
            permission: '/AssetTypes/GetAll',
          },
          {
            i18nKey: 'LOOKUPS.ASSET_TYPE_CATEGORIES',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-asset-type-categories',
            permission: '/AssetTypeCategories/GetAll',
          },
          {
            i18nKey: 'LOOKUPS.AUTHORIZATION_GROUPS',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-authorization-groups',
            permission: '/AuthorizationGroups/GetAll',
          },
          {
            i18nKey: 'LOOKUPS.AUTHORIZATION_GROUP_OFFICERS',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-authorization-group-officers',
            permission: '/AuthorizationGroupOfficers/GetAll',
          },
          {
            i18nKey: 'LOOKUPS.CALL_ACTION_TYPES',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-call-action-types',
            permission: '/CallActionTypes/GetAll',
          },
          {
            i18nKey: 'LOOKUPS.CALL_TYPES',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-call-types',
            permission: '/CallTypes/GetAll',
          },
          {
            i18nKey: 'LOOKUPS.CLIENT_TYPES',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-client-types',
            permission: '/ClientTypes/GetAll',
          },
          {
            i18nKey: 'LOOKUPS.CLIENT_OFFICER_TYPES',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-client-officer-types',
            permission: '/ClientOfficerTypes/GetAll',
          },
          {
            i18nKey: 'LOOKUPS.COMM_TYPES',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-communication-types',
            permission: '/CommunicationTypes/GetAll',
          },
          {
            i18nKey: 'LOOKUPS.COMM_FLOW_TYPES',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-communication-flow-types',
            permission: '/CommunicationFlowTypes/GetAll',
          },
          {
            i18nKey: 'LOOKUPS.COMPANY_TYPES',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-company-types',
            permission: '/CompanyTypes/GetAll',
          },
          {
            i18nKey: 'LOOKUPS.CONDITIONS',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-conditions',
            permission: '/Conditions/GetAll',
          },
          {
            i18nKey: 'LOOKUPS.CONDITION_EXPRESSIONS',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-condition-expressions',
            permission: '/ConditionExpressions/GetAll',
          },
          {
            i18nKey: 'LOOKUPS.COUNTRIES',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-countries',
            permission: '/Countries/GetAll',
          },
          {
            i18nKey: 'LOOKUPS.CURRENCIES',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-currencies',
            permission: '/Currencies/GetAll',
          },
          {
            i18nKey: 'LOOKUPS.DOCUMENT_TYPES',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-document-types',
            permission: '/DocumentTypes/GetAll',
          },
          {
            i18nKey: 'LOOKUPS.EVALUATORS',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-evaluators',
          },
          {
            i18nKey: 'LOOKUPS.FIRST_CLAIM_STATUSES',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-first-claim-statuses',
            permission: '/FollowUpTypes/GetAll',
          },
          {
            i18nKey: 'LOOKUPS.FOLLOWUP_TYPES',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-followup-types',
            permission: '/FollowUpTypes/GetAll',
          },
          {
            i18nKey: 'LOOKUPS.GOVERNORATES',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-governorates',
            permission: '/Governorates/GetAll',
          },
          {
            i18nKey: 'LOOKUPS.ID_TYPES',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-identification-types',
            permission: '/IdentificationTypes/GetAll',
          },
          {
            i18nKey: 'LOOKUPS.INSURED_BY',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-insured-by',
            permission: '/InsuredBy/GetAll',
          },
          {
            i18nKey: 'LOOKUPS.IR_BENCHMARKS',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-interest-rate-benchmarks',
            permission: '/InterestRateBenchmarks/GetAll',
          },
          {
            i18nKey: 'LOOKUPS.INTEREST_TYPES',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-interest-types',
            permission: '/InterestTypes/GetAll',
          },
          {
            i18nKey: 'LOOKUPS.LEASING_TYPES',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-leasing-types',
            permission: '/LeasingTypes/GetAll',
          },
          {
            i18nKey: 'LOOKUPS.LICENSE_TYPES',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-license-types',
          },
          {
            i18nKey: 'LOOKUPS.LICENSE_PROVIDERS',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-license-providers',
          },
          {
            i18nKey: 'LOOKUPS.VALIDITY_UNIT',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-mandate-validity-unit',
            permission: '/ValidityUnits/GetAll',
          },
          {
            i18nKey: 'LOOKUPS.MEETING_TYPES',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-meeting-types',
            permission: '/MeetingTypes/GetAll',
          },
          {
            i18nKey: 'LOOKUPS.NOTIFICATION_GROUPS',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-notification-groups',
            permission: '/NotificationGroups/GetAll',
          },
          {
            i18nKey: 'LOOKUPS.NOTIFICATION_GROUP_OFFICERS',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-notification-group-officers',
            permission: '/NotificationGroupOfficers/GetAll',
          },
          {
            i18nKey: 'LOOKUPS.PAYMENT_METHODS',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-payment-methods',
            permission: '/PaymentMethods/GetAll',
          },
          {
            i18nKey: 'LOOKUPS.PAYMENT_MONTH_DAYS',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-payment-month-days',
            permission: '/PaymentMonthDays/GetAll',
          },
          {
            i18nKey: 'LOOKUPS.PAYMENT_TYPES',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-payment-types',
            permission: '/PaymentTypes/GetAll',
          },
          {
            i18nKey: 'LOOKUPS.PAYMENT_PERIODS',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-payment-periods',
            permission: '/PaymentPeriods/GetAll',
          },
          {
            i18nKey: 'LOOKUPS.PAYMENT_TIMING_TERMS',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-payment-timing-terms',
            permission: '/PaymentTimingTerms/GetAll',
          },
          {
            i18nKey: 'LOOKUPS.PERIOD_UNITS',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-period-units',
            permission: '/PeriodUnits/GetAll',
          },
          {
            i18nKey: 'LOOKUPS.PHONE_TYPES',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-phone-types',
            permission: '/PhoneTypes/GetAll',
          },
          {
            i18nKey: 'LOOKUPS.PRODUCTS',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-products',
            permission: '/Products/GetAll',
          },
          {
            i18nKey: 'LOOKUPS.RENT_STRUCTURE_TYPES',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-rent-structure-types',
            permission: '/RentStructureTypes/GetAll',
          },
          {
            i18nKey: 'LOOKUPS.SECTORS',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-sectors',
            permission: '/Sectors/GetAll',
          },
          {
            i18nKey: 'LOOKUPS.SME_CLIENT_CODES',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-sme-client-codes',
            permission: '/SMEClientCodes/GetAll',
          },
          {
            i18nKey: 'LOOKUPS.SUB_SECTORS',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-sub-sectors',
            permission: '/SubSectors/GetAll',
          },
          {
            i18nKey: 'LOOKUPS.TAX_OFFICES',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-tax-offices',
            permission: '/AssetTypes/GetAll',
          },
          {
            i18nKey: 'LOOKUPS.TML_OFFICER_TYPES',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-tml-officer-types',
            permission: '/TMLOfficerTypes/GetAll',
          },
          {
            i18nKey: 'LOOKUPS.VEHICLE_MODELS',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-vehicle-models',
            permission: '/CRAuthorityOffices/GetAll',
          },
          {
            i18nKey: 'LOOKUPS.VEHICLE_MANUFACTURERS',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-vehicle-manufacturers',
            permission: '/CRAuthorityOffices/GetAll',
          },
          {
            i18nKey: 'LOOKUPS.VENDORS',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-vendors',
            permission: '/FollowUpTypes/GetAll',
          },
          {
            i18nKey: 'Vendor Addresses',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-vendor-addresses',
            permission: '/FollowUpTypes/GetAll',
          },
          {
            i18nKey: 'LOOKUPS.WORKFLOW_ACTION_TYPES',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-workflow-action-types',
            permission: '/WorkflowActionTypes/GetAll',
          },
        ],
      },
    ],
  };
  filteredTopLevel: TopButton[] = [];
  filteredMenuData: Record<string, MenuGroup[]> = {};

  searchTerm = '';
  localizedMenuItems: any[] = []; // final, translated model for PanelMenu
  activeMenu: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private translate: TranslateService,
    private msalBroadcastService: MsalBroadcastService,
    private permissionService: PermissionService,
    private router: Router
  ) {
    // Rebuild localized model on language change
    this.translate.onLangChange
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        this.rebuildActiveLocalized();
        this.applySearch(this.searchTerm);
      });
    // Debounce search input
    this.search$
      .pipe(
        takeUntil(this.destroyed$),
        debounceTime(150),
        distinctUntilChanged()
      )
      .subscribe((term) => this.applySearch(term));
  }

  ngOnInit() {
    // this.toggleSub = this.menuToggleService.toggle$.subscribe(
    //   (isVisible) => (this.isVisible = isVisible)
    // );

    // this.route.paramMap.subscribe((pm) => {
    //   this.raw = pm.get('teamId');
    //   this.clientId = pm.get('clientId');
    // });
    // 1) First, always re‐run applyPermissionFilter as soon as permissionsLoaded$ ever emits.
    this.permissionService.permissionsLoaded$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.applyPermissionFilter();
        // console.log('[SideMenu] filteredTopLevel:', this.filteredTopLevel);
      });

    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status) => status === InteractionStatus.None),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.applyPermissionFilter());

    // NEW: whenever backend perms are loaded (or reloaded), rebuild menu
    this.applyPermissionFilter();
    this.onSectionChanged(); // compute activeLocalized + displayModel
  }
  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
    this.toggleSub.unsubscribe();
    this.permsSub?.unsubscribe();
  }
  /** call this whenever activeMenu or permissions/language changes */
  private rebuildActiveLocalized() {
    const raw = this.getActiveMenuItems(); // raw with i18nKey
    this.activeLocalized = this.localizeModel(raw); // once
  }
  /** maintain the final model for the template */
  private updateDisplayModel() {
    // show filtered results if present, else full active section
    this.displayModel =
      this.filteredMenuItemsLocalized.length > 0
        ? this.filteredMenuItemsLocalized
        : this.activeLocalized;
  }

  localizeModel(groups: any[] = []) {
    const t = (k: string) => this.translate.instant(k);
    return groups.map((g) => {
      if (g.routerLink) {
        return { label: t(g.i18nKey), icon: g.icon, routerLink: g.routerLink };
      }
      return {
        label: t(g.i18nKey),
        icon: g.icon,
        items: (g.items || []).map((i: any) => ({
          label: t(i.i18nKey),
          icon: i.icon,
          routerLink: i.routerLink,
        })),
      };
    });
  }

  applyPermissionFilter() {
    this.filteredTopLevel = this.menuItems.filter((i) =>
      this.hasPermission(i.permission)
    );
    this.filteredMenuData = {};

    for (const section of this.filteredTopLevel) {
      const rawGroups = this.menuData[section.id] || [];
      const kept: MenuGroup[] = [];

      for (const grp of rawGroups) {
        // leaf
        if (grp.routerLink) {
          if (this.hasPermission(grp.permission)) kept.push(grp);
          continue;
        }
        // group
        if (!this.hasPermission(grp.permission)) continue;

        const children = (grp.items || []).filter((i) =>
          this.hasPermission(i.permission)
        );
        if (children.length) kept.push({ ...grp, items: children });
      }

      this.filteredMenuData[section.id] = kept;
      this.rebuildActiveLocalized();
      this.updateDisplayModel();
    }

    // refresh localized list for the currently active menu
    this.filterMenuItems();
  }

  filterMenuItems() {
    const active = this.getActiveMenuItems(); // raw (with i18nKey)
    if (!this.searchTerm) {
      this.filteredMenuItemsLocalized = this.localizeModel(active);
      return;
    }

    const t = (k: string) => this.translate.instant(k).toLowerCase();
    const term = this.searchTerm.toLowerCase();

    const filtered = (active || [])
      .map((section) => {
        const sectionLabel = t(section.i18nKey);
        // leaf group
        if (section.routerLink) {
          return sectionLabel.includes(term) ? section : null;
        }
        // grouped items
        const kids = (section.items || []).filter((it: any) =>
          t(it.i18nKey).includes(term)
        );
        if (sectionLabel.includes(term) || kids.length) {
          return { ...section, items: kids };
        }
        return null;
      })
      .filter(Boolean) as any[];

    this.filteredMenuItemsLocalized = this.localizeModel(filtered);
  }

  getActiveMenuItems(): MenuGroup[] {
    return (
      this.filteredMenuData[
        this.activeMenu as keyof typeof this.filteredMenuData
      ] || []
    );
  }
  /** when user switches top section */
  toggleMenu(item: TopButton) {
    this.activeMenu = this.activeMenu === item.id ? null : item.id;
    this.onSectionChanged();
  }
  private onSectionChanged() {
    this.rebuildActiveLocalized();
    this.applySearch(this.searchTerm); // reuse current term
  }
  onSearchChange(value: string) {
    this.search$.next(value ?? '');
  }
  private applySearch(term: string) {
    this.searchTerm = term ?? '';
    const searchLower = this.searchTerm.toLowerCase().trim();

    if (!searchLower) {
      this.filteredMenuItemsLocalized = [];
      this.updateDisplayModel();
      return;
    }

    // We filter against already localized (translated) labels!
    const filterNode = (node: any): any | null => {
      // leaf
      if (!node.items) {
        return node.label.toLowerCase().includes(searchLower) ? node : null;
      }
      // group
      const kids = (node.items || []).map(filterNode).filter(Boolean);
      if (node.label.toLowerCase().includes(searchLower) || kids.length) {
        return { ...node, items: kids };
      }
      return null;
    };

    this.filteredMenuItemsLocalized = this.activeLocalized
      .map(filterNode)
      .filter(Boolean) as any[];

    this.updateDisplayModel();
  }

  getActiveLabel(): string {
    const key =
      this.menuItems.find((i) => i.id === this.activeMenu)?.i18nKey || '';
    return this.translate.instant(key);
  }
  hasPermission(key?: string): boolean {
    if (!key) return true;
    const ok = this.permissionService.hasPermission(key);
    // console.log(`[SideMenu] hasPermission(${key}) →`, ok);
    return ok;
  }
  setActiveMenuItem(event: any) {
    const node = event.node;
    // console.log('[SideMenu] Panel node selected:', node);
    this.activeMenuItem = node.label;

    if (node.routerLink) {
      // routerLink in your model is a string; wrap it as an array
      const link = Array.isArray(node.routerLink)
        ? node.routerLink
        : [node.routerLink];
      // console.log('[SideMenu] Navigating to', link);
      this.router.navigate(link);
    }
  }

  isMenuActive(): boolean {
    return this.activeMenu !== null;
  }
}
