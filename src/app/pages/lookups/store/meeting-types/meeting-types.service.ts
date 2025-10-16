import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { MeetingType } from './meeting-type.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MeetingTypesService {
  private baseUrl = `${environment.apiUrl}MeetingTypes`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<MeetingType[]> {
    return this.http
      .get<{ items: MeetingType[]; totalCount: number }>(
        `${this.baseUrl}/GetAllMeetingTypes`
      )
      .pipe(
        map((resp) => resp.items), // ← pull off the `items` array here

        catchError((err) => {
          console.error('🚀 HTTP error fetching MeetingTypes:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<MeetingType> {
    return this.http.get<MeetingType>(`${this.baseUrl}/MeetingTypeId?id=${id}`);
  }

  create(payload: Omit<MeetingType, 'id'>): Observable<MeetingType> {
    return this.http.post<MeetingType>(
      `${this.baseUrl}/CreateMeetingType`,
      payload
    );
  }

  update(id: number, changes: Partial<MeetingType>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  //History management
  getAllHistory(): Observable<MeetingType[]> {
    return this.http
      .get<{ items: MeetingType[]; totalCount: number }>(
        `${this.baseUrl}/GetAllMeetingTypesHistory`
      )
      .pipe(
        map((resp) => resp.items), // ← pull off the `items` array here

        catchError((err) => {
          console.error('🚀 HTTP error fetching MeetingTypes:', err);
          return throwError(() => err);
        })
      );
  }
}
