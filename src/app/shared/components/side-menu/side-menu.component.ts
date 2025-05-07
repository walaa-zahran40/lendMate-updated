import { Component } from '@angular/core';
import { MenuToggleService } from '../../services/menu-toggle.service';
import { Subscription } from 'rxjs';
import { MenuItem } from '../../interfaces/menu-item.interface';

@Component({
  selector: 'app-side-menu',
  standalone: false,
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
})
export class SideMenuComponent {
  menuItems = [
    // { id: 'crm', icon: 'pi pi-ico1', label: 'crm' },
    // { id: 'business', icon: 'pi pi-ico2', label: 'business' },
    // { id: 'assets', icon: 'pi pi-ico3', label: 'assets' },
    // { id: 'orders', icon: 'pi pi-ico4', label: 'orders' },
    { id: 'settings', icon: 'pi pi-cog', label: 'Settings' },
  ];

  menuData: Record<string, MenuItem[]> = {
    // crm: [
    //   {
    //     label: 'Client Operations',
    //     icon: 'pi pi-users',
    //     items: [
    //       {
    //         label: 'Quick Onboarding',
    //         icon: 'pi pi-user-plus',
    //         routerLink: '/crm/clients/client-onboarding',
    //       },
    //       {
    //         label: 'Clients',
    //         icon: 'pi pi-user-plus',
    //         routerLink: '/crm/clients/view-clients',
    //       },
    //       {
    //         label: 'Client Address',
    //         icon: 'pi pi-user-plus',
    //         routerLink: '/crm/clients/view-address',
    //       },
    //       {
    //         label: 'ClientCentralBank',
    //         icon: 'pi pi-user-plus',
    //         routerLink: '/crm/clients/view-central-bank-info',
    //       },
    //       // {
    //       //   label: 'ClientCompanyBusinessDetails',
    //       //   icon: 'pi pi-user-plus',
    //       //   routerLink: '/crm/clients/company-view-only',
    //       // },
    //       {
    //         label: 'ClientCRAuthorityOffice',
    //         icon: 'pi pi-user-plus',
    //         routerLink: '/crm/clients/view-cr-authority-office',
    //       },

    //       {
    //         label: 'ClientGuarantor',
    //         icon: 'pi pi-user-plus',
    //         routerLink: '/crm/clients/view-client-guarantor',
    //       },
    //       // {
    //       //   label: 'ClientIdentity',
    //       //   icon: 'pi pi-user-plus',
    //       //   routerLink: '/crm/clients/view-client-identity-types',
    //       // },
    //       // {
    //       //   label: 'ClientIndividualBusinessDetail',
    //       //   icon: 'pi pi-user-plus',
    //       //   routerLink: '/crm/clients/view-client-individual-business-detail',
    //       // },
    //       // {
    //       //   label: 'ClientLegal',
    //       //   icon: 'pi pi-user-plus',
    //       //   routerLink: '/crm/clients/view-client-legal',
    //       // },
    //       // {
    //       //   label: 'ClientOfficer',
    //       //   icon: 'pi pi-user-plus',
    //       //   routerLink: '/crm/clients/view-client-officer',
    //       // },
    //       {
    //         label: 'ClientPhoneNumber',
    //         icon: 'pi pi-user-plus',
    //         routerLink: '/crm/clients/view-phone-number',
    //       },
    //       {
    //         label: 'ClientSalesTurnovers',
    //         icon: 'pi pi-user-plus',
    //         routerLink: '/crm/clients/view-sales-turnover',
    //       },
    //       {
    //         label: 'ClientShareHolder',
    //         icon: 'pi pi-user-plus',
    //         routerLink: '/crm/clients/view-share-holder',
    //       },
    //       {
    //         label: 'ClientFile',
    //         icon: 'pi pi-user-plus',
    //         routerLink: '/crm/clients/view-upload-documents',
    //       },
    //       {
    //         label: 'ClientTaxOffice',
    //         icon: 'pi pi-user-plus',
    //         routerLink: '/crm/clients/view-tax-authority-office',
    //       },
    //       {
    //         label: 'ClientTMLOfficer',
    //         icon: 'pi pi-user-plus',
    //         routerLink: '/crm/clients/view-tml-officer',
    //       },
    //       {
    //         label: 'ContactPerson',
    //         icon: 'pi pi-user-plus',
    //         routerLink: '/crm/clients/view-contact-person',
    //       },
    //     ],
    //   },
    //   {
    //     label: 'Communication',
    //     icon: 'pi pi-users',
    //     items: [
    //       {
    //         label: 'Call',
    //         icon: 'pi pi-user-plus',
    //         routerLink: '/communication/view-call',
    //       },
    //       {
    //         label: 'Meeting',
    //         icon: 'pi pi-user-plus',
    //         routerLink: '/communication/view-meetings',
    //       },
    //       {
    //         label: 'FollowUp',
    //         icon: 'pi pi-user-plus',
    //         routerLink: '/communication/view-followups',
    //       },
    //       {
    //         label: 'FollowUpPoints',
    //         icon: 'pi pi-user-plus',
    //         routerLink: '/communication/view-followup-points',
    //       },
    //       {
    //         label: 'CommunicationFollowUp',
    //         icon: 'pi pi-user-plus',
    //         routerLink: '/communication/view-followups',
    //       },
    //       // {
    //       //   label: 'MonitorFollowUps',
    //       //   icon: 'pi pi-user-plus',
    //       //   routerLink: '/communication/view-callss',
    //       // },
    //     ],
    //   },
    //   {
    //     label: 'Vendors',
    //     icon: 'pi pi-users',
    //     items: [
    //       {
    //         label: 'Vendors',
    //         icon: 'pi pi-user-plus',
    //         routerLink: '/communication/view-callss',
    //       },
    //       {
    //         label: 'VendorAddress',
    //         icon: 'pi pi-user-plus',
    //         routerLink: '/communication/view-callss',
    //       },
    //       {
    //         label: 'VendorCompanyBusinessDetails',
    //         icon: 'pi pi-user-plus',
    //         routerLink: '/communication/view-callss',
    //       },
    //       {
    //         label: 'VendorCRAuthorityOffice',
    //         icon: 'pi pi-user-plus',
    //         routerLink: '/communication/view-callss',
    //       },
    //       {
    //         label: 'VendorDocumentType',
    //         icon: 'pi pi-user-plus',
    //         routerLink: '/communication/view-callss',
    //       },
    //       {
    //         label: 'VendorIdentity',
    //         icon: 'pi pi-user-plus',
    //         routerLink: '/communication/view-callss',
    //       },
    //       {
    //         label: 'VendorLegal',
    //         icon: 'pi pi-user-plus',
    //         routerLink: '/communication/view-callss',
    //       },
    //       {
    //         label: 'VendorOfficer',
    //         icon: 'pi pi-user-plus',
    //         routerLink: '/communication/view-callss',
    //       },
    //       {
    //         label: 'VendorPhoneNumber',
    //         icon: 'pi pi-user-plus',
    //         routerLink: '/communication/view-callss',
    //       },
    //       {
    //         label: 'VendorShareHolder',
    //         icon: 'pi pi-user-plus',
    //         routerLink: '/communication/view-callss',
    //       },
    //       {
    //         label: 'VendorFile',
    //         icon: 'pi pi-user-plus',
    //         routerLink: '/communication/view-callss',
    //       },
    //       {
    //         label: 'VendorTaxOffice',
    //         icon: 'pi pi-user-plus',
    //         routerLink: '/communication/view-callss',
    //       },
    //       {
    //         label: 'ContactPerson',
    //         icon: 'pi pi-user-plus',
    //         routerLink: '/communication/view-callss',
    //       },
    //     ],
    //   },
    //   {
    //     label: 'Guarantors',
    //     icon: 'pi pi-users',
    //     items: [
    //       {
    //         label: 'Guarantors',
    //         icon: 'pi pi-user-plus',
    //         routerLink: '/communication/view-callss',
    //       },
    //       {
    //         label: 'GuarantorAddress',
    //         icon: 'pi pi-user-plus',
    //         routerLink: '/communication/view-callss',
    //       },
    //       {
    //         label: 'GuarantorCompanyBusinessDetails',
    //         icon: 'pi pi-user-plus',
    //         routerLink: '/communication/view-callss',
    //       },
    //       {
    //         label: 'GuarantorCRAuthorityOffice',
    //         icon: 'pi pi-user-plus',
    //         routerLink: '/communication/view-callss',
    //       },
    //       {
    //         label: 'GuarantorDocumentType',
    //         icon: 'pi pi-user-plus',
    //         routerLink: '/communication/view-callss',
    //       },
    //       {
    //         label: 'GuarantorIdentity',
    //         icon: 'pi pi-user-plus',
    //         routerLink: '/communication/view-callss',
    //       },
    //       {
    //         label: 'GuarantorLegal',
    //         icon: 'pi pi-user-plus',
    //         routerLink: '/communication/view-callss',
    //       },
    //       {
    //         label: 'GuarantorOfficer',
    //         icon: 'pi pi-user-plus',
    //         routerLink: '/communication/view-callss',
    //       },
    //       {
    //         label: 'GuarantorPhoneNumber',
    //         icon: 'pi pi-user-plus',
    //         routerLink: '/communication/view-callss',
    //       },
    //       {
    //         label: 'GuarantorShareHolder',
    //         icon: 'pi pi-user-plus',
    //         routerLink: '/communication/view-callss',
    //       },
    //       {
    //         label: 'GuarantorFile',
    //         icon: 'pi pi-user-plus',
    //         routerLink: '/communication/view-callss',
    //       },
    //       {
    //         label: 'GuarantorTaxOffice',
    //         icon: 'pi pi-user-plus',
    //         routerLink: '/communication/view-callss',
    //       },
    //       {
    //         label: 'ContactPerson',
    //         icon: 'pi pi-user-plus',
    //         routerLink: '/communication/view-callss',
    //       },
    //     ],
    //   },
    // ],
    // business: [
    //   {
    //     label: 'Leasing',
    //     icon: 'pi pi-users',
    //     items: [
    //       {
    //         label: 'Mandate',
    //         icon: 'pi pi-user-plus',
    //         routerLink: '/crm/leasing-mandates/view-mandate',
    //       },
    //       // {
    //       //   label: 'MandateAdditionalTerm',
    //       //   icon: 'pi pi-user-plus',
    //       //   routerLink: '/crm/leasing-mandates/view-manage-mandate-terms',
    //       // },
    //       {
    //         label: 'MandateFees',
    //         icon: 'pi pi-user-plus',
    //         routerLink: '/crm/leasing-mandates/view-manage-mandate-termss',
    //       },
    //       {
    //         label: 'MandateFinancialActivity',
    //         icon: 'pi pi-user-plus',
    //         routerLink: '/crm/leasing-mandates/leasing-financial-form-compound',
    //       },
    //     ],
    //   },
    // ],
    // assets: [
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
    // orders: [
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
    settings: [
      // {
      //   label: 'General',
      //   icon: 'pi pi-users',
      //   items: [
      //     {
      //       label: 'AppSettings',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/crm/leasing-mandates/view-manage-mandate-termss',
      //     },
      //     {
      //       label: 'BusinessLine',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/lookups/view-business-lines',
      //     },
      //     {
      //       label: 'Product',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/lookups/view-products',
      //     },
      //     {
      //       label: 'Sector',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/lookups/view-sectors',
      //     },
      //     {
      //       label: 'SubSector',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/lookups/view-sub-sectors',
      //     },
      //     {
      //       label: 'Tenants CRUD',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/crm/leasing-mandates/view-manage-mandate-termss',
      //     },
      //   ],
      // },
      // {
      //   label: 'Organization',
      //   icon: 'pi pi-users',
      //   items: [
      //     {
      //       label: 'Officer',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/organizations/view-officers',
      //     },
      //     {
      //       label: 'BranchesManagers',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/lookups/view-branch-managers',
      //     },
      //     {
      //       label: 'BranchesOfficers',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/lookups/view-branch-officers',
      //     },
      //     {
      //       label: 'DepartmentManager',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/organizations/view-department-manager',
      //     },
      //     {
      //       label: 'SignatoryOfficer',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/organizations/view-signatory-officers',
      //     },
      //     {
      //       label: 'TeamLeadOfficer',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/organizations/view-team-lead',
      //     },
      //     {
      //       label: 'TeamOfficer',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/organizations/view-team-member',
      //     },
      //     {
      //       label: 'Department',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/organizations/view-departments',
      //     },
      //     {
      //       label: 'Team',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/organizations/view-teams',
      //     },
      //     {
      //       label: 'Branch',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/lookups/view-branch',
      //     },
      //   ],
      // },
      {
        label: 'Legal',
        icon: 'pi pi-users',
        items: [
          {
            label: 'Legal Form',
            icon: 'pi pi-user-plus',
            routerLink: '/legals/view-legal-form',
          },
          {
            label: 'Legal Form Law',
            icon: 'pi pi-user-plus',
            routerLink: '/legals/view-legal-form-law',
          },
        ],
      },
      // {
      //   label: 'Security',
      //   icon: 'pi pi-users',
      //   items: [
      //     {
      //       label: 'ApplicationRole',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/lookups/view-sme-client-codee',
      //     },
      //     {
      //       label: 'ApplicationRoleClaim',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/lookups/view-sme-client-codee',
      //     },
      //     {
      //       label: 'ApplicationUserRole',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/lookups/view-sme-client-codee',
      //     },
      //     {
      //       label: 'Users',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/lookups/view-sme-client-codee',
      //     },
      //     {
      //       label: 'PageOperations',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/organizations/view-page-operations',
      //     },
      //     {
      //       label: 'Operations CRUD',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/lookups/view-sme-client-codee',
      //     },
      //     {
      //       label: 'Pages CRUD',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/lookups/view-sme-client-codee',
      //     },
      //   ],
      // },
      // {
      //   label: 'Client WorkFlow',
      //   icon: 'pi pi-users',
      //   items: [
      //     {
      //       label: 'ClientStatus',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/lookups/view-client-statuses',
      //     },
      //     {
      //       label: 'ClientStatusAction',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/lookups/add-client-status-actions',
      //     },
      //     {
      //       label: 'ClientStatusActionAuthorizationGroup',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/lookups/view-client-statusess',
      //     },
      //     {
      //       label: 'MandateStatusActionCondition',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/lookups/view-mandate-statuses',
      //     },
      //     {
      //       label: 'ClientStatusActionNotificationGroup',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/lookups/view-client-statuses',
      //     },
      //     {
      //       label: 'MandateWorkFlowActions',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/lookups/view-client-statusess',
      //     },
      //     {
      //       label: 'ClientNotificationGroupOfficer',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/lookups/view-client-statusess',
      //     },
      //     {
      //       label: 'ClientAuthorizationGroup',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/lookups/view-client-statusess',
      //     },
      //   ],
      // },
      // {
      //   label: 'Mandate WorkFlow',
      //   icon: 'pi pi-users',
      //   items: [
      //     {
      //       label: 'MandateStatus',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/lookups/view-mandate-statuses',
      //     },
      //     {
      //       label: 'MandateStatusAction',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/lookups/add-client-status-actions',
      //     },
      //     {
      //       label: 'MandateStatusActionAuthorizationGroup',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/lookups/add-client-status-actionss',
      //     },
      //     {
      //       label: 'MandateStatusActionCondition',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/lookups/add-client-status-actionss',
      //     },
      //     {
      //       label: 'MandateStatusActionNotificationGroup',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/lookups/add-client-status-actionss',
      //     },
      //     {
      //       label: 'MandateWorkFlowActions',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/lookups/add-client-status-actionss',
      //     },
      //     {
      //       label: 'MandateNotificationGroupOfficer',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/lookups/add-client-status-actionss',
      //     },
      //     {
      //       label: 'MandateAuthorizationGroup',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/lookups/add-client-status-actionss',
      //     },
      //   ],
      // },
      // {
      //   label: 'Fees',
      //   icon: 'pi pi-users',
      //   items: [
      //     {
      //       label: 'FeesRange',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/lookups/view-fees-range',
      //     },
      //     {
      //       label: 'FeeCalculationType',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/lookups/view-fee-calculation-types',
      //     },
      //     {
      //       label: 'FeeType',
      //       icon: 'pi pi-user-plus',
      //       routerLink: '/lookups/view-fee-types',
      //     },
      //   ],
      // },
      {
        label: 'Lookups',
        icon: 'pi pi-users',
        items: [
          {
            label: 'Address Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-address-types',
          },
          {
            label: 'Areas',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-areas',
          },
          {
            label: 'Asset Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-asset-types',
          },
          {
            label: 'Asset Type Categories',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-asset-type-categories',
          },
          {
            label: 'Authority Offices',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-authority-offices',
          },
          {
            label: 'Branches',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-branches',
          },

          {
            label: 'Business Lines',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-business-lines',
          },
          {
            label: 'Call Action Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-call-action-types',
          },
          {
            label: 'Call Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-call-types',
          },
          {
            label: 'Client Statuses',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-client-statuses',
          },

          {
            label: 'Client Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-client-types',
          },
          {
            label: 'Communication Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-communication-types',
          },
          {
            label: 'Communication Flow Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-communication-flow-types',
          },
          {
            label: 'Company Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-company-types',
          },
          {
            label: 'Countries',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-countries',
          },
          {
            label: 'Currencies',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-currencies',
          },

          {
            label: 'Document Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-document-types',
          },
          {
            label: 'Fee Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-fee-types',
          },
          {
            label: 'Fee Calculation Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-fee-calculation-types',
          },
          {
            label: 'Governorates',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-governorates',
          },
          {
            label: 'Identification Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-identification-types',
          },
          {
            label: 'Insured By',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-insured-by',
          },
          {
            label: 'Interest Rate Benchmarks',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-interest-rate-benchmarks',
          },
          {
            label: 'Leasing Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-leasing-types',
          },
          {
            label: 'Mandate Statuses',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-mandate-statuses',
          },
          {
            label: 'Mandate Validity Unit',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-mandate-validity-unit',
          },
          {
            label: 'Meeting Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-meeting-types',
          },
          {
            label: 'Payment Methods',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-payment-methods',
          },
          {
            label: 'Payment Month Days',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-payment-month-days',
          },
          {
            label: 'Payment Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-payment-types',
          },
          {
            label: 'Period Units',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-period-units',
          },
          {
            label: 'Phone Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-phone-types',
          },
          {
            label: 'Products',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-products',
          },
          {
            label: 'Rent Structure Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-rent-structure-types',
          },
          {
            label: 'Sectors',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-sectors',
          },
          {
            label: 'SME Client Codes',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-sme-client-codes',
          },
          {
            label: 'Sub Sectors',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-sub-sectors',
          },
          {
            label: 'Tax Offices',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-tax-offices',
          },
          {
            label: 'TML Officer Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-tml-officer-types',
          },
          {
            label: 'Workflow Action Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-workflow-action-types',
          },
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
