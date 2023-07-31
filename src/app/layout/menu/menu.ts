import {toArray} from "rxjs";

export class Menu {

  text: string = "";
  route: string = "";
  totalRegistros: number = 0;

  constructor(text: string, route: string, totalRegistros: number) {
    this.text = text;
    this.route = route;
    this.totalRegistros = totalRegistros;
  }
}
