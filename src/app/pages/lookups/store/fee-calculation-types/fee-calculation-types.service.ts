import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FeeCalculationType } from './fee-calculation-types.model';

@Injectable({ providedIn: 'root' })
export class FeeCalculationTypesService {
  private baseUrl = '/api/FeeCalculationTypes';

  constructor(private http: HttpClient) {}

  getAll(): Observable<FeeCalculationType> {
    return this.http.get<FeeCalculationType>(
      `${this.baseUrl}/GetAllFeeCalculationTypes`
    );
  }

  getById(id: number): Observable<FeeCalculationType> {
    return this.http.get<FeeCalculationType>(
      `${this.baseUrl}/FeeCalculationTypeId`,
      { params: new HttpParams().set('FeeCalculationTypeId', id.toString()) }
    );
  }

  create(
    payload: Omit<FeeCalculationType, 'id'>
  ): Observable<FeeCalculationType> {
    return this.http.post<FeeCalculationType>(
      `${this.baseUrl}/CreateFeeCalculationType`,
      payload
    );
  }

  update(id: number, changes: Partial<FeeCalculationType>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
