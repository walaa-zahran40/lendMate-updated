import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DocumentType } from './document-type.model';

interface PagedResponse<T> {
  items: T[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class DocumentTypesService {
  private api = 'https://192.168.10.67:7070/api/DocumentTypes';

  constructor(private http: HttpClient) {}

  getAll(pageNumber?: number): Observable<PagedResponse<DocumentType>> {
    let params = new HttpParams();
    if (pageNumber != null) {
      params = params.set('pageNumber', pageNumber.toString());
    }
    return this.http.get<PagedResponse<DocumentType>>(
      `${this.api}/GetAllDocumentTypes`,
      { params }
    );
  }

  getHistory(): Observable<PagedResponse<DocumentType>> {
    return this.http.get<PagedResponse<DocumentType>>(
      `${this.api}/GetAllDocumentTypesHistory`
    );
  }

  getById(id: number): Observable<DocumentType> {
    return this.http.get<DocumentType>(`${this.api}/DocumentTypeId?id=${id}`);
  }

  create(data: Partial<DocumentType>): Observable<DocumentType> {
    return this.http.post<DocumentType>(`${this.api}/CreateDocumentType`, data);
  }

  update(id: number, data: Partial<DocumentType>): Observable<DocumentType> {
    return this.http.put<DocumentType>(`${this.api}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
