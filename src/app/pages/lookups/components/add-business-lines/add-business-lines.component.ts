import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, take } from 'rxjs';
import { arabicOnlyValidator } from '../../../../shared/validators/arabic-only.validator';
import { BusinessLine } from '../../store/businessLines/businessLine.model';
import { BusinessLinesFacade } from '../../store/businessLines/businessLines.facade';

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
      name: [
        '',
        [Validators.required], 
      ],
      nameAR: ['', [Validators.required, arabicOnlyValidator]],
      lisenceStartDate: [
         null,
        [Validators.required], 
      ],
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

        this.facade.loadOne(this.clientId);
        this.facade.current$
          .pipe(
            filter((ct) => !!ct),
            take(1)
          )
          .subscribe((ct) => {
            this.addBusinessLinesLookupsForm.patchValue({
              id: ct!.id,
              name: ct!.name,
              nameAR: ct!.nameAR,
              lisenceStartDate:new Date(ct!.lisenceStartDate),
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

    const { name, nameAR, lisenceStartDate   } = this.addBusinessLinesLookupsForm.value;
    const payload: Partial<BusinessLine> = { name, nameAR, lisenceStartDate  };
    console.log('  → payload object:', payload);

    // Double-check your route param
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(clientId):', routeId);

   
    if (this.editMode) {
      const { id, name, nameAR, lisenceStartDate, isActive } =
        this.addBusinessLinesLookupsForm.value;
      const payload: BusinessLine = {
        id, name, nameAR, lisenceStartDate:this.formatDateWithoutTime(lisenceStartDate), isActive,
        code: ''
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

    this.router.navigate(['/lookups/view-business-lines']);
  }
  
  
  private formatDateWithoutTime(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // month is 0-indexed
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
