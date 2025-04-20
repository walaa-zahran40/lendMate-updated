import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  catchError,
  exhaustMap,
  map,
  mergeMap,
  of,
  switchMap,
  tap,
} from 'rxjs';
import * as ClientsActions from './clients.actions';
import { Client } from '../../../../../shared/interfaces/client.interface';
import { ClientService } from '../../../../../shared/services/client.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
@Injectable()
export class ClientsEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private clientService: ClientService,
    private router: Router,
    private messageService: MessageService
  ) {}
  createClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientsActions.createClient),
      switchMap(({ payload }) =>
        this.clientService.createClient(payload).pipe(
          tap((response) => {
            console.log('✅ Client Created Successfully:', response);
          }),
          map((response) =>
            ClientsActions.createClientSuccess({ client: response })
          ),
          catchError((error: HttpErrorResponse) => {
            const validationErrors = error?.error?.errors;

            if (validationErrors) {
              Object.entries(validationErrors).forEach(
                ([key, value]: [string, any]) => {
                  const trimmedPath = key
                    .replace(/\[\d+\]$/, '')
                    .replace(/^\$\./, '');

                  this.messageService.add({
                    severity: 'error',
                    summary: `Validation: ${trimmedPath}`,
                    detail: '',
                    life: 4000, // popup disappears after 4 seconds
                  });
                }
              );
            }

            return of(ClientsActions.createClientFailure({ error }));
          })
        )
      )
    )
  );

  loadClients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientsActions.loadClients),
      mergeMap(() =>
        this.http
          .get<{ items: Client[] }>(
            'https://192.168.10.67:7070/api/Clients/GetAllClients'
          )
          .pipe(
            map((response) =>
              ClientsActions.loadClientsSuccess({ clients: response.items })
            ),
            catchError((error) =>
              of(ClientsActions.loadClientsFailure({ error }))
            )
          )
      )
    )
  );
  // Effect to load client for editing
  // Better:
  loadClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientsActions.loadClient),
      exhaustMap(({ clientId }) =>
        this.clientService.getClientById(clientId).pipe(
          map((client) => ClientsActions.loadClientSuccess({ client })),
          catchError((error) => of(ClientsActions.loadClientFailure({ error })))
        )
      )
    )
  );

  // Effect to update the client
  updateClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientsActions.updateClient),
      mergeMap((action) =>
        this.clientService.updateClient(action.client).pipe(
          map((updatedClient) =>
            ClientsActions.updateClientSuccess({ client: updatedClient })
          ),
          catchError((error) =>
            of(ClientsActions.updateClientFailure({ error }))
          )
        )
      ),
      tap(() => this.router.navigate(['/crm/clients/view-clients']))
    )
  );
  createClientSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ClientsActions.createClientSuccess),
        tap(() => this.router.navigate(['/crm/clients/view-clients']))
      ),
    { dispatch: false }
  );
  deleteClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientsActions.deleteClient),
      tap(({ clientId }) => console.log('Deleting client ID:', clientId)),
      switchMap(({ clientId }) =>
        this.clientService.deleteClient(clientId).pipe(
          map(() => ClientsActions.deleteClientSuccess({ clientId })),
          catchError((error) => {
            console.error('Delete failed:', error);
            return of(ClientsActions.deleteClientFailure({ error }));
          })
        )
      )
    )
  );
}
