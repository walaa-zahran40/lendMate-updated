import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Product } from './product.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private baseUrl = `${environment.apiUrl}Products`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    console.log('🚀 Service: calling GET …');
    return this.http
      .get<{ items: Product[]; totalCount: number }>(
        `${this.baseUrl}/GetAllProducts`
      )
      .pipe(
        tap((resp) => console.log('🚀 HTTP response wrapper:', resp)),
        map((resp) => resp.items), // ← pull off the `items` array here
        tap((items) => console.log('🚀 Mapped items:', items)),
        catchError((err) => {
          console.error('🚀 HTTP error fetching Products:', err);
          return throwError(() => err);
        })
      );
  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/ProductId?id=${id}`);
  }

  create(payload: Omit<Product, 'id'>): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/CreateProduct`, payload);
  }

  update(id: number, changes: Partial<Product>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
