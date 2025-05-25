import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { Store } from '@ngrx/store';

//Models
import { Client } from '../../../../clients/store/_clients/allclients/client.model';
import { MandateValidityUnit } from '../../../../../lookups/store/mandate-validity-units/mandate-validity-unit.model';
import { Product } from '../../../../../lookups/store/products/product.model';
import { LeasingType } from '../../../../../lookups/store/leasing-types/leasing-type.model';
import { InsuredBy } from '../../../../../lookups/store/insured-by/insured-by.model';
import { Officer } from '../../../../../organizations/store/officers/officer.model';
//Facades
import { ClientsFacade } from '../../../../clients/store/_clients/allclients/clients.facade';
import { MandateValidityUnitsFacade } from '../../../../../lookups/store/mandate-validity-units/mandate-validity-units.facade';
import { ProductsFacade } from '../../../../../lookups/store/products/products.facade';
import { LeasingTypesFacade } from '../../../../../lookups/store/leasing-types/leasing-types.facade';
import { InsuredByFacade } from '../../../../../lookups/store/insured-by/insured-by.facade';
import { OfficersFacade } from '../../../../../organizations/store/officers/officers.facade';
//Actions
import { loadAll } from '../../../../clients/store/_clients/allclients/clients.actions';
import { loadAll as loadValidityUnits } from '../../../../../lookups/store/mandate-validity-units/mandate-validity-units.actions';
import { loadAll as loadProducts } from '../../../../../lookups/store/products/products.actions';
import { loadAll as loadLeasingTypes } from '../../../../../lookups/store/leasing-types/leasing-types.actions';
import { loadAll as loadInsuredBy } from '../../../../../lookups/store/insured-by/insured-by.actions';
import { loadOfficers } from '../../../../../organizations/store/officers/officers.actions';

@Component({
  selector: 'app-add-mandate',
  standalone: false,
  templateUrl: './add-mandate.component.html',
  styleUrl: './add-mandate.component.scss',
})
export class AddMandateComponent {
  addMandateShowBasicForm!: FormGroup;
  addMandateShowOfficersForm!: FormGroup;
  addMandateShowContactPersonsForm!: FormGroup;
  addMandateShowAssetTypeForm!: FormGroup;
  addMandateShowMoreInformationForm!: FormGroup;
  editMode: boolean = false;
  viewOnly: boolean = false;
  clientNames$!: Observable<Client[]>;
  validityUnits$!: Observable<MandateValidityUnit[]>;
  products$!: Observable<Product[]>;
  leasingTypes$!: Observable<LeasingType[]>;
  insuredBy$!: Observable<InsuredBy[]>;
  officers$!: Observable<Officer[]>;
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private clientFacade: ClientsFacade,
    private validityUnitFacade: MandateValidityUnitsFacade,
    private productFacade: ProductsFacade,
    private leasingTypeFacade: LeasingTypesFacade,
    private insuredByFacade: InsuredByFacade,
    private officersFacade: OfficersFacade
  ) {}

  ngOnInit() {
    //1-Mandate Basic Info Form
    this.buildMandateShowBasicForm();
    //Clients Dropdown
    this.store.dispatch(loadAll({}));
    this.clientNames$ = this.clientFacade.all$;
    //Mandate Validity Units Dropdown
    this.store.dispatch(loadValidityUnits({}));
    this.validityUnits$ = this.validityUnitFacade.all$;
    //Products Dropdown
    this.store.dispatch(loadProducts({}));
    this.products$ = this.productFacade.all$;
    //Leasing Types Dropdown
    this.store.dispatch(loadLeasingTypes({}));
    this.leasingTypes$ = this.leasingTypeFacade.all$;
    //Insured By Dropdown
    this.store.dispatch(loadInsuredBy({}));
    this.insuredBy$ = this.insuredByFacade.all$;
    //2-Mandate Officers Form
    this.buildMandateShowOfficersForm();
    //Officers Dropdown
    this.store.dispatch(loadOfficers());
    this.officers$ = this.officersFacade.items$;
    this.buildMandateShowContactPersonsForm();
    this.buildMandateShowAssetTypeForm();
    this.buildMandateShowMoreInformationForm();
  }
  buildMandateShowBasicForm(): void {
    this.addMandateShowBasicForm = this.fb.group({
      id: [null],
      clientId: [null, Validators.required],
      validityUnitId: [null, Validators.required],
      productId: [null, Validators.required],
      leasingTypeId: [null, Validators.required],
      insuredById: [null, Validators.required],
    });
  }
  buildMandateShowOfficersForm(): void {
    this.addMandateShowOfficersForm = this.fb.group({
      id: [null],
      mandateOfficers: this.fb.array([this.createMandateOfficerGroup()]),
    });
  }
  createMandateOfficerGroup(): FormGroup {
    return this.fb.group({
      id: [],
      officerName: ['', Validators.required],
    });
  }
  buildMandateShowContactPersonsForm(): void {
    this.addMandateShowContactPersonsForm = this.fb.group({
      id: [null],
      mandateContactPersons: [null],
    });
  }
  buildMandateShowAssetTypeForm(): void {
    this.addMandateShowAssetTypeForm = this.fb.group({
      id: [null],
      mandateAssetTypes: [null],
    });
  }
  buildMandateShowMoreInformationForm(): void {
    this.addMandateShowMoreInformationForm = this.fb.group({
      id: [null],
      date: [null],
      notes: [null],
      description: [null],
      validityCount: [null],
      parentMandateId: [null],
      validityUnitId: [null],
      productId: [null],
      indicativeRentals: [null],
      leasingTypeId: [null],
      insuredById: [null],
      mandateFees: [null],
      mandateGracePeriodSetting: [null],
    });
  }
  addOfficer() {
    console.log('Adding new identity group');
    this.mandateOfficers?.push(this.createMandateOfficerGroup());
  }

  removeOfficer(i: number) {
    console.log('Removing identity group at index', i);
    if (this.mandateOfficers.length > 1) {
      this.mandateOfficers.removeAt(i);
    }
  }
  get mandateOfficers(): FormArray {
    return this.addMandateShowOfficersForm.get('mandateOfficers') as FormArray;
  }
}
