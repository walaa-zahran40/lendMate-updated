import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-forms',
  standalone: false,
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss',
})
export class FormsComponent {
  value: string | undefined;
  value1: string | undefined;
  value2: string | undefined;
  value3: string | undefined;
  value4: string | undefined;
  value5: string | undefined;
  value6: string | undefined;
  value7: string | undefined;
  value8: string | undefined;
  value9: string | undefined;
  value10: string | undefined;
  value11: string | undefined;
  value12: string | undefined;
  value13: string | undefined;
  value14: string | undefined;
  value15: string | undefined;
  value16: string | undefined;
  value17: string | undefined;
  value18: string | undefined;
  value19: string | undefined;
  value20: string | undefined;
  value21: string | undefined;
  value22: string | undefined;
  value23: string | undefined;
  value24: string | undefined;
  value25: string | undefined;
  value26: string | undefined;
  value27: string | undefined;
  value28: string | undefined;
  value29: string | undefined;
  value30: string | undefined;
  value31: string | undefined;
  value32: string | undefined;
  value33: string | undefined;
  value34: string | undefined;

  sectors!: any[];
  selectedSectors!: any[];
  sectorsIndividual!: any[];
  selectedSectorsIndividual!: any[];
  legalFormLaw!: any[];
  selectedLegalFormLaw!: any[];
  subSectors!: any[];
  selectedSubSectors!: any[];
  documents!: any[];
  selectedDocuments!: any[];
  areas!: any[];
  selectedAreas!: any[];
  governments!: any[];
  selectedGovernments!: any[];
  addresses!: any[];
  selectedAddresses!: any[];
  subSectorsIndividual!: any[];
  selectedSubSectorsIndividual!: any[];
  identityIndividual!: any[];
  selectedIdentityIndividual!: any[];
  genders!: any[];
  selectedGenders!: any[];
  countries!: any[];
  selectedCountries!: any[];
  legalForm!: any[];
  selectedLegalForm!: any[];
  selectedDocumentTypes!: any[];
  isMain!: any[];
  selectedIsMain!: any[];
  isActive!: any[];
  selectedIsActive!: any[];

  date: Date | undefined;
  date1: Date | undefined;
  date2: Date | undefined;
  date3: Date | undefined;
  date4: Date | undefined;

  stamps!: any[];

  @Input() title!: string;
  @Input() titleIndividual!: string;
  @Input() descriptionIndividual!: string;
  @Input() addClient!: boolean;
  @Input() description!: string;
  @Input() addClientShowMain!: boolean;
  @Input() addAddressShowMain!: boolean;
  @Input() clientOnboardingCompanyShowMain!: boolean;
  @Input() clientOnboardingIndividualShowMain!: boolean;
  @Input() uploadDocumentsShowMain!: boolean;
  @Input() addSalesShowMain!: boolean;
  @Input() addClientShowLegal!: boolean;
  @Input() addClientShowBusiness!: boolean;
  @Input() addClientShowIndividual!: boolean;
  @Input() clientOnboarding!: boolean;
  @Input() clientOnboardingShowIndividual!: boolean;

  constructor() {}
  ngOnInit() {
    this.sectors = [
      { name: 'Technology', code: 'T' },
      { name: 'Programming', code: 'P' },
      { name: 'Machine Learning', code: 'ML' },
    ];
    this.sectorsIndividual = [
      { name: 'Technology', code: 'T' },
      { name: 'Programming', code: 'P' },
      { name: 'Machine Learning', code: 'ML' },
    ];
    this.subSectors = [
      { name: 'AI', code: 'AI' },
      { name: 'Marketing Field', code: 'MF' },
    ];
    this.subSectorsIndividual = [
      { name: 'AI', code: 'AI' },
      { name: 'Marketing Field', code: 'MF' },
    ];
    this.legalFormLaw = [{ name: 'Form Law 206', code: '206' }];
    this.legalForm = [{ name: 'Form Law 105', code: '105' }];
    this.stamps = [
      { name: 'Yes', code: '1' },
      { name: 'No', code: '0' },
    ];
    this.documents = [
      { name: 'PDF', code: 'pdf' },
      { name: 'Word', code: 'word' },
    ];
    this.areas = [
      { name: 'Giza', code: 'giza' },
      { name: 'New Cairo', code: 'nc' },
    ];
    this.governments = [
      { name: 'Haram', code: 'haram' },
      { name: 'Andalus', code: 'andalus' },
    ];
    this.genders = [
      { name: 'Male', code: 'male' },
      { name: 'Female', code: 'female' },
    ];
    this.identityIndividual = [{ name: 'Identity', code: 'identity' }];
    this.addresses = [{ name: 'Address Type', code: 'adType' }];
    this.countries = [
      { name: 'Egypt', code: 'egypt' },
      { name: 'UAE', code: 'uae' },
    ];
    this.isActive = [
      { name: 'Yes', code: 'yes' },
      { name: 'NO', code: 'no' },
    ];
    this.isMain = [
      { name: 'Yes', code: 'yes' },
      { name: 'NO', code: 'no' },
    ];
  }
}
