import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactPersonsResponse, ContactPerson } from './contact-person.model';

@Injectable({ providedIn: 'root' })
export class ContactPersonService {
  private baseUrl = '/api/ContactPersons';

  constructor(private http: HttpClient) {}

  getAll(page: number): Observable<ContactPersonsResponse> {
    return this.http.get<ContactPersonsResponse>(
      `${this.baseUrl}/GetAllContactPersons`,
      { params: { pageNumber: page } }
    );
  }

  getById(id: number): Observable<ContactPerson> {
    return this.http.get<ContactPerson>(`${this.baseUrl}/${id}`);
  }

  create(data: Partial<ContactPerson>): Observable<ContactPerson> {
    return this.http.post<ContactPerson>(
      `${this.baseUrl}/CreateContactPerson`,
      data
    );
  }

  update(
    id: number,
    changes: Partial<ContactPerson>
  ): Observable<ContactPerson> {
    return this.http.put<ContactPerson>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
