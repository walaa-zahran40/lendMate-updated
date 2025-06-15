import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Subject,
  filter,
  take,
  combineLatest,
  tap,
  map,
  Observable,
} from 'rxjs';
import { RoleClaimsFacade } from '../../../store/roles/role-claims/role-claims.facade';
import { PageOperationsFacade } from '../../../store/page-operations/page-operations.facade';
import { PagesFacade } from '../../../store/pages/pages.facade';
import { Page } from '../../../store/pages/page.model';
import { PageOperation } from '../../../store/page-operations/page-operation.model';

@Component({
  selector: 'app-add-role-claim',
  standalone: false,
  templateUrl: './add-role-claim.component.html',
  styleUrl: './add-role-claim.component.scss',
})
export class AddRoleClaimComponent {
  mode!: 'add' | 'edit' | 'view';
  editMode: boolean = false;
  viewOnly = false;
  addRoleClaimORGForm!: FormGroup;
  clientId: any;
  roleId: any;
  recordId!: number;
  operationsList$!: Observable<PageOperation[]>;
  pagesList$!: Observable<Page[]>;
  private destroy$ = new Subject<void>();
  operationName: string = '';
  operationIdValue: number | null = null;
  pageName: string = '';
  selectedPageIds: any;
  pageOperationGroups$: any;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: RoleClaimsFacade,
    private operationsFacade: PageOperationsFacade,
    private pagesFacade: PagesFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('🟢 ngOnInit start');

    // 1️⃣ Read route params
    console.log('Route snapshot:', this.route.snapshot);
    this.roleId = Number(this.route.snapshot.queryParams['roleId']);
    console.log('Parsed roleId:', this.roleId);

    // 2️⃣ Kick off loads: pages, page-operations, and this role’s claims
    console.log('Loading pages, operations, and role-claims...');
    this.pagesFacade.loadAll();
    this.operationsFacade.loadAll();
    this.facade.loadRoleClaimsByRoleId(this.roleId); // ← new

    // 3️⃣ Expose only “real” arrays
    this.pagesList$ = this.pagesFacade.all$.pipe(
      filter((pages) => pages.length > 0),
      tap((list) => console.log('[pagesList$] first real array', list))
    );
    this.operationsList$ = this.operationsFacade.all$.pipe(
      filter((ops) => ops.length > 0),
      tap((list) => console.log('[operationsList$] first real array', list))
    );

    // 4️⃣ Build a grouped list of just this role’s page-operations
    this.pageOperationGroups$ = combineLatest([
      this.operationsFacade.all$.pipe(filter((ops) => ops.length > 0)),
      this.facade.items$.pipe(filter((claims) => claims.length > 0)),
    ]).pipe(
      tap(([ops, claims]) => {
        console.log('🔍 [DBG] all pageOps:', ops);
        console.log('🔍 [DBG] roleClaims:', claims);
      }),
      map(([ops, claims]) => {
        // 1️⃣ extract the real IDs from the nested pageOperation
        const allowedIds = claims
          .map((c) => {
            const id = c.pageOperation?.id;
            console.log(`🔍 [DBG] claim ${c.id} → pageOperation.id =`, id);
            return id;
          })
          .filter((id): id is number => typeof id === 'number');

        console.log('🔍 [DBG] allowedIds:', allowedIds);

        // 2️⃣ pick matching ops (or all if none, for add-mode)
        const toShow =
          allowedIds.length > 0
            ? ops.filter((po) => allowedIds.includes(po.id))
            : ops;

        console.log('🔍 [DBG] toShow pageOperations:', toShow);

        // 3️⃣ group by page name
        const byPage: Record<string, PageOperation[]> = {};
        toShow.forEach((po) => {
          const name = po.page!.name;
          console.log(`🔍 [DBG] grouping op ${po.id} under page "${name}"`);
          (byPage[name] ||= []).push(po);
        });

        // 4️⃣ build final array
        const result = Object.entries(byPage).map(([pageName, pageOps]) => ({
          pageName,
          pageOperations: pageOps,
        }));
        console.log('🔍 [DBG] grouped result:', result);
        return result;
      }),
      tap((groups) => console.log('👉 [pageOperationGroups$]', groups))
    );

