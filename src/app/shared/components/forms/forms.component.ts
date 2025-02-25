import { Component, Input } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

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
  sectors!: any[];
  selectedSectors!: any[];
  legalFormLaw!: any[];
  selectedLegalFormLaw!: any[];
  subSectors!: any[];
  selectedSubSectors!: any[];
  legalForm!: any[];
  selectedLegalForm!: any[];
  documentTypes!: any[];
  selectedDocumentTypes!: any[];
  items!: MenuItem[];
  date2: Date | undefined;
  stamps!: any[];
  @Input() title!: string;
  @Input() header!: string;
  @Input() description!: string;
  @Input() showMain!: boolean;
  @Input() showLegal!: boolean;
  @Input() showBusiness!: boolean;
  @Input() backExists!: boolean;
  @Input() showUpload!: boolean;
  constructor() {}
  ngOnInit() {
    this.sectors = [
      { name: 'Technology', code: 'T' },
      { name: 'Programming', code: 'P' },
      { name: 'Machine Learning', code: 'ML' },
    ];
    this.subSectors = [
      { name: 'AI', code: 'AI' },
      { name: 'Marketing Field', code: 'MF' },
    ];
    this.legalFormLaw = [{ name: 'Form Law 206', code: '206' }];
    this.legalForm = [{ name: 'Form Law 105', code: '105' }];
    this.stamps = [
      { name: 'Yes', code: '1' },
      { name: 'No', code: '0' },
    ];
    this.documentTypes = [
      { name: 'PDF', code: 'pdf' },
      { name: 'Word', code: 'word' },
    ];
    this.items = [
      {
        label: 'Update',
        icon: 'pi pi-refresh',
      },
      {
        label: 'Delete',
        icon: 'pi pi-times',
      },
    ];
  }
}
