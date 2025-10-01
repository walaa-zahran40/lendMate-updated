import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AgreementFile } from './agreement-file.model';
import { environment } from '../../../../../environments/environment';

interface PagedResponse<T> {
  items: T[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class AgreementFilesService {
  private api = `${environment.apiUrl}ClientsAddresses`;

  constructor(private http: HttpClient) {}

  getAll(pageNumber?: number): Observable<PagedResponse<AgreementFile>> {
    let params = new HttpParams();
    if (pageNumber != null) {
      params = params.set('pageNumber', pageNumber.toString());
    }
    return this.http.get<PagedResponse<AgreementFile>>(
      `${this.api}/GetAllAgreementFiles`,
      { params }
    );
  }

  getHistory(): Observable<PagedResponse<AgreementFile>> {
    return this.http.get<PagedResponse<AgreementFile>>(
      `${this.api}/GetAllAgreementFilesHistory`
    );
  }

  getById(id: number): Observable<AgreementFile> {
    return this.http.get<AgreementFile>(`${this.api}/Id?id=${id}`);
  }

  create(data: Partial<AgreementFile>): Observable<AgreementFile> {
    return this.http.post<AgreementFile>(
      `${this.api}/CreateAgreementFile`,
      data
    );
  }

  update(id: number, data: Partial<AgreementFile>): Observable<AgreementFile> {
    return this.http.put<AgreementFile>(`${this.api}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
  getByClientId(clientId: number): Observable<AgreementFile[]> {
    return this.http.get<AgreementFile[]>(
      `${this.api}/GetByClientId/${clientId}`
    );
  }
}
