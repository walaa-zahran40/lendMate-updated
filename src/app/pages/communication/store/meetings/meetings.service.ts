import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Meeting } from './meeting.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MeetingsService {
  private baseUrl = `${environment.apiUrl}Meetings`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Meeting[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: Meeting[]; totalCount: number }>(
        `${this.baseUrl}/GetAllMeetings`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching Meetings:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<Meeting> {
    return this.http.get<Meeting>(`${this.baseUrl}/MeetingId?callId=${id}`);
  }

  create(payload: Omit<Meeting, 'id'>): Observable<Meeting> {
    return this.http.post<Meeting>(
      `${this.baseUrl}/CreateMeeting`,
      payload
    );
  }

  update(id: number, changes: Partial<Meeting>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
