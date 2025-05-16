import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientPhoneNumber } from './client-phone-number.model';
import { environment } from '../../../../../../environments/environment';

interface PagedResponse<T> {
  items: T[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class ClientPhoneNumbersService {
  private api = `${environment.apiUrl}ClientPhoneNumbers`;

  constructor(private http: HttpClient) {}

  getAll(pageNumber?: number): Observable<PagedResponse<ClientPhoneNumber>> {
    let params = new HttpParams();
    if (pageNumber != null) {
      params = params.set('pageNumber', pageNumber.toString());
    }
    return this.http.get<PagedResponse<ClientPhoneNumber>>(
      `${this.api}/GetAllClientPhoneNumbers`,
      { params }
    );
  }

  getHistory(): Observable<PagedResponse<ClientPhoneNumber>> {
    return this.http.get<PagedResponse<ClientPhoneNumber>>(
      `${this.api}/GetAllClientPhoneNumbersHistory`
    );
  }

  getById(id: number): Observable<ClientPhoneNumber> {
    return this.http.get<ClientPhoneNumber>(
      `${this.api}/${id}`
    );
  }

  create(data: Partial<ClientPhoneNumber>): Observable<ClientPhoneNumber> {
    return this.http.post<ClientPhoneNumber>(
      `${this.api}/CreateClientPhoneNumbers`,
      data
    );
  }

  update(id: number, data: Partial<ClientPhoneNumber>): Observable<ClientPhoneNumber> {
    return this.http.put<ClientPhoneNumber>(`${this.api}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
  getByClientId(clientId: number): Observable<ClientPhoneNumber[]> {
    return this.http.get<ClientPhoneNumber[]>(
      `${this.api}/GetByClientId/${clientId}`
    );
  }
}

