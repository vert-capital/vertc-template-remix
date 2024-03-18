export class TableResponseModel<T, F = any> {
  totalPaginas: number;
  paginaAtual: number;
  tamanhoPagina: number;
  totalRegistros: number;
  registros: T[];
  rodape?: F;

  constructor(
    private registersConstructor: new (itemData: any) => T,
    data?: any,
    private registerFooterConstructor?: new (itemData: any) => F
  ) {
    this.totalPaginas = data?.num_pages || 0;
    this.paginaAtual = data?.page ? data?.page - 1 : 0;
    this.tamanhoPagina = data?.page_size || 10;
    this.totalRegistros = data?.count || 0;
    this.registros = data?.results
      ? data.results.map((item: any) => new this.registersConstructor(item))
      : [];
    this.rodape =
      data?.footer && this.registerFooterConstructor
        ? new this.registerFooterConstructor(data.footer)
        : undefined;
  }
}
