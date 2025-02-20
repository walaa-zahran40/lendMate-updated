import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule, DecimalPipe } from '@angular/common';
import { ClientDetailsDialogComponent } from './client-details-dialog/client-details-dialog.component';
import { DropdownListsModule } from './dropdown-lists/dropdown-lists.module';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { TableComponent } from './table/table.component';
import { HeaderComponent } from './header/header.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SelectModule } from 'primeng/select';
import { DialogModule } from 'primeng/dialog';
import { RatingModule } from 'primeng/rating';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FileUploadModule } from 'primeng/fileupload';
import { SharedModule } from 'primeng/api';
import { ProgressBarModule } from 'primeng/progressbar';
import { TagModule } from 'primeng/tag';
import { SliderModule } from 'primeng/slider';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { NgbHighlight, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    ClientDetailsDialogComponent,
    FileUploaderComponent,
    TableComponent,
    HeaderComponent,
    SideMenuComponent,
    NavBarComponent,
  ],
  imports: [
    CommonModule,
    DropdownListsModule,
    ToolbarModule,
    AvatarModule,
    AvatarGroupModule,
    SelectModule,
    ButtonModule,

    MultiSelectModule,
    DropdownModule,
    ProgressBarModule,
    AutoCompleteModule,
    MenuModule,
    ToggleSwitchModule,
    NgbHighlight,
    FormsModule,
    ConfirmDialogModule,
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
    SharedModule,
    SliderModule,
  ],
  providers: [DecimalPipe, AsyncPipe],
  exports: [
    ClientDetailsDialogComponent,
    FileUploaderComponent,
    TableComponent,
    HeaderComponent,
    SideMenuComponent,
    NavBarComponent,
    ToolbarModule,
  ],
})
export class ComponentsModule {}
