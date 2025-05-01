import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BusinessLine } from './businessLine.model';

interface PagedResponse<T> {
  items: T[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class BusinessLinesService {
  private api = 'https://192.168.10.67:7070/api/BusinessLines';

  constructor(private http: HttpClient) {}

  getAll(pageNumber?: number): Observable<PagedResponse<BusinessLine>> {
    let params = new HttpParams();
    if (pageNumber != null) {
      params = params.set('pageNumber', pageNumber.toString());
    }
    return this.http.get<PagedResponse<BusinessLine>>(
      `${this.api}/GetAllBusinessLines`,
      { params }
    );
  }

  getHistory(): Observable<PagedResponse<BusinessLine>> {
    return this.http.get<PagedResponse<BusinessLine>>(
      `${this.api}/GetAllBusinessLinesHistory`
    );
  }

  getById(id: number): Observable<BusinessLine> {
    return this.http.get<BusinessLine>(`${this.api}/BusinessLineId?id=${id}`);
  }

  create(data: Partial<BusinessLine>): Observable<BusinessLine> {
    return this.http.post<BusinessLine>(`${this.api}/CreateBusinessLine`, data);
  }

  update(id: number, data: Partial<BusinessLine>): Observable<BusinessLine> {
    return this.http.put<BusinessLine>(`${this.api}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
