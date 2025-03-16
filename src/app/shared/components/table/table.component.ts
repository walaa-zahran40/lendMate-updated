import { Component, Input } from '@angular/core';
import { Client } from '../../interfaces/client.interface';
import { PageEvent } from '../../interfaces/page-event.interface';
import { PaginatorState } from 'primeng/paginator';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-table',
  standalone: false,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input() tableData: any[] = [];
  @Input() cols: any[] = [];
  @Input() col1Name!: string;
  @Input() col2Name!: string;
  @Input() col3Name!: string;
  @Input() col4Name!: string;
  @Input() col5Name!: string;
  @Input() col6Name!: string;
  @Input() col7Name!: string;
  @Input() col8Name!: string;
  @Input() edit!: boolean;
  @Input() delete!: boolean;
  @Input() side!: boolean;
  @Input() download!: boolean;
  @Input() checkBox!: boolean;
  @Input() filters: boolean = true;
  @Input() uppercase!: string;
  @Input() viewClientTable!: boolean;
  @Input() viewUploadDocumentsTable!: boolean;
  @Input() viewAddressTable!: boolean;
  @Input() viewTurnOverTable!: boolean;
  @Input() viewPhoneNumberTable!: boolean;
  @Input() viewContactPersonTable!: boolean;
  @Input() viewCRAuthorityOfficeTable!: boolean;
  @Input() viewTaxAuthorityOfficeTable!: boolean;
  @Input() viewCentralBankInfoTable!: boolean;
  @Input() viewShareHolderTable!: boolean;
  @Input() viewTMLOfficerTable!: boolean;
  @Input() viewLeasingMandatesTable!: boolean;
  @Input() viewOfficersTable!: boolean;
  @Input() viewContactPersonsTable!: boolean;
  @Input() viewAssestTypeTable!: boolean;
  @Input() viewCalculationsTable!: boolean;
  @Input() viewManageMandateTermsTable!: boolean;
  @Input() viewLegalFormTable!: boolean;
  @Input() viewLegalFormLawTable!: boolean;
  @Input() viewCompanyTypesTable!: boolean;
  @Input() viewMandateStatusesTypesTable!: boolean;
  @Input() viewFeelTypesTable!: boolean;
  @Input() viewCurrenciesTable!: boolean;
  @Input() viewCurrencyExchangeTable!: boolean;
  @Input() viewPaymentMethodsTable!: boolean;
  @Input() viewMandateValidityUnitTable!: boolean;
  @Input() viewBranchTable!: boolean;
  @Input() viewBranchManagersTable!: boolean;
  @Input() viewBranchAddressesTable!: boolean;
  @Input() viewBusinessLinesTable!: boolean;
  @Input() viewAssestTypesTable!: boolean;
  @Input() viewAssestTypeCategoriesTable!: boolean;
  @Input() viewSectorsTable!: boolean;
  @Input() viewClientStatusesTable!: boolean;
  @Input() viewClientStatusTable!: boolean;
  @Input() viewSMEClientCodeTable!: boolean;
  @Input() viewSubSectorTable!: boolean;
  @Input() viewGovernerateTable!: boolean;
  @Input() viewCountriesTable!: boolean;
  @Input() viewAreasTable!: boolean;
  @Input() viewTaxOfficeTable!: boolean;
  @Input() viewAddDepartmentManagerTable!: boolean;
  @Input() viewTeamTable!: boolean;
  @Input() viewTeamLeadTable!: boolean;
  @Input() viewRolesTable!: boolean;
  @Input() viewTeamMemberTable!: boolean;
  @Input() viewOperationsTable!: boolean;
  @Input() viewPageOperationsTable!: boolean;
  @Input() viewOfficersLookupsTable!: boolean;
  @Input() viewSignatoryOfficersTable!: boolean;
  @Input() viewMeetingsTable!: boolean;
  @Input() viewOfficersCommunicationTable!: boolean;
  @Input() viewContactPersonCommunicationTable!: boolean;
  @Input() viewAssestTypeCommunicationTable!: boolean;
  @Input() viewFollowUpsCommunicationTable!: boolean;
  @Input() viewFollowUpPointsCommunicationTable!: boolean;
  @Input() viewMeetingTypesCommunicationTable!: boolean;
  checked: boolean = false;
  first2: number = 0;

  rows2: number = 10;
  options = [
    { label: 5, value: 5 },
    { label: 10, value: 10 },
    { label: 20, value: 20 },
    { label: 120, value: 120 },
  ];
  rowsPerPageOptions = [5, 10, 15, 20];
  rows = 10;
  currentPage = 0; // Page index starts from 0
  totalRecords: any;
  showDownload = false;
  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.totalRecords = this.tableData.length;
  }
  openPopup() {
    this.sharedService.showPopup();
  }
  get totalPages(): number {
    return Math.ceil(this.totalRecords / this.rows);
  }
  // Handle pagination event
  onPageChange(event: any) {
    this.currentPage = event.first / event.rows; // Calculate page index
    this.rows = event.rows; // Update rows per page
  }
}
