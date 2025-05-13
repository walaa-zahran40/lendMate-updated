// // import { Component } from '@angular/core';
// // import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// // import { ActivatedRoute, Router } from '@angular/router';
// // import { Observable, Subject, forkJoin, filter, take, takeUntil, tap } from 'rxjs';
// // import { arabicOnlyValidator } from '../../../../../shared/validators/arabic-only.validator';
// // import { Officer } from '../../../store/officers/officer.model';
// // import { DepartmentManagersFacade } from '../../../store/department-managers/department-managers.facade';
// // import { OfficersFacade } from '../../../store/officers/officers.facade';
// // import { DepartmentManager } from '../../../store/department-managers/department-manager.model';

// // @Component({
// //   selector: 'app-add-department-manager',
// //   standalone: false,
// //   templateUrl: './add-department-manager.component.html',
// //   styleUrl: './add-department-manager.component.scss',
// // })
// // export class AddDepartmentManagerComponent {
// //   mode!: 'add' | 'edit' | 'view';
// //   editMode: boolean = false;
// //   viewOnly = false;
// //   addDepartmentManagerORGForm!: FormGroup;
// //   clientId: any;
// //   officers$!: Observable<Officer[]>;
// //   departmentId: any;
// //   officerId: any;
// //   recordId!: number;
// //   private destroy$ = new Subject<void>();

// //   constructor(
// //     private fb: FormBuilder,
// //     private route: ActivatedRoute,
// //     private router: Router,
// //     private departmentManagersFacade: DepartmentManagersFacade,
// //      private officerFacade: OfficersFacade,

    
// //   ) {}

  
// //  ngOnInit(): void {
// //   console.log('🟢 ngOnInit start');
// //  console.log('🔎 All queryParams:', this.route.snapshot.queryParams);
 
// //   // pick whichever one actually exists:
// //   const rawParam =
// //     this.route.snapshot.queryParamMap.get('departmentId')
// //     ?? this.route.snapshot.queryParamMap.get('departmentId');
 
// //   console.log('🛠️ rawParam for departmentId:', rawParam);
 
// //   // coerce to number, guard against missing or non-numeric:
// //   this.departmentId = rawParam != null && !isNaN(+rawParam) ? +rawParam : null;
// //   console.log('▶️ Parsed departmentId:', this.departmentId);
// //   // 1️⃣ Read route parameters
// //   console.log('Route snapshot:', this.route.snapshot);
// //   this.departmentId = Number(this.route.snapshot.queryParams['departmentId']);
// //   console.log('Parsed departmentId:', this.departmentId);
 
// //   this.mode = (this.route.snapshot.queryParamMap.get('mode') as 'add' | 'edit' | 'view') ?? 'add';
// //   console.log("arwaaaaaaaaaaaaa " + this.mode);
// //   this.editMode = this.mode === 'edit';
// //   this.viewOnly = this.mode === 'view';
// //   console.log('🔍 Mode flags:', {
// //     mode: this.mode,
// //     editMode: this.editMode,
// //     viewOnly: this.viewOnly
// //   });
 
// //   // 2️⃣ Dispatch lookups
// //   console.log('🚀 Loading officers…');
// //   this.officerFacade.loadAll();
// //   this.officers$ = this.officerFacade.items$;
// //   this.officers$.pipe(take(1)).subscribe(list => console.log('👮 officers list:', list));
 
// //   // 3️⃣ Build form
// //   this.addDepartmentManagerORGForm = this.fb.group({
// //     officerId:   [null, [Validators.required]],
// //     departmentId:[null, [Validators.required]],
// //     startDate:   [null, Validators.required],
// //   });
// //   console.log('🛠️ Form controls:', Object.keys(this.addDepartmentManagerORGForm.controls));
 
// //   // 4️⃣ Patch default for add mode
// //   if (this.mode === 'add') {
// //     this.addDepartmentManagerORGForm.patchValue({
// //       departmentId: this.departmentId,
// //       officerId:    this.officerId,
// //       startDate :  this.startDate
// //     });
// //     console.log('✏️ Add-mode form value:', this.addDepartmentManagerORGForm.value);
// //   }
 
// //       // 
// //        if (this.editMode || this.viewOnly) {
// //   console.log('▶️ Loading for departmentId:', this.departmentId);
// //   this.departmentManagersFacade.loadDepartmentManagersByDepartmentId(this.departmentId);
 
