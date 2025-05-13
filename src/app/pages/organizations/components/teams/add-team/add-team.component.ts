import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, take } from 'rxjs';
import { arabicOnlyValidator } from '../../../../../shared/validators/arabic-only.validator';
import { Store } from '@ngrx/store';
import { TeamsFacade } from '../../../store/teams/teams.facade';
import { DepartmentsFacade } from '../../../store/departments/departments.facade';
import { Team } from '../../../store/teams/team.model';
import { loadDepartments } from '../../../../organizations/store/departments/departments.actions';
import { selectDepartments } from '../../../../organizations/store/departments/departments.selectors';


@Component({
 selector: 'app-add-team',
  standalone: false,
  templateUrl: './add-team.component.html',
  styleUrl: './add-team.component.scss',
})
export class AddTeamComponent {
  editMode: boolean = false;
  viewOnly = false;
  addTeamORGForm!: FormGroup;
  clientId: any;
  departments$!: any;
  store: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: TeamsFacade,
    private router: Router,
    private departmentFacade : DepartmentsFacade,
  ) {}

  ngOnInit() {
    //Select Box
 this.departmentFacade.loadAll();          
   this.departments$ = this.departmentFacade.items$; 

    this.addTeamORGForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required]],
      nameAR: ['', [Validators.required, arabicOnlyValidator]],
      department: [null],
      departmentId: [null],
      isActive: [true],
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
      if (id) {
        this.editMode = true;
        this.clientId = +id;

        if (this.viewOnly) {
          this.addTeamORGForm.disable();
        }

        this.facade.loadById(this.clientId);
        this.facade.selected$
          .pipe(
            filter((ct) => !!ct),
            take(1)
          )
          .subscribe((ct) => {
            this.addTeamORGForm.patchValue({
              id: ct!.id,
              name: ct!.name,
              nameAR: ct!.nameAR,
              department: ct!.department,
              departmentId: ct!.departmentId,
            });
          });
      } else {
        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) {
          this.addTeamORGForm.disable();
        }
      }
    });
  }

  addOrEditTeam() {
    if (this.viewOnly) {
      return;
    }

    if (this.addTeamORGForm.invalid) {
      this.addTeamORGForm.markAllAsTouched();
      return;
    }

    const {
      name,
      nameAR,
      departmentId,
    } = this.addTeamORGForm.value;
    const payload: Partial<Team> = {
      name,
      nameAR,
      departmentId
    };
    //const routeId = this.route.snapshot.paramMap.get('id');

    if (this.editMode) {
      const {
        id,
        name,
        nameAR,
        departmentId,
        isActive,
      } = this.addTeamORGForm.value;
      const payload: Team = {
        id,
        name,
        nameAR,
        departmentId,
        isActive,
      };

      this.facade.update(id, payload);
    } else {
      this.facade.create(payload);
    }

    this.router.navigate(['/organizations/view-teams']);
  }
}
