import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { DropdownModule, SelectItem } from 'primeng/primeng';
import { IEstados, IEstado } from '../comuns/dominios/i-estados-cidade'

@Injectable()
export class ComunsService {


  headers: Headers;

  accesToken = '6Nb2ti5QEXIoDBS5FQGWIz4poRFiBCMMYJbYXSGHWuulOuy0GTEuGx2VCEVvbpBK';

  private tipoEntidade: any[] = [
    { 'id': 1, 'nome': 'Cadastro de Funcionários', 'alias': 'Funcionários', 'singular': 'Funcionário' },
    { 'id': 2, 'nome': 'Cadastro de Clientes', 'alias': 'Clientes', 'singular': 'Cliente' },
    { 'id': 3, 'nome': 'Cadastro de Fornecedores', 'alias': 'Fornecedores', 'singular': 'Fornecedor' }
  ];

  private tipoPessoa: any[] = [
    { 'id': 1, 'nome': 'Pessoa Física', 'alias': 'Física' },
    { 'id': 2, 'nome': 'Pessoa Jurídica', 'alias': 'Jurídica' }
  ];

  private tipos: any[] = [
    {
      'id': 1, 'nome': 'Cadastro de Especialidade', 'alias': 'Especialidades', 'singular': 'Especialidade',
      'Url': '/especialidades', 'isAtivo': false, 'isTravado': false
    },
    {
      'id': 2, 'nome': 'Cadastro de Marcas', 'alias': 'Marcas', 'singular': 'Marca',
      'Url': '/marcas', 'isAtivo': false, 'isTravado': false
    },
    {
      'id': 3, 'nome': 'Cadastro de Equipamentos', 'alias': 'Equipamentos', 'singular': 'Equipamento',
      'Url': '/tipoEquipamentos', 'isAtivo': false, 'isTravado': true
    },
    {
      'id': 4, 'nome': 'Cadastro de Tipo Produtos', 'alias': 'Tipo Produtos', 'singular': 'Tipo Produto',
      'Url': '/tipoProdutos', 'isAtivo': true, 'isTravado': false
    },
    {
      'id': 5, 'nome': 'Cadastro de Unidade Medidas', 'alias': 'Unidade Medidas', 'singular': 'Unidade Medida',
      'Url': '/undMedidas', 'isAtivo': true, 'isTravado': true
    },
    {
      'id': 6, 'nome': 'Cadastro de Pessoas', 'alias': 'Tipo Pessoas', 'singular': 'Tipo Pessoa',
      'Url': '/tipoPessoas', 'isAtivo': false, 'isTravado': false
    },
    {
      'id': 7, 'nome': 'Cadastro de Entidades', 'alias': 'Tipo Entidades', 'singular': 'Tipo Entidade',
      'Url': '/tipoEntidades', 'isAtivo': false, 'isTravado': false
    }
  ];

  public PathApiV1 = 'https://genesisapi.herokuapp.com/api/v1';
  private gridPaginador: SelectItem[];

  constructor(private http: Http) { }

  getPathApiV1(): string {
    return 'https://genesisapi.herokuapp.com/api/v1';
  }

