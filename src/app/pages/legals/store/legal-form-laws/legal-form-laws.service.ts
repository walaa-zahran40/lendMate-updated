import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LegalFormLaw } from './legal-form-law.model';
import { environment } from '../../../../../environments/environment';

interface PagedResponse<T> {
  items: T[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class LegalFormLawsService {
  private api = `${environment.apiUrl}LegalFormLaws`;

  constructor(private http: HttpClient) {}

  getAll(pageNumber?: number): Observable<PagedResponse<LegalFormLaw>> {
    let params = new HttpParams();
    if (pageNumber != null) {
      params = params.set('pageNumber', pageNumber.toString());
    }
    return this.http.get<PagedResponse<LegalFormLaw>>(
      `${this.api}/GetAllLegalFormLaws`,
      { params }
    );
  }

  getHistory(): Observable<PagedResponse<LegalFormLaw>> {
    return this.http.get<PagedResponse<LegalFormLaw>>(
      `${this.api}/GetAllLegalFormLawsHistory`
    );
  }

  getById(id: number): Observable<LegalFormLaw> {
    return this.http.get<LegalFormLaw>(`${this.api}/LegalFormLawId?LegalFormLawId=${id}`);
  }

  create(data: Partial<LegalFormLaw>): Observable<LegalFormLaw> {
    return this.http.post<LegalFormLaw>(`${this.api}/CreateLegalFormLaw`, data);
  }

  update(id: number, data: Partial<LegalFormLaw>): Observable<LegalFormLaw> {
    return this.http.put<LegalFormLaw>(`${this.api}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
