import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { ComunsService } from './../comuns/comuns.service';

@Injectable()
export class SubCategoriaProdutoService {

  subsubsubcategorias = [];
  url: String = '/subCategoriaProdutos';
  headers: Headers;
  options: RequestOptions;
  dados: any;
  varFilter: any;

  constructor(private comunsService: ComunsService, private http: Http) {
    this.headers = comunsService.getHttpHeader();
    this.options = new RequestOptions({ headers: this.headers });
   }

   getSubCategoria() {
    this.varFilter = this.comunsService.PathApiV1 + this.url;

    return this.http.get(this.varFilter, this.options).map((res: Response) => this.subsubsubcategorias = res.json());
  }

  deleteSubCategoria(id) {
    this.varFilter = this.comunsService.PathApiV1 + this.url + '/' + id;

    return this.http.delete(this.varFilter, this.options).map((res: Response) => this.subsubsubcategorias = res.json());
  }

  inserirSubCategoria(categoria) {
    this.varFilter = this.comunsService.PathApiV1 + this.url;

    return this.http.post(this.varFilter, categoria, this.options).map((res: Response) => this.subsubsubcategorias = res.json());
  }

  updateSubCategoria(categoria) {
    this.varFilter = this.comunsService.PathApiV1 + this.url;

    return this.http.patch(this.varFilter, categoria, this.options).map((res: Response) => this.subsubsubcategorias = res.json());
  }

}
