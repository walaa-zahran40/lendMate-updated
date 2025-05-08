import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, take } from 'rxjs';
import { arabicOnlyValidator } from '../../../../shared/validators/arabic-only.validator';
import { DepartmentsFacade } from '../../store/departments/departments.facade';
import { Department } from '../../store/departments/department.model';

@Component({
  selector: 'app-add-department',
  standalone: false,
  templateUrl: './add-department.component.html',
  styleUrl: './add-department.component.scss',
})
export class AddDepartmentComponent {
  editMode: boolean = false;
  viewOnly = false;
  addDepartmentsForm!: FormGroup;
  clientId: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: DepartmentsFacade,
    private router: Router
  ) {}

  ngOnInit() {
    this.addDepartmentsForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required]],
      nameAR: ['', [Validators.required, arabicOnlyValidator]],
      isActive: [true],
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.editMode = true;
        this.clientId = +id;

        console.log(this.viewOnly);

        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) {
          this.addDepartmentsForm.disable();
        }

        this.facade.loadOne(this.clientId);
        this.facade.current$
          .pipe(
            filter((ct) => !!ct),
            take(1)
          )
          .subscribe((ct) => {
            this.addDepartmentsForm.patchValue({
              id: ct!.id,
              name: ct!.name,
              nameAR: ct!.nameAR,
              isActive: ct!.isActive,
            });
          });
      } else {
        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) {
          this.addDepartmentsForm.disable();
        }
      }
    });
  }

  addOrEditDepartment() {

    if (this.viewOnly) {
      console.log('⚠️ viewOnly mode — aborting add');
      return;
    }

    if (this.addDepartmentsForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addDepartmentsForm.markAllAsTouched();
      return;
    }

    const { name, nameAR} =
      this.addDepartmentsForm.value;
    const payload: Partial<Department> = { name, nameAR };
    console.log('  → payload object:', payload);

    // Double-check your route param
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(clientId):', routeId);

    if (this.editMode) {
      const { id, name, nameAR, iso, isActive } =
        this.addDepartmentsForm.value;
      const payload: Department = {
        id,
        name,
        nameAR,
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

    this.router.navigate(['/organizations/view-departments']);
  }
}