    // 5️⃣ Build the form
    this.addRoleClaimORGForm = this.fb.group({
      id: [null],
      roleId: [this.roleId, Validators.required],
      operationIds: [[] as number[], Validators.required],
      isActive: [true],
    });
    console.log('Form built:', this.addRoleClaimORGForm.getRawValue());

    // 6️⃣ Figure out add / edit / view
    this.mode = (this.route.snapshot.queryParamMap.get('mode') as any) ?? 'add';
    this.editMode = this.mode === 'edit';
    this.viewOnly = this.mode === 'view';
    console.log('Mode:', {
      mode: this.mode,
      editMode: this.editMode,
      viewOnly: this.viewOnly,
    });

    // ─── ADD mode defaults ─────────────────────────────────────────────
    if (this.mode === 'add') {
      this.pagesList$
        .pipe(
          take(1), // only once
          filter((pages) => pages.length > 0)
        )
        .subscribe((pages: any[]) => {
          const defaultIds = pages.map((p) => p.id); // pick ALL pages
          this.addRoleClaimORGForm.patchValue({ pageIds: defaultIds });
          this.addRoleClaimORGForm.get('pageIds')?.disable();
        });
    }

    // ─── EDIT / VIEW mode ──────────────────────────────────────────────
    if (this.editMode || this.viewOnly) {
      this.recordId = Number(this.route.snapshot.paramMap.get('id'));
      console.log('Loading record id=', this.recordId);
      this.facade.loadOne(this.recordId);

      this.pageOperationGroups$ = combineLatest([
        this.operationsFacade.all$.pipe(filter((ops) => ops.length > 0)),
        this.facade.items$.pipe(filter((cl) => cl.length > 0)),
      ]).pipe(
        map(([ops, claims]) => {
          const isEdit = this.mode !== 'add';
          const allowedIds = claims.map((c) => c.pageOperation!.id);

          const toShow = isEdit
            ? ops.filter((po) => allowedIds.includes(po.id))
            : ops;

          // now group `toShow` by page
          const byPage = toShow.reduce<Record<string, PageOperation[]>>(
            (acc, po) => {
              const name = po.page!.name;
              (acc[name] ||= []).push(po);
              return acc;
            },
            {}
          );

          return Object.entries(byPage).map(([pageName, pageOps]) => ({
            pageName,
            pageOperations: pageOps,
          }));
        })
      );
    } else if (this.viewOnly) {
      console.log('ViewOnly without id → disabling form');
      this.addRoleClaimORGForm.disable();
    }
  }

  addOrEditRoleClaim() {
    console.log('💥 addRoleClaims() called');
    console.log('  mode:', this.mode);
    console.log(
      '  form value before patch:',
      this.addRoleClaimORGForm.getRawValue()
    );

    // 1️⃣ Validate
    if (this.addRoleClaimORGForm.invalid) {
      console.warn('❌ Form invalid — aborting');
      this.addRoleClaimORGForm.markAllAsTouched();
      return;
    }

    // 2️⃣ Ensure roleId is correct
    const roleId = Number(this.route.snapshot.queryParamMap.get('roleId'));
    this.addRoleClaimORGForm.patchValue({ roleId });

    // 3️⃣ Extract operation IDs and isActive flag
    const { operationIds, isActive } = this.addRoleClaimORGForm.value as {
      operationIds: number[];
      isActive: boolean;
    };

    // 4️⃣ Map into the server DTO
    const rolePageOperations = operationIds.map((pageOperationId) => ({
      pageOperationId,
      value: isActive.toString(), // “true” or “false”
    }));

    const payload = { roleId, rolePageOperations };
    console.log('📦 payload →', payload);

    // 5️⃣ Send to facade
    if (this.mode === 'add') {
      console.log('➕ Creating new Role-Claim');
      this.facade.create(payload);
    } else {
      console.log(`✏️ Updating Role-Claim recordId=${this.recordId}`);
      this.facade.update(this.recordId, payload as any);
    }
    if (this.addRoleClaimORGForm.valid) {
      this.addRoleClaimORGForm.markAsPristine();
    }

    // 6️⃣ Go back to list
    this.router.navigate(['/organizations/view-role-claims', roleId]);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.addRoleClaimORGForm.dirty;
  }
}
