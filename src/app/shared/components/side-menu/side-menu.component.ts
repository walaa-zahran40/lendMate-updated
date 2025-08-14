import { Component } from '@angular/core';
import { MenuToggleService } from '../../services/menu-toggle.service';
import { filter, Subject, Subscription, takeUntil } from 'rxjs';
import { MenuItem } from '../../interfaces/menu-item.interface';
import { ActivatedRoute, Router } from '@angular/router';
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
  private permsSub!: Subscription;

  menuItems: Array<{
    id: string;
    icon: string;
    label: string;
    permission?: string;
  }> = [
    {
      id: 'CRM',
      icon: 'pi pi-ico1',
      label: 'CRM',
      permission: '/Clients/GetAll',
    },
    {
      id: 'Purchasing',
      icon: 'pi pi-ico4',
      label: 'Purchasing',
      // permission: '/Purchasing/GetAll',
    },
    {
      id: 'Business',
      icon: 'pi pi-ico3',
      label: 'Business',
      permission: '/LeasingMandates/GetAll',
    },
    {
      id: 'Assets',
      icon: 'pi pi-ico6',
      label: 'Assets',
      permission: '/LeasingMandates/GetAll',
    },
    {
      id: 'Settings',
      icon: 'pi pi-ico5',
      label: 'Settings',
      permission: '/ApplicationRoles/GetAll',
    },
  ];
  raw = this.route.snapshot.paramMap.get('teamId');
  private destroy$ = new Subject<void>();
  claims: Record<string, any> = {};
  filteredTopLevel: Array<{
    id: string;
    icon: string;
    label: string;
    permission?: string;
  }> = [];
  filteredMenuData: Record<string, MenuItem[]> = {};

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
        permission: '/Clients/GetAll', // show this group if user can read clients
        items: [
          {
            label: 'Quick Onboarding',
            icon: 'pi pi-user-plus',
            routerLink: '/crm/clients/view-clients-onboarding',
            permission: '/Clients/GetAll',
          },
          {
            label: 'Clients',
            icon: 'pi pi-user-plus',
            routerLink: '/crm/clients/view-clients',
            permission: '/Clients/GetAll',
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
            label: 'Meetings',
            icon: 'pi pi-users',
            routerLink: '/communication/view-meetings',
            permission: '/Meetings/GetAll',
          },
          {
            label: 'Calendar',
            icon: 'pi pi-users',
            routerLink: '/communication/save-meeting',
            permission: '/Meetings/GetAll',
          },
        ],
      },
      // {
      //   label: 'Communication',
      //   icon: 'pi pi-users',
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
    Purchasing: [
      {
        label: 'Assets',
        icon: 'pi pi-users',
        routerLink: '/purchasing/assets/view-assets',
        // permission: '/Assets/GetAll',
      },
      {
        label: 'Purchasing Orders',
        icon: 'pi pi-users',
        routerLink: '/purchasing/purchasing-orders/view-purchasing-orders',
        // permission: '/PO/GetAll',
      },
      // {
      //   label: 'Communication',
      //   icon: 'pi pi-users',
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
        label: 'Contracts',
        icon: 'pi pi-users',
        routerLink: '/contracts/view-contracts',
        // permission: '/Contracts/GetAll',
      },
    ],
    Assets: [
      {
        label: 'Assets',
        icon: 'pi pi-users',
        routerLink: '/purchasing/assets/view-assets',
        // permission: '/Assets/GetAll',
      },
    ],
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
            permission: '/BusinessLines/GetAll',
          },
          {
            label: 'Product',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-products',
            permission: '/Products/GetAll',
          },

          {
            label: 'Sector',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-sectors',
            permission: '/Sectors/GetAll',
          },
          {
            label: 'SubSector',
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
        label: 'Organizations',
        icon: 'pi pi-users',
        items: [
          {
            label: 'Branches',
            icon: 'pi pi-user-plus',
            routerLink: '/organizations/view-branches',
            permission: '/Branches/GetAll',
          },
          {
            label: 'Departments',
            icon: 'pi pi-user-plus',
            routerLink: '/organizations/view-departments',
            permission: '/Departments/GetAll',
          },
          {
            label: 'Officers',
            icon: 'pi pi-user-plus',
            routerLink: '/organizations/view-officers',
            permission: '/Officers/GetAll',
          },

          {
            label: 'SignatoryOfficer',
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
            label: 'Teams',
            icon: 'pi pi-user-plus',
            routerLink: '/organizations/view-teams',
            permission: '/Teams/GetAll',
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
            permission: '/LegalForms/GetAll',
          },
          {
            label: 'Legal Form Law',
            icon: 'pi pi-user-plus',
            routerLink: '/legals/view-legal-form-laws',
            permission: '/LegalFormLaws/GetAll',
          },
          {
            label: 'CR Authority Office',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-authority-offices',
            permission: '/CRAuthorityOffices/GetAll',
          },
          {
            label: 'Tax Office',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-tax-offices',
            permission: '/TaxOffices/GetAll',
          },
          {
            label: 'SME Client Code',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-sme-client-codes',
            permission: '/SMEClientCodes/GetAll',
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
            label: 'Page Operations',
            icon: 'pi pi-user-plus',
            routerLink: '/organizations/view-page-operations',
            permission: '/PageOperations/GetAll',
          },
          {
            label: 'Operations ',
            icon: 'pi pi-user-plus',
            routerLink: '/organizations/view-operations',
            permission: '/Operations/GetAll',
          },
          {
            label: 'Pages',
            icon: 'pi pi-user-plus',
            routerLink: '/organizations/view-pages',
            permission: '/Pages/GetAll',
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
            permission: '/ClientStatuses/GetAll',
          },
          {
            label: 'ClientStatusAction',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-client-status-actions',
            permission: '/ClientStatusActions/GetAll',
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
            permission: '/MandateStatuses/GetAll',
          },
          {
            label: 'Mandate Status Action',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-mandate-status-actions',
            permission: '/MandateStatusActions/GetAll',
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
            permission: '/FeesRanges/GetAll',
          },
          {
            label: 'FeeCalculationType',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-fee-calculation-types',
            permission: '/FeeCalculationTypes/GetAll',
          },
          {
            label: 'FeeType',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-fee-types',
            permission: '/FeeTypes/GetAll',
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
            permission: '/AddressTypes/GetAll',
          },
          {
            label: 'Areas',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-areas',
            permission: '/Areas/GetAll',
          },
          {
            label: 'Asset Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-asset-types',
            permission: '/AssetTypes/GetAll',
          },
          {
            label: 'Asset Type Categories',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-asset-type-categories',
            permission: '/AssetTypeCategories/GetAll',
          },
          {
            label: 'Authority Offices',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-authority-offices',
            permission: '/CRAuthorityOffices/GetAll',
          },

          {
            label: 'Authorization Groups',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-authorization-groups',
            permission: '/AuthorizationGroups/GetAll',
          },

          {
            label: 'Authorization Group Officers',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-authorization-group-officers',
            permission: '/AuthorizationGroupOfficers/GetAll',
          },
          {
            label: 'Business Lines',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-business-lines',
            permission: '/BusinessLines/GetAll',
          },
          {
            label: 'Call Action Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-call-action-types',
            permission: '/CallActionTypes/GetAll',
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
            permission: '/CallTypes/GetAll',
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
            permission: '/ClientTypes/GetAll',
          },
          {
            label: 'Client Officer Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-client-officer-types',
            permission: '/ClientOfficerTypes/GetAll',
          },
          {
            label: 'Communication Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-communication-types',
            permission: '/CommunicationTypes/GetAll',
          },
          {
            label: 'Communication Flow Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-communication-flow-types',
            permission: '/CommunicationFlowTypes/GetAll',
          },
          {
            label: 'Company Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-company-types',
            permission: '/CompanyTypes/GetAll',
          },
          {
            label: 'Condition',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-conditions',
            permission: '/Conditions/GetAll',
          },
          {
            label: 'Condition Expression',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-condition-expressions',
            permission: '/ConditionExpressions/GetAll',
          },
          {
            label: 'Countries',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-countries',
            permission: '/Countries/GetAll',
          },
          {
            label: 'Currencies',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-currencies',
            permission: '/Currencies/GetAll',
          },

          {
            label: 'Document Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-document-types',
            permission: '/DocumentTypes/GetAll',
          },
          {
            label: 'Evaluators',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-evaluators',
            // permission: '/Products/GetAll',
          },
          {
            label: 'FollowUp Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-followup-types',
            permission: '/FollowUpTypes/GetAll',
          },
          {
            label: 'Governorates',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-governorates',
            permission: '/Governorates/GetAll',
          },
          {
            label: 'Identification Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-identification-types',
            permission: '/IdentificationTypes/GetAll',
          },
          {
            label: 'Insured By',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-insured-by',
            permission: '/InsuredBy/GetAll',
          },
          {
            label: 'Interest Rate Benchmarks',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-interest-rate-benchmarks',
            permission: '/InterestRateBenchmarks/GetAll',
          },
          {
            label: 'Interest Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-interest-types',
            permission: '/InterestTypes/GetAll',
          },

          {
            label: 'Fees Ranges',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-fee-ranges',
            permission: '/FeesRanges/GetAll',
          },

          {
            label: 'Leasing Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-leasing-types',
            permission: '/LeasingTypes/GetAll',
          },
          {
            label: 'License Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-license-types',
            // permission: '/LeasingTypes/GetAll',
          },
          {
            label: 'License Providers',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-license-providers',
            // permission: '/LeasingProviders/GetAll',
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
            permission: '/ValidityUnits/GetAll',
          },
          {
            label: 'Meeting Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-meeting-types',
            permission: '/MeetingTypes/GetAll',
          },
          {
            label: 'Notification Group',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-notification-groups',
            permission: '/NotificationGroups/GetAll',
          },

          {
            label: 'Notification Group Officers',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-notification-group-officers',
            permission: '/NotificationGroupOfficers/GetAll',
          },

          {
            label: 'Payment Methods',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-payment-methods',
            permission: '/PaymentMethods/GetAll',
          },
          {
            label: 'Payment Month Days',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-payment-month-days',
            permission: '/PaymentMonthDays/GetAll',
          },
          {
            label: 'Payment Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-payment-types',
            permission: '/PaymentTypes/GetAll',
          },
          {
            label: 'Payment Periods',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-payment-periods',
            permission: '/PaymentPeriods/GetAll',
          },
          {
            label: 'Payment Timing Terms',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-payment-timing-terms',
            permission: '/PaymentTimingTerms/GetAll',
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
            permission: '/PeriodUnits/GetAll',
          },
          {
            label: 'Phone Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-phone-types',
            permission: '/PhoneTypes/GetAll',
          },
          {
            label: 'Products',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-products',
            permission: '/Products/GetAll',
          },
          {
            label: 'Rent Structure Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-rent-structure-types',
            permission: '/RentStructureTypes/GetAll',
          },
          {
            label: 'Sectors',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-sectors',
            permission: '/Sectors/GetAll',
          },
          {
            label: 'SME Client Codes',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-sme-client-codes',
            permission: '/SMEClientCodes/GetAll',
          },
          {
            label: 'Sub Sectors',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-sub-sectors',
            permission: '/SubSectors/GetAll',
          },
          {
            label: 'Tax Offices',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-tax-offices',
            permission: '/AssetTypes/GetAll',
          },
          {
            label: 'TML Officer Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-tml-officer-types',
            permission: '/TMLOfficerTypes/GetAll',
          },
          {
            label: 'Vehicle Models',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-vehicle-models',
            permission: '/CRAuthorityOffices/GetAll',
          },
          {
            label: 'Vehicle Manufacturers',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-vehicle-manufacturers',
            permission: '/CRAuthorityOffices/GetAll',
          },
          {
            label: 'Workflow Action Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-workflow-action-types',
            permission: '/WorkflowActionTypes/GetAll',
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
    private permissionService: PermissionService,
    private router: Router
  ) {}

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
    this.permsSub = this.permissionService.permissionsLoaded$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.applyPermissionFilter();
      });
  }

  applyPermissionFilter() {
    // 1) Rebuild the top‐level buttons from menuItems + permissions:
    this.filteredTopLevel = this.menuItems.filter((item) =>
      this.hasPermission(item.permission)
    );

    // 2) Now build the nested menu data only for those sections:
    this.filteredMenuData = {};

    for (const section of this.filteredTopLevel) {
      const rawGroups = this.menuData[section.id] || [];
      const kept: any[] = [];

      for (const grp of rawGroups) {
        // ——— Leaf entries (no children) ———
        if (grp.routerLink) {
          if (this.hasPermission(grp.permission)) {
            kept.push(grp);
          }
          continue;
        }

        // ——— Real groups with children ———
        if (!this.hasPermission(grp.permission)) {
          continue;
        }

        // filter children down to those you’re allowed to see
        const children = (grp.items || []).filter((i) =>
          this.hasPermission(i.permission)
        );

        if (children.length) {
          kept.push({ ...grp, items: children });
        }
      }

      this.filteredMenuData[section.id] = kept;
    }
  }

  hasPermission(key?: string): boolean {
    if (!key) return true;
    const ok = this.permissionService.hasPermission(key);
    // console.log(`[SideMenu] hasPermission(${key}) →`, ok);
    return ok;
  }
  ngOnDestroy() {
    // now unsubscribe the Subscription—not the Observable!
    this.toggleSub.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
    this.permsSub?.unsubscribe();
  }

  toggleMenu(item: any) {
    // console.log('[SideMenu] Toggled to menu:', item.id);
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
