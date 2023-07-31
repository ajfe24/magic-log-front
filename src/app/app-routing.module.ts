import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {ProductsComponent} from "./pages/products/products.component";
import {CreateUpdateComponent} from "./pages/products/create-update/create-update.component";
import {NgxPermissionsGuard} from "ngx-permissions";
import {ProductsAdminComponent} from "./pages/products-admin/products-admin.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/home"
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "products",
    component: ProductsComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: 'vendedor',
        redirectTo: '/home'
      }
    }
  },
  {
    path: "products-create",
    component: CreateUpdateComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: 'vendedor',
        redirectTo: '/home'
      }
    }
  },
  {
    path: "products-update/:id",
    component: CreateUpdateComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: 'vendedor',
        redirectTo: '/home'
      }
    }
  },
  {
    path: "products-admin",
    component: ProductsAdminComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: 'administrador',
        redirectTo: '/home'
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
