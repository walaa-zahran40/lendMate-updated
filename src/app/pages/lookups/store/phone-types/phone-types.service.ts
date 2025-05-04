import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { PhoneType } from './phone-type.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PhoneTypesService {
  private baseUrl = `${environment.apiUrl}PhoneTypes`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<PhoneType[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: PhoneType[]; totalCount: number }>(
        `${this.baseUrl}/GetAllPhoneTypes`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching PhoneTypes:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<PhoneType> {
    return this.http.get<PhoneType>(
      `${this.baseUrl}/PhoneTypeId?phoneTypeId=${id}`
    );
  }

  create(payload: Omit<PhoneType, 'id'>): Observable<PhoneType> {
    return this.http.post<PhoneType>(
      `${this.baseUrl}/CreatePhoneType`,
      payload
    );
  }

  update(id: number, changes: Partial<PhoneType>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
