import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, take } from 'rxjs';
import { BusinessLinesFacade } from '../../../store/business-lines/business-lines.facade';
import { BusinessLine } from '../../../store/business-lines/business-line.model';

@Component({
  selector: 'app-add-businessLines',
  standalone: false,
  templateUrl: './add-business-lines.component.html',
  styleUrl: './add-business-lines.component.scss',
})
export class AddBusinessLinesComponent {
  editMode: boolean = false;
  viewOnly = false;
  addBusinessLinesLookupsForm!: FormGroup;
  clientId: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: BusinessLinesFacade,
    private router: Router
  ) {}

  ngOnInit() {
    this.addBusinessLinesLookupsForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required]],
      nameAR: [
        '',
        [Validators.required, , Validators.pattern(/^[\u0600-\u06FF\s]+$/)],
      ],
      lisenceStartDate: [null, [Validators.required]],
      isActive: [true],
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.editMode = true;
        this.clientId = +id;

        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) {
          this.addBusinessLinesLookupsForm.disable();
        }

        this.facade.loadById(this.clientId);
        this.facade.selected$
          .pipe(
            filter((ct): ct is BusinessLine => !!ct && ct.id === this.clientId),
            take(1)
          )
          .subscribe((ct) => {
            this.addBusinessLinesLookupsForm.patchValue({
              id: ct!.id,
              name: ct!.name,
              nameAR: ct!.nameAR,
              lisenceStartDate: new Date(ct!.lisenceStartDate),
              isActive: ct!.isActive,
            });
          });
      } else {
        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) {
          this.addBusinessLinesLookupsForm.disable();
        }
      }
    });
  }

  addOrEditBusinessLine() {
    console.log('💥 addBusinessLine() called');
    console.log('  viewOnly:', this.viewOnly);
    console.log('  editMode:', this.editMode);
    console.log('  form valid:', this.addBusinessLinesLookupsForm.valid);
    console.log('  form touched:', this.addBusinessLinesLookupsForm.touched);
    console.log(
      '  form raw value:',
      this.addBusinessLinesLookupsForm.getRawValue()
    );

    if (this.viewOnly) {
      console.log('⚠️ viewOnly mode — aborting add');
      return;
    }

    if (this.addBusinessLinesLookupsForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addBusinessLinesLookupsForm.markAllAsTouched();
      return;
    }

    const { name, nameAR, lisenceStartDate } =
      this.addBusinessLinesLookupsForm.value;
    const payload: Partial<BusinessLine> = { name, nameAR, lisenceStartDate };
    console.log('  → payload object:', payload);

    // Double-check your route param
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(clientId):', routeId);

    if (this.editMode) {
      const { id, name, nameAR, lisenceStartDate, isActive } =
        this.addBusinessLinesLookupsForm.value;
      const payload: BusinessLine = {
        id,
        name,
        nameAR,
        lisenceStartDate: new Date(lisenceStartDate),
        isActive,
        code: '',
      };
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
    if (this.addBusinessLinesLookupsForm.valid) {
      this.addBusinessLinesLookupsForm.markAsPristine();
    }

    this.router.navigate(['/lookups/view-business-lines']);
  }
  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.addBusinessLinesLookupsForm.dirty;
  }
}
