import { Component, OnInit, Input, Output } from '@angular/core';
import { IPessoasFull } from '../pessoas.interface';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Http } from '@angular/http';

import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';
import { SelectItem, Message, ConfirmationService } from 'primeng/primeng';
import { ComunsService } from '../../comuns/comuns.service';
import { PessoasService } from '../pessoas.service';
import { ErrosService } from './../../comuns/erros.service';
import { NavtopobservService } from './../../navtopobserv.service';

@Component({
  selector: 'app-addpesssoa',
  templateUrl: './addpesssoa.component.html',
  styleUrls: ['./addpesssoa.component.css']
})
export class AddpesssoaComponent implements OnInit {

  statusErros: any[];
  // filtro: string;
  // subscription: Subscription;
  formPessoas: FormGroup;
  tipoPessoa: any;
  // gridPaginador: SelectItem[];
  gridTipoPessoa: SelectItem[];
  // selectedQtdPaginas = '10';
  // gridPessoas = [];
  msgs: Message[] = [];
  pessoaSelecionada: any;
  index = 0;
  checked: boolean;
  selectedTipoPessoa: any;
  dataNascimento: any;
  @Input() isAtivo = true;
  @Input() tipoEntidade: any;

  constructor(private formBuilder: FormBuilder,
    private pessoasSevice: PessoasService,
    private route: ActivatedRoute,
    private router: Router,
    private service: ComunsService,
    private comuns: ComunsService,
    private confirmationService: ConfirmationService,
    private navobserv: NavtopobservService,
    private erros: ErrosService) { }

  ngOnInit() {

    // let id: string = this.route.snapshot.paramMap.get('tipoEntidadeId');
    // this.gridPaginador = this.comuns.getListaPaginas();

    this.gridTipoPessoa = this.comuns.getDropDownTipoPessoa();

    // console.log(this.router.isActive);
    // Carrega dados de Cliente/Funcionario/Fornecedor conforme menu selecionado
    /*
    this.route.params.subscribe(
      (parametros: any) => {
        id = parametros['tipoEntidadeId'];

        this.tipoEntidade = this.service.getTipoEntidadeById(id);

        this.pessoasSevice.getPessoas(this.tipoEntidade.id).subscribe((response) => {
          this.gridPessoas = response;
        },
          (error) => {
            this.msgs.push(this.erros.getMensagens(error));
          });

        this.pessoaSelecionada = [];
      }
    );
    */
    /*
    // Tratamento para recuperar valor do filtro do top navbar
    this.subscription = this.navobserv.navItem$.subscribe(
      (item) => {
        const txtlocalComponent: any[] = this.route.snapshot.url;
        // console.log(txtlocalComponent[0].path);
        const txtComponent: string[] = this.router.routerState.snapshot.url.split('/');
        // console.log(txtComponent[1]);

        const validaUrl = (txtComponent[1] == txtlocalComponent[0]);
        this.filtro = item;
        if ((validaUrl) && (this.filtro.length >= 4)) {
          console.log('Executou filtro de Pessoas!');
          this.pessoasSevice.getPessoasTipoByLike('50', '0', this.tipoEntidade.id, this.filtro).subscribe(
            response => this.gridPessoas = response);
        }
      });
      */
    // console.log(this.gridPessoas);

    this.formPessoas = this.formBuilder.group({
      identidade: [{ value: '', disabled: this.isAtivo }],
      tbtipopessoaIdtipopessoa: [null],
      tbtpentidade: [null, Validators.required],
      nome: [null, Validators.required],
      abvnome: [null, Validators.required],
      dtcadastro: [null],
      isativo: [null, Validators.required],
      endereco: [null],
      complemento: [null],
      cidade: [null],
      idestado: [null],
      cep: [null],
      cpf: [null],
      rg: [null],
      telefone: [null],
      celular: [null],
      recado: [null],
      email: [null, [Validators.required, Validators.email]],
      dtnascimento: [null, Validators.pattern('/^\d{2}\/\d{2}\/\d{4}$/')],
      obs: [null],
      dbuser: [null],
      dbpass: [null],
      isuser: [null],
      tbTpentidade: [null],
      numero: [null],
      bairro: [null]
    });
  }

  OnDestroy() {
    // prevent memory leak when component is destroyed
    // this.subscription.unsubscribe();
  }
  /*
  onclick() {
    this.pessoasSevice.getPessoas(this.tipoEntidade.id).subscribe(response => this.gridPessoas = response);
  }
  */
  /*
  selectPesssoa(pessoa: any) {
    this.pessoaSelecionada = pessoa;
    (this.index == 0) ? this.index = 1 : this.index = 0;
    this.populaDadosForm();
    this.isAtivo = false;
    // this.changeViewCampo(false);
  }
  */
  /*
  selectPesssoaForView(pessoa: any) {
    this.pessoaSelecionada = pessoa;
    (this.index == 0) ? this.index = 1 : this.index = 0;
    this.populaDadosForm();
    // this.desabilitaCampos(true);
    this.isAtivo = true;
    // this.changeViewCampo(true);
  }

  handleChange(e) {
    // console.log(e.index);
    const index = e.index;
  }
  */
  selectTipoPesssoa(tipoPessoa: any) {
    this.selectedTipoPessoa = tipoPessoa;
  }