// //   this.departmentManagersFacade.current$
// //     .pipe(
// //       takeUntil(this.destroy$),
// //       tap(rec => console.log('👀 current$ emission (before filter):', rec)),
// //       filter((rec): rec is NonNullable<typeof rec> => rec != null),
// //       tap(rec => console.log('✅ passed non-null filter:', rec)),
// //       take(1)
// //     )
// //     .subscribe(rec => {
// //       console.log('🔴 Patching form with rec:', rec);
// //       this.addDepartmentManagerORGForm.patchValue({
// //         id:           rec.id,
// //         departmentId: this.departmentId,
// //         officerId:    rec.officerId,
// //         startDate:    new Date(rec.startDate),
// //       });
// //       console.log('🟣 Form after patch:', this.addDepartmentManagerORGForm.value);
// //     });
// // }

// //   console.log('🟢 ngOnInit end');
// // }

// //   addOrEditDepartmentManager() {
// //     console.log('🛣️ Route snapshot:', this.route.snapshot);
// //     const departmentParamQP = this.route.snapshot.queryParams['departmentId'];

// //     // 3) Log the component’s mode flags
// //     console.log(
// //       `⚙️ mode = ${this.mode}, editMode = ${this.editMode}, viewOnly = ${this.viewOnly}`
// //     );

// //     // 4) Early return in view-only
// //     if (this.viewOnly) {
// //       console.warn('🚫 viewOnly mode — aborting submit');
// //       return;
// //     }

// //     // 5) Form validity
// //     if (this.addDepartmentManagerORGForm.invalid) {
// //       console.warn('❌ Form is invalid → marking all touched');
// //       this.addDepartmentManagerORGForm.markAllAsTouched();
// //       return;
// //     }

// //     // 6) The actual payload
// //     const data = this.addDepartmentManagerORGForm
// //       .value as Partial<DepartmentManager>;
// //     console.log('📦 Payload going to facade:', data);

// //     // 7) Create vs. update
// //     if (this.mode === 'add') {
// //       console.log('➕ Dispatching CREATE');
// //       this.departmentManagersFacade.create(data);
// //     } else {
// //       console.log('✏️ Dispatching UPDATE id=', data.id);
// //       this.departmentManagersFacade.update(data.id!, data);
// //     }

// //     // 8) Navigate back: try both query-param and path-param approaches
// //     if (departmentParamQP) {
// //       console.log('➡️ Navigating back with PATH param:', departmentParamQP);
// //       this.router.navigate([
// //         '/organizations/view-department-managers',
// //         departmentParamQP,
// //       ]);
// //     } else if (departmentParamQP) {
// //       console.log(
// //         '➡️ Navigating back with QUERY param fallback:',
// //         departmentParamQP
// //       );
// //       this.router.navigate([
// //         `/organizations/view-department-managers/${departmentParamQP}`,
// //       ]);
// //     } else {
// //       console.error('❌ Cannot navigate back: departmentId is missing!');
// //     }
// //   }

// //   ngOnDestroy() {
// //     this.destroy$.next();
// //     this.destroy$.complete();
// //   }
// // }




// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { filter, Observable, Subject, take, takeUntil, tap } from 'rxjs';
// import { Officer } from '../../../store/officers/officer.model';
// import { OfficersFacade } from '../../../store/officers/officers.facade';
// import { Department } from '../../../store/departments/department.model';
// import { DepartmentManagersFacade } from '../../../store/department-managers/department-managers.facade';
// import { DepartmentManager } from '../../../store/department-managers/department-manager.model';

// @Component({
//   selector: 'app-add-department-manager',
//   standalone: false,
//   templateUrl: './add-department-manager.component.html',
//   styleUrl: './add-department-manager.component.scss',
// })
// export class AddDepartmentManagerComponent implements OnInit, OnDestroy {
//   // Flags driven by mode
//   editMode = false;
//   viewOnly = false;

//   // Reactive form
//   addDepartmentManagerORGForm!: FormGroup;

//   // Lists and IDs
//   mode!: 'add' | 'edit' | 'view';
//   parentDepartmentId!: number;
//   officers$!: Observable<Officer[]>;

//   private destroy$ = new Subject<void>();
  
//   constructor(
//     private fb: FormBuilder,
//     private route: ActivatedRoute,
//     private departmentManagersFasad: DepartmentManagersFacade,
//     private officersFacade: OfficersFacade,
//     private router: Router
//   ) {}

//   ngOnInit() {
//     // Read mode and set flags
//     this.mode = (this.route.snapshot.queryParamMap.get('mode') as any) ?? 'add';
//     this.editMode = this.mode === 'edit';
//     this.viewOnly = this.mode === 'view';

//     // Read IDs
//     this.parentDepartmentId = Number(
//       this.route.snapshot.queryParamMap.get('departmentId')
//     );
//     if (this.editMode || this.viewOnly) {
//       this.departmentManagersFasad.loadDepartmentManagersByDepartmentId(this.parentDepartmentId);
//     }

