import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MandatePrintOutService {
  private readonly baseUrl =
    'https://lendmate.corplease.com.eg:7070/api/MandatePrintOut';

  constructor(private http: HttpClient) {}

  /**
   * Fetch mandate as PDF, choosing API route based on language.
   * Keeps officerId/contactPersonId as query params.
   *
   * Adjust endpoint names below to match your backend:
   *   - PrintOutInPdfFormatAr
   *   - PrintOutInPdfFormatEn
   */
  printOutInPdfFormatByLang(
    leasingMandateId: number,
    lang: string,
    officerId?: number,
    contactPersonId?: number
  ): Observable<Blob> {
    const isAr = (lang || '').toLowerCase().startsWith('ar');

    // 👉 If your API uses different segment names, rename them here.
    const endpoint = isAr ? 'PrintOutInPdfFormatArabic' : 'PrintOutInPdfFormat';
    const url = `${this.baseUrl}/${endpoint}/${leasingMandateId}`;

    let params = new HttpParams();
    if (officerId != null) params = params.set('officerId', String(officerId));
    if (contactPersonId != null)
      params = params.set('contactPersonId', String(contactPersonId));

    return this.http.get(url, {
      params,
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/pdf',
        'Accept-Language': isAr ? 'ar' : 'en', // optional; keep if your API reads it
      }),
    });
  }

  // 🟡 Alternative if you have a SINGLE endpoint and the server uses a query param:
  // printOutInPdfFormatByLang(
  //   leasingMandateId: number,
  //   lang: string,
  //   officerId?: number,
  //   contactPersonId?: number
  // ): Observable<Blob> {
  //   const isAr = (lang || '').toLowerCase().startsWith('ar');
  //   const url = `${this.baseUrl}/PrintOutInPdfFormat/${leasingMandateId}`;
  //   let params = new HttpParams().set('lang', isAr ? 'ar' : 'en');
  //   if (officerId != null) params = params.set('officerId', String(officerId));
  //   if (contactPersonId != null) params = params.set('contactPersonId', String(contactPersonId));
  //   return this.http.get(url, {
  //     params,
  //     responseType: 'blob',
  //     headers: new HttpHeaders({ Accept: 'application/pdf' }),
  //   });
  // }
}
