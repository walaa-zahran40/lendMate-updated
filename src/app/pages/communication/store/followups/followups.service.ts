import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Followup } from './followup.model';
import { environment } from '../../../../../environments/environment';

interface PagedResponse<T> {
  items: T[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class FollowupsService {
  private api = `${environment.apiUrl}Followups`;

  constructor(private http: HttpClient) {}

  getAll(pageNumber?: number): Observable<PagedResponse<Followup>> {
    let params = new HttpParams();
    if (pageNumber != null) {
      params = params.set('pageNumber', pageNumber.toString());
    }
    return this.http.get<PagedResponse<Followup>>(
      `${this.api}/GetAllFollowups`,
      { params }
    );
  }

  getHistory(): Observable<PagedResponse<Followup>> {
    return this.http.get<PagedResponse<Followup>>(
      `${this.api}/GetAllFollowupsHistory`
    );
  }

  getById(id: number): Observable<Followup> {
  return this.http.get<Followup>(`${this.api}/FollowupId`, {
    params: { id: id.toString() }
  });
}


  create(data: Partial<Followup>): Observable<Followup> {
    return this.http.post<Followup>(
      `${this.api}/CreateFollowup`,
      data
    );
  }

  update(id: number, data: Partial<Followup>): Observable<Followup> {
    return this.http.put<Followup>(`${this.api}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
  getByCommunicationId(communicationId: number): Observable<Followup[]> {
  return this.http.get<Followup[]>(
    `${this.api}/communicationId`,
    { params: { communicationId: communicationId.toString() } }
  );
}
}

