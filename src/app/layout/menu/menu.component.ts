import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AppState} from "../../app.service";
import {ModalDismissReasons, NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {environment} from "../../../environments/environment";
import {NgxPermissionsService} from "ngx-permissions";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {

  title = 'appBootstrap';

  closeResult!: string;
  authForm!: FormGroup;
  showLoginForm: boolean = true;

  subscriptions: Subscription[] = [];

  modalReference!: NgbModalRef;

  user: any = null;

  private readonly JWT_TOKEN = 'TOKEN_LOG';
  private readonly USER_NAME = 'USER_NAME';
  private readonly ROLE = 'ROLE';

  constructor(private dialog: MatDialog,
              private service: AppState,
              private modalService: NgbModal,
              private formBuilder: FormBuilder,
              private permissionsService: NgxPermissionsService, private router: Router) {
    this.getPermissionsFromLocalStorage();
  }


  ngOnInit() {
    this.authForm = this.formBuilder.group({
      userType: ['cliente', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: [''],
    });
    this.authForm.get('confirmPassword')?.setValidators(this.passwordMatchValidator.bind(this));
    this.verifyToken();
  }

  toggleForm() {
    this.showLoginForm = !this.showLoginForm;
    const confirmPasswordControl = this.authForm.get('confirmPassword');

    if (this.showLoginForm) {
      confirmPasswordControl?.clearValidators();
    } else {
      confirmPasswordControl?.setValidators(this.passwordMatchValidator.bind(this));
    }
    confirmPasswordControl?.updateValueAndValidity();
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (this.showLoginForm) {
      control?.clearValidators();
      return null
    } else {
      const password = this.authForm.get('password')?.value;
      const confirmPassword = control.value;
      return password === confirmPassword ? null : {passwordMismatch: true};
    }
  }

  onSubmit() {
    if (this.showLoginForm) {
      // Lógica para iniciar sesión
      console.log('Iniciando sesión:', this.authForm.value);
      this.loginRegister(environment.api.endPoints.auth.login);
    } else {
      // Lógica para registrar usuario
      console.log('Registrando usuario:', this.authForm.value);
      this.loginRegister(environment.api.endPoints.auth.register);
    }
  }

  loginRegister(endpoint: string) {
    const body = {
      email: this.authForm.value.email,
      password: this.authForm.value.password,
      userType: this.authForm.value.userType
    };
    this.subscriptions.push(
      this.service.post(endpoint, body)
        .subscribe((res: any) => {
          if (res.hasOwnProperty('error')) {
            alert(res.error);
            this.user = null;
          } else if (res.hasOwnProperty('token')) {
            localStorage.setItem(this.JWT_TOKEN, res.token);
            localStorage.setItem(this.USER_NAME, res.user);
            localStorage.setItem(this.ROLE, res.user_type);
            this.user = res.user;
            console.log(res);
            this.permissionsService.addPermission(res.user_type);
            this.savePermissionsToLocalStorage();
            this.closeLogin();
          }
        }, error => {
          console.log(error);
        }));
  }


  open(content: any) {
    this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.modalReference.result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  closeLogin() {
    if (this.modalReference) {
      this.modalReference.dismiss('Cross click');
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  verifyToken() {
    console.log(JSON.parse(JSON.stringify(localStorage.getItem(this.ROLE))));
    if (this.getJwtToken()) {
      this.subscriptions.push(
        this.service.get(environment.api.endPoints.auth.verifyToken)
          .subscribe((res: any) => {
            if (res.hasOwnProperty('isValid')) {
              if (res.isValid) {
                console.log(res.isValid);
                this.user = localStorage.getItem(this.USER_NAME) != null ? localStorage.getItem(this.USER_NAME) : null;
                this.permissionsService.addPermission(JSON.stringify(localStorage.getItem(this.ROLE)).slice(1, -1));
              } else {
                this.user = null;
              }
            }
          }, error => {
            console.log(error);
          }));
    } else {
      this.user = null;
    }
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  exit() {
    localStorage.removeItem(this.USER_NAME);
    localStorage.removeItem(this.JWT_TOKEN);
    this.permissionsService.flushPermissions();
    this.verifyToken();
    this.router.navigateByUrl('/home');
  }

  savePermissionsToLocalStorage() {
    const permissions = this.permissionsService.getPermissions();
    localStorage.setItem('userPermissions', JSON.stringify(permissions));
  }

  getPermissionsFromLocalStorage() {
    const storedPermissions = localStorage.getItem('userPermissions');
    return storedPermissions ? JSON.parse(storedPermissions) : [];
  }

}
