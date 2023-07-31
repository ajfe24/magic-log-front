import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class MatPaginatorIntlSpanish extends MatPaginatorIntl {
  // @ts-ignore
  itemsPerPageLabel = 'Elementos por página:';
  // @ts-ignore
  nextPageLabel = 'Siguiente página';
  // @ts-ignore
  previousPageLabel = 'Página anterior';
  // @ts-ignore
  firstPageLabel = 'Primera página';
  // @ts-ignore
  lastPageLabel = 'Última página';


  constructor() {
    super();
    this._updateTranslations();
  }

  private _updateTranslations(): void {
    this.itemsPerPageLabel = 'Elementos por página:';
    this.nextPageLabel = 'Siguiente página';
    this.previousPageLabel = 'Página anterior';
    this.firstPageLabel = 'Primera página';
    this.lastPageLabel = 'Última página';
  }

  getItemsPerPageLabel(): string {
    return this.itemsPerPageLabel;
  }

  getNextPageLabel(): string {
    return this.nextPageLabel;
  }

  getPreviousPageLabel(): string {
    return this.previousPageLabel;
  }

  getFirstPageLabel(): string {
    return this.firstPageLabel;
  }

  getLastPageLabel(): string {
    return this.lastPageLabel;
  }

  // @ts-ignore
  getRangeLabel = (page: number, pageSize: number, length: number): string => {
    if (length === 0 || pageSize === 0) {
      return `0 de ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} de ${length}`;
  };
}
