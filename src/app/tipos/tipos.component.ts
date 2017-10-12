import {
  Component,
  OnInit, OnDestroy,
  NgModule
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Http } from '@angular/http';
import { ConfirmationService } from 'primeng/primeng';
import { Subscription } from 'rxjs/Subscription';
import { SelectItem, Message } from 'primeng/primeng';

import { Itipos } from './../comuns/dominios/i-tipos';
import { ComunsService } from './../comuns/comuns.service';
import { NavtopobservService } from './../navtopobserv.service';
import { ErrosService } from './../comuns/erros.service';
import { TiposService } from './tipos.service';

@Component({
  selector: 'app-tipos',
  templateUrl: './tipos.component.html',
  styleUrls: ['./tipos.component.css']
})
export class TiposComponent implements OnInit {

  menutipo: any;
  listaTipos: any[];
  selectlistaTipos: Itipos;
  isNovoregistro = false;
  isAtivo = true;
  gridTipo: any[];
  msgs: any[];
  formTipos: FormGroup;
  first: any = 0;
  listRows: any;

  constructor(private formBuilder: FormBuilder,
    private tiposSevice: TiposService,
    private route: ActivatedRoute,
    private router: Router,
    private service: ComunsService,
    private comuns: ComunsService,
    private confirmationService: ConfirmationService,
    private erros: ErrosService) { }

  ngOnInit() {

    this.formTipos = this.formBuilder.group({
      id: [null],
      nome: [null, Validators.required],
      alias: [null, Validators.required],
      isativo: [null],
      istravado: [null]
    });

    let idTipos: string = this.route.snapshot.paramMap.get('id');
    this.gridTipo = this.comuns.getDropDownTipos();

    this.route.params.subscribe(
      (parametros: any) => {
        this.limpDadosForm();
        idTipos = parametros['id'];
        // console.log('Teste Parametro ID: ', idTipos);
        this.isNovoregistro = false;
        this.selectlistaTipos = null;
        this.isAtivo = true;

        this.menutipo = this.service.getTiposById(idTipos);
        // console.log('Teste Menu Tipo: ', this.menutipo);

        this.tiposSevice.getTipos(this.menutipo.Url).subscribe((response) => {
          this.listaTipos = response;
        },
          (error) => {
            this.msgs.push(this.erros.getMensagens(error));
          });

      }
    );
  }

  myloadData(event) {
    this.first = event.first;
    this.listRows = event.rows;
  }

  selectTipos(index) {
    this.selectlistaTipos = this.listaTipos[((index) ? index : 0) + this.first];
    this.populaDadosForm();
    this.isNovoregistro = false;
    this.isAtivo = false;

  }

  selectTiposForView(index) {
    this.selectlistaTipos = this.listaTipos[((index) ? index : 0) + this.first];
    this.populaDadosForm();
    this.isNovoregistro = false;
    this.isAtivo = true;
  }

  populaDadosForm() {
    // this.formulario.setValue({});
    this.formTipos.patchValue({
      id: this.selectlistaTipos.id,
      nome: this.selectlistaTipos.nome,
      alias: this.selectlistaTipos.alias,
      isativo: (this.selectlistaTipos.isativo === 1),
      istravado: (this.selectlistaTipos.isativo === 1)
    });
  }

  btnNovo() {
    this.isNovoregistro = true;
    this.selectlistaTipos = null;
    this.limpDadosForm();
    this.isAtivo = false;
  }

  limpDadosForm() {
    this.formTipos.patchValue({
      id: null,
      nome: null,
      alias: null,
      isativo: true,
      istravado: null
    });
    const mydate = null;
  }

  confirmaExclusao() {
    // this.selectlistaTipos = this.listaTipos[((index) ? index : 0) + this.first];;
    if (this.formTipos.get('id').value != null) {
      console.log('Excluindo...', this.formTipos.get('id').value);
      this.msgs = [];
      this.confirmationService.confirm({
        message: 'Tem certeza que deseja excluir o registro numero ' + this.formTipos.get('id').value + ' ?',
        accept: () => {
          // Actual logic to perform a confirmation
          this.tiposSevice.deleteTipo(this.menutipo.Url, this.formTipos.get('id').value).subscribe((response) => {

            // this.listaTipos = this.comuns.deletarItem(this.listaTipos, tipo);
            this.tiposSevice.getTipos(this.menutipo.Url).subscribe(resp => this.listaTipos = resp);
            this.limpDadosForm();
          },
            (error) => {
              this.msgs.push(this.erros.getMensagens(error));
            });
          if (this.msgs == null) {
            this.msgs = [{ severity: 'success', summary: 'Sucesso!', detail: 'Registro excluido!' }];
          }
        },
        reject: () => {
          this.msgs = [{ severity: 'info', summary: 'Informativo.', detail: 'Ação revertida!' }];
        }
      });
    } else {
      this.msgs = [{ severity: 'info', summary: 'Informativo.', detail: 'Selecione um registro!' }];
    }
  }

  onSubmit(e) {
    // console.log('Verifica se é valido: ', this.formTipos.valid);
    if (this.formTipos.valid) {

      const tempFormTipo = JSON.stringify(this.formTipos.value);
      const denyFields = ['id'];
      if (!this.menutipo.isAtivo) { denyFields.push('isativo'); }
      if (!this.menutipo.istravado) { denyFields.push('istravado'); }

      const postFiels = this.comuns.retiraAttributoStringToJson(tempFormTipo, denyFields);
      // console.log('denyFields: ', denyFields);
      // console.log('postFiels: ', postFiels);

      if (this.isNovoregistro === true) {

        this.tiposSevice.inserirTipo(this.menutipo.Url, JSON.stringify(postFiels))
          .subscribe((response) => {
            this.formTipos.patchValue({ id: response.id });

            this.msgs = [{ severity: 'success', summary: 'Sucesso!', detail: 'Registro Inserido!' }];

            this.tiposSevice.getTipos(this.menutipo.Url).subscribe(resp => this.listaTipos = resp);
            // this.btnConacelar();
          },
          (error) => {
            this.msgs.push(this.erros.getMensagens(error));
          });
      } else {

        this.tiposSevice.updateTipo(this.menutipo.Url, JSON.stringify(this.formTipos.value))
          .subscribe((response) => {
            // this.listaTipos = response;
            // console.log('Retorno do servidor', response);
            this.listaTipos.push.apply(this.listaTipos, response);

            this.tiposSevice.getTipos(this.menutipo.Url).subscribe(resp => this.listaTipos = resp);
            this.msgs = [{ severity: 'success', summary: 'Sucesso!', detail: 'Registro Atualizado!' }];
            // this.btnConacelar();
          },
          (error) => {
            console.log('Erro.');
            // console.log(this.erros.getMensagens(error));
            this.msgs.push(this.erros.getMensagens(error));
          });
      }
      // console.log('Objeto ', this.formTipos.value);
      // console.log('JSON.stringify ', this.formTipos.value);

    } else {
      // console.log('formulario invalido');
      this.msgs = this.erros.verificaValidacoesForm(this.formTipos);
    }
  }
}