  getHttpHeader() {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': this.accesToken
    });

    return this.headers;
  }

  retiraAttributoStringToJson(strDados, atributos: any[]) {
    const tempJsonFile = JSON.parse(strDados);

    for (let i = 0; i < atributos.length; i++) {
      delete tempJsonFile[atributos[i]];
    }
    return tempJsonFile;
  }

  retiraAttributoJsonTojson(jsonDados, atributos: any[]) {
    const tempJsonFile = jsonDados;

    for (let i = 0; i < atributos.length; i++) {
      delete tempJsonFile[atributos[i]];
    }
    return tempJsonFile;
  }

  getTiposById(id: string): any {

    const tempTipos: any = this.tipos;
    for (let i = 0; i < this.tipos.length; i++) {

      if (this.tipos[i].id == id) {

        return this.tipos[i];

      }
    }
  }
  getDropDownTipos(): any {

    const tempTipos = [];

    for (let i = 0; i < this.tipos.length; i++) {

      tempTipos.push({ label: this.tipos[i].alias, value: this.tipos[i].id });
    }
    return tempTipos;
  }

  getDropDownTipoPessoa(): any {

    const tempTipoPessoa = [];

    for (let i = 0; i < this.tipoPessoa.length; i++) {

      tempTipoPessoa.push({ label: this.tipoPessoa[i].alias, value: this.tipoPessoa[i].id });
    }
    return tempTipoPessoa;
  }

  getTipoPessoa(id?: string): any {

    let tempTipoPessoa = [];

    if (id == null) {
      for (let i = 0; i < this.tipoPessoa.length; i++) {

        if (this.tipoPessoa[i].id == id) {

          tempTipoPessoa = this.tipoPessoa[i];

          return this.tipoPessoa[i];

        }
      }
    }
    return tempTipoPessoa;
  }
  getTipoEntidade(): any {

    return this.tipoEntidade;
  }

  getTipoEntidadeById(id: string): any {

    let tempTipoEntidade: any = this.tipoEntidade;
    for (let i = 0; i < this.tipoEntidade.length; i++) {

      if (this.tipoEntidade[i].id == id) {

        tempTipoEntidade = this.tipoEntidade[i];

      }
    }

    return tempTipoEntidade;
  }

  getListaPaginas() {
    this.gridPaginador = [];
    this.gridPaginador.push({ label: ' 10 - Registros', value: '10' });
    this.gridPaginador.push({ label: ' 20 - Registros', value: '20' });
    this.gridPaginador.push({ label: ' 30 - Registros', value: '30' });
    this.gridPaginador.push({ label: ' 50 - Registros', value: '50' });
    this.gridPaginador.push({ label: '100 - Registros', value: '100' });

    return this.gridPaginador;
  }

  deletarItem(arrayParam, itemSelecionado) {

    // const index = this.gridPessoas.indexOf(this.pessoaSelecionada);
    arrayParam = arrayParam.filter((item) => {
      return item !== itemSelecionado;
    });

    return arrayParam;
  }

  getCidades() {
    return this.http.get('./data/estados-cidades.json')
      .toPromise()
      .then(res => <any[]>res.json().data)
      .then(data => { return data; });
  }

  filterCidades(query, estados: any, siglaEstado: string): any[] {

    const filtered: any[] = [];
    for (let i = 0; i < estados.estados.length; i++) {
      const estado = estados.estados[i];
      if (estado.nome === ((siglaEstado == null) ? estado.nome : siglaEstado)) {

        for (let x = 0; x < estado.cidades.length; x++) {
          const cidade: string = estado.cidades[x];

          if (cidade.toLowerCase().indexOf(query.toLowerCase()) === 0) {
            filtered.push(cidade);
          }

        }
      }
    }
    return filtered;
  }

  filterCidadesAutoComplete(event, siglaEstado: string) {
    const query = event.query;
    this.getCidades().then(cidades => {
      return this.filterCidades(query, cidades, siglaEstado);
    });
  }

  consultaCEP(cep, resetaFormCallback, formulario) {
    // Nova variável 'cep' somente com dígitos.
    cep = cep.replace(/\D/g, '');

    // Verifica se campo cep possui valor informado.
    if (cep !== '') {
      // Expressão regular para validar o CEP.
      const validacep = /^[0-9]{8}$/;
      // console.log('Valor $cep',cep);
      // Valida o formato do CEP.
      if (validacep.test(cep)) {
        // console.log('Chamando resetaFormCallback');
        resetaFormCallback(formulario);

        // console.log(`Chamando => //viacep.com.br/ws/${cep}/json`);

        return this.http.get(`//viacep.com.br/ws/${cep}/json`)
          .map(dados => dados.json());

      }
    }
  }
}
