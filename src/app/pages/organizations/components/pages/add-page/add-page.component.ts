import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  filter,
  distinctUntilChanged,
  take,
  takeUntil,
  Subject,
  map,
  tap,
  switchMap,
} from 'rxjs';
import { PagesFacade } from '../../../../organizations/store/pages/pages.facade';
import { Page } from '../../../../organizations/store/pages/page.model';
import { NavigationService } from '../../../../../shared/services/navigation.service';

@Component({
  selector: 'app-add-page',
  standalone: false,
  templateUrl: './add-page.component.html',
  styleUrl: './add-page.component.scss',
})
export class AddPageComponent implements OnDestroy, OnInit {
  editMode: boolean = false;
  viewOnly = false;
  addPageORGForm!: FormGroup;
  clientId: any;
  pagesList: any;
  public destroy$ = new Subject<void>();
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: PagesFacade,
    private router: Router,
    private nav: NavigationService
  ) {}

  ngOnInit() {
    // 1) Build your form
    this.addPageORGForm = this.fb.group({
      id: [null],
      page: ['', Validators.required],
      name: ['', Validators.required],
      nameAR: [
        '',
        [Validators.required, Validators.pattern(/^[\u0600-\u06FF\s]+$/)],
      ],
      url: ['', Validators.required],
      isActive: [true],
    });

    const pageCtrl = this.addPageORGForm.get('page')!;
    const nameCtrl = this.addPageORGForm.get('name')!;
    const urlCtrl = this.addPageORGForm.get('url')!;

    // 2) Wire your dropdown → name & url logic
    pageCtrl.valueChanges
      .pipe(
        filter((v) => typeof v === 'string'),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((v) => {
        const lastSegment = v.split('/').pop()!;
        nameCtrl.setValue(lastSegment, { emitEvent: false });
        urlCtrl.setValue(`/${v}`, { emitEvent: false });
      });

    // 3) Now listen for paramMap, reset & load accordingly
    this.route.paramMap
      .pipe(
        map((pm) => pm.get('id')), // read the “id” param
        distinctUntilChanged(), // only when it really changes
        tap((idStr) => {
          // ⭐ reset the form to its pristine defaults
          this.addPageORGForm.reset({
            id: null,
            page: '',
            name: '',
            nameAR: '',
            url: '',
            isActive: true,
          });

          // mode flags
          this.editMode = !!idStr;
          this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';

          if (this.viewOnly) {
            this.addPageORGForm.disable();
          } else {
            this.addPageORGForm.enable();
          }

          // if we have an id, *kick off* the load
          if (idStr) {
            this.facade.loadById(+idStr);
          }
        }),
        filter((idStr) => !!idStr), // only continue if editing
        switchMap((idStr) =>
          this.facade.selected$.pipe(
            filter((ct) => !!ct && ct.id === +idStr!), // wait for the matching record
            take(1)
          )
        )
      )
      .subscribe((ct) => {
        // derive your “page” from the API’s URL
        const rawUrl = ct?.url || '';
        const pagePath = rawUrl.startsWith('/') ? rawUrl.slice(1) : rawUrl;

        // patch the page dropdown *first*, silently
        pageCtrl.setValue(pagePath, { emitEvent: false });

        // then patch the rest, still silently
        this.addPageORGForm.patchValue(
          {
            id: ct?.id,
            name: ct?.name,
            nameAR: ct?.nameAR,
            url: ct?.url,
            isActive: ct?.isActive,
          },
          { emitEvent: false }
        );
      });

    const paths = this.nav.getAllNestedPaths().filter((p) => !p.includes('/:')); // drop paramized ones
    this.pagesList = paths.map((p) => ({ label: p, value: p }));
  }

  addOrEditPage() {
    console.log('💥 addPages() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addPageORGForm.valid);
    console.log('  form touched:', this.addPageORGForm.touched);
    console.log('  form raw value:', this.addPageORGForm.getRawValue());

    // Print individual control errors
    const nameCtrl = this.addPageORGForm.get('name');
    const nameARCtrl = this.addPageORGForm.get('nameAR');
    console.log('  name.errors:', nameCtrl?.errors);
    console.log('  nameAR.errors:', nameARCtrl?.errors);

    if (this.viewOnly) {
      console.log('⚠️ viewOnly mode — aborting add');
      return;
    }

    if (this.addPageORGForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addPageORGForm.markAllAsTouched();
      return;
    }

    const { name, nameAR, isActive, url, page } = this.addPageORGForm.value;
    const payload: Partial<Page> = { name, nameAR, isActive, url, page };
    console.log('  → payload object:', payload);

    // Double-check your route param
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(clientId):', routeId);

    if (this.editMode) {
      const { id, name, nameAR, isActive, url, page } =
        this.addPageORGForm.value;
      const payload: Page = { id, name, nameAR, isActive, url, page };
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
    console.log('🧭 Navigating away to view-pages');
    if (this.addPageORGForm.valid) {
      this.addPageORGForm.markAsPristine();
    }

    this.router.navigate(['/organizations/view-pages']);
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.addPageORGForm.dirty;
  }
}
