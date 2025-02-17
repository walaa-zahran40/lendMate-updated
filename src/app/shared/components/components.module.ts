import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientDetailsDialogComponent } from './client-details-dialog/client-details-dialog.component';
import { DropdownListsModule } from './dropdown-lists/dropdown-lists.module';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { TableComponent } from './table/table.component';
import { HeaderComponent } from './header/header.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';

@NgModule({
  declarations: [
    ClientDetailsDialogComponent,
    FileUploaderComponent,
    TableComponent,
    HeaderComponent,
    NavMenuComponent,
  ],
  imports: [CommonModule, DropdownListsModule],
})
export class ComponentsModule {}
