// src/app/features/financial-forms/financial-forms.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError, tap } from 'rxjs';
import { FinancialForm } from './financial-form.model';
import { environment } from '../../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FinancialFormsService {
  private baseUrl = `${environment.apiUrl}MandateFinancialActivities`;

  constructor(private http: HttpClient) {}

  /** GET all (paginated) */
  getAll(pageNumber?: number): Observable<FinancialForm[]> {
    // Note: your API signature is /GetAllMandateFinancialActivities?pageNumber=...
    let url = `${this.baseUrl}/GetAllMandateFinancialActivities`;
    if (pageNumber != null) {
      url += `?pageNumber=${pageNumber}`;
    }
    return this.http
      .get<{ items: FinancialForm[]; totalCount: number }>(url)
      .pipe(
        tap((resp) => console.log('HTTP GET All response wrapper:', resp)),
        map((resp) => resp.items),
        tap((items) => console.log('Mapped items:', items)),
        catchError((err) => {
          console.error('HTTP error fetching FinancialForms:', err);
          return throwError(() => err);
        })
      );
  }

  /** GET by primary ID */
  getById(id: number): Observable<FinancialForm> {
    return this.http
      .get<FinancialForm>(`${this.baseUrl}/MandateFinancialActivityId?id=${id}`)
      .pipe(
        tap((entity) => console.log('HTTP GET by Id returned:', entity)),
        catchError((err) => {
          console.error('Error in getById:', err);
          return throwError(() => err);
        })
      );
  }

  /** GET by leasingMandateId */
  getByLeasingId(leasingMandateId: number): Observable<FinancialForm> {
    return this.http
      .get<FinancialForm>(
        `${this.baseUrl}/LeasingMandateId?id=${leasingMandateId}`
      )
      .pipe(
        tap((entity) =>
          console.log('HTTP GET by LeasingMandateId returned:', entity)
        ),
        catchError((err) => {
          console.error('Error in getByLeasingId:', err);
          return throwError(() => err);
        })
      );
  }

  /** POST create */
  create(payload: Omit<FinancialForm, 'id'>): Observable<FinancialForm> {
    return this.http
      .post<FinancialForm>(
        `${this.baseUrl}/CreateMandateFinancialActivity`,
        payload
      )
      .pipe(
        tap((entity) => console.log('HTTP POST Create returned:', entity)),
        catchError((err) => {
          console.error('Error in create:', err);
          return throwError(() => err);
        })
      );
  }

  /** POST calculate */
  calculate(payload: Omit<FinancialForm, 'id'>): Observable<FinancialForm> {
    return this.http
      .post<FinancialForm>(
        `${this.baseUrl}/CalculateMandateFinancialActivity`,
        payload
      )
      .pipe(
        tap((entity) => console.log('HTTP POST Calculate returned:', entity)),
        catchError((err) => {
          console.error('Error in calculate:', err);
          return throwError(() => err);
        })
      );
  }

  /** PUT update by id */
  update(id: number, changes: Partial<FinancialForm>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes).pipe(
      tap(() => console.log(`HTTP PUT Update id=${id} succeeded`)),
      catchError((err) => {
        console.error('Error in update:', err);
        return throwError(() => err);
      })
    );
  }

  /** DELETE by id */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      tap(() => console.log(`HTTP DELETE id=${id} succeeded`)),
      catchError((err) => {
        console.error('Error in delete:', err);
        return throwError(() => err);
      })
    );
  }
}
