import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { EvaluationInformation } from './evaluation-information.model';

@Injectable({ providedIn: 'root' })
export class EvaluationInformationService {
  private baseUrl = `${environment.apiUrl}AssetEvaluations`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<EvaluationInformation[]> {
    return this.http
      .get<{ items: EvaluationInformation[]; totalCount: number }>(
        `${this.baseUrl}/GetAllAssetEvaluations`
      )
      .pipe(
        map((resp) => resp.items), // ← pull off the `items` array here

        catchError((err) => {
          console.error('🚀 HTTP error fetching EvaluationInformation:', err);
          return throwError(() => err);
        })
      );
  }
  //History management
  getAllHistory(): Observable<EvaluationInformation[]> {
    return this.http
      .get<{ items: EvaluationInformation[]; totalCount: number }>(
        `${this.baseUrl}/GetAllAssetEvaluationsHistory`
      )
      .pipe(
        map((resp) => resp.items), // ← pull off the `items` array here

        catchError((err) => {
          console.error('🚀 HTTP error fetching EvaluationInformation:', err);
          return throwError(() => err);
        })
      );
  }
  // evaluationInformation.service.ts
  getById(id: number): Observable<EvaluationInformation> {
    const url = `${this.baseUrl}/AssetEvaluationId?assetEvaluationId=${id}`; // <- check endpoint name
    console.log('[EvaluationInformationService] GET', url);
    return this.http.get<any>(url).pipe(
      tap((raw) =>
        console.log('[EvaluationInformationService] raw response:', raw)
      ),
      // 🔧 If your API wraps the entity, unwrap it here:
      map((raw) => {
        // common patterns – adjust to your backend
        if (raw?.item) return raw.item; // { item: EvaluationInformation }
        if (raw?.data) return raw.data; // { data: EvaluationInformation }
        if (Array.isArray(raw)) return raw[0]; // [EvaluationInformation]
        return raw as EvaluationInformation; // plain EvaluationInformation
      }),
      tap((entity) =>
        console.log(
          '[EvaluationInformationService] mapped EvaluationInformation:',
          entity
        )
      ),
      catchError((err) => {
        console.error('[EvaluationInformationService] GET FAIL', err);
        return throwError(() => err);
      })
    );
  }

  create(
    payload: Omit<EvaluationInformation, 'id'>
  ): Observable<EvaluationInformation> {
    return this.http.post<EvaluationInformation>(
      `${this.baseUrl}/CreateAssetEvaluation`,
      payload
    );
  }

  update(
    id: number,
    changes: Partial<EvaluationInformation>
  ): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
