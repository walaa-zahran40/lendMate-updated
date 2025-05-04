import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Document } from '../../../../../shared/interfaces/document.interface';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DocumentsService {
  private baseUrl = `${environment.apiUrl}ClientFiles/`;

  constructor(private http: HttpClient) {}

  getAllClientFiles(): Observable<Document[]> {
    return this.http
      .get<{ items: Document[]; totalCount: number }>(
        `${this.baseUrl}GetAllClientFiles`
      )
      .pipe(
        // unwrap the items array
        map((response) => response.items)
      );
  }
  getClientFileById(id: number): Observable<Document> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get<Document>(`${this.baseUrl}ClientFileId`, { params });
  }

  getClientFilesByClientId(clientId: number): Observable<Document[]> {
    const params = new HttpParams().set('clientId', clientId.toString());
    return this.http
      .get<{ items: Document[]; totalCount: number }>(
        `${this.baseUrl}ClientId`,
        { params }
      )
      .pipe(map((response) => response.items));
  }
  uploadClientFile(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}CreateClientFile`, formData);
  }

  deleteClientFile(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${id}`);
  }
  updateClientFile(id: number, payload: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}${id}`, payload);
  }
}
