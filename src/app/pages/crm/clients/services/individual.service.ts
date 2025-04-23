import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Individual } from '../store/individual/individual.state';
export interface Paginated<T> {
  items: T[];
  totalCount: number;
}

@Injectable({
  providedIn: 'root',
})
export class IndividualService {
  private baseUrl = 'https://192.168.10.67:7070/api';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Paginated<Individual>> {
    return this.http.get<Paginated<Individual>>(
      `${this.baseUrl}/ClientIndividualBusinessDetails/GetAllClientIndividualBusinessDetails`
    );
  }
  getById(id: number) {
    return this.http.get<Individual>(
      `${this.baseUrl}/ClientIndividualBusinessDetails/${id}`
    );
  }
  create(body: Individual) {
    return this.http.post<Individual>(
      `${this.baseUrl}/ClientIndividualBusinessDetails/CreateClientIndividualBusinessDetails`,
      body
    );
  }
  update(id: number, body: Partial<Individual>) {
    return this.http.put<Individual>(
      `${this.baseUrl}/ClientIndividualBusinessDetails/${id}`,
      body
    );
  }
  delete(id: number) {
    return this.http.delete<void>(
      `${this.baseUrl}/ClientIndividualBusinessDetails/${id}`
    );
  }
}
