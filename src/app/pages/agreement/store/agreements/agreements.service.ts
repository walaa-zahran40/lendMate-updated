import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  LeasingAgreement,
  PagedHistory,
  CreateLeasingAgreementRequest,
  WorkflowActionRequest,
} from './agreement.model';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LeasingAgreementsService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}LeasingAgreements`;

  getAll() {
    return this.http.get<LeasingAgreement[]>(
      `${this.base}/GetAllLeasingAgreements`
    );
  }

  getHistory(pageNumber: number) {
    return this.http.get<PagedHistory<LeasingAgreement>>(
      `${this.base}/GetAllLeasingAgreementsHistory/${pageNumber}`
    );
  }

  getById(id: number) {
    // If the real API is /{id}, change here accordingly.
    // Provided path was "/LeasingAgreementId" — mapping to /{id} below for practicality:
    return this.http.get<LeasingAgreement>(
      `${this.base}/LeasingAgreementId?leasingAgreement=${id}`
    );
  }

  getByClientId(clientId: number) {
    return this.http.get<LeasingAgreement[]>(
      `${this.base}/GetByClientId/${clientId}`
    );
  }

  create(payload: CreateLeasingAgreementRequest) {
    return this.http.post<LeasingAgreement>(
      `${this.base}/CreateLeasingAgreement`,
      payload
    );
  }

  update(id: number, changes: Partial<CreateLeasingAgreementRequest>) {
    return this.http.put<LeasingAgreement>(`${this.base}/${id}`, changes);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.base}/${id}`);
  }

  workflowAction(request: WorkflowActionRequest) {
    return this.http.post<LeasingAgreement>(
      `${this.base}/UpdateWorkFlowAction`,
      request
    );
  }
}
