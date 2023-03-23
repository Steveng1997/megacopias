import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-regis-login',
  templateUrl: './regis-login.component.html',
  styleUrls: ['./regis-login.component.css']
})
export class RegisLoginComponent implements OnInit {

  public email: string = '';
  public password: string = '';
  idUser: string;

  constructor(
    public router: Router,
    public serviceLogin: LoginService,
  ) { }

  ngOnInit(): void {
  }

  devolver() {
    this.router.navigate([`login`]);
  }

  onAddUser(): void {
    if (this.email != '') {
      if (this.password != '') {
        this.serviceLogin.getByEmail(this.email).then((emailexist) => {
          if (emailexist.length != 0) {
            Swal.fire({
              icon: 'error',
              title: 'El usuario existe en la base de datos.',
            });
          } else {
            if (this.password.length >= 7) {
              this.serviceLogin.registerUser(
                this.email,
                this.password,
              ).then((respuesta => {
                if (respuesta) {
                  this.serviceLogin.registerAutenticacion(this.email, this.password);
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: '¡Insertado Correctamente!',
                    showConfirmButton: false,
                    timer: 2500,
                  });
                  this.router.navigate([`login`]);
                }
              }))
            } else {
              Swal.fire({
                icon: 'error',
                title: 'La contraseña debe tener mas de 6 letras.',
              });
            }
          }
        });
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'El campo password se encuentra vacío.',
        });
      }
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'El campo email se encuentra vacío.',
      });
    }
  }
}