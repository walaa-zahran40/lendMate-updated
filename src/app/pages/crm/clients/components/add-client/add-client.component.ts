import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControl,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { arabicOnlyValidator } from '../../../../../shared/validators/arabic-only.validator';
import { positiveNumberValidator } from '../../../../../shared/validators/positive-only.validator';
import { LegalFormService } from '../../services/legal-form.service';
import { Sector } from '../../../../../shared/interfaces/sector.interface';
import { LegalFormLawService } from '../../services/legal-form-law.service';
import { filter, map, Observable, take } from 'rxjs';
import { ClientTypesFacade } from '../../store/client-types/client-types.facade';
import {
  loadClient,
  updateClient,
  createClient,
} from '../../store/clients/clients.actions';
import {
  selectSubSectorList,
  selectSelectedClient,
} from '../../store/clients/clients.selectors';
import {
  selectAllSectors,
  selectSelectedSector,
} from '../../../../../shared/components/form/store/sector-drop-down/sector.selectors';
import {
  loadSectorById,
  loadSectors,
} from '../../../../../shared/components/form/store/sector-drop-down/sector.actions';
import { SubSectors } from '../../../../../shared/interfaces/sub-sector.interface';
import { selectAllSubSectors } from '../../../../../shared/components/form/store/sub-sector-drop-down/sub-sector.selectors';
import { loadSubSectors } from '../../../../../shared/components/form/store/sub-sector-drop-down/sub-sector.actions';

@Component({
  selector: 'app-add-client',
  standalone: false,
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss'],
})
export class AddClientComponent implements OnInit {
  addClientForm!: FormGroup;
  addClientFormIndividual!: FormGroup;
  addClient = true;
  selectedSectorId: number = 0;
  allSectors: any[] = [];
  sectorsList: any[] = [];
  subSectorsList: any[] = [];
  subSectorsSafe$!: Observable<SubSectors[]>;
  selectedClientType = null;
  dropdownClientTypeItems: any[] = [];
  company: boolean = false;
  individual: boolean = false;
  subSectorList$ = this.store.select(selectSubSectorList);
  dropdownlegalLawItems: Sector[] = [];
  dropdownlegalFormLawItems: Sector[] = [];
  selectedClient$!: Observable<any>;
  sectorById$!: Observable<any>;
  public editMode: boolean = false;
  public clientId: number | null = null;
  selectedLegalFormLawId: number | null = null;
  selectedLegalFormId: any;
  selectedSubSectorId: any;
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private clientTypesFacade: ClientTypesFacade,
    private legalFormService: LegalFormService,
    private legalFormlawService: LegalFormLawService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Initialize your form here (or call a separate method)
    this.buildForm();
    this.clientTypesFacade.loadClientTypes();
    this.clientTypesFacade.types$.subscribe((types) => {
      this.dropdownClientTypeItems = [...types];
      this.selectedClientType = this.dropdownClientTypeItems[1]?.id;
    });

