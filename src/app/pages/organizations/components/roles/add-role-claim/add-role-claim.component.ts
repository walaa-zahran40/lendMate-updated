import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Subject,
  filter,
  take,
  combineLatest,
  takeUntil,
  tap,
  map,
  combineLatestWith,
  Observable,
} from 'rxjs';
import { RoleClaim } from '../../../store/roles/role-claims/role-claim.model';
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
      this.operationsFacade.all$.pipe(
        filter((v): v is PageOperation[] => Array.isArray(v) && v.length > 0)
      ),
      this.facade.items$.pipe(
        filter((v): v is RoleClaim[] => Array.isArray(v) && v.length > 0)
      ),
    ]).pipe(
      // wait until both are populated
      filter(([ops, claims]) => ops.length > 0 && claims.length > 0),
      map(([ops, claims]) => {
        // which pageOperation.ids this role has
        const allowedIds = claims.map((c) => c.pageOperationId!);
        // filter down to just those ops
        const related = (ops as any[]).filter((po) =>
          allowedIds.includes(po.id)
        );
        const byPage: Record<string, PageOperation[]> = {};
        related.forEach((po) => {
          const pgName = po.page!.name;
          (byPage[pgName] ||= []).push(po);
        });

        return Object.entries(byPage).map(([pageName, pageOps]) => ({
          pageName,
          pageOperations: pageOps,
        }));
      }),
      tap((groups) =>
        console.log('[pageOperationGroups$] for this role →', groups)
      )
    );

    // 5️⃣ Build the form
    this.addRoleClaimORGForm = this.fb.group({
      id: [null],
      roleId: [this.roleId, Validators.required],
      pageIds: [[] as number[]], // multi-select of page IDs
      operationId: [null, Validators.required],
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

      combineLatest([
        this.facade.current$.pipe(
          filter((c) => !!c && c.id === this.recordId),
          take(1)
        ),
        this.pagesList$.pipe(take(1)),
        this.operationsList$.pipe(take(1)),
      ]).subscribe(([ct]) => {
        const po = ct?.pageOperation!;
        // patch the form
        this.addRoleClaimORGForm.patchValue({
          pageIds: [po.pageId],
          operationId: po.operationId,
          isActive: ct?.isActive,
        });

        // disable if viewOnly
        if (this.viewOnly) {
          this.addRoleClaimORGForm.disable();
        }

        console.log(
          'Patched form (edit/view):',
          this.addRoleClaimORGForm.getRawValue()
        );
      });
    } else if (this.viewOnly) {
      console.log('ViewOnly without id → disabling form');
      this.addRoleClaimORGForm.disable();
    }
  }

  addOrEditRoleClaim() {
    const roleParamQP = this.route.snapshot.queryParamMap.get('roleId');

    console.log('💥 addRoleClaims() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addRoleClaimORGForm.valid);
    console.log('  form touched:', this.addRoleClaimORGForm.touched);
    console.log('  form raw value:', this.addRoleClaimORGForm.getRawValue());

    if (this.addRoleClaimORGForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addRoleClaimORGForm.markAllAsTouched();
      return;
    }

    this.addRoleClaimORGForm.patchValue({
      roleId: roleParamQP,
    });

    const { pageOperation, roleId, isActive } = this.addRoleClaimORGForm.value;
    const payload: Partial<RoleClaim> = {
      pageOperation,
      roleId,
      isActive,
    };
    console.log('  → payload object:', payload);

    const data = this.addRoleClaimORGForm.value as Partial<RoleClaim>;
    console.log('📦 Payload going to facade:', data);

    // Double-check your route param
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(clientId):', routeId);

    // 7) Create vs. update
    if (this.mode === 'add') {
      console.log('➕ Dispatching CREATE');
      this.facade.create(payload);
    } else {
      console.log('✏️ Dispatching UPDATE id=', data.id);
      this.facade.update(data.id!, data);
    }

    if (roleParamQP) {
      console.log('➡️ Navigating back with PATH param:', roleParamQP);
      this.router.navigate(['/organizations/view-role-claims', roleParamQP]);
    } else if (roleParamQP) {
      console.log('➡️ Navigating back with QUERY param fallback:', roleParamQP);
      this.router.navigate([`/organizations/view-role-claims/${roleParamQP}`]);
    } else {
      console.error('❌ Cannot navigate back: currencyId is missing!');
    }
    // console.log('🧭 Navigating away to view-role-claims');
    // this.router.navigate(['/organizations/view-role-claims']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
