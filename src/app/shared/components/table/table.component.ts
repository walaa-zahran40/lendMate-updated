import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-table',
  standalone: false,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input() tableData: any;
  @Input() cols: any[] = [];
  @Output() deleteClient = new EventEmitter<number>();

  @Input() col1Name!: string;
  @Input() col2Name!: string;
  @Input() col3Name!: string;
  @Input() col4Name!: string;
  @Input() col5Name!: string;
  @Input() col6Name!: string;
  @Input() col7Name!: string;
  @Input() col8Name!: string;
  @Input() col9Name!: string;
  @Input() col10Name!: string;
  @Input() edit!: boolean;
  @Input() delete!: boolean;
  @Input() side!: boolean;
  @Input() download!: boolean;
  @Input() checkBox!: boolean;
  @Input() first: number = 0;

  @Input() filters: boolean = true;
  @Input() uppercase!: string;
  @Input() viewClientIdentityTable!: boolean;
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
  @Input() viewBranchOfficersTable!: boolean;
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
  @Input() viewFeesRangeTable!: boolean;
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
  @Input() viewCallsCommunicationTable!: boolean;
  @Input() viewClientGuarantorTable!: boolean;
  @Input() paginator: boolean = true;
  @Output() wizardBtn = new EventEmitter<void>();

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
  event: any;
  globalFilterFields: string[] = [];

  constructor(private sharedService: SharedService, private router: Router) {}

  ngOnInit() {
    if (this.cols?.length) {
      this.globalFilterFields = this.cols.map((c) => c.field);
    }
    this.totalRecords = this.tableData.length;
  }
  openPopup() {
    this.sharedService.showPopup();
  }
  get totalPages(): number {
    return Math.ceil(this.totalRecords / this.rows);
  }
  logAndDelete(id: number) {
    console.log('Delete clicked with ID:', id);
    this.deleteClient.emit(id);
  }
  exportToExcel(): void {
    const dataToExport = this.tableData.map((row: { [x: string]: any }) =>
      Object.fromEntries(this.cols.map((col) => [col.header, row[col.field]]))
    );

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };

    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    this.saveAsExcelFile(excelBuffer, 'ExportedData');
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });
    FileSaver.saveAs(data, `${fileName}_${new Date().getTime()}.xlsx`);
  }
  // Handle pagination event
  onPageChange(event: any) {
    this.currentPage = event.first / event.rows; // Calculate page index
    this.rows = event.rows; // Update rows per page
  }
  onEditClient(clientId: number) {
    this.router.navigate(['/crm/clients/add-client', clientId]);
  }
}
