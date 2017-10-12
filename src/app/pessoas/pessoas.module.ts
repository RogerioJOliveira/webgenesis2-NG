import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CalendarModule } from 'primeng/primeng';
import { PanelModule, SharedModule, DropdownModule, SelectItem, AutoCompleteModule } from 'primeng/primeng';
import { PanelMenuModule, TabViewModule, SelectButtonModule } from 'primeng/primeng';
import { DataTableModule, OverlayPanelModule } from 'primeng/primeng';
import { PaginatorModule, Message, ButtonModule, InputMaskModule } from 'primeng/primeng';
import { InputSwitchModule, InputTextModule, InputTextareaModule } from 'primeng/primeng';
import { ConfirmDialogModule, ConfirmationService} from 'primeng/primeng';
import { MessagesModule } from 'primeng/primeng';
import { PessoasComponent } from './pessoas.component';
import { PessoasService } from './pessoas.service';
import { ComunsService } from './../comuns/comuns.service';
import { ComunsModule } from './../comuns/comuns.module';
import { AddpesssoaComponent } from './addpesssoa/addpesssoa.component';
import { ErrosService } from './../comuns/erros.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PanelModule,
    SharedModule,
    PanelMenuModule,
    TabViewModule,
    DataTableModule,
    OverlayPanelModule,
    PaginatorModule,
    DropdownModule,
    ButtonModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    SelectButtonModule,
    AutoCompleteModule,
    ConfirmDialogModule,
    MessagesModule
  ],
  exports: [ PessoasComponent] ,
  providers: [ PessoasService, ComunsService, ConfirmationService, ErrosService ],
  declarations: [
    PessoasComponent,
    AddpesssoaComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class PessoasModule { }
