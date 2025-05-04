import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientIdentityType } from './client-identity-type.model';
import { environment } from '../../../../../../environments/environment';

interface PagedResult<T> {
  items: T[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class ClientIdentityTypesService {
  private base = `${environment.apiUrl}ClientIdentityTypes`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<PagedResult<ClientIdentityType>> {
    return this.http.get<PagedResult<ClientIdentityType>>(
      `${this.base}/GetAllClientIdentityTypes`
    );
  }
}
