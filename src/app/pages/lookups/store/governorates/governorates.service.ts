import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Governorate } from './governorate.model';

interface PagedResponse<T> {
  items: T[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class GovernoratesService {
  private baseUrl = 'https://192.168.10.67:7070/api';

  private apiUrl = this.baseUrl + '/Governorates';

  constructor(private http: HttpClient) {}

  getAll(pageNumber?: number): Observable<PagedResponse<Governorate>> {
    let params = new HttpParams();
    if (pageNumber != null)
      params = params.set('pageNumber', pageNumber.toString());
    return this.http.get<PagedResponse<Governorate>>(
      `${this.apiUrl}/GetAllGovernorates`,
      { params }
    );
  }

  getHistory(): Observable<PagedResponse<Governorate>> {
    return this.http.get<PagedResponse<Governorate>>(
      `${this.apiUrl}/GetAllGovernoratesHistory`
    );
  }

  getById(id: number): Observable<Governorate> {
    return this.http.get<Governorate>(`${this.apiUrl}/GovernorateId?governorateId=${id}`);
  }

  create(data: Partial<Governorate>): Observable<Governorate> {
    return this.http.post<Governorate>(
      `${this.apiUrl}/CreateGovernorate`,
      data
    );
  }

  update(id: number, data: Partial<Governorate>): Observable<Governorate> {
    return this.http.put<Governorate>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
