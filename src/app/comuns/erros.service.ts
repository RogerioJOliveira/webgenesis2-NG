import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Message } from 'primeng/primeng';

@Injectable()
export class ErrosService {

  private errosConectividade: any[] = [
    { status: '100', tipo: 'warn', statustext: 'Aguardando o restante da informação' },
    { status: '101', tipo: 'warn', statustext: 'O servidor tentando reconhecer a informação.' },
    { status: '200', tipo: 'success', statustext: 'Bem-sucedido!' },
    { status: '201', tipo: 'success', statustext: 'Bem-sucedido - recurso novo foi cliado.' },
    { status: '202', tipo: 'success', statustext: 'O servidor Aceito aceitou a solicitação, mas ainda não a processou.' },
    { status: '203', tipo: 'success', statustext: 'Informação não autorizável para Retorno' },
    { status: '204', tipo: 'success', statustext: 'Bem-sucedido!' },
    { status: '205', tipo: 'success', statustext: 'Bem-sucedido!' },
    { status: '206', tipo: 'success', statustext: 'Bem-sucedido!' },
    { status: '300', tipo: 'error', statustext: 'O servidor tem muitas ações disponíveis com base na solicitação.' },
    { status: '301', tipo: 'error', statustext: 'A página solicitada foi movida permanentemente.' },
    { status: '302', tipo: 'error', statustext: 'A página solicitada foi movida temporariamente.' },
    { status: '303', tipo: 'error', statustext: 'Solicitante precisar fazer uma solicitação GET separadamente.' },
    { status: '304', tipo: 'error', statustext: 'A página solicitada não foi modificada desde a última solicitação.' },
    { status: '305', tipo: 'error', statustext: 'Utilizar proxy, página solicitada necessita de um proxy.' },
    { status: '307', tipo: 'error', statustext: 'Redirecionamento temporário' },
    { status: '400', tipo: 'error', statustext: 'Solicitação inválida.' },
    { status: '401', tipo: 'error', statustext: 'Erro de autenticação.' },
    { status: '403', tipo: 'error', statustext: 'Proibido,	O servidor recusou a solicitação.' },
    { status: '404', tipo: 'error', statustext: 'Registro Não encontrado.' },
    { status: '405', tipo: 'error', statustext: 'Método não permitido.' },
    { status: '406', tipo: 'error', statustext: 'Chamada Não aceitável.' },
    { status: '407', tipo: 'error', statustext: 'Autenticação de proxy necessária.' },
    { status: '408', tipo: 'error', statustext: 'Timeout da solicitação.' },
    { status: '409', tipo: 'error', statustext: 'Conflito.	O servidor encontrou um conflito ao completar a solicitação.' },
    { status: '410', tipo: 'error', statustext: 'Desaparecido, o recurso solicitado pode ter sido removido permanentemente.' },
    { status: '411', tipo: 'error', statustext: 'Comprimento necessário, solicitação necessita header.' },
    { status: '412', tipo: 'error', statustext: 'Falha na pré-condição.' },
    { status: '413', tipo: 'error', statustext: 'Entidade de solicitação muito grande.' },
    { status: '414', tipo: 'error', statustext: 'O URI solicitado é muito longo.' },
    { status: '415', tipo: 'error', statustext: 'Tipo de mídia incompatível.' },
    { status: '416', tipo: 'error', statustext: 'Faixa solicitada não satisfatória.' },
    { status: '417', tipo: 'error', statustext: 'Falha na expectativa' },
    { status: '422', tipo: 'error', statustext: 'Falha Inesperada...' },
    { status: '500', tipo: 'error', statustext: 'Erro interno do servidor.' },
    { status: '501', tipo: 'error', statustext: 'Não implementado.' },
    { status: '502', tipo: 'error', statustext: 'Gateway inválido.' },
    { status: '503', tipo: 'error', statustext: 'Serviço Indisponível.' },
    { status: '504', tipo: 'error', statustext: 'Versão HTTP incompatível.' }
  ];

  constructor() {

  }

  getErroConectividade(erro: any): any {

    for (let i = 0; i < this.errosConectividade.length; i++) {
      if (this.errosConectividade[i].status == erro.status) {

        return this.errosConectividade[i];

      }
    }
    return null;
  }

