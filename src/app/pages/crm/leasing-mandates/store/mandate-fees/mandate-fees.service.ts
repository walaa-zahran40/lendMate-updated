import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MandateFee } from './mandate-fee.model';
import { environment } from '../../../../../../environments/environment';

interface PagedResponse<T> {
  items: T[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class MandateFeesService {
  private api = `${environment.apiUrl}MandateFees`;

  constructor(private http: HttpClient) {}

  getAll(pageNumber?: number): Observable<PagedResponse<MandateFee>> {
    let params = new HttpParams();
    if (pageNumber != null) {
      params = params.set('pageNumber', pageNumber.toString());
    }
    return this.http.get<PagedResponse<MandateFee>>(
      `${this.api}/GetAllMandateFees`,
      { params }
    );
  }

  getHistory(): Observable<PagedResponse<MandateFee>> {
    return this.http.get<PagedResponse<MandateFee>>(
      `${this.api}/GetAllMandateFeesHistory`
    );
  }

  getById(id: number): Observable<MandateFee> {
    return this.http.get<MandateFee>(`${this.api}/MandateFeeId`, {
      params: { leasingMandate: id.toString() },
    });
  }

  create(data: Partial<MandateFee>): Observable<MandateFee> {
    return this.http.post<MandateFee>(`${this.api}/CreateMandateFee`, data);
  }

  update(id: number, data: Partial<MandateFee>): Observable<MandateFee> {
    return this.http.put<MandateFee>(`${this.api}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
  getByMandateId(mandateId: number): Observable<MandateFee[]> {
    return this.http.get<MandateFee[]>(`${this.api}/mandateId`, {
      params: { mandateId: mandateId.toString() },
    });
  }
}
