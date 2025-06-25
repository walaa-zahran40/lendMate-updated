import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MeetingCalendarItem } from './meeting-calendar-item.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MeetingsService {
  private baseUrl = `${environment.apiUrl}Meetings`;

  constructor(private http: HttpClient) {}

  getUserCalendar(): Observable<MeetingCalendarItem[]> {
    return this.http.get<MeetingCalendarItem[]>(
      `${this.baseUrl}/GetUserCalender`
    );
  }
}
