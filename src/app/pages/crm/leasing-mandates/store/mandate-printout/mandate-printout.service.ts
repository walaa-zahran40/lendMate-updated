import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MandatePrintOutService {
  private readonly baseUrl = 'https://192.168.10.67:7070/api/MandatePrintOut';

  constructor(private http: HttpClient) {}

  /**
   * Fetches the mandate PDF in binary (Blob) format.
   * @param leasingMandateId The ID of the leasing mandate to print.
   * @param officerId       Optional officer ID to include in query.
   * @param contactPersonId Optional contact person ID to include in query.
   * @returns Observable<Blob> representing the PDF file.
   */
  printOutInPdfFormat(
    leasingMandateId: number,
    officerId?: number,
    contactPersonId?: number
  ): Observable<Blob> {
    let params = new HttpParams();
    if (officerId != null) {
      params = params.set('officerId', officerId.toString());
    }
    if (contactPersonId != null) {
      params = params.set('contactPersonId', contactPersonId.toString());
    }

    const url = `${this.baseUrl}/PrintOutInPdfFormat/${leasingMandateId}`;

    return this.http.get(url, {
      params,
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/pdf',
      }),
    });
  }
}
