import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LegalForm } from './legal-form.model';
import { environment } from '../../../../../environments/environment';

interface PagedResponse<T> {
  items: T[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class LegalFormsService {
  private api = `${environment.apiUrl}LegalForms`;

  constructor(private http: HttpClient) {}

  getAll(pageNumber?: number): Observable<PagedResponse<LegalForm>> {
    let params = new HttpParams();
    if (pageNumber != null) {
      params = params.set('pageNumber', pageNumber.toString());
    }
    return this.http.get<PagedResponse<LegalForm>>(
      `${this.api}/GetAllLegalForms`,
      { params }
    );
  }

  getHistory(): Observable<PagedResponse<LegalForm>> {
    return this.http.get<PagedResponse<LegalForm>>(
      `${this.api}/GetAllLegalFormsHistory`
    );
  }

  getById(id: number): Observable<LegalForm> {
    return this.http.get<LegalForm>(`${this.api}/LegalFormId?LegalFormId=${id}`);
  }

  create(data: Partial<LegalForm>): Observable<LegalForm> {
    return this.http.post<LegalForm>(`${this.api}/CreateLegalForm`, data);
  }

  update(id: number, data: Partial<LegalForm>): Observable<LegalForm> {
    return this.http.put<LegalForm>(`${this.api}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
