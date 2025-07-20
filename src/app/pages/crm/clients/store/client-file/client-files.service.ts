import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ClientFile } from './client-file.model';
import { environment } from '../../../../../../environments/environment';

interface PagedResponse<T> {
  items: T[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class ClientFilesService {
  private api = `${environment.apiUrl}ClientFiles`;

  constructor(private http: HttpClient) {}

  getAll(pageNumber?: number): Observable<PagedResponse<ClientFile>> {
    let params = new HttpParams();
    if (pageNumber != null) {
      params = params.set('pageNumber', pageNumber.toString());
    }
    return this.http.get<PagedResponse<ClientFile>>(
      `${this.api}/GetAllClientFiles`,
      { params }
    );
  }

  getHistory(): Observable<PagedResponse<ClientFile>> {
    return this.http.get<PagedResponse<ClientFile>>(
      `${this.api}/GetAllClientFilesHistory`
    );
  }

  getById(id: number): Observable<ClientFile> {
    return this.http.get<ClientFile>(`${this.api}/ClientFileId?id=${id}`);
  }

  create(data: Partial<ClientFile>): Observable<ClientFile> {
    return this.http.post<ClientFile>(`${this.api}/CreateClientFile`, data);
  }

  update(id: number, data: Partial<ClientFile>): Observable<ClientFile> {
    return this.http.put<ClientFile>(`${this.api}/${id}`, data);
  }
  downloadByPathHex(pathHex: string): Observable<Blob> {
    // adjust the URL to whatever your backend expects
    const url = `${environment.redirectUri}${pathHex}`;
    return this.http.get(url, { responseType: 'blob' });
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
  getByClientId(clientId: number): Observable<ClientFile[]> {
    return this.http
      .get<{ items: ClientFile[]; totalCount: number }>(
        `${this.api}/ClientId?clientId=${clientId}`
      )
      .pipe(
        map((response) => response.items) // now callers just get ClientFile[]
      );
  }
}
