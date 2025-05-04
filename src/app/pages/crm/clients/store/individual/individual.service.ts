import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Individual } from './individual.state';
import { environment } from '../../../../../../environments/environment';
export interface Paginated<T> {
  items: T[];
  totalCount: number;
}

@Injectable({
  providedIn: 'root',
})
export class IndividualService {
  private baseUrl = `${environment.apiUrl}ClientIndividualBusinessDetails`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Paginated<Individual>> {
    return this.http.get<Paginated<Individual>>(
      `${this.baseUrl}/ClientIndividualBusinessDetails/GetAllClientIndividualBusinessDetails`
    );
  }
  getById(id: number): Observable<Individual> {
    return this.http.get<Individual>(`${this.baseUrl}/${id}`);
  }
  create(body: Partial<Individual>) {
    return this.http.post<Individual>(
      `${this.baseUrl}/CreateClientIndividualBusinessDetails`,
      body
    );
  }
  update(id: number, body: Partial<Individual>): Observable<Individual> {
    return this.http.put<Individual>(`${this.baseUrl}/${id}`, body);
  }
  delete(id: number) {
    return this.http.delete<void>(
      `${this.baseUrl}/ClientIndividualBusinessDetails/${id}`
    );
  }
}
