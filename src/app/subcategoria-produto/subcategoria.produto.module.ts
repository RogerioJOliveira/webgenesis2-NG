import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PanelModule, SharedModule, TabViewModule } from 'primeng/primeng';
import { OverlayPanelModule, PaginatorModule, ButtonModule } from 'primeng/primeng';
import { InputMaskModule, InputSwitchModule, InputTextModule } from 'primeng/primeng';
import { InputTextareaModule, SelectButtonModule, AutoCompleteModule } from 'primeng/primeng';
import { ConfirmDialogModule, MessagesModule, DropdownModule } from 'primeng/primeng';
import { DataListModule, PanelMenuModule, ConfirmationService } from 'primeng/primeng';
import { TooltipModule } from 'primeng/primeng';

import { ErrosService } from './../comuns/erros.service';
import { ComunsService } from './../comuns/comuns.service';
import { SubCategoriaProdutoService } from './subcategoria.produto.service';
import { SubcategoriaProdutoComponent } from './subcategoria.produto.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PanelModule,
    SharedModule,
    PanelMenuModule,
    TabViewModule,
    DataListModule,
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
    MessagesModule,
    TooltipModule
  ],
  declarations: [ SubcategoriaProdutoComponent ],
  exports: [ SubcategoriaProdutoComponent ],
  providers: [ SubCategoriaProdutoService, ComunsService, ConfirmationService, ErrosService ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SubcategoriaProdutoModule { }
