import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComunsService } from './comuns.service';
import { DropdownModule, MessagesModule } from 'primeng/primeng';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { Message } from 'primeng/components/common/message';

@NgModule({
  imports: [
    CommonModule,
    DropdownModule,
    MessagesModule
  ],
  declarations: [FormDebugComponent],
  providers: [ComunsService],
  exports: [
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    FormDebugComponent
  ]
})
export class ComunsModule { }
