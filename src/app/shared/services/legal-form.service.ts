import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LegalFormService {
  constructor(private http: HttpClient) {}

  getAllLegalForms(): Observable<any> {
    return this.http.get<any>(
      environment.apiUrl + `LegalForms/GetAllLegalForms`
    );
  }
  createLegalForm(LegalFormData: any): Observable<any> {
    return this.http.post<any>(
      environment.apiUrl + `LegalForms/CreateLegalForm`,
      LegalFormData
    );
  }

  updateLegalForm(LegalFormId: number, LegalFormData: any): Observable<any> {
    return this.http.put<any>(
      environment.apiUrl + `LegalForms/${LegalFormId}`,
      LegalFormData
    );
  }
  deleteLegalForm(id: number): Observable<void> {
    return this.http.delete<void>(environment.apiUrl + `LegalForms/${id}`);
  }
}
