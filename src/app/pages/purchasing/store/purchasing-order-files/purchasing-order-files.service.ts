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
    return this.http
      .get<{ items: PurchaseOrderFile[]; totalCount: number }>(
        `${this.baseUrl}/GetAllPurchaseOrderFiles`
      )
      .pipe(
        map((resp) => resp.items), // ← pull off the `items` array here

        catchError((err) => {
          console.error('🚀 HTTP error fetching PurchaseOrderFiles:', err);
          return throwError(() => err);
        })
      );
  }
  //History management
  getAllHistory(): Observable<PurchaseOrderFile[]> {
    return this.http
      .get<{ items: PurchaseOrderFile[]; totalCount: number }>(
        `${this.baseUrl}/GetAllPurchaseOrderFilesHistory`
      )
      .pipe(
        map((resp) => resp.items), // ← pull off the `items` array here

        catchError((err) => {
          console.error('🚀 HTTP error fetching PurchaseOrderFiles:', err);
          return throwError(() => err);
        })
      );
  }
  getById(id: number): Observable<PurchaseOrderFile> {
    return this.http.get<PurchaseOrderFile>(
      `${this.baseUrl}/PurchaseOrderFileId?id=${id}`
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
