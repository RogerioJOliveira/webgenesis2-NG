export interface IEstados {
    estados: IEstado[];
}

export interface IEstado {
  sigla: string;
  nome: string;
  cidades: string[];
}
