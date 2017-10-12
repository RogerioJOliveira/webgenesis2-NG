import { ITipoEntidade } from '../comuns/dominios/i-tipo-entidade';
import { ITipoPessoa } from '../comuns/dominios/i-tipo-pessoa';

export interface IPessoasFull {
    identidade: Number;
    tbtipopessoaIdtipopessoa: Number;
    tbtpentidade: Number;
    nome: String;
    abvnome: String;
    dtcadastro: Date;
    isativo: String;
    endereco: String;
    complemento: String;
    cidade: String;
    idestado: String;
    cep: String;
    cpf: String;
    rg: String;
    telefone: String;
    celular: String;
    recado: String;
    email: String;
    dtnascimento: Date;
    obs: String;
    dbuser: String;
    dbpass: String;
    isuser: Number;
    tbTpentidade: Number;
    tipoPessoa: ITipoPessoa;
    tipoEntidade: ITipoEntidade;
    numero: String;
    bairro: String;
  }

  export interface IPessoas {
    identidade: Number;
    tbtipopessoaIdtipopessoa: Number;
    tbtpentidade: Number;
    nome: String;
    abvnome: String;
    dtcadastro: Date;
    isativo: String;
    endereco: String;
    complemento: String;
    cidade: String;
    idestado: String;
    cep: String;
    cpf: String;
    rg: String;
    telefone: String;
    celular: String;
    recado: String;
    email: String;
    dtnascimento: Date;
    obs: String;
    dbuser: String;
    dbpass: String;
    isuser: Number;
    tbTpentidade: Number;
    numero: String;
    bairro: String;
  }
