import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthErrorCodes } from '@firebase/auth';
//importamos el servicio
import { LoginService } from 'src/app/core/services/login.service';
//importamos los modulos para formularios
import { FormBuilder } from '@angular/forms';
//importamos el enrutador
import { Router, ActivatedRoute } from '@angular/router';
// Model
import { Usuario } from 'src/app/core/models/login';

@Component({
  selector: 'app-update-users',
  templateUrl: './update-users.component.html',
  styleUrls: ['./update-users.component.css']
})
export class UpdateUsersComponent implements OnInit {

  usua: Usuario[];
  idUser: string;

  constructor(
    public formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router,
    public serviceLogin: LoginService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.idUser = this.activeRoute.snapshot.paramMap.get('id');
    this.serviceLogin.getById(this.idUser);
    this.serviceLogin.getById(this.idUser).then((datosUsers) => {
      return (this.usua = datosUsers);
    });
  }

  restorePassword() {
    this.serviceLogin.resetPassword(this.usua[0]['email'])
    this.modalService.dismissAll();
  }

  onUpdateUser(idDocument, idEstudiante, usu: Usuario) {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    if (usu.email != "" || usu.email != null) {
      this.serviceLogin.getEmailYPassword(usu.email, usu.password).then((resp => {
        console.log(resp)
        if (resp.user.email != '') {
          this.serviceLogin.existEmail(resp.user.email).then((dataCategoria => {
            this.router.navigate([`admin/usuarios`]);
          })).catch((rp) => {
            this.serviceLogin.updateUsuarios(idDocument, idEstudiante, usu).then((resp => {
              if (resp = true) {
                this.serviceLogin.getByEmail(usu.email).then((dataCategoria) => {
                  this.usua = dataCategoria;
                  if (this.usua) {
                    this.restorePassword();
                    this.router.navigate([`admin/usuarios`]);
                    Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: '¡Editado Correctamente!',
                      text: 'Revise su correo para completar.',
                      showConfirmButton: false,
                      timer: 2500,
                    });
                  }
                })
              };
            }))
          })
        }
      })).catch((err) => {
        if (err.code == AuthErrorCodes.USER_DELETED) {
          console.log("HOLAA")
        }
      })


    } else {
      Swal.fire({
        icon: 'error',
        title: 'El campo del correo no debe estar vacio.',
      });
    }
  }

  devolver() {
    this.router.navigate([`admin/usuarios`]);
  }
}
