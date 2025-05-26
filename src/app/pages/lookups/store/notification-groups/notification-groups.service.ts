import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { NotificationGroup } from './notification-groups.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class NotificationGroupsService {
  private baseUrl = `${environment.apiUrl}NotificationGroups`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<NotificationGroup[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: NotificationGroup[]; totalCount: number }>(
        `${this.baseUrl}/GetAllNotificationGroups`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching NotificationGroups:', err);
          return throwError(() => err);
        })
      );
  }


  getById(id: number): Observable<NotificationGroup> {
  return this.http.get<NotificationGroup>(`${this.baseUrl}/${id}`);
}

  create(payload: Omit<NotificationGroup, 'id'>): Observable<NotificationGroup> {
    return this.http.post<NotificationGroup>(
      `${this.baseUrl}/CreateNotificationGroup`,
      payload
    );
  }


  update(id: number, changes: Partial<NotificationGroup>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
