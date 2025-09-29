import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { AgreementFile } from './agreement-file.model';

@Injectable({ providedIn: 'root' })
export class AgreementFilesService {
  private baseUrl = `${environment.apiUrl}AgreementFiles`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<AgreementFile[]> {
    return this.http
      .get<{ items: AgreementFile[]; totalCount: number }>(
        `${this.baseUrl}/GetAllAgreementFiles`
      )
      .pipe(
        map((resp) => resp.items), // ← pull off the `items` array here

        catchError((err) => {
          console.error('🚀 HTTP error fetching AgreementFiles:', err);
          return throwError(() => err);
        })
      );
  }
  //History management
  getAllHistory(): Observable<AgreementFile[]> {
    return this.http
      .get<{ items: AgreementFile[]; totalCount: number }>(
        `${this.baseUrl}/GetAllAgreementFilesHistory`
      )
      .pipe(
        map((resp) => resp.items), // ← pull off the `items` array here

        catchError((err) => {
          console.error('🚀 HTTP error fetching AgreementFiles:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<AgreementFile> {
    return this.http.get<AgreementFile>(
      `${this.baseUrl}/AgreementId?AgreementId=${id}`
    );
  }
  getByIdEdit(id: number): Observable<AgreementFile> {
    return this.http.get<AgreementFile>(
      `${this.baseUrl}/AgreementFileId?id=${id}`
    );
  }
  create(body: FormData | Partial<AgreementFile>) {
    return this.http.post<AgreementFile>(
      `${this.baseUrl}/CreateAgreementFile`,
      body
    );
  }

  update(id: number, body: FormData | Partial<AgreementFile>) {
    return this.http.put<void>(`${this.baseUrl}/${id}`, body);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
