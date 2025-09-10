import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PurchaseOrderFile } from './purchasing-order-file.model';

@Injectable({ providedIn: 'root' })
export class PurchaseOrderFilesService {
  private baseUrl = `${environment.apiUrl}PurchaseOrderFiles`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<PurchaseOrderFile[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: PurchaseOrderFile[]; totalCount: number }>(
        `${this.baseUrl}/GetAllPurchaseOrderFiles`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching PurchaseOrderFiles:', err);
          return throwError(() => err);
        })
      );
  }
  //History management
  getAllHistory(): Observable<PurchaseOrderFile[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: PurchaseOrderFile[]; totalCount: number }>(
        `${this.baseUrl}/GetAllPurchaseOrderFilesHistory`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching PurchaseOrderFiles:', err);
          return throwError(() => err);
        })
      );
  }
  getById(id: number): Observable<PurchaseOrderFile> {
    return this.http.get<PurchaseOrderFile>(
      `${this.baseUrl}/PurchaseOrderFileId?id${id}`
    );
  }
  getByAssetId(id: number): Observable<PurchaseOrderFile> {
    return this.http.get<PurchaseOrderFile>(
      `${this.baseUrl}/PurchaseOrderId?clientId=${id}`
    );
  }

  create(body: FormData | Partial<PurchaseOrderFile>) {
    return this.http.post<PurchaseOrderFile>(
      `${this.baseUrl}/CreatePurchaseOrderFile`,
      body
    );
  }

  update(id: number, body: FormData | Partial<PurchaseOrderFile>) {
    return this.http.put<void>(`${this.baseUrl}/${id}`, body);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
