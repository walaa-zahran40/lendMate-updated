import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import * as ClientsActions from './clients.actions';
import { Client } from '../../../../../shared/interfaces/client.interface';
import { ClientService } from '../../../../../shared/services/client.service';
import { Router } from '@angular/router';
@Injectable()
export class ClientsEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private clientService: ClientService,
    private router: Router
  ) {}
  createClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientsActions.createClient),
      switchMap(({ payload }) =>
        this.clientService.createClient(payload).pipe(
          map((response) =>
            ClientsActions.createClientSuccess({ client: response })
          ),
          catchError((error) =>
            of(ClientsActions.createClientFailure({ error }))
          )
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
  loadClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientsActions.loadClient),
      mergeMap((action) =>
        this.clientService.getClientById(action.clientId).pipe(
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
      )
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
