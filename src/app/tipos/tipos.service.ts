import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { ComunsService } from './../comuns/comuns.service';

@Injectable()
export class TiposService {

  tipos = [];

  headers: Headers;
  options: RequestOptions;
  dados: any;
  varFilter: any;

  constructor(private comunsService: ComunsService, private http: Http) {

    this.headers = comunsService.getHttpHeader();
    this.options = new RequestOptions({ headers: this.headers });

  }

  getTipos(url: String) {
    this.varFilter = this.comunsService.PathApiV1 + url;

    return this.http.get(this.varFilter, this.options).map((res: Response) => this.tipos = res.json());
  }

  getTiposAtivos(url: String) {
    this.varFilter = this.comunsService.PathApiV1 + url  + '?filter[where][isativo]=1';

    return this.http.get(this.varFilter, this.options).map((res: Response) => this.tipos = res.json());
  }

  deleteTipo(url: String, id) {
    this.varFilter = this.comunsService.PathApiV1 + url + '/' + id;

    return this.http.delete(this.varFilter, this.options).map((res: Response) => this.tipos = res.json());
  }

  inserirTipo(url: String, tipo) {
    this.varFilter = this.comunsService.PathApiV1 + url;

    return this.http.post(this.varFilter, tipo, this.options).map((res: Response) => this.tipos = res.json());
  }

  updateTipo(url: String, tipo) {
    this.varFilter = this.comunsService.PathApiV1 + url;

    return this.http.patch(this.varFilter, tipo, this.options).map((res: Response) => this.tipos = res.json());
  }
}
