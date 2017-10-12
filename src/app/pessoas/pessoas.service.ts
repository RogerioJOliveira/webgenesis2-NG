import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { ComunsService } from './../comuns/comuns.service';
import { PessoasComponent } from './pessoas.component';
import { IPessoas, IPessoasFull } from './pessoas.interface';

@Injectable()
export class PessoasService {

  pessoas = [];
  url = '/entidades';

  headers: Headers;
  options: RequestOptions;
  dados: any;
  varFilter: any;

  constructor(private comunsService: ComunsService, private http: Http) {
    this.headers = comunsService.getHttpHeader();
    this.options = new RequestOptions({ headers: this.headers });
  }

  getPessoas(idTipoEntidade: String) {
    this.varFilter = this.comunsService.PathApiV1 + this.url + '?filter[where][tbtpentidade]=' + idTipoEntidade;

    return this.http.get(this.varFilter, this.options).map((res: Response) => this.pessoas = res.json());
  }

  getPessoasByLike(limit: string = '10', skip: string = '0', like: string) {
    this.varFilter = this.comunsService.PathApiV1 + this.url;
    this.varFilter = this.varFilter + '?filter[where][nome][like]=%' + like + '%&filter[limit]=' + limit + '&filter[skip]=' + skip;
    return this.http.get(this.varFilter, this.options).map((res: Response) => this.pessoas = res.json());
  }

  getPessoasTipoByLike(limit: string = '10', skip: string = '0', id: string, like: string) {
    this.varFilter = this.comunsService.PathApiV1 + this.url + '?filter[where][and][0][tbtpentidade]=' + id;
    this.varFilter = this.varFilter + '&filter[where][and][1][nome][like]=%' + like;
    this.varFilter = this.varFilter + '%&filter[limit]=' + limit + '&filter[skip]=' + skip;

    return this.http.get(this.varFilter, this.options).map((res: Response) => this.pessoas = res.json());
  }
  getPessoasByID(id: string) {
    this.varFilter = this.comunsService.PathApiV1 + this.url + '/' + id;

    return this.http.get(this.varFilter, this.options).map((res: Response) => this.pessoas = res.json());
  }

  getPessoasByTipoPessoa(idPessoa: string, limit: string = '10', skip: string = '0') {
    this.varFilter = this.comunsService.PathApiV1;
    this.varFilter = this.varFilter + '/tipoPessoas/' + idPessoa + '/entidade?filter[limit]=' + limit + '&filter[skip]=' + skip;
    return this.http.get(this.varFilter, this.options).map((res: Response) => this.pessoas = res.json());
  }

  getPessoasByTipoEntidae(idEntidade: string, limit: string = '10', skip: string = '0') {
    this.varFilter = this.comunsService.PathApiV1;
    this.varFilter = this.varFilter + '/tipoEntidades/' + idEntidade + '/entidade?filter[limit]=' + limit + '&filter[skip]=' + skip;
    return this.http.get(this.varFilter, this.options).map((res: Response) => this.pessoas = res.json());
  }

  getPessoasByTipoEntidadeCount(id: string) {
    this.varFilter = this.comunsService.PathApiV1 + '/tipoEntidades/' + id + '/entidade/count';

    return this.http.get(this.varFilter, this.options).map((res: Response) => this.pessoas = res.json());
  }

  getPessoasByTipoPessoaCount(id: string) {
    this.varFilter = this.comunsService.PathApiV1 + '/tipoPessoas/' + id + '/entidade/count';

    return this.http.get(this.varFilter, this.options).map((res: Response) => this.pessoas = res.json());
  }

  getPessoasCount() {
    this.varFilter = this.comunsService.PathApiV1 + this.url + '/count';

    return this.http.get(this.varFilter, this.options).map((res: Response) => this.pessoas = res.json());
  }

  deletePessoas(idPessoa: String) {
    this.varFilter = this.comunsService.PathApiV1 + this.url + '/' + idPessoa;

    return this.http.delete(this.varFilter, this.options).map((res: Response) => this.pessoas = res.json());
  }

  inseriPessoas(Pessoa) {
    this.varFilter = this.comunsService.PathApiV1 + this.url;

    return this.http.post(this.varFilter, Pessoa, this.options).map((res: Response) => this.pessoas = res.json());
  }

  updatePessoas(Pessoa) {
    this.varFilter = this.comunsService.PathApiV1 + this.url;

    return this.http.patch(this.varFilter, Pessoa, this.options).map((res: Response) => this.pessoas = res.json());
  }
  
/*
  inserirPessoaOLD(pessoa: any) {

    this.varFilter = this.comunsService.PathApiV1 + this.url;
    console.log(JSON.stringify(pessoa));
    console.log(this.varFilter);
    this.http
      .post(this.varFilter, JSON.stringify(pessoa), this.options)
      .map(res => res)
      .subscribe(
      dados => {
        console.log(dados);
        return this.dados;
      },
      (error: any) => alert('erro')
      );

  }

  atualizarPessoaOLD(pessoa: any) {

    this.varFilter = this.comunsService.PathApiV1 + this.url;
    console.log(JSON.stringify(pessoa));
    console.log(this.varFilter);
    this.http
      .put(this.varFilter, JSON.stringify(pessoa), this.options)
      .map(res => res)
      .subscribe(
      dados => {
        console.log(dados);
        console.log(dados);
        return this.dados;
      },
      (error: any) => {
        alert('erro');
        console.log(error);
      }
      );

  }
  */

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