  getMensagens(erro: any, msg?) {
    // console.log('Passou Aqui 0: ', erro);
    const strErro: any = this.getErroConectividade(erro);
    // console.log('Erro: ', erro.ok);
    if (!erro.ok) {
      if (strErro != null) {
        return { severity: strErro.tipo, summary: 'Mensagem!', detail: strErro.status + ' - '
        + strErro.statustext + (msg) ? ' - ' + msg : '' };
      }
    }
    return [];
  }

  verificaValidacoesForm(formGroup: FormGroup): Message[] {
    const msg: Message[] = [];

    Object.keys(formGroup.controls).forEach(campo => {
      const controle = formGroup.get(campo);
      controle.markAsTouched();
      if (controle instanceof FormGroup) {
        this.verificaValidacoesForm(controle);
      }
      if (!controle.valid) {
        // console.log(campo);
        msg.push({ severity: 'error', summary: 'Validação...', detail: ('O Campo ' + campo + ' é Obrigatório ou valor é invalido.') });
      }
    });
    return msg;
  }

  resetar(formGroup: FormGroup) {
    formGroup.reset();
  }

  verificaValidTouched(formGroup: FormGroup, campo: string) {
    return (
      !formGroup.get(campo).valid &&
      (formGroup.get(campo).touched || formGroup.get(campo).dirty)
    );
  }

  verificaEmailInvalido(formGroup: FormGroup, email: string) {
    const campoEmail = formGroup.get(email);
    if (campoEmail.errors) {
      return campoEmail.errors[email] && campoEmail.touched;
    }
  }

  // valida o CPF digitado
  ValidarCPF(formGroup: FormGroup, campoCpf: string) {
    let cpf: any = formGroup.get(campoCpf).value;
    const msg: Message[] = [];

    const exp = /\.|\-/g;
    cpf = cpf.toString().replace(exp, '');

    if (cpf == '00000000000') {
      msg.push({ severity: 'warn', summary: 'Validação...', detail: ('O Campo CNPJ é invalido.') });
      return msg;
    }

    const digitoDigitado = String(cpf.charAt(9) + cpf.charAt(10));
    let soma1 = 0, soma2 = 0;
    let vlr = 11;
    let i = 0;

    for (i = 0; i < 9; i++) {
      soma1 += Number(cpf.charAt(i)) * (vlr - 1);
      soma2 += Number(cpf.charAt(i)) * vlr;
      vlr--;
    }
    soma1 = (((soma1 * 10) % 11) == 10 ? 0 : ((soma1 * 10) % 11));
    soma2 = (((soma2 + (2 * soma1)) * 10) % 11);

    const digitoGerado = String((soma1 * 10) + soma2);
    if (digitoGerado != digitoDigitado) {
      // alert('CPF Invalido!');
      formGroup.get(campoCpf).invalid;
      msg.push({ severity: 'warn', summary: 'Validação...', detail: ('O Campo ' + campoCpf + ' é invalido.') });
      return msg;
    }
  }

  // valida o CNPJ digitado
  ValidarCNPJ(formGroup: FormGroup, campoCnpj: string) {
    let cnpj = formGroup.get(campoCnpj).value;
    const msg: Message[] = [];

    const valida = new Array(6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2);
    let dig1 = 0;
    let dig2 = 0;

    const exp = /\.|\-|\//g;
    cnpj = cnpj.toString().replace(exp, '');

    const digito = Number(String(cnpj.charAt(12) + cnpj.charAt(13)));
    let i = 0;

    for (i = 0; i < valida.length; i++) {
      dig1 += (i > 0 ? (Number(cnpj.charAt(i - 1)) * valida[i]) : 0);
      dig2 += Number(cnpj.charAt(i)) * valida[i];
    }

    dig1 = (((dig1 % 11) < 2) ? 0 : (11 - (dig1 % 11)));
    dig2 = (((dig2 % 11) < 2) ? 0 : (11 - (dig2 % 11)));

    if (((dig1 * 10) + dig2) !== digito) {
      // alert('CNPJ Invalido!');
      formGroup.get(campoCnpj).markAsDirty;
      console.log(formGroup.get(campoCnpj));
      msg.push({ severity: 'warn', summary: 'Validação...', detail: ('O Campo CNPJ é invalido.') });
      return msg;
    }
  }
}
