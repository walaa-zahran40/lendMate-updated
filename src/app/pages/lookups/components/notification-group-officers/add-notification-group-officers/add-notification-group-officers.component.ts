import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, Observable, take } from 'rxjs';
import { arabicOnlyValidator } from '../../../../../shared/validators/arabic-only.validator';
import { Store } from '@ngrx/store';
import { loadAll } from '../../../store/fee-calculation-types/fee-calculation-types.actions';
import { selectAllFeeCalculationTypes } from '../../../store/fee-calculation-types/fee-calculation-types.selectors';
import { NotificationGroupOfficersFacade } from '../../../store/notification-group-officers/notification-group-officers.facade';
import { NotificationGroupOfficer } from '../../../store/notification-group-officers/notification-group-officer.model';
import { NotificationGroupsFacade } from '../../../store/notification-groups/notification-groups.facade';
import { OfficersFacade } from '../../../../organizations/store/officers/officers.facade';

@Component({
  selector: 'app-add-notification-group-officers',
  standalone: false,
  templateUrl: './add-notification-group-officers.component.html',
  styleUrl: './add-notification-group-officers.component.scss',
})
export class AddNotificationGroupOfficersComponent {
  editMode: boolean = false;
  viewOnly = false;
  addNotificationGroupOfficersLookupsForm!: FormGroup;
  clientId: any;
  notificationGroups$!: any;
  officers$: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: NotificationGroupOfficersFacade,
    private officersFacade: OfficersFacade,
    private notificationGroupsFacade: NotificationGroupsFacade,
    private router: Router,
    private store: Store,
  ) {}

  ngOnInit() {
    //Select Box

    this.notificationGroups$ = this.notificationGroupsFacade.all$;
    this.notificationGroupsFacade.loadAll();

    this.officers$ = this.officersFacade.items$;
    this.officersFacade.loadAll();
    
    this.addNotificationGroupOfficersLookupsForm = this.fb.group({
      id: [null],
      notificationGroup: [null],
      notificationGroupId: [null],
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
          this.addNotificationGroupOfficersLookupsForm.disable();
        }

        this.facade.loadById(this.clientId);
        this.facade.selected$
          .pipe(
            filter((ct) => !!ct),
            take(1)
          )
          .subscribe((ct) => {
            this.addNotificationGroupOfficersLookupsForm.patchValue({
              id: ct!.id,
              notificationGroup: ct!.notificationGroup,
              notificationGroupId: ct!.notificationGroupId,
              officerId: ct!.officerId,
              officer: ct!.officer,
              startDate: ct!.startDate,
              endDate: ct!.endDate,
            });
          });
      } else {
        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) {
          this.addNotificationGroupOfficersLookupsForm.disable();
        }
      }
    });
  }

  addOrEditNotificationGroupOfficer() {
    if (this.viewOnly) {
      return;
    }

    if (this.addNotificationGroupOfficersLookupsForm.invalid) {
      this.addNotificationGroupOfficersLookupsForm.markAllAsTouched();
      return;
    }

    const {
      notificationGroupId,
      officerId,
      startDate
    } = this.addNotificationGroupOfficersLookupsForm.value;
    const payload: Partial<NotificationGroupOfficer> = {
      notificationGroupId,
      officerId,
      startDate,
    };
    const routeId = this.route.snapshot.paramMap.get('id');

    if (this.editMode) {
      const {
        id,
         notificationGroupId,
      officerId,
      startDate
      } = this.addNotificationGroupOfficersLookupsForm.value;
      const payload: NotificationGroupOfficer = {
        id,
         notificationGroupId,
        officerId,
        startDate
      };

      this.facade.update(id, payload);
    } else {
      this.facade.create(payload);
    }

    this.router.navigate(['/lookups/view-notification-group-officers']);
  }
}
