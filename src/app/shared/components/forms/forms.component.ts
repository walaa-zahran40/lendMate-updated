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
  selectedSubSectors!: any[];
  subSectors!: any[];
  legalForm!: any[];
  selectedLegalForm!: any[];
  items!: MenuItem[];

  stamps!: any[];
  @Input() title!: string;
  @Input() description!: string;
  @Input() showMain!: boolean;
  @Input() showLegal!: boolean;
  @Input() showBusiness!: boolean;
  constructor(private messageService: MessageService) {}
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
