import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import pdfMake from 'pdfmake/build/pdfmake';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import { pdfMakeVfs } from '../../../../../scripts/pdfmake-vfs';
import { Store } from '@ngrx/store';
import { loadAll } from '../../../pages/lookups/store/sectors/sectors.actions';
import { selectAllSectors } from '../../../pages/lookups/store/sectors/sectors.selectors';
import { RouteReuseStrategy } from '@angular/router';
import { PermissionService } from '../../../pages/login/store/permissions/permission.service';
// Attach the VFS and font definitions
(pdfMake as any).vfs = pdfMakeVfs;
(pdfMake as any).fonts = {
  Amiri: {
    normal: 'Amiri-Regular.ttf',
    bold: 'Amiri-Bold.ttf',
    italics: 'Amiri-Regular.ttf',
    bolditalics: 'Amiri-Bold.ttf',
  },
};
@Component({
  selector: 'app-table',
  standalone: false,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input() editPermission!: string;
  @Input() deletePermission!: string;
  @Input() viewPermission!: string | string[];
  @Input() viewMandateWorkFlowHistoryTable!: boolean;

  @Input() tableData: any;
  @Input() cols: any[] = [];
  public selectedRows: any[] = [];
  @Input() col1Name!: string;
  @Input() viewRoleClaimsTable!: boolean;
  @Input() col2Name!: string;
  @Input() col3Name!: string;
  @Input() col4Name!: string;
  @Input() col5Name!: string;
  @Input() col6Name!: string;
  @Input() col7Name!: string;
  @Input() col8Name!: string;
  @Input() col9Name!: string;
  @Input() col10Name!: string;
  @Input() viewClientsOnboardingTable!: boolean;
  @Input() edit!: boolean;
  @Input() delete!: boolean;
  @Input() side!: boolean;
  @Input() download!: boolean;
  @Input() checkBox!: boolean;
  @Input() first: number = 0;
  @Input() view = false;
  @Output() viewForm = new EventEmitter<any>();
  @Input() filters: boolean = true;
  @Input() uppercase!: string;
  @Input() viewClientIdentityTable!: boolean;
  @Input() viewClientTable!: boolean;
  @Input() viewSalesTurnoverTable!: boolean;
  @Input() viewUploadDocumentsTable!: boolean;
  @Input() viewClientAddressesTable!: boolean;
  @Input() viewTurnOverTable!: boolean;
  @Input() viewCommunicationFlowTypesTable!: boolean;
  @Input() viewCommunicationTypesTable!: boolean;
  @Input() viewAddressTypesTable!: boolean;
  @Input() ViewAuthorizationGroupsComponent!: boolean;
  @Input() viewFeeRangesTable!: boolean;
  @Input() viewInterestTypesTable!: boolean;
  @Input() viewFollowUpTypesTable!: boolean;
  @Input() viewPhoneTypesTable!: boolean;
  @Input() viewPhoneNumberTable!: boolean;
  @Input() viewContactPersonTable!: boolean;
  @Input() viewSubSectorsLookupsTable!: boolean;
  @Input() viewCRAuthorityOfficeTable!: boolean;
  @Input() viewTaxAuthorityOfficeTable!: boolean;
  @Input() viewAuthorityOfficesTable!: boolean;
  @Input() viewMandateFeesTable!: boolean;
  @Input() viewCentralBankInfoTable!: boolean;
  @Input() viewShareHolderTable!: boolean;
  @Input() viewTMLOfficerTable!: boolean;
  @Input() viewTMLOfficerTypeLookupsTable!: boolean;
  @Input() viewLeasingMandateTable!: boolean;
  @Input() viewLeasingMandatesTable!: boolean;
  @Input() viewLeasingTypesLookupTable!: boolean;
  @Input() viewChildLeasingMandateTable!: boolean;
  @Input() viewOfficersTable!: boolean;
  @Input() viewClientStatusActionsTable!: boolean;
  @Input() viewContactPersonsTable!: boolean;
  @Input() viewAssestTypeTable!: boolean;
  @Input() viewGuarantorTable!: boolean;
  @Input() viewauthorizationGroupsTable!: boolean;
  @Input() viewNotificationGroupsTable!: boolean;
  @Input() viewFinancialFormTable!: boolean;
  @Input() viewCalculationsTable!: boolean;
  @Input() viewManageMandateTermsTable!: boolean;
  @Input() viewClientTypesTable!: boolean;
  @Input() viewLegalFormLawsTable!: boolean;
  @Input() viewLegalFormsTable!: boolean;
  @Input() viewFeeCalculationTypesTable!: boolean;
  @Input() viewBranchOfficersTable!: boolean;
  @Input() viewCompanyTypesTable!: boolean;
  @Input() viewPagesTable!: boolean;
  @Input() viewMandateStatusesTypesTable!: boolean;
  @Input() viewFeelTypesTable!: boolean;
  @Input() viewNotificationGroupOfficersTable!: boolean;
  @Input() viewAuthorizationGroupOfficersTable!: boolean;
  @Input() ViewInterestRateBenchmarksTable!: boolean;
  @Input() viewCurrenciesTable!: boolean;
  @Input() viewDepartmentsTable!: boolean;
  @Input() viewCurrencyExchangeTable!: boolean;
  @Input() viewMandateStatusesTable!: boolean;
  @Input() viewPaymentMethodsTable!: boolean;
  @Input() viewPaymentMonthDaysTable!: boolean;
  @Input() viewPaymentTypesTable!: boolean;
  @Input() viewPaymentTimingTermsTable!: boolean;
  @Input() viewPaymentPeriodsTable!: boolean;
  @Input() viewMandateValidityUnitTable!: boolean;
  @Input() viewBranchesTable!: boolean;
  @Input() viewBranchManagersTable!: boolean;
  @Input() viewBranchAddressesTable!: boolean;
  @Input() viewBusinessLinesTable!: boolean;
  @Input() viewAssetTypesTable!: boolean;
  @Input() viewConditionsTable!: boolean;
  @Input() viewConditionExpressionsTable!: boolean;
  @Input() viewAssetTypeCategoriesTable!: boolean;
  @Input() viewSectorsTable!: boolean;
  @Input() viewClientStatusesTable!: boolean;
  @Input() viewClientStatusTable!: boolean;
  @Input() viewSMEClientCodesTable!: boolean;
  @Input() viewSubSectorTable!: boolean;
  @Input() viewFollowupPointTable!: boolean;
  @Input() viewGovernerateTable!: boolean;
  @Input() viewRentStructureTypesTable!: boolean;
  @Input() viewCallActionTypesTable!: boolean;
  @Input() viewFollowupTable!: boolean;
  @Input() viewCountriesTable!: boolean;
  @Input() viewAreasTable!: boolean;
  @Input() viewCallsTable!: boolean;
  @Input() viewMandateAdditionalTermsTable!: boolean;
  @Input() viewTaxOfficeTable!: boolean;
  @Input() viewAddDepartmentManagerTable!: boolean;
  @Input() viewTeamsTable!: boolean;
  @Input() viewTeamLeadTable!: boolean;
  @Input() viewRolesTable!: boolean;
  @Input() viewTeamOfficersTable!: boolean;
  @Input() viewFeesRangeTable!: boolean;
  @Input() viewOperationsTable!: boolean;
  @Input() viewPageOperationsTable!: boolean;
  @Input() viewOfficersLookupsTable!: boolean;
  @Input() viewSignatoryOfficersTable!: boolean;
  @Input() viewMeetingsTable!: boolean;
  @Input() viewCallTypesTable!: boolean;
  @Input() viewOfficersCommunicationTable!: boolean;
  @Input() viewContactPersonCommunicationTable!: boolean;
  @Input() viewAssestTypeCommunicationTable!: boolean;
  @Input() viewInsuredByTable!: boolean;
  @Input() viewIdentificationTypesTable!: boolean;
  @Input() viewFollowUpsCommunicationTable!: boolean;
  @Input() viewGracePeriodUnitsTable!: boolean;
  @Input() viewFollowUpPointsCommunicationTable!: boolean;
  @Input() viewMeetingTypesCommunicationTable!: boolean;
  @Input() viewMeetingTypesLookupTable!: boolean;
  @Input() viewCallsCommunicationTable!: boolean;
  @Input() viewClientGuarantorTable!: boolean;
  @Input() viewWorkFlowActionTypesLookupsTable!: boolean;
  @Input() viewClientOfficerTypesTable!: boolean;
  @Input() viewDocTypesTable!: boolean;
  @Input() viewProductsTable!: boolean;
  @Input() viewClientOfficerTable!: boolean;
  @Input() viewClientLegalTable!: boolean;
  @Input() viewActionAuthorizationGroupTable!: boolean;
  @Input() viewActionNotificationGroupTable!: boolean;
  @Input() viewMandateStatusActionsTable!: boolean;
  @Input() viewMandateActionAuthorizationGroupTable!: boolean;
  @Input() viewMandateActionNotificationGroupTable!: boolean;
  @Input() paginator: boolean = true;
  @Output() wizardBtn = new EventEmitter<void>();
  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<number>();
  @Output() onDownload = new EventEmitter<number>();
  @Output() onBulkDelete = new EventEmitter<number[]>();

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
  allSectors: any;
  allGovernorates: any;
  constructor(
    private sharedService: SharedService,
    _reuseStrategy: RouteReuseStrategy,
    public perms: PermissionService
  ) {
    _reuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    if (this.cols?.length) {
      this.globalFilterFields = this.cols.map((c) => c.field);
    }
    this.totalRecords = this.tableData.length;
  }

  getSectorName(sectorId: number): string {
    const sector = this.allSectors.find((s: any) => s.id === sectorId);
    return sector ? sector.name : 'Unknown Sector';
  }
  getGovernorateName(id: number): string {
    const governorate = this.allGovernorates.find((s: any) => s.id === id);
    return governorate ? governorate.name : 'Unknown Governorate';
  }
  openPopup() {
    this.sharedService.showPopup();
  }
  get totalPages(): number {
    return Math.ceil(this.totalRecords / this.rows);
  }
  /*Delete*/
  logAndDelete(id: number) {
    console.log('Delete clicked with ID:', id);
    this.onDelete.emit(id);
  }
  /*Export Pdf*/
  generatePdf() {
    if (!this.tableData?.length) {
      console.warn('No data to export');
      return;
    }

    // 1) Figure out your column definitions
    //    If tableColumns is an array of { field, header }, use it;
    //    otherwise, fall back to Object.keys on your first row.
    const colDefs: { field: string; header: string }[] =
      Array.isArray(this.cols) &&
      this.cols.length &&
      typeof this.cols[0] === 'object' &&
      'field' in this.cols[0]
        ? (this.cols as any)
        : Object.keys(this.tableData[0]).map((key) => ({
            field: key,
            header: key,
          }));

    // 2) Extract the header labels and the actual field names
    const headerLabels = colDefs.map((c) => c.header);
    const fields = colDefs.map((c) => c.field);

    // 3) Build the 2D body array for pdfMake
    const body = [
      // first row: bold headers
      headerLabels.map((lbl) => ({ text: lbl, bold: true })),
      // one row per data object
      ...this.tableData.map((row: { [x: string]: any }) =>
        fields.map((fld) => {
          const cell = row[fld];
          return cell !== null && cell !== undefined ? cell.toString() : '';
        })
      ),
    ];

    // 4) Create your document definition
    const docDefinition: TDocumentDefinitions = {
      // @ts-ignore: pdfMake supports rtl even though TS defs don’t
      rtl: true,
      defaultStyle: { font: 'Amiri', alignment: 'center' },
      content: [
        { text: ' العملاء تقرير', style: 'header' },
        {
          table: {
            headerRows: 1,
            widths: Array(fields.length).fill('*'),
            body,
          },
        },
      ],
      styles: {
        header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] },
      },
      pageSize: 'A4',
      pageMargins: [40, 60, 40, 60],
    };

    // 5) Generate and download
    pdfMake.createPdf(docDefinition).download('clients-report.pdf');
  }
  /*Export Excel*/
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
  getGenderLabel(id: number): string {
    switch (id) {
      case 1:
        return 'Male';
      case 2:
        return 'Female';
      default:
        return '—';
    }
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

  getTypeLabel(code: string) {
    switch (code) {
      case 'CT-1':
        return 'Company';
      case 'CT-2':
        return 'Individual';
      default:
        return code;
    }
  }
  /*View*/
  onView(rowData: any) {
    this.viewForm.emit(rowData);
  }
  handleBulkDelete() {
    if (this.selectedRows.length <= 1) {
      return;
    }
    const idsToDelete = this.selectedRows.map((row) => row.id);
    this.onBulkDelete.emit(idsToDelete);
    // ✅ Immediately clear the selection to remove the button
    this.selectedRows = [];
  }
}
