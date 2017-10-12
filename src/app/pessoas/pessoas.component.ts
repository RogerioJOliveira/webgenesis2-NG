import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Http } from '@angular/http';
import { ConfirmationService } from 'primeng/primeng';

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

import { Subscription } from 'rxjs/Subscription';
import { SelectItem, Message } from 'primeng/primeng';
import { ComunsService } from './../comuns/comuns.service';
import { PessoasService } from './pessoas.service';
import { NavtopobservService } from './../navtopobserv.service';
import { IPessoasFull } from './pessoas.interface';
import { ErrosService } from './../comuns/erros.service';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.scss']
})
export class PessoasComponent implements OnInit {

  statusErros: any[];
  filtro: string;
  subscription: Subscription;
  formPessoas: FormGroup;
  tipoPessoa: any;
  tipoEntidade: any;
  gridPaginador: SelectItem[];
  gridTipoPessoa: SelectItem[];
  selectedQtdPaginas = '10';
  totalRecords: number;
  gridPessoas = [];
  msgs: Message[] = [];
  pessoaSelecionada: any;
  index = 0;
  checked: boolean;
  selectedTipoPessoa: any;
  dataNascimento: any;
  isAtivo = true;
  isNovoregistro = false;

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

    let id: string = this.route.snapshot.paramMap.get('tipoEntidadeId');
    this.gridPaginador = this.comuns.getListaPaginas();

    this.gridTipoPessoa = this.comuns.getDropDownTipoPessoa();

    // console.log(this.router.isActive);
    // Carrega dados de Cliente/Funcionario/Fornecedor conforme menu selecionado
    this.route.params.subscribe(
      (parametros: any) => {
        id = parametros['tipoEntidadeId'];

        this.isNovoregistro = false;
        this.pessoaSelecionada = null;
        this.isAtivo = true;
        this.index = 0;

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
    // console.log(this.gridPessoas);

    this.formPessoas = this.formBuilder.group({
      identidade: [null],
      tbtipopessoaIdtipopessoa: [null],
      tbtpentidade: [null, Validators.required],
      nome: [null, Validators.required],
      abvnome: [null, Validators.required],
      // dtcadastro: [null],
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
      dtnascimento: [null],
      obs: [null],
      // dbuser: [null],
      // dbpass: [null],
      // isuser: [null],
      numero: [null],
      bairro: [null]
    });

  }

  OnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
  }
  onclick() {
    this.pessoasSevice.getPessoas(this.tipoEntidade.id).subscribe(response => this.gridPessoas = response);
  }

  selectPesssoa(pessoa: any) {
    this.pessoaSelecionada = pessoa;
    (this.index == 0) ? this.index = 1 : this.index = 0;
    this.populaDadosForm();
    this.isAtivo = false;

  }

  selectPesssoaForView(pessoa: any) {
    this.pessoaSelecionada = pessoa;
    (this.index == 0) ? this.index = 1 : this.index = 0;
    this.populaDadosForm();

    this.isAtivo = true;

  }

  handleChange(e) {

    // console.log(e.index);
    // console.log('Teste novo false : ', e.index);
    if (e.index == 2) {
      this.isNovoregistro = true;
      e.index = 1;
      console.log('Teste e novo : ', e.index, this.isNovoregistro);
    }
    this.index = e.index;
  }

  btnConacelar() {
    // this.formPessoas.get('identidade').enabled;
    this.isNovoregistro = false;
    this.index = 0;
  }

  btnNovo() {
    this.formPessoas.get('identidade').disabled;
    this.isNovoregistro = true;
    this.pessoaSelecionada = null;
    this.limpDadosForm();
    this.isAtivo = false;
    this.index = 1;
  }
  selectTipoPesssoa(tipoPessoa: any) {
    this.selectedTipoPessoa = tipoPessoa;
  }

