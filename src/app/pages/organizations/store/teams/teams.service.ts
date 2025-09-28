import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Team } from './team.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TeamsService {
  private baseUrl = `${environment.apiUrl}Teams`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Team[]> {
    return this.http
      .get<{ items: Team[]; totalCount: number }>(`${this.baseUrl}/GetAllTeams`)
      .pipe(
        map((resp) => resp.items), // ← pull off the `items` array here

        catchError((err) => {
          console.error('🚀 HTTP error fetching Teams:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<Team> {
    return this.http.get<Team>(`${this.baseUrl}/TeamId?id=${id}`);
  }

  create(payload: Omit<Team, 'id'>): Observable<Team> {
    return this.http.post<Team>(`${this.baseUrl}/CreateTeam`, payload);
  }

  update(id: number, changes: Partial<Team>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
