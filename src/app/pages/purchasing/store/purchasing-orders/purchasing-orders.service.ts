import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PurchaseOrder } from './purchasing-order.model';

@Injectable({ providedIn: 'root' })
export class PurchasingOrdersService {
  private baseUrl = `${environment.apiUrl}PurchaseOrders`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<PurchaseOrder[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: PurchaseOrder[]; totalCount: number }>(
        `${this.baseUrl}/GetAllPurchaseOrders`
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
  // assets.service.ts
  getById(id: number): Observable<PurchaseOrder> {
    const url = `${this.baseUrl}/PurchaseOrderId?id=${id}`; // <- check endpoint name
    console.log('[PurchasingOrdersService] GET', url);
    return this.http.get<any>(url).pipe(
      tap((raw) => console.log('[PurchasingOrdersService] raw response:', raw)),
      // 🔧 If your API wraps the entity, unwrap it here:
      map((raw) => {
        // common patterns – adjust to your backend
        if (raw?.item) return raw.item; // { item: PurchasingOrder }
        if (raw?.data) return raw.data; // { data: PurchasingOrder }
        if (Array.isArray(raw)) return raw[0]; // [PurchasingOrder]
        return raw as PurchaseOrder; // plain PurchasingOrder
      }),
      tap((entity) =>
        console.log('[PurchasingOrdersService] mapped PurchasingOrder:', entity)
      ),
      catchError((err) => {
        console.error('[PurchasingOrdersService] GET FAIL', err);
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

  update(id: number, changes: Partial<PurchaseOrder>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
