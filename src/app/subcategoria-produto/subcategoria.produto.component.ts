
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
import { ISubCategoria } from './ISubCategoria';

import { SubCategoriaProdutoService } from './subcategoria.produto.service';
import { CategoriaProdutoService } from './../categoria-produto/categoria.produto.service';

@Component({
  selector: 'app-subcategoria.produto',
  templateUrl: './subcategoria.produto.component.html',
  styleUrls: ['./subcategoria.produto.component.css']
})
export class SubcategoriaProdutoComponent implements OnInit {

  menutipo: any;
  listaSubCategorias: any[];
  selectlistaSubCategoria: ISubCategoria;
  isNovoregistro = false;
  isAtivo = true;
  istravado = false;
  gridSubCategoria: any[];
  msgs: any[];
  formSubCategoria: FormGroup;
  first: any = 0;
  listRows: any;
  listaCategoria: any[];

  constructor(
    private formBuilder: FormBuilder,
    private subCategoriaSevice: SubCategoriaProdutoService,
    private categoriaProdutoService: CategoriaProdutoService,
    private route: ActivatedRoute,
    private router: Router,
    private service: ComunsService,
    private comuns: ComunsService,
    private confirmationService: ConfirmationService,
    private erros: ErrosService
  ) { }

  ngOnInit() {

    this.formSubCategoria = this.formBuilder.group({
      idsubcategoriaproduto: [null],
      tbcategoriaprodutoIdcategoriaservico: [null],
      nome: [null, Validators.required],
      alias: [null, Validators.required],
      isativo: [null],
      istravado: [null]
    });

    // let idTipos: string = this.route.snapshot.paramMap.get('id');
    this.gridSubCategoria = this.comuns.getDropDownTipos();

    this.limpDadosForm();

    this.categoriaProdutoService.getCategoriasAtivas()
      .subscribe(resp => {
        // console.log(resp);
        this.listaCategoria = this.getListaTipo(resp);
        // console.log(this.listaSubCategorias);
      });

    // console.log('Teste Parametro ID: ', idTipos);
    this.isNovoregistro = false;
    this.selectlistaSubCategoria = null;
    this.isAtivo = true;

    // this.menutipo = this.service.getTiposById(idTipos);
    // console.log('Teste Menu Tipo: ', this.menutipo);

    this.subCategoriaSevice.getSubCategoria().subscribe((response) => {
      this.listaSubCategorias = response;
    },
      (error) => {
        this.msgs.push(this.erros.getMensagens(error));
      });


  }

  getListaTipo(tipo: any[]): any {

    const tempTipo: any[] = [];

    for (let i = 0; i < tipo.length; i++) {
      tempTipo.push({ label: tipo[i].nome, value: tipo[i].idcategoriaservico });
    }
    // console.log(tempTipo);
    return tempTipo;
  }

  myloadData(event) {
    this.first = event.first;
    this.listRows = event.rows;
  }

  selectSubCategoria(index) {
    this.selectlistaSubCategoria = this.listaSubCategorias[((index) ? index : 0) + this.first];
    this.populaDadosForm();
    this.isNovoregistro = false;
    this.isAtivo = false;

  }

  selectSubCategoriaForView(index) {
    this.selectlistaSubCategoria = this.listaSubCategorias[((index) ? index : 0) + this.first];
    this.populaDadosForm();
    this.isNovoregistro = false;
    this.isAtivo = true;
  }

  populaDadosForm() {
    // this.formulario.setValue({});
    this.formSubCategoria.patchValue({
      idsubcategoriaproduto: this.selectlistaSubCategoria.idsubcategoriaproduto,
      tbcategoriaprodutoIdcategoriaservico: this.selectlistaSubCategoria.tbcategoriaprodutoIdcategoriaservico,
      nome: this.selectlistaSubCategoria.nome,
      alias: this.selectlistaSubCategoria.alias,
      isativo: (this.selectlistaSubCategoria.isativo === 1),
      istravado: (this.selectlistaSubCategoria.istravado === 1)
    });
  }

  btnNovo() {
    this.isNovoregistro = true;
    this.selectlistaSubCategoria = null;
    this.limpDadosForm();
    this.isAtivo = false;
    this.istravado = false;
  }

  limpDadosForm() {
    this.formSubCategoria.patchValue({
      idsubcategoriaproduto: null,
      tbcategoriaprodutoIdcategoriaservico: null,
      nome: null,
      alias: null,
      isativo: true,
      istravado: false
    });
    const mydate = null;
  }

  confirmaExclusao() {
    // this.selectlistaCategoria = this.listaTipos[((index) ? index : 0) + this.first];;
    if (this.formSubCategoria.get('idsubcategoriaproduto').value != null) {
      console.log('Excluindo...', this.formSubCategoria.get('idsubcategoriaproduto').value);
      this.msgs = [];
      this.confirmationService.confirm({
        message: 'Tem certeza que deseja excluir o registro numero ' + this.formSubCategoria.get('idsubcategoriaproduto').value + ' ?',
        accept: () => {
          // Actual logic to perform a confirmation
          this.subCategoriaSevice.deleteSubCategoria(this.formSubCategoria.get('idsubcategoriaproduto').value).subscribe((response) => {

            // this.listaTipos = this.comuns.deletarItem(this.listaTipos, tipo);
            this.subCategoriaSevice.getSubCategoria().subscribe(resp => this.listaSubCategorias = resp);
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
    if (this.formSubCategoria.valid) {

      const tempFormTipo = JSON.stringify(this.formSubCategoria.value);
      const denyFields = ['idsubcategoriaproduto'];

      const postFiels = this.comuns.retiraAttributoStringToJson(tempFormTipo, denyFields);
      // console.log('denyFields: ', denyFields);
      // console.log('postFiels: ', postFiels);

      if (this.isNovoregistro === true) {

        this.subCategoriaSevice.inserirSubCategoria(JSON.stringify(postFiels))
          .subscribe((response) => {
            this.formSubCategoria.patchValue({ idcategoriaservico: response.idcategoriaservico });

            this.msgs = [{ severity: 'success', summary: 'Sucesso!', detail: 'Registro Inserido!' }];

            this.subCategoriaSevice.getSubCategoria().subscribe(resp => this.listaSubCategorias = resp);
            // this.btnConacelar();
          },
          (error) => {
            this.msgs.push(this.erros.getMensagens(error));
          });
      } else {

        this.subCategoriaSevice.updateSubCategoria(JSON.stringify(this.formSubCategoria.value))
          .subscribe((response) => {
            // this.listaTipos = response;
            // console.log('Retorno do servidor', response);

            // this.listaSubCategorias.push.apply(this.listaSubCategorias, response);

            this.subCategoriaSevice.getSubCategoria().subscribe(resp => this.listaSubCategorias = resp);
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
      this.msgs = this.erros.verificaValidacoesForm(this.formSubCategoria);
    }
  }
}