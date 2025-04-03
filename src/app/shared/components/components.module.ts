import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbHighlight, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SelectModule } from 'primeng/select';
import { DialogModule } from 'primeng/dialog';
import { RatingModule } from 'primeng/rating';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressBarModule } from 'primeng/progressbar';
import { TagModule } from 'primeng/tag';
import { SliderModule } from 'primeng/slider';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { TabsModule } from 'primeng/tabs';
import { InputTextModule } from 'primeng/inputtext';
import { ChipModule } from 'primeng/chip';
import { StepperModule } from 'primeng/stepper';
import { PanelMenuModule } from 'primeng/panelmenu';

import { TableComponent } from './table/table.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { DeleteModuleComponent } from './delete-module/delete-module.component';
import { NotificationComponent } from './notification/notification.component';
import { FormComponent } from './form/form.component';
import { SplitButtonModule } from 'primeng/splitbutton';
import { CalendarModule } from 'primeng/calendar';
import { ToolbarFormComponent } from './toolbar-form/toolbar-form.component';
import { TextareaModule } from 'primeng/textarea';
import { CheckboxModule } from 'primeng/checkbox';
import { PaginatorModule } from 'primeng/paginator';
import { ToolbarTableComponent } from './toolbar-table/toolbar-table.component';
import { CardComponent } from './card/card.component';
import { CardModule } from 'primeng/card';
import { ToolbarCardComponent } from './toolbar-card/toolbar-card.component';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ToolbarCompoundComponent } from './toolbar-compound/toolbar-compound.component';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ReactiveFormsModule } from '@angular/forms';
import { SectorDropdownComponent } from './dropdowns/sector-dropdown/sector-dropdown.component';
import { SubSectorDropdownComponent } from './dropdowns/sub-sector-dropdown/sub-sector-dropdown.component';

@NgModule({
  declarations: [
    TableComponent,
    SideMenuComponent,
    NavBarComponent,
    DeleteModuleComponent,
    NotificationComponent,
    FormComponent,
    ToolbarFormComponent,
    ToolbarTableComponent,
    CardComponent,
    ToolbarCardComponent,
    ToolbarCompoundComponent,
    SectorDropdownComponent,
    SubSectorDropdownComponent,
  ],
  imports: [
    CommonModule,
    ToolbarModule,
    AvatarModule,
    AvatarGroupModule,
    SelectModule,
    CalendarModule,
    PaginatorModule,
    StepperModule,
    DatePickerModule,
    CheckboxModule,
    CardModule,
    SplitButtonModule,
    ChipModule,
    ButtonModule,
    MultiSelectModule,
    DropdownModule,
    ProgressBarModule,
    PanelMenuModule,
    AutoCompleteModule,
    InputTextModule,
    MenuModule,
    ToggleSwitchModule,
    NgbHighlight,
    FormsModule,
    FloatLabelModule,
    ConfirmDialogModule,
    TabsModule,
    InputGroupModule,
    InputGroupAddonModule,
    NgbPaginationModule,
    DialogModule,
    TagModule,
    IconFieldModule,
    InputIconModule,
    TableModule,
    FileUploadModule,
    RatingModule,
    SliderModule,
    FormsModule,
    TextareaModule,
    TieredMenuModule,
    PanelMenuModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe, AsyncPipe],
  exports: [
    TableComponent,
    ToolbarFormComponent,
    SideMenuComponent,
    NavBarComponent,
    NotificationComponent,
    DeleteModuleComponent,
    FormComponent,
    ToolbarTableComponent,
    CardComponent,
    ToolbarCardComponent,
    ToolbarCompoundComponent,
    SectorDropdownComponent,
    SubSectorDropdownComponent,
  ],
})
export class ComponentsModule {}
