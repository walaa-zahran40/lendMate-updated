import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as DocumentTypeActions from './document-type.actions';
import { DocumentTypeService } from './document-type.service';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class DocumentTypeEffects {
  constructor(
    private actions$: Actions,
    private service: DocumentTypeService
  ) {}

  loadDocumentTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DocumentTypeActions.loadDocumentTypes),
      mergeMap(() => {
        console.log('[Effect] loadDocumentTypes triggered'); // 💡 Effect trigger log

        return this.service.getAll().pipe(
          map((res: any) => {
            console.log('[Effect] API response:', res); // 💡 API raw response
            console.log('[Effect] Document items:', res.items); // 💡 Just the document list
            return DocumentTypeActions.loadDocumentTypesSuccess({
              items: res.items,
            });
          }),
          catchError((error) => {
            console.error('[Effect] API error:', error); // 💥 If API fails
            return of(DocumentTypeActions.loadDocumentTypesFailure({ error }));
          })
        );
      })
    )
  );
}
