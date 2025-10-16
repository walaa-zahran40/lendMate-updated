import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, filter, take, Observable } from 'rxjs';
import { Sector } from '../../../store/sectors/sector.model';
import { SectorsFacade } from '../../../store/sectors/sectors.facade';
import { Store } from '@ngrx/store';
import { loadAll } from '../../../store/sectors/sectors.actions';
import { selectAllSectors } from '../../../store/sectors/sectors.selectors';

@Component({
  selector: 'app-add-sectors',
  standalone: false,
  templateUrl: './add-sectors.component.html',
  styleUrl: './add-sectors.component.scss',
})
export class AddSectorsComponent {
  editMode: boolean = false;
  viewOnly = false;
  addSectorsLookupsForm!: FormGroup;
  clientId: any;
  sectorsList$!: Observable<Sector[]>;
  sectorsList: any[] = [];
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: SectorsFacade,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    console.log('🔵 ngOnInit: start');
    this.store.dispatch(loadAll({}));
    // 1. Build the form
    this.addSectorsLookupsForm = this.fb.group({
      id: [null], // ← new hidden control
      name: ['', [Validators.required]],
      nameAR: [
        '',
        [Validators.required, Validators.pattern(/^[\u0600-\u06FF\s0-9\u0660-\u0669]+$/)],
      ],
      isActive: [true], // ← new hidden control
    });
    console.log(
      '🔵 Form initialized with default values:',
      this.addSectorsLookupsForm.value
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
          this.addSectorsLookupsForm.disable();
          console.log('🔵 Form disabled for view-only');
        }

        // load & patch
        console.log('🔵 Dispatching loadById for', this.clientId);
        this.facade.loadById(this.clientId);

        this.facade.selected$
          .pipe(
            tap((ct) => console.log('🔵 selected$ emission:', ct)),
            filter((ct): ct is Sector => !!ct && ct.id === this.clientId),
            tap((ct) =>
              console.log('🔵 selected$ passed filter, patching form with:', ct)
            ),
            take(1)
          )
          .subscribe((ct) => {
            this.addSectorsLookupsForm.patchValue({
              id: ct!.id,
              name: ct!.name,
              nameAR: ct!.nameAR,
              isActive: ct!.isActive,
            });
            console.log(
              '🔵 Form after patchValue:',
              this.addSectorsLookupsForm.value
            );
          });
      } else {
        // add mode
        this.editMode = false;
        console.log('🔵 Entering ADD mode');

        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        console.log('🔵 viewOnly flag (add mode):', this.viewOnly);
        if (this.viewOnly) {
          this.addSectorsLookupsForm.disable();
          console.log('🔵 Form disabled for view-only in add mode');
        }
      }
    });
  }

  addOrEditSectors() {
    console.log('💥 addOrEditSectors() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addSectorsLookupsForm.valid);
    console.log('  form touched:', this.addSectorsLookupsForm.touched);
    console.log('  form raw value:', this.addSectorsLookupsForm.getRawValue());

    // Print individual control errors
    const nameCtrl = this.addSectorsLookupsForm.get('name');
    const nameARCtrl = this.addSectorsLookupsForm.get('nameAR');
    console.log('  name.errors:', nameCtrl?.errors);
    console.log('  nameAR.errors:', nameARCtrl?.errors);

    if (this.viewOnly) {
      console.log('⚠️ viewOnly mode — aborting add');
      return;
    }

    if (this.addSectorsLookupsForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addSectorsLookupsForm.markAllAsTouched();
      return;
    }

    const { name, nameAR, isActive } = this.addSectorsLookupsForm.value;
    const payload: Partial<Sector> = { name, nameAR, isActive };
    console.log('  → payload object:', payload);

    // Double-check your route param
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(clientId):', routeId);

    if (this.editMode) {
      const { id, name, nameAR, isActive } = this.addSectorsLookupsForm.value;
      const payload: Sector = { id, name, nameAR, isActive };
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
    if (this.addSectorsLookupsForm.valid) {
      this.addSectorsLookupsForm.markAsPristine();
    }

    console.log('🧭 Navigating away to view-grace-periods');
    this.router.navigate(['/lookups/view-sectors']);
  }
  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.addSectorsLookupsForm.dirty;
  }
}
