import { Component } from '@angular/core';
import { MenuToggleService } from '../../services/menu-toggle.service';
import { Subscription } from 'rxjs';
import { MenuItem } from '../../interfaces/menu-item.interface';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  standalone: false,
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
})
export class SideMenuComponent {
  menuItems = [
    { id: 'CRM', icon: 'pi pi-ico1', label: 'CRM' },
    { id: 'Business', icon: 'pi pi-ico2', label: 'Business' },
    // { id: 'Assets', icon: 'pi pi-ico3', label: 'Assets' },
    // { id: 'Orders', icon: 'pi pi-ico4', label: 'Orders' },
    { id: 'Settings', icon: 'pi pi-cog', label: 'Settings' },
  ];
  raw = this.route.snapshot.paramMap.get('teamId');

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
          },
          {
            label: 'Clients',
            icon: 'pi pi-user-plus',
            routerLink: '/crm/clients/view-clients',
          },
          {
            label: 'Client Address',
            icon: 'pi pi-user-plus',
            routerLink: '/crm/clients/view-address',
          },
          {
            label: 'ClientCentralBank',
            icon: 'pi pi-user-plus',
            routerLink: '/crm/clients/view-central-bank-info',
          },
          {
            label: 'ClientCompanyBusinessDetails',
            icon: 'pi pi-user-plus',
            routerLink: '/crm/clients/company-view-only',
          },
          {
            label: 'ClientCRAuthorityOffice',
            icon: 'pi pi-user-plus',
            routerLink: '/crm/clients/view-cr-authority-office',
          },
          {
            label: 'ClientDocumentType',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-document-types',
          },

          {
            label: 'ClientGuarantor',
            icon: 'pi pi-user-plus',
            routerLink: '/crm/clients/view-client-guarantors',
          },
          {
            label: 'ClientIdentity',
            icon: 'pi pi-user-plus',
            routerLink: '/crm/clients/view-client-identity-types',
          },
          {
            label: 'ClientIndividualBusinessDetail',
            icon: 'pi pi-user-plus',
            routerLink: '/crm/clients/view-client-individual-business-detail',
          },
          {
            label: 'ClientLegal',
            icon: 'pi pi-user-plus',
            routerLink: '/crm/clients/view-client-legal',
          },
          {
            label: 'ClientOfficer',
            icon: 'pi pi-user-plus',
            routerLink: '/crm/clients/view-client-officer',
          },
          {
            label: 'ClientPhoneNumber',
            icon: 'pi pi-user-plus',
            routerLink: '/crm/clients/view-phone-numbers',
          },
          {
            label: 'ClientSalesTurnovers',
            icon: 'pi pi-user-plus',
            routerLink: '/crm/clients/view-sales-turnovers',
          },
          {
            label: 'ClientShareHolder',
            icon: 'pi pi-user-plus',
            routerLink: '/crm/clients/view-share-holder',
          },
          {
            label: 'ClientFile',
            icon: 'pi pi-user-plus',
            routerLink: '/crm/clients/view-upload-documents',
          },
          {
            label: 'ClientTaxOffice',
            icon: 'pi pi-user-plus',
            routerLink: '/crm/clients/view-tax-authority-office',
          },
          {
            label: 'ClientTMLOfficer',
            icon: 'pi pi-user-plus',
            routerLink: '/crm/clients/view-tml-officer',
          },
          {
            label: 'ClientOfficer',
            icon: 'pi pi-user-plus',
            routerLink: '/crm/clients/view-client-officers',
          },
          {
            label: 'ContactPerson',
            icon: 'pi pi-user-plus',
            routerLink: '/crm/clients/view-contact-persons',
          },
        ],
      },
      {
        label: 'Communication',
        icon: 'pi pi-users',
        items: [
          {
            label: 'Call',
            icon: 'pi pi-user-plus',
            routerLink: '/communication/view-call',
          },
          {
            label: 'Meeting',
            icon: 'pi pi-user-plus',
            routerLink: '/communication/view-meetings',
          },
          {
            label: 'FollowUp',
            icon: 'pi pi-user-plus',
            routerLink: '/communication/view-followups',
          },
          {
            label: 'FollowUpPoints',
            icon: 'pi pi-user-plus',
            routerLink: '/communication/view-followup-points',
          },
          {
            label: 'CommunicationFollowUp',
            icon: 'pi pi-user-plus',
            routerLink: '/communication/view-followups',
          },
          {
            label: 'MonitorFollowUps',
            icon: 'pi pi-user-plus',
            routerLink: '/communication/view-callss',
          },
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
          },
          {
            label: 'MandateAdditionalTerm',
            icon: 'pi pi-user-plus',
            routerLink: '/crm/leasing-mandates/view-manage-mandate-terms',
          },
          {
            label: 'MandateFees',
            icon: 'pi pi-user-plus',
            routerLink: '/crm/leasing-mandates/view-manage-mandate-termss',
          },
          {
            label: 'MandateFinancialActivity',
            icon: 'pi pi-user-plus',
            routerLink: '/crm/leasing-mandates/leasing-financial-form-compound',
          },
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
          },
          {
            label: 'Product',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-products',
          },
          {
            label: 'Sector',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-sectors',
          },
          {
            label: 'SubSector',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-sub-sectors',
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
          },
          {
            label: 'Departments',
            icon: 'pi pi-user-plus',
            routerLink: '/organizations/view-departments',
          },
          {
            label: 'Officers',
            icon: 'pi pi-user-plus',
            routerLink: '/organizations/view-officers',
          },

          {
            label: 'SignatoryOfficer',
            icon: 'pi pi-user-plus',
            routerLink: '/organizations/view-signatory-officers',
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
          },
          {
            label: 'Legal Form Law',
            icon: 'pi pi-user-plus',
            routerLink: '/legals/view-legal-form-laws',
          },
          {
            label: 'CR Authority Office',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-authority-offices',
          },
          {
            label: 'Tax Office',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-tax-offices',
          },
          {
            label: 'SME Client Code',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-sme-client-codes',
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
          },
          {
            label: 'Operations ',
            icon: 'pi pi-user-plus',
            routerLink: '/organizations/view-operations',
          },
          {
            label: 'Pages',
            icon: 'pi pi-user-plus',
            routerLink: '/organizations/view-pages',
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
          },
          {
            label: 'ClientStatusAction',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-client-status-actions',
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
      {
        label: 'Fees',
        icon: 'pi pi-users',
        items: [
          {
            label: 'FeesRange',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-fees-range',
          },
          {
            label: 'FeeCalculationType',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-fee-calculation-types',
          },
          {
            label: 'FeeType',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-fee-types',
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
            label: 'Authorization Groups',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-authorization-groups',
          },

             {
            label: 'Authorization Group Officers',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-authorization-group-officers',
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
            label: 'Call Officer Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-call-action-types',
          },
          {
            label: 'Call Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-call-types',
          },

          {
            label: 'Client Identity Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-client-types',
          },
          {
            label: 'Client Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-client-types',
          },
          {
            label: 'Client Officer Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-client-officer-types',
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
            label: 'Condition',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-conditions',
          },
          {
            label: 'Condition Expression',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-condition-expressions',
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
            label: 'FollowUp Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-followup-types',
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
            label: 'Interest Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-interest-types',
          },

          {
            label: 'Fees Ranges',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-fee-ranges',
          },

          {
            label: 'Leasing Types',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-leasing-types',
          },
          {
            label: 'Mandate Payment Settings',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-mandate-validity-unit',
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
            label: 'Notification Group',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-notification-groups',
          },

           {
            label: 'Notification Group Officers',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-notification-group-officers',
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
            label: 'Payment Periods',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-payment-periods',
          },
          {
            label: 'Payment Timing Terms',
            icon: 'pi pi-user-plus',
            routerLink: '/lookups/view-payment-timing-terms',
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

  constructor(
    private menuToggleService: MenuToggleService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    console.log('route', this.route.snapshot);
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
