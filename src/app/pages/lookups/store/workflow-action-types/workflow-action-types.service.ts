import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { WorkflowActionType } from './workflow-action-type.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class WorkflowActionTypesService {
  private baseUrl = `${environment.apiUrl}WorkflowActionTypes`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<WorkflowActionType[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: WorkflowActionType[]; totalCount: number }>(
        `${this.baseUrl}/GetAllWorkflowActionTypes`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching WorkflowActionTypes:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<WorkflowActionType> {
    return this.http.get<WorkflowActionType>(
      `${this.baseUrl}/WorkflowActionTypeId?clientStatusActionId=${id}`
    );
  }

  create(
    payload: Omit<WorkflowActionType, 'id'>
  ): Observable<WorkflowActionType> {
    return this.http.post<WorkflowActionType>(
      `${this.baseUrl}/CreateWorkflowActionType`,
      payload
    );
  }

  update(id: number, changes: Partial<WorkflowActionType>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  //History management
  getAllHistory(): Observable<WorkflowActionType[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: WorkflowActionType[]; totalCount: number }>(
        `${this.baseUrl}/GetAllWorkflowActionTypesHistory`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching WorkflowActionTypes:', err);
          return throwError(() => err);
        })
      );
  }
}
