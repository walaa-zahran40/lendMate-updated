import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LegalFormLawService {
  constructor(private http: HttpClient) {}

  getAllLegalFormLaws(): Observable<any> {
    return this.http.get<any>(
      environment.apiUrl + `LegalFormLaws/GetAllLegalFormLaws`
    );
  }
  createLegalFormLaw(LegalFormLawData: any): Observable<any> {
    return this.http.post<any>(
      environment.apiUrl + `LegalFormLaws/CreateLegalFormLaw`,
      LegalFormLawData
    );
  }

  updateLegalFormLaw(
    LegalFormLawId: number,
    LegalFormLawData: any
  ): Observable<any> {
    return this.http.put<any>(
      environment.apiUrl + `LegalFormLaws/${LegalFormLawId}`,
      LegalFormLawData
    );
  }
  deleteLegalFormLaw(id: number): Observable<void> {
    return this.http.delete<void>(environment.apiUrl + `LegalFormLaws/${id}`);
  }
}