//     // Build form with department
//     this.addDepartmentManagerORGForm = this.fb.group({
//       id: [null],
//       departmentId: this.parentDepartmentId,
//       officerId: [null, Validators.required],
//       startDate: [null, Validators.required]
//     });

//     //   // 2️⃣ Dispatch lookups
// //   console.log('🚀 Loading officers…');
//   this.officersFacade.loadAll();
//   this.officers$ = this.officersFacade.items$;
//   this.officers$.pipe(take(1)).subscribe(list => console.log('👮 officers list:', list));


//     // Patch for add mode
//     if (this.mode === 'add') {
//       this.addDepartmentManagerORGForm.patchValue({
//         departmentId : this.parentDepartmentId,
//         officerId: [null, Validators.required],
//         startDate: [null, Validators.required]
//       });
//     }

//     this.departmentManagersFasad.loadDepartmentManagersByDepartmentId(this.parentDepartmentId);

// this.departmentManagersFasad.items$.pipe(
//   filter(list => list.length > 0),
//   take(1)
// ).subscribe(list => {
//   const first = list[0]; // or find correct one
//   this.departmentManagersFasad.loadOne(first.id); // THIS will populate current$
// });



//     // Patch for edit/view mode
//     if (this.editMode || this.viewOnly) {
//       this.departmentManagersFasad.loadDepartmentManagersByDepartmentId(this.parentDepartmentId);
//       this.departmentManagersFasad.current$
//         .pipe(
//           takeUntil(this.destroy$),
//           filter((rec) => !!rec),
//           tap(rec => console.log("reccccc" + rec))
//         )
//         .subscribe((rec) => {
//           console.log('red', rec);
//           this.addDepartmentManagerORGForm.patchValue({
//             id: rec.id,
//             department: this.parentDepartmentId,
//             officerId: rec.officerId,
//             startDate:new Date(rec.startDate),
//             isCurrent: rec!.isCurrent,
//           });
//         });
//     }
//   }

//   addOrEditDepartmentManager() {
//     // 1) Log the full ActivatedRoute snapshot
//     console.log('🛣️ Route snapshot:', this.route.snapshot);

//     // 2) Extract both paramMap and queryParamMap in parallel
//     const deptParamId = this.route.snapshot.queryParamMap.get('departmentId');

//     console.log(`🔍 QueryParams → department = ${deptParamId}`);

//     // 3) Log the component’s mode flags
//     console.log(
//       `⚙️ mode = ${this.mode}, editMode = ${this.editMode}, viewOnly = ${this.viewOnly}`
//     );

//     // 4) Early return in view-only
//     if (this.viewOnly) {
//       console.warn('🚫 viewOnly mode — aborting submit');
//       return;
//     }

//     // 5) Form validity
//     if (this.addDepartmentManagerORGForm.invalid) {
//       console.warn('❌ Form is invalid → marking all touched');
//       this.addDepartmentManagerORGForm.markAllAsTouched();
//       return;
//     }

//     // 6) The actual payload
//     const data = this.addDepartmentManagerORGForm
//       .value as Partial<DepartmentManager>;
//     console.log('📦 Payload going to facade:', data);

//     // 7) Create vs. update
//     if (this.mode === 'add') {
//       console.log('➕ Dispatching CREATE');
//       this.departmentManagersFasad.create(data);
//     } else {
//       console.log('✏️ Dispatching UPDATE id=', data.id);
//       this.departmentManagersFasad.update(data.id!, data);
//     }

//     // 8) Navigate back: try both query-param and path-param approaches
//     if (deptParamId) {
//       console.log('➡️ Navigating back with PATH param:', deptParamId);
//       this.router.navigate([
//         '/organizations/view-department-managers',
//         deptParamId,
//       ]);
//     } else if (deptParamId) {
//       console.log(
//         '➡️ Navigating back with QUERY param fallback:',
//         deptParamId
//       );
//       this.router.navigate([
//         `/organizations/view-department-managers/${deptParamId}`,
//       ]);
//     } else {
//       console.error('❌ Cannot navigate back: department is missing!');
//     }
//   }

//   ngOnDestroy() {
//     this.destroy$.next();
//     this.destroy$.complete();
//   }
// }





import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, Observable, Subject, takeUntil } from 'rxjs';
import { DepartmentManagersFacade } from '../../../store/department-managers/department-managers.facade';
import { DepartmentManager } from '../../../store/department-managers/department-manager.model';
import { Department } from '../../../store/departments/department.model';
import { DepartmentsFacade } from '../../../store/departments/departments.facade';
import { Officer } from '../../../store/officers/officer.model';
import { OfficersFacade } from '../../../store/officers/officers.facade';