    this.addClientFormIndividual = this.fb.group({
      nameEnglishIndividual: ['', Validators.required],
      nameAR: ['', [Validators.required, arabicOnlyValidator()]],
      businessActivity: ['', Validators.required],
      taxId: ['', [Validators.required, positiveNumberValidator()]],
      shortName: ['', Validators.required],
      sectorId: [[], Validators.required],
      subSectorIdList: [[], Validators.required],
      legalFormLawId: [null, Validators.required],
      legalFormId: [null, Validators.required],
      isStampDuty: [null, Validators.required],
      isIscore: [null, Validators.required],
      mainShare: [null, [Validators.required, Validators.min(0)]],
      establishedYear: [
        null,
        [
          Validators.required,
          Validators.pattern(/^(19|20)\d{2}$/), // Valid years: 1900–2099
        ],
      ],
      website: [
        null,
        [
          Validators.pattern(
            /^(https?:\/\/)?([\w\-]+\.)+[\w\-]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/
          ),
          Validators.required,
        ],
      ],
      marketShare: [
        null,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      marketSize: [null, [Validators.min(0), Validators.required]],
      employeesNo: [null, [Validators.required, Validators.min(0)]],
    });
    this.store.select(selectAllSectors).subscribe((sectors) => {
      this.sectorsList = sectors || [];
    });
    // this.store
    //   .select(selectAllSubSectors)
    //   .pipe(take(1))
    //   .subscribe((subs) => {
    //     if (!subs || subs.length === 0) {
    //       this.store.dispatch(loadSubSectors());
    //     }
    //   });

    // Check for an 'id' parameter to determine if we are in edit mode
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.editMode = true;
      this.clientId = +idParam;
      this.company = true;
      this.individual = false;
      // Dispatch an action to load the client data for editing
      this.store.dispatch(loadSectors());
      this.store.dispatch(loadSubSectors());

      // ✅ Now fetch the client
      this.store.dispatch(loadClient({ clientId: this.clientId }));

      // Subscribe to the store to patch the form when data is loaded
      this.selectedClient$ = this.store.select(selectSelectedClient);
      this.selectedClient$.subscribe((client) => {
        if (client) {
          if (!client.subSectorList) {
          } else if (client.subSectorList.length === 0) {
          } else {
          }

          this.patchForm(client);
        } else {
        }
      });
    } else {
    }
  }
  buildForm(): void {
    this.addClientForm = this.fb.group({
      name: ['', Validators.required],
      nameAR: ['', [Validators.required, arabicOnlyValidator()]],
      businessActivity: ['', Validators.required],
      taxId: ['', [Validators.required, positiveNumberValidator()]],
      shortName: ['', Validators.required],
      sectorId: [[], Validators.required],
      subSectorIdList: [[], Validators.required],
      legalFormLawId: [null, Validators.required],
      legalFormId: [null, Validators.required],
      isStampDuty: [null, Validators.required],
      isIscore: [null, Validators.required],
      mainShare: [null, [Validators.required, Validators.min(0)]],
      establishedYear: [
        null,
        [
          Validators.required,
          Validators.pattern(/^(19|20)\d{2}$/), // Valid years: 1900–2099
        ],
      ],
      website: [
        null,
        [
          Validators.pattern(
            /^(https?:\/\/)?([\w\-]+\.)+[\w\-]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/
          ),
          Validators.required,
        ],
      ],
      marketShare: [
        null,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      marketSize: [null, [Validators.min(0), Validators.required]],
      employeesNo: [null, [Validators.required, Validators.min(0)]],
    });
  }
  patchForm(client: any): void {
    const sectorId = client.subSectorList?.[0]?.sectorId;
    if (!sectorId) return;

    this.store.dispatch(loadSectorById({ id: sectorId }));

    this.store
      .select(selectAllSubSectors)
      .pipe(
        filter((subs) => subs.length > 0),
        take(1),
        map((subs) => {
          const sectorSubs = subs.filter((s) => s.sectorId === sectorId);
          const selectedIds = client.subSectorList.map((s: any) => s.id);

          // Add any missing selected subs (edge case where they don't exist in filtered list)
          const extraSelectedSubs = client.subSectorList.filter(
            (s: any) => !sectorSubs.some((sub) => sub.id === s.id)
          );

          return [...sectorSubs, ...extraSelectedSubs];
        })
      )
      .subscribe((finalSubs) => {
        this.subSectorsList = finalSubs;

        // Then patch the form after options are available
        this.addClientForm.patchValue({
          ...client,
          sectorId,
          subSectorIdList: client.subSectorList.map((s: any) => s.id),
          legalFormId: client.legalFormId?.id || client.legalFormId,
          legalFormLawId: client.legalFormLawId?.id || client.legalFormLawId,
        });
      });
  }

  fetchLegalForms(): void {
    this.legalFormService.getAllLegalForms().subscribe(
      (response: any) => {
        this.dropdownlegalLawItems = [
          ...response.items.map((item: any) => ({
            id: item.id,
            name: item.name,
            nameAR: item.nameAR,
          })),
        ];
      },
      (error) => {
        const apiErrorMessage =
          error?.error?.message || 'An unexpected error occurred';
      }
    );
  }
  fetchLegalFormLaws(): void {
    this.legalFormlawService.getAllLegalFormLaws().subscribe(
      (response: any) => {
        this.dropdownlegalFormLawItems = [
          ...response.items.map((item: any) => ({
            id: item.id,
            name: item.name,
            nameAR: item.nameAR,
          })),
        ];
      },
      (error) => {
        const apiErrorMessage =
          error?.error?.message || 'An unexpected error occurred';
      }
    );
  }
  get sectorIdControl(): FormControl {
    return this.addClientForm.get('sectorId') as FormControl;
  }

  get subSectorList(): FormArray {
    return this.addClientForm.get('subSectorIdList') as FormArray;
  }
  get legalFormList(): FormArray {
    return this.addClientForm.get('legalFormId') as FormArray;
  }

  get legalFormLawList(): FormArray {
    return this.addClientForm.get('legalFormLawId') as FormArray;
  }

  saveInfo() {
    if (this.addClientForm.invalid) {
      this.addClientForm.markAllAsTouched();
      return;
    }

    const formValue = this.addClientForm.value;
    if (this.editMode) {
      const updatedClient = {
        ...formValue,
        id: this.clientId,
        clientTypeId: this.selectedClientType,
        subSectorIdList: formValue.subSectorIdList,
        legalFormLawId: formValue.legalFormLawId,
        legalFormId: formValue.legalFormId,
        sectorId: formValue.sectorId,
      };
      // delete updatedClient.sectorId;

      this.store.dispatch(updateClient({ client: updatedClient }));
    } else {
      const payload = {
        id: this.clientId,
        name: formValue.name,
        nameAR: formValue.nameAR,
        shortName: formValue.shortName,
        businessActivity: formValue.businessActivity,
        isIscore: formValue.isIscore,
        taxId: String(formValue.taxId),
        clientTypeId: this.selectedClientType,
        sectorId: formValue.sectorId,
        subSectorIdList: formValue.subSectorIdList,
        isStampDuty: formValue.isStampDuty,
        legalFormLawId: formValue.legalFormLawId,
        legalFormId: formValue.legalFormId,
        mainShare: formValue.mainShare,
        marketShare: formValue.marketShare,
        establishedYear: formValue.establishedYear,
        website: formValue.website,
        employeesNo: formValue.employeesNo,
        marketSize: formValue.marketSize,
      };
      this.store.dispatch(createClient({ payload }));
    }
  }

  saveInfoIndividual() {
    Object.keys(this.addClientForm.controls).forEach((key) => {
      const control = this.addClientForm.get(key);
    });

    if (this.addClientForm.invalid) {
      this.addClientForm.markAllAsTouched();
      return;
    }
    const formValue = this.addClientForm.value;

    const payload = {
      name: formValue.name,
      nameAR: formValue.nameAR,
      shortName: formValue.shortName,
      businessActivity: formValue.businessActivity,
      taxId: formValue.taxId,
      legalFormId: Number(formValue.legalFormId?.id),
      legalFormLawId: Number(formValue.legalFormLawId?.id),
      isStampDuty: formValue.isStampDuty,
      isIscore: formValue.isIscore,
      clientTypeId: this.selectedClientType,
      subSectorIdList: formValue.subSectorIdList.map((item: any) => item.id),
      mainShare: formValue.mainShare,
      establishedYear: formValue.establishedYear,
      website: formValue.website,
      marketShare: formValue.marketShare,
      marketSize: formValue.marketSize,
      employeesNo: formValue.employeesNo,
    };

    this.store.dispatch(createClient({ payload }));
  }
  onLegalFormLawSelectionChange(selectedLaw: any) {
    this.selectedLegalFormLawId = selectedLaw?.id || null;
    this.addClientForm.get('legalFormId')?.reset(); // reset legal form
  }
  onClientTypeChange(event: any) {
    if (event && event.value) {
      this.selectedClientType = event;
    } else {
    }
  }

  onSectorChanged(sectorId: number) {
    this.selectedSectorId = sectorId;

    this.store
      .select(selectAllSubSectors)
      .pipe(
        take(1),
        map((subSectors) => subSectors.filter((s) => s.sectorId === sectorId))
      )
      .subscribe((filtered) => {
        this.subSectorsList = filtered;

        // Clear selected sub-sectors to prevent stale values
        this.addClientForm.patchValue({ subSectorIdList: [] });
      });
  }
}
