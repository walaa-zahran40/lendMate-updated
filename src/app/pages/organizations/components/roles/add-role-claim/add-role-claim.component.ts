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
import { PageOperationGroup } from '../../../store/page-operations/page-operation-group.model';

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
  pageOperationGroups$!: Observable<PageOperationGroup[]>;
  // pagination state
  first = 0; // index of the first record on current page
  rows = 5; // how many groups per page
  totalGroups = 0; // total number of groups
  paginatedGroups: PageOperationGroup[] = [];
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
    this.roleId = Number(this.route.snapshot.params['roleId']);
    console.log('Parsed roleId:', this.roleId);

    // 2️⃣ Kick off loads: pages, page-operations, and this role’s claims
    console.log('Loading pages, operations, and role-claims...');
    this.operationsFacade.loadAll();
    this.facade.loadRoleClaimsByRoleId(this.roleId); // ← new

    // 5️⃣ Build the form
    this.addRoleClaimORGForm = this.fb.group({
      id: [null],
      roleId: [this.roleId, Validators.required],
      operationIds: [[] as number[], Validators.required],
      isActive: [true],
    });
    console.log('Form built:', this.addRoleClaimORGForm.getRawValue());
    this.facade.items$
      .pipe(
        filter((claims) => claims.length > 0),
        take(1)
      )
      .subscribe((claims) => {
        const enabledOperationIds = claims
          .filter(
            (claim) =>
              claim.pageOperation?.id &&
              claim.pageOperation.applicationRoleClaims?.some(
                (c: any) => c.claimValue === 'true'
              )
          )
          .map((claim) => claim.pageOperation!.id);

        console.log('✅ Pre-selecting operationIds:', enabledOperationIds);

        this.addRoleClaimORGForm
          .get('operationIds')
          ?.setValue(enabledOperationIds);
      });

    // 6️⃣ Figure out add / edit / view
    this.mode = (this.route.snapshot.queryParamMap.get('mode') as any) ?? 'add';
    this.editMode = this.mode === 'edit';
    this.viewOnly = this.mode === 'view';
    console.log('Mode:', {
      mode: this.mode,
      editMode: this.editMode,
      viewOnly: this.viewOnly,
    });
    if (this.mode === 'add') {
      this.pageOperationGroups$ = this.operationsFacade.all$.pipe(
        filter((ops) => ops.length > 0),
        map((ops) => {
          const grouped: Record<string, PageOperation[]> = {};

          for (const op of ops) {
            const pageName = op.page?.name;
            if (!pageName) continue;
            if (!grouped[pageName]) {
              grouped[pageName] = [];
            }
            grouped[pageName].push(op);
          }

          return Object.entries(grouped).map(([pageName, pageOperations]) => ({
            pageName,
            pageOperations,
          }));
        })
      );
    }
    this.recordId = Number(this.route.snapshot.paramMap.get('roleId'));

    // ─── EDIT / VIEW mode ──────────────────────────────────────────────
    if (this.editMode || this.viewOnly) {
      console.log('Loading record id=', this.recordId);
      this.facade.loadOne(this.recordId);

      this.pageOperationGroups$ = combineLatest([
        this.operationsFacade.all$.pipe(filter((ops) => ops.length > 0)),
        this.facade.items$.pipe(filter((items) => items.length > 0)),
      ]).pipe(
        map(([ops, claims]) => {
          const grouped: Record<string, PageOperation[]> = {};

          claims.forEach((claim) => {
            const pageName = claim.page?.name;
            if (!pageName) return;

            const op: PageOperation = {
              id: claim.id,
              page: claim.page,
              operation: claim.operation,
            };

            if (!grouped[pageName]) {
              grouped[pageName] = [];
            }
            grouped[pageName].push(op);
          });

          return Object.entries(grouped).map(([pageName, pageOperations]) => ({
            pageName,
            pageOperations,
          }));
        })
      );
    } else if (this.viewOnly) {
      console.log('ViewOnly without id → disabling form');
      this.addRoleClaimORGForm.disable();
    }
    this.pageOperationGroups$
      .pipe(
        filter((groups) => groups.length > 0),
        take(1)
      )
      .subscribe((groups) => {
        this.totalGroups = groups.length;
        this.updatePage(groups);
      });
  }
  /** slice the current page out of the full list */
  private updatePage(groups: PageOperationGroup[]) {
    this.paginatedGroups = groups.slice(this.first, this.first + this.rows);
  }
  /** called by the paginator whenever page changes */
  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.pageOperationGroups$
      .pipe(take(1))
      .subscribe((groups) => this.updatePage(groups));
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

    // 🔧 FIXED: Use existing roleId from earlier
    this.addRoleClaimORGForm.patchValue({ roleId: this.roleId });

    const { operationIds, isActive } = this.addRoleClaimORGForm.value as {
      operationIds: number[];
      isActive: boolean;
    };

    const rolePageOperations = operationIds.map((pageOperationId) => ({
      pageOperationId,
      value: isActive.toString(),
    }));

    const payload = { roleId: this.roleId, rolePageOperations };
    console.log('📦 payload →', payload, 'record', this.recordId);

    this.facade.update(this.recordId, payload as any);

    if (this.addRoleClaimORGForm.valid) {
      this.addRoleClaimORGForm.markAsPristine();
    }

    // ✅ Use reliable roleId
    this.router.navigate(['/organizations/view-roles']);
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
