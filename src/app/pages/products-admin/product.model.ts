export interface Product {
  id: number;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  email: string;

  [key: string]: any; // Firma de índice para permitir el acceso a cualquier propiedad
}
