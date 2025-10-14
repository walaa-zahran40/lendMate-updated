import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientShareHolder } from './client-share-holder.model';
import { environment } from '../../../../../../environments/environment';

interface PagedResponse<T> {
  items: T[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class ClientShareHoldersService {
  private api = `${environment.apiUrl}ClientShareHolders`;

  constructor(private http: HttpClient) {}

  getAll(pageNumber?: number): Observable<PagedResponse<ClientShareHolder>> {
    let params = new HttpParams();
    if (pageNumber != null) {
      params = params.set('pageNumber', pageNumber.toString());
    }
    return this.http.get<PagedResponse<ClientShareHolder>>(
      `${this.api}/GetAllClientShareHolders`,
      { params }
    );
  }

  getHistory(): Observable<PagedResponse<ClientShareHolder>> {
    return this.http.get<PagedResponse<ClientShareHolder>>(
      `${this.api}/GetAllClientShareHoldersHistory`
    );
  }

  getById(id: number): Observable<ClientShareHolder> {
    return this.http.get<ClientShareHolder>(`${this.api}/Id?id=${id}`);
  }

  create(data: Partial<ClientShareHolder>): Observable<ClientShareHolder> {
    return this.http.post<ClientShareHolder>(
      `${this.api}/CreateClientShareHolder`,
      data
    );
  }

  update(
    id: number,
    data: Partial<ClientShareHolder>
  ): Observable<ClientShareHolder> {
    return this.http.put<ClientShareHolder>(`${this.api}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
  getByClientId(clientId: number): Observable<ClientShareHolder[]> {
    return this.http.get<ClientShareHolder[]>(
      `${this.api}/ClientId/${clientId}`
    );
  }
}
