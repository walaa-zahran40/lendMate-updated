import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientIdentityType } from './client-identity-type.model';

interface PagedResult<T> {
  items: T[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class ClientIdentityTypesService {
  private base = 'https://192.168.10.67:7070/api/ClientIdentityTypes';

  constructor(private http: HttpClient) {}

  getAll(): Observable<PagedResult<ClientIdentityType>> {
    return this.http.get<PagedResult<ClientIdentityType>>(
      `${this.base}/GetAllClientIdentityTypes`
    );
  }
}
