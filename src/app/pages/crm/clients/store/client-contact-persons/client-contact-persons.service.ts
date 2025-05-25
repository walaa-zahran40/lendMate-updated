import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientContactPerson } from './client-contact-person.model';
import { environment } from '../../../../../../environments/environment';

interface PagedResponse<T> {
  items: T[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class ClientContactPersonsService {
  private api = `${environment.apiUrl}ContactPersons`;

  constructor(private http: HttpClient) {}

  getAll(pageNumber?: number): Observable<PagedResponse<ClientContactPerson>> {
    let params = new HttpParams();
    if (pageNumber != null) {
      params = params.set('pageNumber', pageNumber.toString());
    }
    return this.http.get<PagedResponse<ClientContactPerson>>(
      `${this.api}/GetAllContactPersons`,
      { params }
    );
  }

  getHistory(): Observable<PagedResponse<ClientContactPerson>> {
    return this.http.get<PagedResponse<ClientContactPerson>>(
      `${this.api}/GetAllClientContactPersonsHistory`
    );
  }

  getById(id: number): Observable<ClientContactPerson> {
    return this.http.get<ClientContactPerson>(`${this.api}/Id`, {
      params: { id: id.toString() },
    });
  }

  create(data: Partial<ClientContactPerson>): Observable<ClientContactPerson> {
    return this.http.post<ClientContactPerson>(
      `${this.api}/CreateContactPerson`,
      data
    );
  }

  update(
    id: number,
    data: Partial<ClientContactPerson>
  ): Observable<ClientContactPerson> {
    return this.http.put<ClientContactPerson>(`${this.api}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
  getByClientId(clientId: number): Observable<ClientContactPerson[]> {
    return this.http.get<ClientContactPerson[]>(`${this.api}/${clientId}`);
  }
}
