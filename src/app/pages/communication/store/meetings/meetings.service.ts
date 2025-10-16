import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Meeting } from './meeting.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MeetingsService {
  private baseUrl = `${environment.apiUrl}Meetings`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Meeting[]> {
    return this.http
      .get<{ items: Meeting[]; totalCount: number }>(
        `${this.baseUrl}/GetAllMeetings`
      )
      .pipe(
        map((resp) => resp.items),
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<Meeting> {
    return this.http.get<Meeting>(`${this.baseUrl}/MeetingId?callId=${id}`);
  }

  getByClientId(id: number): Observable<Meeting> {
    return this.http.get<Meeting>(`${this.baseUrl}/ClientId?ClientId=${id}`);
  }

  create(payload: Omit<Meeting, 'id'>): Observable<Meeting> {
    return this.http.post<Meeting>(`${this.baseUrl}/CreateMeeting`, payload);
  }

  update(id: number, changes: Partial<Meeting>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
