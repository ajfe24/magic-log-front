import {AfterViewInit, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AppState} from "../../../app.service";
import {environment} from "../../../../environments/environment";
import {Subscription} from "rxjs";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-update',
  templateUrl: './create-update.component.html',
  styleUrls: ['./create-update.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class CreateUpdateComponent implements OnInit, AfterViewInit, OnDestroy {
  productForm!: FormGroup;
  id: any | null;
  titulo = "Nuevo producto";
  subscriptions: Subscription[] = [];


  constructor(private service: AppState, private formBuilder: FormBuilder, private router: Router, private aRoute: ActivatedRoute) {
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      sku: ['', Validators.required],
      quantity: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      price: [null, [Validators.required]],
    });
    this.isUpdate();
  }

  isUpdate() {
    if (this.id !== null) {
      this.titulo = 'Editar producto';
      this.subscriptions.push(this.service.get(`${environment.api.endPoints.products.productsById}/${this.id}`).subscribe((response: any) => {
        this.productForm.setValue({
          name: response.name,
          sku: response.sku,
          quantity: response.quantity,
          price: response.price
        });
      }));
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      console.log(this.productForm.value);
      // Después de guardar el producto, redirige al componente de lista de productos
      this.createOrUpdate();
    } else {
      // Si el formulario no es válido, muestra una alerta
      alert('Por favor, completa todos los campos correctamente.');
      // Marca todos los campos como tocados para mostrar los mensajes de error
      this.markAllFieldsAsTouched(this.productForm);
    }
  }

  createOrUpdate() {
    if (this.id) {
      this.update();
    } else {
      this.create();
    }
  }

  update() {
    this.subscriptions.push(
      this.service.put(
        `${environment.api.endPoints.products.porductPutDelete}/${this.id}`,
        this.productForm.value)
        .subscribe(res => {
          console.log(res);
          this.router.navigateByUrl('/products');
        }, error => {
          console.log(error);
        })
    );
  }

  create() {
    this.subscriptions.push(
      this.service.post(
        `${environment.api.endPoints.products.porductPost}`,
        this.productForm.value)
        .subscribe(res => {
          console.log(res);
          this.router.navigateByUrl('/products');
        }, error => {
          console.log(error);
        })
    );
  }

  delete() {
    Swal.fire({
      title: `¿Seguro que desea borrar el producto?`,
      text: 'Este proceso no se podra deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'CONTINUAR',
      cancelButtonText: 'CANCELAR'
    }).then((result) => {
      if (result.value) {

        this.subscriptions.push(
          this.service.remove(
            `${environment.api.endPoints.products.porductPutDelete}${this.id}`,
            this.productForm.value)
            .subscribe((res: any) => {
              console.log(res);
              Swal.fire({
                title: `Borrado`,
                text: res.message,
                icon: 'success',
                confirmButtonText: 'OK'
              }).then(() => {
                this.router.navigateByUrl('/products');
              });
            }, error => {
              console.log(error);
            })
        );
      }
    });


  }

  markAllFieldsAsTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markAllFieldsAsTouched(control);
      }
    });
  }

  onlyFloat(e: any, field: any) {
    let key = e.keyCode ? e.keyCode : e.which;
    // backspace
    if (key == 8) {
      return true;
    }
    // 0-9 a partir del .decimal
    if (field.value == '.') {
      field.value = '0';
      return false;
    }
    if (field.value != '') {
      if ((field.value.indexOf('.')) > 0) {
        //si tiene un punto valida dos digitos en la parte decimal
        if (key > 47 && key < 58) {
          if (field.value == '') {
            return true;
          }
          //regexp = /[0-9]{1,10}[\.][0-9]{1,3}$/
          let regexp = /[0-9]{2}$/;
          return !(regexp.test(field.value));
        } else {
          return false;
        }
      }
    }
    // 0-9
    if (key > 47 && key < 58) {
      if (field.value == '') {
        return true;
      }
      let regexp = /[0-9]{10}/;
      return !(regexp.test(field.value));
    }
    // .
    if (key == 46) {
      if (field.value == '') {
        return false;
      }
      let regexp = /^[0-9]+$/;
      return regexp.test(field.value);
    }
    // other key
    return false;
  }

  onlyNumeric(evt: any) {
    let keynum;
    if (window.event) {// IE
      keynum = evt.keyCode;
    } else {
      keynum = evt.which;
    }
    //comprobamos si se encuentra en el rango
    if ((keynum == 8) || (keynum == 37)) {
      return true;
    }
    if (keynum > 47 && keynum < 58) {
      return true;
    } else {
      return false;
    }
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
