import { TiposService } from './../tipos/tipos.service';
import { CategoriaProdutoService } from './categoria.produto.service';
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

import { ComunsService } from './../comuns/comuns.service';
import { NavtopobservService } from './../navtopobserv.service';
import { ErrosService } from './../comuns/erros.service';
import { ICategoria } from './ICategoria';

@Component({
  selector: 'app-categoria.produto',
  templateUrl: './categoria.produto.component.html',
  styleUrls: ['./categoria.produto.component.css']
})
export class CategoriaProdutoComponent implements OnInit {

  menutipo: any;
  listacategorias: any[];
  selectlistaCategoria: ICategoria;
  isNovoregistro = false;
  isAtivo = true;
  istravado = false;
  gridCategoria: any[];
  msgs: any[];
  formCategoria: FormGroup;
  first: any = 0;
  listRows: any;
  listaTipoProduto: any[];

  constructor(private formBuilder: FormBuilder,
    private categoriaSevice: CategoriaProdutoService,
    private tiposService: TiposService,
    private route: ActivatedRoute,
    private router: Router,
    private service: ComunsService,
    private comuns: ComunsService,
    private confirmationService: ConfirmationService,
    private erros: ErrosService) { }

  ngOnInit() {

    this.formCategoria = this.formBuilder.group({
      idcategoriaservico: [null],
      tbtpprodutoIdtpproduto: [null],
      nome: [null, Validators.required],
      alias: [null, Validators.required],
      isativo: [null],
      istravado: [null]
    });

    // let idTipos: string = this.route.snapshot.paramMap.get('id');
    this.gridCategoria = this.comuns.getDropDownTipos();

    this.limpDadosForm();
    this.tiposService.getTiposAtivos('/tipoProdutos')
      .subscribe(resp => {
        // console.log(resp);
        this.listaTipoProduto = this.getListaTipo(resp);
        // console.log(this.listaTipoProduto);
      });

    // console.log('Teste Parametro ID: ', idTipos);
    this.isNovoregistro = false;
    this.selectlistaCategoria = null;
    this.isAtivo = true;

    // this.menutipo = this.service.getTiposById(idTipos);
    // console.log('Teste Menu Tipo: ', this.menutipo);

    this.categoriaSevice.getCategoria().subscribe((response) => {
      this.listacategorias = response;
    },
      (error) => {
        this.msgs.push(this.erros.getMensagens(error));
      });


  }
  getListaTipo(tipo: any[]): any {

    const tempTipo: any[] = [];

    for (let i = 0; i < tipo.length; i++) {
      tempTipo.push({ label: tipo[i].nome, value: tipo[i].id });
    }
    return tempTipo;
  }

  myloadData(event) {
    this.first = event.first;
    this.listRows = event.rows;
  }

  selectCategorias(index) {
    this.selectlistaCategoria = this.listacategorias[((index) ? index : 0) + this.first];
    this.populaDadosForm();
    this.isNovoregistro = false;
    this.isAtivo = false;

  }

  selectCategoriasForView(index) {
    this.selectlistaCategoria = this.listacategorias[((index) ? index : 0) + this.first];
    this.populaDadosForm();
    this.isNovoregistro = false;
    this.isAtivo = true;
  }

  populaDadosForm() {
    // this.formulario.setValue({});
    this.formCategoria.patchValue({
      idcategoriaservico: this.selectlistaCategoria.idcategoriaservico,
      tbtpprodutoIdtpproduto: this.selectlistaCategoria.tbtpprodutoIdtpproduto,
      nome: this.selectlistaCategoria.nome,
      alias: this.selectlistaCategoria.alias,
      isativo: (this.selectlistaCategoria.isativo === 1),
      istravado: (this.selectlistaCategoria.istravado === 1)
    });
  }

  btnNovo() {
    this.isNovoregistro = true;
    this.selectlistaCategoria = null;
    this.limpDadosForm();
    this.isAtivo = false;
    this.istravado = false;
  }

  limpDadosForm() {
    this.formCategoria.patchValue({
      idcategoriaservico: null,
      tbtpprodutoIdtpproduto: null,
      nome: null,
      alias: null,
      isativo: true,
      istravado: false
    });
    const mydate = null;
  }

  confirmaExclusao() {
    // this.selectlistaCategoria = this.listaTipos[((index) ? index : 0) + this.first];;
    if (this.formCategoria.get('idcategoriaservico').value != null) {
      console.log('Excluindo...', this.formCategoria.get('idcategoriaservico').value);
      this.msgs = [];
      this.confirmationService.confirm({
        message: 'Tem certeza que deseja excluir o registro numero ' + this.formCategoria.get('idcategoriaservico').value + ' ?',
        accept: () => {
          // Actual logic to perform a confirmation
          this.categoriaSevice.deleteCategoria(this.formCategoria.get('idcategoriaservico').value).subscribe((response) => {

            // this.listaTipos = this.comuns.deletarItem(this.listaTipos, tipo);
            this.categoriaSevice.getCategoria().subscribe(resp => this.listacategorias = resp);
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
    if (this.formCategoria.valid) {

      const tempFormTipo = JSON.stringify(this.formCategoria.value);
      const denyFields = ['idcategoriaservico'];

      const postFiels = this.comuns.retiraAttributoStringToJson(tempFormTipo, denyFields);
      // console.log('denyFields: ', denyFields);
      // console.log('postFiels: ', postFiels);

      if (this.isNovoregistro === true) {

        this.categoriaSevice.inserirCategoria(JSON.stringify(postFiels))
          .subscribe((response) => {
            this.formCategoria.patchValue({ idcategoriaservico: response.idcategoriaservico });

            this.msgs = [{ severity: 'success', summary: 'Sucesso!', detail: 'Registro Inserido!' }];

            this.categoriaSevice.getCategoria().subscribe(resp => this.listacategorias = resp);
            // this.btnConacelar();
          },
          (error) => {
            this.msgs.push(this.erros.getMensagens(error));
          });
      } else {

        this.categoriaSevice.updateCategoria(JSON.stringify(this.formCategoria.value))
          .subscribe((response) => {
            // this.listaTipos = response;
            // console.log('Retorno do servidor', response);
            this.listacategorias.push.apply(this.listacategorias, response);

            this.categoriaSevice.getCategoria().subscribe(resp => this.listacategorias = resp);
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
      this.msgs = this.erros.verificaValidacoesForm(this.formCategoria);
    }
  }
}
