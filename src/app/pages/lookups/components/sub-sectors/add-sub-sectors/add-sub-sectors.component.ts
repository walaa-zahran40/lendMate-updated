import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, filter, take, Observable } from 'rxjs';
import { SubSector } from '../../../store/sub-sectors/sub-sector.model';
import { SubSectorsFacade } from '../../../store/sub-sectors/sub-sectors.facade';
import { Sector } from '../../../store/sectors/sector.model';
import { Store } from '@ngrx/store';
import { loadAll } from '../../../store/sectors/sectors.actions';
import { selectAllSectors } from '../../../store/sectors/sectors.selectors';

@Component({
  selector: 'app-add-sub-sectors',
  standalone: false,
  templateUrl: './add-sub-sectors.component.html',
  styleUrl: './add-sub-sectors.component.scss',
})
export class AddSubSectorsComponent {
  editMode: boolean = false;
  viewOnly = false;
  addSubSectorsLookupsForm!: FormGroup;
  clientId: any;
  sectorsList$!: Observable<Sector[]>;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: SubSectorsFacade,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    //Select Box
    console.log('🔵 ngOnInit: start');
    this.store.dispatch(loadAll({}));
    this.sectorsList$ = this.store.select(selectAllSectors);
    console.log('sectors list', this.sectorsList$);
    this.sectorsList$.subscribe((data) =>
      console.log('🧪 sectorsList$ from store:', data)
    );

    // 1. Build the form
    this.addSubSectorsLookupsForm = this.fb.group({
      id: [null], // ← new hidden control
      name: ['', [Validators.required]],
      nameAR: [
        '',
        [Validators.required, Validators.pattern(/^[\u0600-\u06FF\s0-9\u0660-\u0669]+$/)],
      ],
      sectorId: [null, [Validators.required]],
      isActive: [true], // ← new hidden control
    });
    console.log(
      '🔵 Form initialized with default values:',
      this.addSubSectorsLookupsForm.value
    );

    // 2. Watch route params
    this.route.paramMap.subscribe((params) => {
      console.log('🔵 Route paramMap:', params);
      const idParam = params.get('id');
      console.log('🔵 Retrieved id param:', idParam);

      if (idParam) {
        // edit mode
        this.editMode = true;
        this.clientId = +idParam;
        console.log('🔵 Entering EDIT mode for id =', this.clientId);

        // view-only?
        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        console.log('🔵 viewOnly flag:', this.viewOnly);
        if (this.viewOnly) {
          this.addSubSectorsLookupsForm.disable();
          console.log('🔵 Form disabled for view-only');
        }

        // load & patch
        console.log('🔵 Dispatching loadById for', this.clientId);
        this.facade.loadById(this.clientId);

        this.facade.selected$
          .pipe(
            tap((ct) => console.log('🔵 selected$ emission:', ct)),
            filter((ct): ct is SubSector => !!ct && ct.id === this.clientId),
            tap((ct) =>
              console.log('🔵 selected$ passed filter, patching form with:', ct)
            ),
            take(1)
          )
          .subscribe((ct) => {
            this.addSubSectorsLookupsForm.patchValue({
              id: ct!.id,
              name: ct!.name,
              nameAR: ct!.nameAR,
              sectorId: ct!.sectorId,
              isActive: ct!.isActive,
            });
            console.log(
              '🔵 Form after patchValue:',
              this.addSubSectorsLookupsForm.value
            );
          });
      } else {
        // add mode
        this.editMode = false;
        console.log('🔵 Entering ADD mode');

        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        console.log('🔵 viewOnly flag (add mode):', this.viewOnly);
        if (this.viewOnly) {
          this.addSubSectorsLookupsForm.disable();
          console.log('🔵 Form disabled for view-only in add mode');
        }
      }
    });
  }

  addOrEditSectors() {
    console.log('💥 addOrEditSectors() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addSubSectorsLookupsForm.valid);
    console.log('  form touched:', this.addSubSectorsLookupsForm.touched);
    console.log(
      '  form raw value:',
      this.addSubSectorsLookupsForm.getRawValue()
    );

    // Print individual control errors
    const nameCtrl = this.addSubSectorsLookupsForm.get('name');
    const nameARCtrl = this.addSubSectorsLookupsForm.get('nameAR');
    console.log('  name.errors:', nameCtrl?.errors);
    console.log('  nameAR.errors:', nameARCtrl?.errors);

    if (this.viewOnly) {
      console.log('⚠️ viewOnly mode — aborting add');
      return;
    }

    if (this.addSubSectorsLookupsForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addSubSectorsLookupsForm.markAllAsTouched();
      return;
    }

    const { name, nameAR, isActive, sectorId } =
      this.addSubSectorsLookupsForm.value;
    const payload: Partial<SubSector> = { name, nameAR, isActive, sectorId };
    console.log('  → payload object:', payload);

    // Double-check your route param
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(clientId):', routeId);

    if (this.editMode) {
      const { id, name, nameAR, isActive, sectorId } =
        this.addSubSectorsLookupsForm.value;
      const payload: SubSector = { id, name, nameAR, isActive, sectorId };
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
    if (this.addSubSectorsLookupsForm.valid) {
      this.addSubSectorsLookupsForm.markAsPristine();
    }

    console.log('🧭 Navigating away to view-grace-periods');
    this.router.navigate(['/lookups/view-sub-sectors']);
  }
  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.addSubSectorsLookupsForm.dirty;
  }
}
