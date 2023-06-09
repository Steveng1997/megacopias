import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/core/models/login';
import * as Aos from 'aos';
// Service
import { LoginService } from 'src/app/core/services/login.service';
// Alert
import Swal from 'sweetalert2';
// Modal
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// Error Firebase
import { AuthErrorCodes } from '@firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
})
export class LoginComponent implements OnInit {
  public email: string = '';
  public password: string = '';
  usuarios: Usuario[];
  errorResaurarContraseña = "auth/wrong-password";
  errorInbal = "auth/invalid-email";
  mostrarOpenModal: Boolean = false;

  constructor(
    public router: Router,
    public serviceLogin: LoginService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    Aos.init();
  }

  onLogin(): void {
    if (this.email != '') {
      if (this.password != '') {
        this.serviceLogin.getEmailYPassword(this.email, this.password).then((resp => {
          this.serviceLogin.existEmail(resp.user.email).then((dataCategoria) => {
            this.usuarios = dataCategoria;
            this.serviceLogin.updatePassword(dataCategoria[0]['idDocument'], dataCategoria[0]['id'], this.password)
            this.router.navigate([`admin`]);
          })
        })).catch((err) => {
          if (err.code == AuthErrorCodes.INVALID_PASSWORD || err.code == AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER) {
            this.restorePassword();
          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'El correo no esta registrado',
            });
          }
        })
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El campo de la contraseña se encuentra vacío',
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El campo del correo se encuentra vacío',
      });
    }
  }

  restorePassword() {
    this.serviceLogin.resetPassword(this.email)

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Revisa tu correo para restablecer la contraseña!',
      showConfirmButton: false,
      timer: 2500,
    });

    this.modalService.dismissAll();
  }

  registro() {
    this.router.navigate([`registro`]);
  }
}