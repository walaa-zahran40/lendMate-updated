import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, take } from 'rxjs';
import { arabicOnlyValidator } from '../../../../shared/validators/arabic-only.validator';
import { OfficersFacade } from '../../store/officers/officers.facade';
import { Officer } from '../../store/officers/officer.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-add-officer',
  standalone: false,
  templateUrl: './add-officer.component.html',
  styleUrl: './add-officer.component.scss',
})
export class AddOfficerComponent {
  editMode: boolean = false;
  viewOnly = false;
  addOfficersForm!: FormGroup;
  clientId: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facade: OfficersFacade,
    private router: Router
  ) {}

  ngOnInit() {
    this.addOfficersForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required]],
      nameAR: ['', [Validators.required, arabicOnlyValidator]],
      loginName: ['', [Validators.required]],
      title: ['', [Validators.required]],
      titleAr: ['', [Validators.required, arabicOnlyValidator]],
      email: ['', [Validators.required]],
      phoneNumber : ['', [Validators.required]],
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
          this.addOfficersForm.disable();
        }

        this.facade.loadOne(this.clientId);
        this.facade.current$
          .pipe(
            filter((ct) => !!ct),
            take(1)
          )
          .subscribe((ct) => {
            this.addOfficersForm.patchValue({
              id: ct!.id,
              name: ct!.name,
              nameAR: ct!.nameAR,
              title: ct!.title,
              titleAr: ct!.titleAr,
              loginName: ct!.loginName,
              email: ct!.email,
              phoneNumber: ct!.phoneNumber,
              isActive: ct!.isActive,
            });
          });
      } else {
        this.viewOnly = this.route.snapshot.queryParams['mode'] === 'view';
        if (this.viewOnly) {
          this.addOfficersForm.disable();
        }
      }
    });
  }

  addOrEditOfficer() {

    if (this.viewOnly) {
      console.log('⚠️ viewOnly mode — aborting add');
      return;
    }

    if (this.addOfficersForm.invalid) {
      console.warn('❌ Form is invalid — marking touched and aborting');
      this.addOfficersForm.markAllAsTouched();
      return;
    }

    const { name, nameAR, loginName , title , titleAr , email , phoneNumber} =
      this.addOfficersForm.value;
    const payload: Partial<Officer> = {name, nameAR, loginName , title , titleAr , email , phoneNumber };
    console.log('  → payload object:', payload);

    // Double-check your route param
    const routeId = this.route.snapshot.paramMap.get('id');
    console.log('  route.snapshot.paramMap.get(clientId):', routeId);

    if (this.editMode) {
      const { id, name, nameAR, loginName , title , titleAr , email , phoneNumber,  isActive } =
        this.addOfficersForm.value;
      const payload: Officer = {
        id,
        name,
        nameAR,
        loginName,
        title,
        titleAr,
        phoneNumber,
        email,
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

    this.router.navigate(['/organizations/view-officers']);
  }
}