@Component({
  selector: 'app-add-department-manager',
  standalone: false,
  templateUrl: './add-department-manager.component.html',
  styleUrl: './add-department-manager.component.scss',
})
export class AddDepartmentManagerComponent {
  // Flags driven by mode
  editMode = false;
  viewOnly = false;

  // Reactive form
  addDepartmentManagerORGForm!: FormGroup;

  // Lists and IDs
  departments: Department[] = [];
  mode!: 'add' | 'edit' | 'view';
  parentDepartmentId!: number;
  recordId!: number;
  officers$!: Observable<Officer[]>;

  private destroy$ = new Subject<void>();
  
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private exchangeFacade: DepartmentManagersFacade,
    private officersFacade: OfficersFacade,
    private router: Router
  ) {}

  ngOnInit() {
    // Read mode and set flags
    this.mode = (this.route.snapshot.queryParamMap.get('mode') as any) ?? 'add';
    this.editMode = this.mode === 'edit';
    this.viewOnly = this.mode === 'view';

    // Read IDs
    this.parentDepartmentId = Number(
      this.route.snapshot.queryParamMap.get('departmentId')
    );
    if (this.editMode || this.viewOnly) {
      this.recordId = Number(this.route.snapshot.paramMap.get('id'));
      this.exchangeFacade.loadOne(this.recordId);
    }

    // Build form with departmentId
    this.addDepartmentManagerORGForm = this.fb.group({
      id: [null],
      departmentId: [null, Validators.required],
      managerId: [null, Validators.required],
      startDate: [null, Validators.required],
      isCurrent: [true],
    });

    // Load department dropdown
    this.officersFacade.loadAll();
    this.officers$ = this.officersFacade.items$;

    // Patch for add mode
    if (this.mode === 'add') {
      this.addDepartmentManagerORGForm.patchValue({
        departmentId: this.parentDepartmentId,
      });
    }

    // Patch for edit/view mode
    if (this.editMode || this.viewOnly) {
      this.exchangeFacade.current$
        .pipe(
          takeUntil(this.destroy$),
          filter((rec) => !!rec)
        )
        .subscribe((rec) => {
          console.log('red', rec);
          this.addDepartmentManagerORGForm.patchValue({
            id: rec.id,
            departmentId: this.parentDepartmentId,
            managerId: rec.officerId,
            startDate:new Date(rec.startDate),
            isCurrent: rec!.isCurrent,
          });
        });
    }
  }

  addOrEditDepartmentManager() {
    // 1) Log the full ActivatedRoute snapshot
    console.log('🛣️ Route snapshot:', this.route.snapshot);

    // 2) Extract both paramMap and queryParamMap in parallel
    const idParam = this.route.snapshot.paramMap.get('id');
    const departmentParamQP = this.route.snapshot.queryParamMap.get('departmentId');

    console.log(`🔍 QueryParams → departmentId = ${departmentParamQP}`);

    // 3) Log the component’s mode flags
    console.log(
      `⚙️ mode = ${this.mode}, editMode = ${this.editMode}, viewOnly = ${this.viewOnly}`
    );

    // 4) Early return in view-only
    if (this.viewOnly) {
      console.warn('🚫 viewOnly mode — aborting submit');
      return;
    }

    // 5) Form validity
    if (this.addDepartmentManagerORGForm.invalid) {
      console.warn('❌ Form is invalid → marking all touched');
      this.addDepartmentManagerORGForm.markAllAsTouched();
      return;
    }

    // 6) The actual payload
    const data = this.addDepartmentManagerORGForm
      .value as Partial<DepartmentManager>;
    console.log('📦 Payload going to facade:', data);

    // 7) Create vs. update
    if (this.mode === 'add') {
      console.log('➕ Dispatching CREATE');
      this.exchangeFacade.create(data);
    } else {
      console.log('✏️ Dispatching UPDATE id=', data.id);
      this.exchangeFacade.update(data.id!, data);
    }

    // 8) Navigate back: try both query-param and path-param approaches
    if (departmentParamQP) {
      console.log('➡️ Navigating back with PATH param:', departmentParamQP);
      this.router.navigate([
        '/organizations/view-department-managers',
        departmentParamQP,
      ]);
    } else if (departmentParamQP) {
      console.log(
        '➡️ Navigating back with QUERY param fallback:',
        departmentParamQP
      );
      this.router.navigate([
        `/organizations/view-department-managers/${departmentParamQP}`,
      ]);
    } else {
      console.error('❌ Cannot navigate back: departmentId is missing!');
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}











