import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PurchaseOrder } from './purchasing-order.model';
// LIST DTO (GetAll)
interface PurchaseOrderListItemDto {
  id: number;
  number: string;
  firstClaimStatusId: number;
  deliveryWithin: number;
  leasingAgreementId: number;
  deliveryWithinUnitId: number;
  vendorId: number;
  vendorAddressId: number;
  deliveryLocationDetails: string | null;
  date: string;
  currencyId: number;
  isActive: boolean;
}
interface PurchaseOrderListResponseDto {
  items: PurchaseOrderListItemDto[];
  totalCount: number;
}

// DETAIL DTO (GetById)
interface PurchaseOrderAssetDto {
  id?: number;
  assetId: number;
  taxAmount: number;
  purchasePrice: number;
  salesPrice: number;
  stickerPrice: number;
  netValue: number;
  assetCount: number;
  paymentTypeId: number;
  paymentPeriodUnitId: number;
  depreciationValue: number;
  provisionAmount: number;
  downPayment: number;
  isLetterOfGuaranteeAmount: boolean;
  letterOfGuaranteeAmount: string | null;
  // … other read-only names omitted
}
interface PurchaseOrderDetailDto {
  id: number;
  poNumber?: string | null;
  poDate: string;
  firstClaimStatusId: number;
  currencyId: number;
  deliveryWithin: number;
  deliveryWithinUnitId: number;
  vendorId: number;
  vendorAddressId: number;
  deliveryLocationDetails: string | null;
  purchaseOrderAssets: Array<{
    assetId: number;
    taxAmount: number;
    purchasePrice: number;
    salesPrice: number;
    stickerPrice: number;
    netValue: number;
    assetCount: number;
    paymentTypeId: number;
    paymentPeriodUnitId: number;
    depreciationValue: number;
    provisionAmount: number;
    downPayment: number;
    isLetterOfGuaranteeAmount: boolean;
    letterOfGuaranteeAmount: string | null;
  }>;
  purchaseOrderOfficerId: number;
  firstPurchaseOrderSignatoryOfficerId: number;
  secondPurchaseOrderSignatoryOfficerId: number;
  isActive: boolean;
}

@Injectable({ providedIn: 'root' })
export class PurchasingOrdersService {
  private baseUrl = `${environment.apiUrl}PurchaseOrders`;
  private toEntityFromList = (d: PurchaseOrderListItemDto): PurchaseOrder => ({
    id: d.id,
    number: d.number,
    firstClaimStatusId: d.firstClaimStatusId,
    date: d.date, // list uses "date"
    currencyId: d.currencyId,
    // fields not in list → default/neutral values
    leasingAgreementId: d.leasingAgreementId,
    deliveryWithin: d.deliveryWithin,
    deliveryWithinUnitId: d.deliveryWithinUnitId,
    vendorId: d.vendorId,
    vendorAddressId: d.vendorAddressId,
    deliveryLocationDetails: d.deliveryLocationDetails ?? '',
    purchaseOrderFinancialActivities: [],
    officerId: 0,
    firstSignatoryOfficerId: 0,
    secondSignatoryOfficerId: 0,
    isActive: d.isActive,
  });

  private toEntityFromDetail = (d: PurchaseOrderDetailDto): PurchaseOrder => ({
    id: d.id,
    number: d.poNumber ?? null, // <- keep table “number” intact
    firstClaimStatusId: d.firstClaimStatusId,
    date: d.poDate, // <- normalize
    currencyId: d.currencyId,
    leasingAgreementId: 0, // (not provided by detail)
    deliveryWithin: d.deliveryWithin,
    deliveryWithinUnitId: d.deliveryWithinUnitId,
    vendorId: d.vendorId,
    vendorAddressId: d.vendorAddressId,
    deliveryLocationDetails: d.deliveryLocationDetails ?? '',
    purchaseOrderFinancialActivities: (d.purchaseOrderAssets ?? []).map(
      (a) => ({
        assetId: a.assetId,
        taxAmount: a.taxAmount,
        purchasePrice: a.purchasePrice,
        salesPrice: a.salesPrice,
        stickerPrice: a.stickerPrice,
        netValue: a.netValue,
        assetCount: a.assetCount,
        paymentTypeId: a.paymentTypeId,
        paymentPeriodUnitId: a.paymentPeriodUnitId,
        depreciationValue: a.depreciationValue,
        provisionAmount: a.provisionAmount,
        downPayment: a.downPayment,
        isLetterOfGuaranteeAmount: !!a.isLetterOfGuaranteeAmount,
        letterOfGuaranteeAmount: a.letterOfGuaranteeAmount, // string|null
      })
    ),
    officerId: d.purchaseOrderOfficerId,
    firstSignatoryOfficerId: d.firstPurchaseOrderSignatoryOfficerId,
    secondSignatoryOfficerId: d.secondPurchaseOrderSignatoryOfficerId,
    isActive: d.isActive,
  });

  constructor(private http: HttpClient) {}

  getAll(): Observable<PurchaseOrder[]> {
    return this.http
      .get<PurchaseOrderListResponseDto>(`${this.baseUrl}/GetAllPurchaseOrders`)
      .pipe(map((resp) => (resp.items ?? []).map(this.toEntityFromList)));
  }
  getById(id: number) {
    const url = `${this.baseUrl}/PurchaseOrderId?id=${id}`;
    return this.http
      .get<PurchaseOrderDetailDto>(url)
      .pipe(map((dto) => this.toEntityFromDetail(dto)));
  }
  // Ensure id is included on PUT body (some backends require it)
  update(id: number, changes: Partial<PurchaseOrder>): Observable<void> {
    const body = { id, ...changes };
    return this.http.put<void>(`${this.baseUrl}/${id}`, body);
  }

  //History management
  getAllHistory(): Observable<PurchaseOrder[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: PurchaseOrder[]; totalCount: number }>(
        `${this.baseUrl}/GetAllPurchaseOrdersHistory`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching PurchasingOrders:', err);
          return throwError(() => err);
        })
      );
  }

  create(payload: Omit<PurchaseOrder, 'id'>): Observable<PurchaseOrder> {
    return this.http.post<PurchaseOrder>(
      `${this.baseUrl}/CreatePurchaseOrder`,
      payload
    );
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
