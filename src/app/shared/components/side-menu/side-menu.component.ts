import { Component } from '@angular/core';
import { MenuToggleService } from '../../services/menu-toggle.service';
import { filter, Subject, Subscription, takeUntil } from 'rxjs';
import { MenuItem } from '../../interfaces/menu-item.interface';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { InteractionStatus } from '@azure/msal-browser';
import { PermissionService } from '../../../pages/login/store/permissions/permission.service';

@Component({
  selector: 'app-side-menu',
  standalone: false,
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
})
export class SideMenuComponent {
  isLoggedIn = false;

  menuItems = [
    { id: 'CRM', icon: 'pi pi-ico1', label: 'CRM' },
    { id: 'Business', icon: 'pi pi-ico2', label: 'Business' },
    // { id: 'Assets', icon: 'pi pi-ico3', label: 'Assets' },
    // { id: 'Orders', icon: 'pi pi-ico4', label: 'Orders' },
    { id: 'Settings', icon: 'pi pi-cog', label: 'Settings' },
  ];
  raw = this.route.snapshot.paramMap.get('teamId');
  private destroy$ = new Subject<void>();

  activeMenu: string | null = null;
  activeMenuItem: string | null = null;
  searchTerm: string = '';
  filteredMenuItems: MenuItem[] = [];
  isVisible = true;
  private toggleSub!: Subscription;
  clientId: string | null = null;
  rawTeamId: string | null = null;
  menuData: Record<string, MenuItem[]> = {
    CRM: [
      {
        label: 'Client Operations',
        icon: 'pi pi-users',
        items: [
          {
            label: 'Quick Onboarding',
            icon: 'pi pi-user-plus',
            routerLink: '/crm/clients/view-clients-onboarding',
            permissionKey: [
              '/Clients/GetAll',
              '/Clients/GetAllHistory',
              '/Clients/Get',
            ],
          },
          {
            label: 'Clients',
            icon: 'pi pi-user-plus',
            routerLink: '/crm/clients/view-clients',
            permissionKey: [
              '/ClientGeneralSettings/GetAll',
              '/ClientGeneralSettings/GetAllHistory',
              '/ClientGeneralSettings/Get',
            ],
          },
          // {
          //   label: 'Client Address',
          //   icon: 'pi pi-user-plus',
          //   routerLink: `/crm/clients/view-client-addresses/${this.clientId}`,
          // },
          // {
          //   label: 'ClientCentralBank',
          //   icon: 'pi pi-user-plus',
          //   routerLink: '/crm/clients/view-central-bank-info',
          // },
          // {
          //   label: 'ClientCompanyBusinessDetails',
          //   icon: 'pi pi-user-plus',
          //   routerLink: '/crm/clients/company-view-only',
          // },
          // {
          //   label: 'ClientCRAuthorityOffice',
          //   icon: 'pi pi-user-plus',
          //   routerLink: '/crm/clients/view-cr-authority-office',
          // },
          // {
          //   label: 'ClientDocumentType',
          //   icon: 'pi pi-user-plus',
          //   routerLink: '/lookups/view-document-types',
          // },

          // {
          //   label: 'ClientGuarantor',
          //   icon: 'pi pi-user-plus',
          //   routerLink: '/crm/clients/view-client-guarantors',
          // },
          // {
          //   label: 'ClientIdentity',
          //   icon: 'pi pi-user-plus',
          //   routerLink: '/crm/clients/view-client-identity-types',
          // },
          // {
          //   label: 'ClientIndividualBusinessDetail',
          //   icon: 'pi pi-user-plus',
          //   routerLink: '/crm/clients/view-client-individual-business-detail',
          // },
          // {
          //   label: 'ClientLegal',
          //   icon: 'pi pi-user-plus',
          //   routerLink: '/crm/clients/view-client-legal',
          // },
          // {
          //   label: 'ClientOfficer',
          //   icon: 'pi pi-user-plus',
          //   routerLink: '/crm/clients/view-client-officer',
          // },
          // {
          //   label: 'ClientPhoneNumber',
          //   icon: 'pi pi-user-plus',
          //   routerLink: '/crm/clients/view-phone-numbers',
          // },
          // {
          //   label: 'ClientSalesTurnovers',
          //   icon: 'pi pi-user-plus',
          //   routerLink: '/crm/clients/view-sales-turnovers',
          // },
          // {
          //   label: 'ClientShareHolder',
          //   icon: 'pi pi-user-plus',
          //   routerLink: '/crm/clients/view-share-holder',
          // },
          // {
          //   label: 'ClientFile',
          //   icon: 'pi pi-user-plus',
          //   routerLink: '/crm/clients/view-upload-documents',
          // },
          // {
          //   label: 'ClientTaxOffice',
          //   icon: 'pi pi-user-plus',
          //   routerLink: '/crm/clients/view-tax-authority-office',
          // },
          // {
          //   label: 'ClientTMLOfficer',
          //   icon: 'pi pi-user-plus',
          //   routerLink: '/crm/clients/view-tml-officer',
          // },
          // {
          //   label: 'ClientOfficer',
          //   icon: 'pi pi-user-plus',
          //   routerLink: '/crm/clients/view-client-officers',
          // },
          // {
          //   label: 'ContactPerson',
          //   icon: 'pi pi-user-plus',
          //   routerLink: '/crm/clients/view-contact-persons',
          // },
        ],
      },
      {
        label: 'Communication',
        icon: 'pi pi-users',
        items: [
          {
            label: 'Call',
            icon: 'pi pi-user-plus',
            routerLink: '/communication/view-calls',
            permissionKey: [
              '/Calls/GetAll',
              '/Calls/GetAllHistory',
              '/Calls/Get',
            ],
          },
          {
            label: 'Meeting',
            icon: 'pi pi-user-plus',
            routerLink: '/communication/view-meetings',
            permissionKey: [
              '/Meetings/GetAll',
              '/Meetings/GetAllHistory',
              '/Meetings/Get',
            ],
          },
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
        ],
      },
      // {
      //   label: 'Vendors',
      //   icon: 'pi pi-users',
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
      //   icon: 'pi pi-users',
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
        label: 'Leasing',
        icon: 'pi pi-users',
        items: [
          {
            label: 'Mandate',
            icon: 'pi pi-user-plus',
            routerLink: '/crm/leasing-mandates/view-mandates',
            permissionKey: [
              '/LeasingMandates/GetAll',
              '/LeasingMandates/GetAllHistory',
              '/LeasingMandates/Get',
            ],
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
    // Assets: [
    //   {
    //     label: 'Leasing',
    //     icon: 'pi pi-users',
    //     items: [
    //       {
    //         label: 'Vehicle',
    //         icon: 'pi pi-user-plus',
    //         routerLink: '/crm/leasing-mandates/view-manage-mandate-termss',
    //       },
    //       {
    //         label: 'Machinery and Equipments',
    //         icon: 'pi pi-user-plus',
    //         routerLink: '/crm/leasing-mandates/view-manage-mandate-termss',
    //       },
    //       {
    //         label: 'Real Estate',
    //         icon: 'pi pi-user-plus',
    //         routerLink: '/crm/leasing-mandates/view-manage-mandate-termss',
    //       },
    //     ],
    //   },
    //   {
    //     label: 'Insurance Policies',
    //     icon: 'pi pi-users',
    //     routerLink: '/crm/leasing-mandates/view-manage-mandate-termss',
    //   },
    // ],
    // Orders: [
    //   {
    //     label: 'Leasing',
    //     icon: 'pi pi-users',
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
        label: 'General',
        icon: 'pi pi-users',
        items: [
          // {
          //   label: 'AppSettings',
          //   icon: 'pi pi-user-plus',
          //   routerLink: '/crm/leasing-mandates/view-manage-mandate-termss',
          // },
          {
            label: 'BusinessLine',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-business-lines',
            permissionKey: [
              '/BusinessLines/GetAll',
              '/BusinessLines/GetAllHistory',
              '/BusinessLines/Get',
            ],
          },
          {
            label: 'Product',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-products',
            permissionKey: [
              '/Products/GetAll',
              '/Products/GetAllHistory',
              '/Products/Get',
            ],
          },
          {
            label: 'Sector',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-sectors',
            permissionKey: [
              '/Sectors/GetAll',
              '/Sectors/GetAllHistory',
              '/Sectors/Get',
            ],
          },
          {
            label: 'SubSector',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-sub-sectors',
            permissionKey: [
              '/SubSectors/GetAll',
              '/SubSectors/GetAllHistory',
              '/SubSectors/Get',
            ],
          },
          // {
          //   label: 'Tenants ',
          //   icon: 'pi pi-user-plus',
          //   routerLink: '/crm/leasing-mandates/view-manage-mandate-termss',
          // },
        ],
      },
      {
        label: 'Organizations',
        icon: 'pi pi-users',
        items: [
          {
            label: 'Branches',
            icon: 'pi pi-user-plus',
            routerLink: '/organizations/view-branches',
            permissionKey: [
              '/Branches/GetAll',
              '/Branches/GetAllHistory',
              '/Branches/Get',
            ],
          },
          {
            label: 'Departments',
            icon: 'pi pi-user-plus',
            routerLink: '/organizations/view-departments',
            permissionKey: [
              '/Departments/GetAll',
              '/Departments/GetAllHistory',
              '/Departments/Get',
            ],
          },
          {
            label: 'Officers',
            icon: 'pi pi-user-plus',
            routerLink: '/organizations/view-officers',
            permissionKey: [
              '/Officers/GetAll',
              '/Officers/GetAllHistory',
              '/Officers/Get',
            ],
          },

          {
            label: 'SignatoryOfficer',
            icon: 'pi pi-user-plus',
            routerLink: '/organizations/view-signatory-officers',
            permissionKey: [
              '/SignatoryOfficers/GetAll',
              '/SignatoryOfficers/GetAllHistory',
              '/SignatoryOfficers/Get',
            ],
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
            label: 'Teams',
            icon: 'pi pi-user-plus',
            routerLink: '/organizations/view-teams',
            permissionKey: [
              '/Teams/GetAll',
              '/Teams/GetAllHistory',
              '/Teams/Get',
            ],
          },
        ],
      },
      {
        label: 'Legals',
        icon: 'pi pi-users',
        items: [
          {
            label: 'Legal Form',
            icon: 'pi pi-user-plus',
            routerLink: '/legals/view-legal-forms',
            permissionKey: [
              '/LegalForms/GetAll',
              '/LegalForms/GetAllHistory',
              '/LegalForms/Get',
            ],
          },
          {
            label: 'Legal Form Law',
            icon: 'pi pi-user-plus',
            routerLink: '/legals/view-legal-form-laws',
            permissionKey: [
              '/LegalFormLaws/GetAll',
              '/LegalFormLaws/GetAllHistory',
              '/LegalFormLaws/Get',
            ],
          },
          {
            label: 'CR Authority Office',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-authority-offices',
            permissionKey: [
              '/CRAuthorityOffices/GetAll',
              '/CRAuthorityOffices/GetAllHistory',
              '/CRAuthorityOffices/Get',
            ],
          },
          {
            label: 'Tax Office',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-tax-offices',
            permissionKey: [
              '/TaxOffices/GetAll',
              '/TaxOffices/GetAllHistory',
              '/TaxOffices/Get',
            ],
          },
          {
            label: 'SME Client Code',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-sme-client-codes',
            permissionKey: [
              '/SMEClientCodes/GetAll',
              '/SMEClientCodes/GetAllHistory',
              '/SMEClientCodes/Get',
            ],
          },
        ],
      },
      {
        label: 'Security',
        icon: 'pi pi-users',
        items: [
          {
            label: 'Application Roles',
            icon: 'pi pi-user-plus',
            routerLink: '/organizations/view-roles',
            permissionKey: [
              '/ApplicationRoles/GetAll',
              '/ApplicationRoles/GetAllHistory',
              '/ApplicationRoles/Get',
            ],
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
            label: 'Page Operations',
            icon: 'pi pi-user-plus',
            routerLink: '/organizations/view-page-operations',
            permissionKey: [
              '/PageOperations/GetAll',
              '/PageOperations/GetAllHistory',
              '/PageOperations/Get',
            ],
          },
          {
            label: 'Operations ',
            icon: 'pi pi-user-plus',
            routerLink: '/organizations/view-operations',
            permissionKey: [
              '/Operations/GetAll',
              '/Operations/GetAllHistory',
              '/Operations/Get',
            ],
          },
          {
            label: 'Pages',
            icon: 'pi pi-user-plus',
            routerLink: '/organizations/view-pages',
            permissionKey: [
              '/Pages/GetAll',
              '/Pages/GetAllHistory',
              '/Pages/Get',
            ],
          },
        ],
      },
      {
        label: 'Client WorkFlow',
        icon: 'pi pi-users',
        items: [
          {
            label: 'ClientStatus',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-client-statuses',
            permissionKey: [
              '/ClientStatuses/GetAll',
              '/ClientStatuses/GetAllHistory',
              '/ClientStatuses/Get',
            ],
          },
          {
            label: 'ClientStatusAction',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-client-status-actions',
            permissionKey: [
              '/ClientStatusActions/GetAll',
              '/ClientStatusActions/GetAllHistory',
              '/ClientStatusActions/Get',
            ],
          },
          // {
          //   label: 'ClientStatusActionAuthorizationGroup',
          //   icon: 'pi pi-user-plus',
          //   routerLink: '/lookups/view-client-statuses',
          // },
          // {
          //   label: 'MandateStatusActionCondition',
          //   icon: 'pi pi-user-plus',
          //   routerLink: '/lookups/view-mandate-statuses',
          // },
          // {
          //   label: 'ClientStatusActionNotificationGroup',
          //   icon: 'pi pi-user-plus',
          //   routerLink: '/lookups/view-client-statuses',
          // },
          // {
          //   label: 'MandateWorkFlowActions',
          //   icon: 'pi pi-user-plus',
          //   routerLink: '/lookups/view-client-statuses',
          // },
          // {
          //   label: 'ClientNotificationGroupOfficer',
          //   icon: 'pi pi-user-plus',
          //   routerLink: '/lookups/view-client-statuses',
          // },
          // {
          //   label: 'ClientAuthorizationGroup',
          //   icon: 'pi pi-user-plus',
          //   routerLink: '/lookups/view-client-statuses',
          // },
        ],
      },
      {
        label: 'Mandate WorkFlow',
        icon: 'pi pi-users',
        items: [
          {
            label: 'Mandate Status',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-mandate-statuses',
            permissionKey: [
              '/MandateStatuses/GetAll',
              '/MandateStatuses/GetAllHistory',
              '/MandateStatuses/Get',
            ],
          },
          {
            label: 'Mandate Status Action',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-mandate-status-actions',
            permissionKey: [
              '/MandateStatusActions/GetAll',
              '/MandateStatusActions/GetAllHistory',
              '/MandateStatusActions/Get',
            ],
          },
          // {
          //   label: 'MandateStatusActionAuthorizationGroup',
          //   icon: 'pi pi-user-plus',
          //   routerLink: '/lookups/add-mandate-status-actionss',
          // },
          // {
          //   label: 'MandateStatusActionCondition',
          //   icon: 'pi pi-user-plus',
          //   routerLink: '/lookups/add-mandate-status-actionss',
          // },
          // {
          //   label: 'MandateStatusActionNotificationGroup',
          //   icon: 'pi pi-user-plus',
          //   routerLink: '/lookups/add-mandate-status-actionss',
          // },
          // {
          //   label: 'MandateWorkFlowActions',
          //   icon: 'pi pi-user-plus',
          //   routerLink: '/lookups/add-mandate-status-actions',
          // },
          // {
          //   label: 'MandateNotificationGroupOfficer',
          //   icon: 'pi pi-user-plus',
          //   routerLink: '/lookups/add-client-status-actionss',
          // },
          // {
          //   label: 'MandateAuthorizationGroup',
          //   icon: 'pi pi-user-plus',
          //   routerLink: '/lookups/add-client-status-actionss',
          // },
        ],
      },
      {
        label: 'Fees',
        icon: 'pi pi-users',
        items: [
          {
            label: 'FeesRange',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-fee-ranges',
            permissionKey: [
              '/FeesRanges/GetAll',
              '/FeesRanges/GetAllHistory',
              '/FeesRanges/Get',
            ],
          },
          {
            label: 'FeeCalculationType',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-fee-calculation-types',
            permissionKey: [
              '/FeeCalculationTypes/GetAll',
              '/FeeCalculationTypes/GetAllHistory',
              '/FeeCalculationTypes/Get',
            ],
          },
          {
            label: 'FeeType',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-fee-types',
            permissionKey: [
              '/FeeTypes/GetAll',
              '/FeeTypes/GetAllHistory',
              '/FeeTypes/Get',
            ],
          },
        ],
      },
      {
        label: 'Lookups',
        icon: 'pi pi-users',
        items: [
          {
            label: 'Address Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-address-types',
            permissionKey: [
              '/AddressTypes/GetAll',
              '/AddressTypes/GetAllHistory',
              '/AddressTypes/Get',
            ],
          },
          {
            label: 'Areas',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-areas',
            permissionKey: [
              '/Areas/GetAll',
              '/Areas/GetAllHistory',
              '/Areas/Get',
            ],
          },
          {
            label: 'Asset Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-asset-types',
            permissionKey: [
              '/AssetTypes/GetAll',
              '/AssetTypes/GetAllHistory',
              '/AssetTypes/Get',
            ],
          },
          {
            label: 'Asset Type Categories',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-asset-type-categories',
            permissionKey: [
              '/AssetTypeCategories/GetAll',
              '/AssetTypeCategories/GetAllHistory',
              '/AssetTypeCategories/Get',
            ],
          },
          {
            label: 'Authority Offices',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-authority-offices',
            permissionKey: [
              '/CRAuthorityOffices/GetAll',
              '/CRAuthorityOffices/GetAllHistory',
              '/CRAuthorityOffices/Get',
            ],
          },
          {
            label: 'Authorization Groups',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-authorization-groups',
            permissionKey: [
              '/AuthorizationGroups/GetAll',
              '/AuthorizationGroups/GetAllHistory',
              '/AuthorizationGroups/Get',
            ],
          },

          {
            label: 'Authorization Group Officers',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-authorization-group-officers',
            permissionKey: [
              '/AuthorizationGroupOfficers/GetAll',
              '/AuthorizationGroupOfficers/GetAllHistory',
              '/AuthorizationGroupOfficers/Get',
            ],
          },
          {
            label: 'Business Lines',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-business-lines',
            permissionKey: [
              '/BusinessLines/GetAll',
              '/BusinessLines/GetAllHistory',
              '/BusinessLines/Get',
            ],
          },
          {
            label: 'Call Action Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-call-action-types',
            permissionKey: [
              '/CallActionTypes/GetAll',
              '/CallActionTypes/GetAllHistory',
              '/CallActionTypes/Get',
            ],
          },
          // {
          //   label: 'Call Officer Types',
          //   icon: 'pi pi-user-plus',
          //   routerLink: '/lookups/view-call-action-types',
          // },
          {
            label: 'Call Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-call-types',
            permissionKey: [
              '/CallTypes/GetAll',
              '/CallTypes/GetAllHistory',
              '/CallTypes/Get',
            ],
          },

          // {
          //   label: 'Client Identity Types',
          //   icon: 'pi pi-user-plus',
          //   routerLink: '/lookups/view-client-identity-types',
          // },
          {
            label: 'Client Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-client-types',
            permissionKey: [
              '/ClientTypes/GetAll',
              '/ClientTypes/GetAllHistory',
              '/ClientTypes/Get',
            ],
          },
          {
            label: 'Client Officer Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-client-officer-types',
            permissionKey: [
              '/ClientOfficerTypes/GetAll',
              '/ClientOfficerTypes/GetAllHistory',
              '/ClientOfficerTypes/Get',
            ],
          },
          {
            label: 'Communication Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-communication-types',
            permissionKey: [
              '/CommunicationTypes/GetAll',
              '/CommunicationTypes/GetAllHistory',
              '/CommunicationTypes/Get',
            ],
          },
          {
            label: 'Communication Flow Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-communication-flow-types',
            permissionKey: [
              '/CommunicationFlowTypes/GetAll',
              '/CommunicationFlowTypes/GetAllHistory',
              '/CommunicationFlowTypes/Get',
            ],
          },
          {
            label: 'Company Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-company-types',
            permissionKey: [
              '/CompanyTypes/GetAll',
              '/CompanyTypes/GetAllHistory',
              '/CompanyTypes/Get',
            ],
          },
          {
            label: 'Condition',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-conditions',
            permissionKey: [
              '/Conditions/GetAll',
              '/Conditions/GetAllHistory',
              '/Conditions/Get',
            ],
          },
          {
            label: 'Condition Expression',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-condition-expressions',
            permissionKey: [
              '/ConditionExpressions/GetAll',
              '/ConditionExpressions/GetAllHistory',
              '/ConditionExpressions/Get',
            ],
          },
          {
            label: 'Countries',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-countries',
            permissionKey: [
              '/Countries/GetAll',
              '/Countries/GetAllHistory',
              '/Countries/Get',
            ],
          },
          {
            label: 'Currencies',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-currencies',
            permissionKey: [
              '/Currencies/GetAll',
              '/Currencies/GetAllHistory',
              '/Currencies/Get',
            ],
          },

          {
            label: 'Document Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-document-types',
            permissionKey: [
              '/DocumentTypes/GetAll',
              '/DocumentTypes/GetAllHistory',
              '/DocumentTypes/Get',
            ],
          },
          {
            label: 'FollowUp Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-followup-types',
            permissionKey: [
              '/FollowUpTypes/GetAll',
              '/FollowUpTypes/GetAllHistory',
              '/FollowUpTypes/Get',
            ],
          },
          {
            label: 'Governorates',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-governorates',
            permissionKey: [
              '/Governorates/GetAll',
              '/Governorates/GetAllHistory',
              '/Governorates/Get',
            ],
          },
          {
            label: 'Identification Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-identification-types',
            permissionKey: [
              '/IdentificationTypes/GetAll',
              '/IdentificationTypes/GetAllHistory',
              '/IdentificationTypes/Get',
            ],
          },
          {
            label: 'Insured By',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-insured-by',
            permissionKey: [
              '/InsuredBy/GetAll',
              '/InsuredBy/GetAllHistory',
              '/InsuredBy/Get',
            ],
          },
          {
            label: 'Interest Rate Benchmarks',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-interest-rate-benchmarks',
            permissionKey: [
              '/InterestRateBenchmarks/GetAll',
              '/InterestRateBenchmarks/GetAllHistory',
              '/InterestRateBenchmarks/Get',
            ],
          },
          {
            label: 'Interest Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-interest-types',
            permissionKey: [
              '/InterestTypes/GetAll',
              '/InterestTypes/GetAllHistory',
              '/InterestTypes/Get',
            ],
          },

          {
            label: 'Fees Ranges',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-fee-ranges',
            permissionKey: [
              '/FeesRanges/GetAll',
              '/FeesRanges/GetAllHistory',
              '/FeesRanges/Get',
            ],
          },

          {
            label: 'Leasing Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-leasing-types',
            permissionKey: [
              '/LeasingTypes/GetAll',
              '/LeasingTypes/GetAllHistory',
              '/LeasingTypes/Get',
            ],
          },
          // {
          //   label: 'Mandate Payment Settings',
          //   icon: 'pi pi-user-plus',
          //   routerLink: '/lookups/view-mandate-validity-unit',
          // },
          {
            label: 'Mandate Validity Unit',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-mandate-validity-unit',
            permissionKey: [
              '/ValidityUnits/GetAll',
              '/ValidityUnits/GetAllHistory',
              '/ValidityUnits/Get',
            ],
          },
          {
            label: 'Meeting Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-meeting-types',
            permissionKey: [
              '/MeetingTypes/GetAll',
              '/MeetingTypes/GetAllHistory',
              '/MeetingTypes/Get',
            ],
          },
          {
            label: 'Notification Group',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-notification-groups',
            permissionKey: [
              '/NotificationGroups/GetAll',
              '/NotificationGroups/GetAllHistory',
              '/NotificationGroups/Get',
            ],
          },

          {
            label: 'Notification Group Officers',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-notification-group-officers',
            permissionKey: [
              '/NotificationGroupOfficers/GetAll',
              '/NotificationGroupOfficers/GetAllHistory',
              '/NotificationGroupOfficers/Get',
            ],
          },

          {
            label: 'Payment Methods',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-payment-methods',
            permissionKey: [
              '/PaymentMethods/GetAll',
              '/PaymentMethods/GetAllHistory',
              '/PaymentMethods/Get',
            ],
          },
          {
            label: 'Payment Month Days',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-payment-month-days',
            permissionKey: [
              '/PaymentMonthDays/GetAll',
              '/PaymentMonthDays/GetAllHistory',
              '/PaymentMonthDays/Get',
            ],
          },
          {
            label: 'Payment Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-payment-types',
            permissionKey: [
              '/PaymentTypes/GetAll',
              '/PaymentTypes/GetAllHistory',
              '/PaymentTypes/Get',
            ],
          },
          {
            label: 'Payment Periods',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-payment-periods',
            permissionKey: [
              '/PaymentPeriods/GetAll',
              '/PaymentPeriods/GetAllHistory',
              '/PaymentPeriods/Get',
            ],
          },
          {
            label: 'Payment Timing Terms',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-payment-timing-terms',
            permissionKey: [
              '/PaymentTimingTerms/GetAll',
              '/PaymentTimingTerms/GetAllHistory',
              '/PaymentTimingTerms/Get',
            ],
          },
          // {
          //   label: 'Property',
          //   icon: 'pi pi-user-plus',
          //   routerLink: '/lookups/view-payment-types',
          // },
          // {
          //   label: 'Property Types',
          //   icon: 'pi pi-user-plus',
          //   routerLink: '/lookups/view-payment-types',
          // },
          {
            label: 'Period Units',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-period-units',
            permissionKey: [
              '/PeriodUnits/GetAll',
              '/PeriodUnits/GetAllHistory',
              '/PeriodUnits/Get',
            ],
          },
          {
            label: 'Phone Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-phone-types',
            permissionKey: [
              '/PhoneTypes/GetAll',
              '/PhoneTypes/GetAllHistory',
              '/PhoneTypes/Get',
            ],
          },
          {
            label: 'Products',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-products',
            permissionKey: [
              '/Products/GetAll',
              '/Products/GetAllHistory',
              '/Products/Get',
            ],
          },
          {
            label: 'Rent Structure Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-rent-structure-types',
            permissionKey: [
              '/RentStructureTypes/GetAll',
              '/RentStructureTypes/GetAllHistory',
              '/RentStructureTypes/Get',
            ],
          },
          {
            label: 'Sectors',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-sectors',
            permissionKey: [
              '/Sectors/GetAll',
              '/Sectors/GetAllHistory',
              '/Sectors/Get',
            ],
          },
          {
            label: 'SME Client Codes',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-sme-client-codes',
            permissionKey: [
              '/SMEClientCodes/GetAll',
              '/SMEClientCodes/GetAllHistory',
              '/SMEClientCodes/Get',
            ],
          },
          {
            label: 'Sub Sectors',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-sub-sectors',
            permissionKey: [
              '/SubSectors/GetAll',
              '/SubSectors/GetAllHistory',
              '/SubSectors/Get',
            ],
          },
          {
            label: 'Tax Offices',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-tax-offices',
            permissionKey: [
              '/TaxOffices/GetAll',
              '/TaxOffices/GetAllHistory',
              '/TaxOffices/Get',
            ],
          },
          {
            label: 'TML Officer Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-tml-officer-types',
            permissionKey: [
              '/TMLOfficerTypes/GetAll',
              '/TMLOfficerTypes/GetAllHistory',
              '/TMLOfficerTypes/Get',
            ],
          },
          {
            label: 'Workflow Action Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-workflow-action-types',
            permissionKey: [
              '/WorkflowActionTypes/GetAll',
              '/WorkflowActionTypes/GetAllHistory',
              '/WorkflowActionTypes/Get',
            ],
          },
        ],
      },
    ],
  };
  constructor(
    private menuToggleService: MenuToggleService,
    private route: ActivatedRoute,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private perms: PermissionService
  ) {}

  ngOnInit() {
    // load from sessionStorage / token
    this.perms.loadPermissions();

    // now filter out everything the user can’t access
    this.filterMenuByPermissions();
    // subscribe and keep the Subscription object
    this.toggleSub = this.menuToggleService.toggle$.subscribe(
      (isVisible) => (this.isVisible = isVisible)
    );

    // paramMap subscription as before
    this.route.paramMap.subscribe((pm) => {
      this.raw = pm.get('teamId');
      this.clientId = pm.get('clientId');
    });
    // 2) listen for MSAL ready events to update login flag
    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status) => status === InteractionStatus.None),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        const accounts = this.authService.instance.getAllAccounts();
        this.isLoggedIn = accounts.length > 0;
      });
  }

  ngOnDestroy() {
    // now unsubscribe the Subscription—not the Observable!
    this.toggleSub.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
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
  private filterMenuByPermissions() {
    // 1) Filter each section’s items by `hasPermission`
    for (const sectionKey of Object.keys(this.menuData)) {
      const sections = this.menuData[sectionKey];
      this.menuData[sectionKey] = sections
        .map((section) => ({
          ...section,
          items:
            section.items?.filter(
              (item) =>
                // only keep if either no permissionKey or the user has it
                !item.permissionKey || this.hasAnyPermission(item.permissionKey)
            ) || [],
        }))
        // 2) drop any section that now has no items
        .filter((section) => section.items.length > 0);
    }

    // 3) Filter out any top-level menu tab whose sections are now empty
    this.menuItems = this.menuItems.filter(
      (tab) =>
        Array.isArray(this.menuData[tab.id!]) &&
        this.menuData[tab.id!].length > 0
    );
  }
  /** normalize single-or-array and check “any” */
  private hasAnyPermission(keys: string | string[]): boolean {
    if (!keys) return true;
    const arr = Array.isArray(keys) ? keys : [keys];
    return arr.some((k) => this.perms.hasPermission(k));
  }
}
