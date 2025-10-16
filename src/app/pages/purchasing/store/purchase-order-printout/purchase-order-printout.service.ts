import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PurchaseOrderPrintOutService {
  private readonly baseUrl =
    'https://lendmate.corplease.com.eg:7070/api/PurchaseOrderPrintOut';

  constructor(private http: HttpClient) {}

  /**
   * Fetches the purchase order PDF in binary (Blob) format.
   * @param PurchaseOrderId The ID of the  purchase order to print.
   * @returns Observable<Blob> representing the PDF file.
   */
  printOutInWordFormatByLang(
    purchaseOrderId: number,
    lang: string
  ): Observable<HttpResponse<Blob>> {
    const isAr = (lang || '').toLowerCase().startsWith('ar');

    // ✅ Adjust these segment names to match your API:
    // e.g. /PrintOutInWordFormatAr/{id} and /PrintOutInWordFormatEn/{id}
    const url = `${this.baseUrl}/${
      isAr ? 'PrintOutInWordFormatAr' : 'PrintOut'
    }/${purchaseOrderId}`;

    return this.http.get(url, {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept:
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Accept-Language': isAr ? 'ar' : 'en', // optional, if your API uses this
      }),
    });
  }
}
