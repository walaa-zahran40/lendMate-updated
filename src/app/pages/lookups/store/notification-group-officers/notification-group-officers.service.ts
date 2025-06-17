import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { NotificationGroupOfficer } from './notification-group-officer.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class NotificationGroupOfficersService {
  private baseUrl = `${environment.apiUrl}NotificationGroupOfficers`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<NotificationGroupOfficer[]> {
    console.log('🚀 Service: GET …');
    return this.http
      .get<{ items: NotificationGroupOfficer[]; totalCount: number }>(
        `${this.baseUrl}/GetAllNotificationGroupOfficers`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error(
            '🚀 HTTP error fetching NotificationGroupOfficers:',
            err
          );
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<NotificationGroupOfficer> {
    return this.http.get<NotificationGroupOfficer>(
      `${this.baseUrl}/NotificationGroupOfficerId?id=${id}`
    );
  }

  create(
    payload: Omit<NotificationGroupOfficer, 'id'>
  ): Observable<NotificationGroupOfficer> {
    return this.http.post<NotificationGroupOfficer>(
      `${this.baseUrl}/CreateNotificationGroupOfficer`,
      payload
    );
  }

  update(
    id: number,
    changes: Partial<NotificationGroupOfficer>
  ): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  //History management
  getAllHistory(): Observable<NotificationGroupOfficer[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: NotificationGroupOfficer[]; totalCount: number }>(
        `${this.baseUrl}/GetAllNotificationGroupOfficersHistroy`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error(
            '🚀 HTTP error fetching NotificationGroupOfficers:',
            err
          );
          return throwError(() => err);
        })
      );
  }
}
