// app/core/agreement-files/services/agreement-files.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AgreementFile,
  PagedAgreementFilesResponse,
} from './agreement-file.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AgreementFilesService {
  private readonly baseUrl = `${environment.apiUrl}AgreementFiles`;

  constructor(private http: HttpClient) {}

  getAll(pageNumber?: number) {
    let params = new HttpParams();
    if (pageNumber != null) params = params.set('pageNumber', pageNumber);
    return this.http.get<PagedAgreementFilesResponse>(
      `${this.baseUrl}/GetAllAgreementFiles`,
      { params }
    );
  }

  // If you’ll use it:
  getAllHistory(pageNumber?: number) {
    let params = new HttpParams();
    if (pageNumber != null) params = params.set('pageNumber', pageNumber);
    return this.http.get<PagedAgreementFilesResponse>(
      `${this.baseUrl}/GetAllAgreementFilesHistory`,
      { params }
    );
  }

  getByAgreementId(agreementId: number) {
    const params = new HttpParams().set('AgreementId', agreementId);
    return this.http.get<PagedAgreementFilesResponse>(
      `${this.baseUrl}/AgreementId`,
      { params }
    );
  }

  getByAgreementFileId(agreementFileId: number) {
    const params = new HttpParams().set('AgreementFileId', agreementFileId);
    return this.http.get<AgreementFile>(`${this.baseUrl}/AgreementFileId`, {
      params,
    });
  }

  create(args: {
    agreementId: number;
    documentTypeId: number;
    expiryDate: string;
    file: File;
  }) {
    console.log('agre', args);
    const params = new HttpParams()
      .set('AgreementId', args.agreementId)
      .set('DocumentTypeId', args.documentTypeId)
      .set('ExpiryDate', args.expiryDate);

    const form = new FormData();
    form.append('File', args.file);

    return this.http.post<AgreementFile>(
      `${this.baseUrl}/CreateAgreementFile`,
      form,
      {
        params,
      }
    );
  }

  update(
    id: number,
    payload: {
      id: number;
      agreementId: number;
      fileId: number;
      expiryDate: string;
    }
  ) {
    return this.http.put<AgreementFile>(`${this.baseUrl}/${id}`, payload);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
