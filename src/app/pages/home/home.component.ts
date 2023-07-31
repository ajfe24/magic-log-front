import {Component, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {AppState} from "../../app.service";
import {Product} from "../products/product.model";

interface PriceRange {
  label: string;
  min: number;
  max: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  // Término de búsqueda para aplicar filtros
  searchTerm = '';
  // Arreglo que almacenará los productos filtrados y que se mostrarán en la vista
  filteredProducts: Product[] = [];
  // Rango de precios para filtrar
  priceRanges: PriceRange[] = [];
  selectedPriceRange: PriceRange | null = null;
  private currentPriceRange: PriceRange | null = null;

  allPricesFilter: PriceRange = {
    label: 'Todos',
    min: Number.MIN_SAFE_INTEGER,
    max: Number.MAX_SAFE_INTEGER,
  };

  constructor(private productService: AppState) {
    this.getProducts();
  }

  ngOnInit(): void {
  }

  getProducts(): void {
    this.productService.get(environment.api.endPoints.products.porductAll).subscribe((products: any) => {
      this.products = products;
      // const initialProducts = this.products;
      //this.filteredProducts = initialProducts;
      //this.applyFilters();
      this.calculatePriceRanges();
      this.applyFilters();
    });
  }

  calculatePriceRanges(): void {
    const uniquePrices = [...new Set(this.products.map(product => product.price))];
    uniquePrices.sort((a, b) => a - b);

    this.priceRanges = uniquePrices.map((price, index) => ({
      label: index === 0 ? `Menor  a ${price}` : `${uniquePrices[index - 1]} - ${price}`,
      min: index === 0 ? Number.MIN_SAFE_INTEGER : uniquePrices[index - 1],
      max: price,
    }));

    this.priceRanges.push({
      label: `Mayor  a ${uniquePrices[uniquePrices.length - 1]}`,
      min: uniquePrices[uniquePrices.length - 1],
      max: Number.MAX_SAFE_INTEGER,
    });
  }

  applyFilters(): void {
    // Almacena el valor seleccionado antes de aplicar el filtro
    this.currentPriceRange = this.selectedPriceRange;

    // Verificar si se seleccionó el filtro "Todos"
    if (this.currentPriceRange === null) {
      // Si se seleccionó "Todos", filtrar por el objeto allPricesFilter
      const filteredData = this.products.filter((product) => this.searchFilter(product) && this.priceFilter(product));
      this.filteredProducts = filteredData;
    } else {
      // Filtrar por el rango de precios seleccionado
      const filteredData = this.products.filter((product) => this.searchFilter(product) && this.priceFilter(product));
      this.filteredProducts = filteredData;
    }
  }

  priceFilter(product: Product): boolean {
    if (this.currentPriceRange === null) {
      // Si no se ha seleccionado un rango de precios, omitir el filtro y devolver true
      return true;
    }
    console.log(this.currentPriceRange);
    return parseFloat(product.price.toString()) >= parseFloat(this.currentPriceRange.min.toString()) && parseFloat(product.price.toString()) <= parseFloat(this.currentPriceRange.max.toString());
  }

  searchFilter(product: Product): boolean {
    if (!this.searchTerm) {
      return true;
    }
    return (
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  clearFilters() {
    this.selectedPriceRange = null;
    this.searchTerm = '';
    this.applyFilters();
  }
}
