import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DocumentTypeService {
  private baseUrl = 'https://192.168.10.67:7070/api';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}/DocumentTypes/GetAllDocumentTypes`);
  }

  create(document: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/CreateDocumentType`, document);
  }

  update(id: number, document: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, document);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
