// Importaciones necesarias desde Angular y otras dependencias
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Product} from './product.model';
import {AppState} from "../../app.service";
import {environment} from "../../../environments/environment";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.css']
})
export class ProductsAdminComponent implements OnInit, AfterViewInit {
  // Arreglo que almacenará todos los productos obtenidos del servicio
  products: Product[] = [];
  // Arreglo que almacenará los productos filtrados y que se mostrarán en la vista
  filteredProducts: Product[] = [];
  // Término de búsqueda para aplicar filtros
  searchTerm = '';
  // Tamaño de la página de resultados
  pageSize = 5;
  // Página actual seleccionada en el paginador
  currentPage = 0;

  // Referencia al paginador de la vista
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Constructor de la clase que inyecta las dependencias necesarias
  constructor(private productService: AppState, private router: Router) {
  }

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.getProducts();
  }

  // Método que se ejecuta después de que la vista y los componentes hijos se hayan inicializado
  ngAfterViewInit(): void {
    // Se suscribe al evento de cambio de página del paginador para aplicar filtros al paginar
    this.paginator.page.subscribe(() => this.applyFilters());
  }

  // Método que obtiene los productos del servicio
  getProducts(): void {
    this.productService.get(environment.api.endPoints.products.porductAllAdmin).subscribe((products: any) => {
      this.products = products;
      this.applyFilters();
    });
  }

  // Método que aplica los filtros al arreglo de productos
  applyFilters(): void {
    const filteredData = this.products.filter((product) => this.searchFilter(product));
    this.paginator.length = filteredData.length;
    this.filteredProducts = filteredData.slice(
      this.paginator.pageIndex * this.paginator.pageSize,
      (this.paginator.pageIndex + 1) * this.paginator.pageSize
    );
  }

  // Método que verifica si un producto cumple con el término de búsqueda ingresado
  searchFilter(product: Product): boolean {
    if (!this.searchTerm) {
      return true;
    }
    return (
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      product.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      product.quantity.toString().includes(this.searchTerm) ||
      product.price.toString().includes(this.searchTerm)
    );
  }

  // Método que se ejecuta cuando se cambia de página en el paginador
  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.applyFilters();
  }

  // Método que navega a la página de creación de un nuevo producto
  goToCreateProduct(): void {
    this.router.navigateByUrl('/products-create');
  }

  // Método que navega a la página de actualización de un producto específico
  selectProduct(row: any) {
    console.log(row);
    this.router.navigateByUrl(`/products-update/${row.id}`);
  }
}
