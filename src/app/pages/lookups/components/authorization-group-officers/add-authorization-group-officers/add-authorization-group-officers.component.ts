import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthorizationGroupOfficersFacade } from '../../../store/authorization-group-officers/authorization-group-officers.facade';
import { AuthorizationGroupOfficer } from '../../../store/authorization-group-officers/authorization-group-officer.model';
import { AuthorizationGroupsFacade } from '../../../store/authorization-groups/authorization-groups.facade';
import { OfficersFacade } from '../../../../organizations/store/officers/officers.facade';

@Component({
  selector: 'app-add-authorization-group-officers',
  standalone: false,
  templateUrl: './add-authorization-group-officers.component.html',
  styleUrl: './add-authorization-group-officers.component.scss',
})
export class AddAuthorizationGroupOfficersComponent {
  editMode: boolean = false;
  viewOnly = false;
  addAuthorizationGroupOfficersLookupsForm!: FormGroup;
  clientId: any;
  authorizationGroups$!: any;
  officers$: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: AuthorizationGroupOfficersFacade,
    private officersFacade: OfficersFacade,
    private authorizationGroupsFacade: AuthorizationGroupsFacade,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    //Select Box

    this.authorizationGroups$ = this.authorizationGroupsFacade.all$;
    this.authorizationGroupsFacade.loadAll();

    this.officers$ = this.officersFacade.items$;
    this.officersFacade.loadAll();

    this.addAuthorizationGroupOfficersLookupsForm = this.fb.group({
      id: [null],
      authorizationGroup: [null],
      authorizationGroupId: [null],
      officer: [null],
      officerId: [null],
      isCurrent: [true],
      startDate: [null],
      endDate: [null],
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
      if (id) {
        this.editMode = true;
        this.clientId = +id;

        if (this.viewOnly) {
          this.addAuthorizationGroupOfficersLookupsForm.disable();
        }

        this.facade.loadById(this.clientId);
        this.facade.selected$
          .pipe(
            filter((ct) => !!ct),
            take(1)
          )
          .subscribe((ct) => {
            console.log('Selected Authorization Group Officer:', ct);
            this.addAuthorizationGroupOfficersLookupsForm.patchValue({
              id: ct!.id,
              authorizationGroup: ct!.authorizationGroup,
              authorizationGroupId: ct!.authorizationGroupId,
              officerId: ct!.officerId,
              officer: ct!.officer,
              startDate: ct!.startDate,
              endDate: ct!.endDate,
            });
          });
      } else {
        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) {
          this.addAuthorizationGroupOfficersLookupsForm.disable();
        }
      }
    });
  }

  addOrEditAuthorizationGroupOfficer() {
    if (this.viewOnly) {
      return;
    }

    if (this.addAuthorizationGroupOfficersLookupsForm.invalid) {
      this.addAuthorizationGroupOfficersLookupsForm.markAllAsTouched();
      return;
    }

    const { authorizationGroupId, officerId, startDate } =
      this.addAuthorizationGroupOfficersLookupsForm.value;
    const payload: Partial<AuthorizationGroupOfficer> = {
      authorizationGroupId,
      officerId,
      startDate,
    };
    const routeId = this.route.snapshot.paramMap.get('id');

    if (this.editMode) {
      const { id, authorizationGroupId, officerId, startDate } =
        this.addAuthorizationGroupOfficersLookupsForm.value;
      const payload: AuthorizationGroupOfficer = {
        id,
        authorizationGroupId,
        officerId,
        startDate,
      };

      this.facade.update(id, payload);
    } else {
      this.facade.create(payload);
    }
    if (this.addAuthorizationGroupOfficersLookupsForm.valid) {
      this.addAuthorizationGroupOfficersLookupsForm.markAsPristine();
    }

    this.router.navigate(['/lookups/view-authorization-group-officers']);
  }
  /** Called by the guard. */
  canDeactivate(): boolean {
    return !this.addAuthorizationGroupOfficersLookupsForm.dirty;
  }
}
