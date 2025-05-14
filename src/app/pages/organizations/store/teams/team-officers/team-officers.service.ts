import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TeamOfficer } from './team-officer.model';
import { environment } from '../../../../../../environments/environment';

interface PagedResponse<T> {
  items: T[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class TeamOfficersService {
  private api = `${environment.apiUrl}TeamOfficers`;

  constructor(private http: HttpClient) {}

  getAll(pageNumber?: number): Observable<PagedResponse<TeamOfficer>> {
    let params = new HttpParams();
    if (pageNumber != null) {
      params = params.set('pageNumber', pageNumber.toString());
    }
    return this.http.get<PagedResponse<TeamOfficer>>(
      `${this.api}/GetAllTeamOfficers`,
      { params }
    );
  }

  getHistory(): Observable<PagedResponse<TeamOfficer>> {
    return this.http.get<PagedResponse<TeamOfficer>>(
      `${this.api}/GetAllTeamOfficersHistory`
    );
  }

  getById(id: number): Observable<TeamOfficer> {
    return this.http.get<TeamOfficer>(
      `${this.api}/TeamOfficerId?id=${id}`
    );
  }

  create(data: Partial<TeamOfficer>): Observable<TeamOfficer> {
    return this.http.post<TeamOfficer>(
      `${this.api}/CreateTeamOfficer`,
      data
    );
  }

  update(id: number, data: Partial<TeamOfficer>): Observable<TeamOfficer> {
    return this.http.put<TeamOfficer>(`${this.api}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
  getByTeamId(teamId: number): Observable<TeamOfficer[]> {
    return this.http.get<TeamOfficer[]>(
      `${this.api}/GetTeamOfficersByTeamId?teamId=${teamId}`
    );
  }
}