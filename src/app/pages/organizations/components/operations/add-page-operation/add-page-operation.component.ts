import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, distinctUntilChanged } from 'rxjs';
import { PageOperation } from '../../../store/page-operations/page-operation.model';
import { PageOperationsFacade } from '../../../store/page-operations/page-operations.facade';
import { select, Store } from '@ngrx/store';
import { selectAllOperations } from '../../../store/operations/operations.selectors';
import { selectAllPages } from '../../../store/pages/pages.selectors';
import { loadAllOperations } from '../../../store/operations/operations.actions';
import { loadAllPages } from '../../../store/pages/pages.actions';

@Component({
  selector: 'app-add-page-operation',
  standalone: false,
  templateUrl: './add-page-operation.component.html',
  styleUrl: './add-page-operation.component.scss',
})
export class AddPageOperationComponent {
  editMode: boolean = false;
  viewOnly = false;
  addPageOperationORGForm!: FormGroup;
  clientId: any;
  operationsList$: any;
  pagesList$: any;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: PageOperationsFacade,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    this.store.dispatch(loadAllOperations({}));

    this.store.dispatch(loadAllPages({}));

    this.operationsList$ = this.store.select(selectAllOperations);
    this.pagesList$ = this.store.select(selectAllPages);
    this.addPageOperationORGForm = this.fb.group({
      id: [null], // ← new hidden control
      operationId: ['', [Validators.required]],
      pageId: ['', [Validators.required]],
      isActive: [true],
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        // we have an id → edit mode
        this.editMode = true;
        this.clientId = +id;

        // disable if it’s view mode via ?mode=view
        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) {
          this.addPageOperationORGForm.disable();
        }

        // 3. load the existing record & patch the form
        // this.facade.loadById(this.clientId);
        this.facade.loadById(this.clientId);
        // setTimeout(() => {
        // }, 2000);
        this.facade.selected$
          .pipe(
            filter((ct) => !!ct),
            distinctUntilChanged((prev, curr) => prev.id === curr.id)
          )
          .subscribe((ct) => {
            console.log('📝 Patching form with:', ct);
            this.addPageOperationORGForm.patchValue({
              // these match your FormGroup controls:
              id: ct.id,
              operationId: ct.operation?.id,
              pageId: ct.page?.id,
              isActive: ct.isActive,
            });
          });
      } else {
        // no id → add mode: still check if ?mode=view
        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) {
          this.addPageOperationORGForm.disable();
        }
      }
    });
  }

  addOrEditPageOperation() {
    console.log('💥 addOperations() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addPageOperationORGForm.valid);
    console.log('  form touched:', this.addPageOperationORGForm.touched);
    console.log(
      '  form raw value:',
      this.addPageOperationORGForm.getRawValue()
    );

    if (this.viewOnly) {
      console.log('⚠️ viewOnly mode — aborting add');
      return;
    }

    if (this.addPageOperationORGForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addPageOperationORGForm.markAllAsTouched();
      return;
    }

    const { pageId, operationId, isActive } =
      this.addPageOperationORGForm.value;
    const payload: Partial<PageOperation> = { pageId, operationId, isActive };
    console.log('  → payload object:', payload);

    // Double-check your route param
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(clientId):', routeId);

    if (this.editMode) {
      const { id, pageId, operationId, isActive } =
        this.addPageOperationORGForm.value;
      const payload: PageOperation = { id, pageId, operationId, isActive };
      console.log(
        '🔄 Dispatching UPDATE id=',
        this.clientId,
        ' payload=',
        payload
      );
      this.facade.update(id, payload);
    } else {
      console.log('➕ Dispatching CREATE payload=', payload);
      this.facade.create(payload);
    }
    console.log('🧭 Navigating away to view-page-operations');

    this.router.navigate(['/organizations/view-page-operations']);
  }
}
