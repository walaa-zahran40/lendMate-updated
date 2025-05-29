import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MandateAdditionalTerm } from './mandate-additional-term.model';
import { environment } from '../../../../../../environments/environment';

interface PagedResponse<T> {
  items: T[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class MandateAdditionalTermsService {
  private api = `${environment.apiUrl}MandateAdditionalTerms`;

  constructor(private http: HttpClient) {}

  getAll(pageNumber?: number): Observable<PagedResponse<MandateAdditionalTerm>> {
    let params = new HttpParams();
    if (pageNumber != null) {
      params = params.set('pageNumber', pageNumber.toString());
    }
    return this.http.get<PagedResponse<MandateAdditionalTerm>>(
      `${this.api}/GetAllMandateAdditionalTerms`,
      { params }
    );
  }

  getHistory(): Observable<PagedResponse<MandateAdditionalTerm>> {
    return this.http.get<PagedResponse<MandateAdditionalTerm>>(
      `${this.api}/GetAllMandateAdditionalTermsHistory`
    );
  }

  getById(id: number): Observable<MandateAdditionalTerm> {
  return this.http.get<MandateAdditionalTerm>(`${this.api}/Id`, {
    params: { id: id.toString() }
  });
}


  create(data: Partial<MandateAdditionalTerm>): Observable<MandateAdditionalTerm> {
    return this.http.post<MandateAdditionalTerm>(
      `${this.api}/CreateMandateAdditionalTerm`,
      data
    );
  }

  update(id: number, data: Partial<MandateAdditionalTerm>): Observable<MandateAdditionalTerm> {
    return this.http.put<MandateAdditionalTerm>(`${this.api}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
  getByMandateId(mandateId: number): Observable<MandateAdditionalTerm[]> {
  return this.http.get<MandateAdditionalTerm[]>(
    `${this.api}/MandateId`,
    { params: { mandateId: mandateId.toString() } }
  );
}
}

