import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  AgreementFile,
  LeasingAgreementFileHistory,
} from './agreement-file.model';

@Injectable({ providedIn: 'root' })
export class LeasingAgreementFilesService {
  private readonly baseUrl =
    'https://lendmate.corplease.com.eg:7070/api/AgreementFiles';

  constructor(private http: HttpClient) {}

  getAll(): Observable<AgreementFile[]> {
    return this.http.get<AgreementFile[]>(
      `${this.baseUrl}/GetAllLeasingAgreementFiles`
    );
  }

  getAllHistory(): Observable<LeasingAgreementFileHistory[]> {
    return this.http.get<LeasingAgreementFileHistory[]>(
      `${this.baseUrl}/GetAllLeasingAgreementFilesHistory`
    );
  }

  getById(id: number): Observable<AgreementFile> {
    const params = new HttpParams().set('id', id);
    return this.http.get<AgreementFile>(`${this.baseUrl}/AgreementFileId`, {
      params,
    });
  }

  getByLeasingAgreementId(
    leasingAgreementId: number
  ): Observable<AgreementFile[]> {
    const params = new HttpParams().set('AgreementId', leasingAgreementId);
    return this.http.get<AgreementFile[]>(`${this.baseUrl}/AgreementId`, {
      params,
    });
  }

  create(payload: Omit<AgreementFile, 'id'>): Observable<AgreementFile> {
    return this.http.post<AgreementFile>(
      `${this.baseUrl}/CreateAgreementFile`,
      payload
    );
  }

  update(
    id: number,
    payload: Partial<AgreementFile>
  ): Observable<AgreementFile> {
    return this.http.put<AgreementFile>(`${this.baseUrl}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
