import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Officer } from './officer.model';
import { environment } from '../../../../../environments/environment';

interface PagedResponse<T> {
  items: T[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class OfficersService {
  private api = `${environment.apiUrl}Officers`;

  constructor(private http: HttpClient) {}

  getAll(pageNumber?: number): Observable<PagedResponse<Officer>> {
    let params = new HttpParams();
    if (pageNumber != null) {
      params = params.set('pageNumber', pageNumber.toString());
    }
    return this.http.get<PagedResponse<Officer>>(
      `${this.api}/GetAllOfficers`,
      { params }
    );
  }

  getHistory(): Observable<PagedResponse<Officer>> {
    return this.http.get<PagedResponse<Officer>>(
      `${this.api}/GetAllOfficersHistory`
    );
  }

  getById(id: number): Observable<Officer> {
    return this.http.get<Officer>(`${this.api}/OfficerId?officerId=${id}`);
  }

  create(data: Partial<Officer>): Observable<Officer> {
    return this.http.post<Officer>(`${this.api}/CreateOfficer`, data);
  }

  update(id: number, data: Partial<Officer>): Observable<Officer> {
    return this.http.put<Officer>(`${this.api}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