  consultaCEP() {
    const cep = this.formPessoas.get('cep').value;
    // console.log(cep);
    this.comuns.consultaCEP(cep, this.resetaDadosForm, this.formPessoas)
      .subscribe(dados => {
        // console.log(dados);
        this.populaEnderecoForm(dados);
      });
  }

  populaEnderecoForm(dados) {
    // this.formulario.setValue({});
    this.formPessoas.patchValue({

      endereco: dados.logradouro + ', ',
      bairro: dados.bairro,
      // cep: dados.cep,
      complemento: dados.complemento,
      cidade: dados.localidade,
      idestado: dados.uf

    });
  }

  populaDadosForm() {
    // this.formulario.setValue({});
    this.formPessoas.patchValue({
      identidade: this.pessoaSelecionada.identidade,
      tbtipopessoaIdtipopessoa: this.pessoaSelecionada.tbtipopessoaIdtipopessoa,
      tbtpentidade: this.pessoaSelecionada.tbtpentidade,
      nome: this.pessoaSelecionada.nome,
      abvnome: this.pessoaSelecionada.abvnome,
      isativo: Boolean(this.pessoaSelecionada.isativo),
      endereco: this.pessoaSelecionada.endereco,
      complemento: this.pessoaSelecionada.complemento,
      cidade: this.pessoaSelecionada.cidade,
      idestado: this.pessoaSelecionada.idestado,
      cep: this.pessoaSelecionada.cep,
      cpf: this.pessoaSelecionada.cpf,
      rg: this.pessoaSelecionada.rg,
      telefone: this.pessoaSelecionada.telefone,
      celular: this.pessoaSelecionada.celular,
      recado: this.pessoaSelecionada.recado,
      email: this.pessoaSelecionada.email,
      dtnascimento: this.pessoaSelecionada.dtnascimento,
      obs: this.pessoaSelecionada.obs,
      numero: this.pessoaSelecionada.numero,
      bairro: this.pessoaSelecionada.bairro
    });
    const mydate = new Date(this.formPessoas.get('dtnascimento').value);
    this.dataNascimento = mydate.toLocaleDateString();
    const testedate = new Date(this.dataNascimento);
  }

  limpDadosForm() {
    this.formPessoas.reset();
    const mydate = null;
  }

  resetaDadosForm(formulario) {
    formulario.patchValue({
      endereco: null,
      complemento: null,
      bairro: null,
      cidade: null,
      idestado: null
    });
  }

  sincronizaDataNascimento() {
    const ano = this.dataNascimento.substring(6, 10);
    const mes = this.dataNascimento.substring(3, 5);
    const dia = this.dataNascimento.substring(0, 2);

    this.formPessoas.patchValue({
      dtnascimento: new Date(ano + '-' + mes + '-' + dia).toISOString()
    });
  }

  /*
  confirmaExclusao(pessoa: any) {
    this.pessoaSelecionada = pessoa;
    // console.log(pessoa);
    this.msgs = [];
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir o registro numero ' + this.pessoaSelecionada.identidade + ' ?',
      accept: () => {
        // Actual logic to perform a confirmation
        // console.log('Registro numero: $1', this.pessoaSelecionada.identidade);
        this.pessoasSevice.deletePessoas(this.pessoaSelecionada.identidade).subscribe((response) => {
          this.gridPessoas = response;
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
  }
  */

  onSubmit() {
    console.log(this.formPessoas);

    if (this.formPessoas.valid) {
      this.pessoasSevice.getPessoas(this.pessoaSelecionada.identidade).subscribe((response) => {
        this.pessoaSelecionada = response;
      },
        (error) => {
          this.msgs.push(this.erros.getMensagens(error));
        });
      if (this.msgs == null) {
        this.msgs = [{ severity: 'success', summary: 'Sucesso!', detail: 'Registro excluido!' }];
      }
    } else {
      console.log('formulario invalido');
      this.erros.verificaValidacoesForm(this.formPessoas);
    }
  }

  validaCpf() {
    this.msgs = this.erros.ValidarCPF(this.formPessoas, 'cpf');
  }

  validaCnpj() {
    this.msgs = this.erros.ValidarCNPJ(this.formPessoas, 'cpf');
  }
}