  consultaCEP() {
    const cep = this.formPessoas.get('cep').value;
    // console.log(cep);
    this.comuns.consultaCEP(cep, this.resetaDadosForm, this.formPessoas)
      .subscribe(dados => {
        // console.log(dados);
        if (!dados.erro) {
          this.populaEnderecoForm(dados);
        } else {
          this.msgs = [{ severity: 'error', summary: 'CEP', detail: 'CEP Inválido!' }];
        }
      },
      (error) => {
        this.msgs.push(this.erros.getMensagens(error, 'Erro no Serviço de CEP.'));
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
      isativo: (this.pessoaSelecionada.isativo === 'true'),
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
    // this.dataNascimento = new Date(this.formPessoas.get('dtnascimento').value).toISOString();
    const mydate = new Date(this.formPessoas.get('dtnascimento').value);
    // console.log(mydate);
    // this.dataNascimento = this.datepipe.transform( mydate, 'dd-MM-yyyy');
    this.dataNascimento = mydate.toLocaleDateString();
    // this.dataNascimento = mydate; // this.datePipe.transform( mydate, 'dd/MM/yyyy');
    // console.log(this.dataNascimento);
    // (this.formPessoas.get('dtnascimento').value;
    const testedate = new Date(this.dataNascimento);
  }

  limpDadosForm() {
    this.formPessoas.patchValue({
      identidade: null,
      tbtipopessoaIdtipopessoa: 1,
      tbtpentidade: this.tipoEntidade.id,
      nome: null,
      abvnome: null,
      isativo: true,
      endereco: null,
      complemento: null,
      cidade: null,
      idestado: null,
      cep: null,
      cpf: null,
      rg: null,
      telefone: null,
      celular: null,
      recado: null,
      email: null,
      dtnascimento: null,
      obs: null,
      numero: null,
      bairro: null
    });
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
    // console.log(this.formPessoas.get('dtnascimento').value);
  }

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

          this.gridPessoas = this.comuns.deletarItem(this.gridPessoas, pessoa);
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

  onSubmit(e) {

    if (this.formPessoas.valid) {

      const tempFormPessoa = JSON.stringify(this.formPessoas.value);
      const denyFields = ['identidade'];
      const postFiels = this.comuns.retiraAttributoStringToJson(tempFormPessoa, denyFields);
      // delete tempFormPessoa['identidade'];
      // this.comuns.retiraAttributoJson(tempFormPessoa, ['identidade']);

      // console.log('postFiels : ', JSON.stringify(postFiels));
      // console.log('JSON.stringify ', JSON.stringify(this.formPessoas.value));

      if (this.isNovoregistro === true) {

        this.pessoasSevice.inseriPessoas(JSON.stringify(postFiels))
          .subscribe((response) => {
            this.formPessoas.patchValue({ identidade: response.identidade });

            this.msgs = [{ severity: 'success', summary: 'Sucesso!', detail: 'Registro Inserido!' }];

            this.pessoasSevice.getPessoas(this.tipoEntidade.id).subscribe(resp => this.gridPessoas = resp);
            this.btnConacelar();
          },
          (error) => {
            // console.log('Erro.');
            this.msgs.push(this.erros.getMensagens(error));
          });
      } else {

        this.pessoasSevice.updatePessoas(JSON.stringify(this.formPessoas.value))
          .subscribe((response) => {
            // this.gridPessoas = response;
            // console.log('Retorno do servidor', response);
            this.gridPessoas.push.apply(this.gridPessoas, response);

            this.pessoasSevice.getPessoas(this.tipoEntidade.id).subscribe(resp => this.gridPessoas = resp);
            this.msgs = [{ severity: 'success', summary: 'Sucesso!', detail: 'Registro Atualizado!' }];
            this.btnConacelar();
          },
          (error) => {
            // console.log('Erro.');
            this.msgs.push(this.erros.getMensagens(error));
          });
      }
      // console.log('Objeto ', this.formPessoas.value);
      // console.log('JSON.stringify ', this.formPessoas.value);

    } else {
      console.log('formulario invalido');
      this.msgs = this.erros.verificaValidacoesForm(this.formPessoas);
    }
  }

  validaCpf() {
    this.msgs = this.erros.ValidarCPF(this.formPessoas, 'cpf');
  }

  validaCnpj() {
    this.msgs = this.erros.ValidarCNPJ(this.formPessoas, 'cpf');
  }

}
