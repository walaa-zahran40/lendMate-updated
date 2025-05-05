import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { DocType } from './doc-type.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DocTypesService {
  private baseUrl = `${environment.apiUrl}DocumentTypes`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<DocType[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: DocType[]; totalCount: number }>(
        `${this.baseUrl}/GetAllDocumentTypes`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching DocTypes:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<DocType> {
    return this.http.get<DocType>(`${this.baseUrl}/DocumentTypeId?id=${id}`);
  }

  create(payload: Omit<DocType, 'id'>): Observable<DocType> {
    return this.http.post<DocType>(
      `${this.baseUrl}/CreateDocumentType`,
      payload
    );
  }

  update(id: number, changes: Partial<DocType>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
