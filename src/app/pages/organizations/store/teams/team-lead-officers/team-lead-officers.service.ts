import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TeamLeadOfficer } from './team-lead-officer.model';
import { environment } from '../../../../../../environments/environment';

interface PagedResponse<T> {
  items: T[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class TeamLeadOfficersService {
  private api = `${environment.apiUrl}TeamLeadOfficers`;

  constructor(private http: HttpClient) {}

  getAll(pageNumber?: number): Observable<PagedResponse<TeamLeadOfficer>> {
    let params = new HttpParams();
    if (pageNumber != null) {
      params = params.set('pageNumber', pageNumber.toString());
    }
    return this.http.get<PagedResponse<TeamLeadOfficer>>(
      `${this.api}/GetAllTeamLeadOfficers`,
      { params }
    );
  }

  getHistory(): Observable<PagedResponse<TeamLeadOfficer>> {
    return this.http.get<PagedResponse<TeamLeadOfficer>>(
      `${this.api}/GetAllTeamLeadOfficersHistory`
    );
  }

  getById(id: number): Observable<TeamLeadOfficer> {
    return this.http.get<TeamLeadOfficer>(
      `${this.api}/TeamLeadOfficerId?id=${id}`
    );
  }

  create(data: Partial<TeamLeadOfficer>): Observable<TeamLeadOfficer> {
    return this.http.post<TeamLeadOfficer>(
      `${this.api}/CreateTeamLeadOfficer`,
      data
    );
  }

  update(id: number, data: Partial<TeamLeadOfficer>): Observable<TeamLeadOfficer> {
    return this.http.put<TeamLeadOfficer>(`${this.api}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
  getByTeamId(teamId: number): Observable<TeamLeadOfficer[]> {
    return this.http.get<TeamLeadOfficer[]>(
      `${this.api}/GetTeamLeadOfficersByTeamId?teamId=${teamId}`
    );
  }
}
