import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
//importamos el servicio
import { HomeService } from 'src/app/core/services/home.service';
//importamos los modulos para formularios
import { FormBuilder } from '@angular/forms';
//importamos el enrutador
import { Router, ActivatedRoute } from '@angular/router';
// Model
import { Home } from 'src/app/core/models/home';

@Component({
  selector: 'app-update-home',
  templateUrl: './update-home.component.html',
  styleUrls: ['./update-home.component.css']
})
export class UpdateHomeComponent implements OnInit {

  hom: Home[];
  idUser: string;

  constructor(
    public formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router,
    public serviceHome: HomeService,
  ) { }

  ngOnInit(): void {
    this.idUser = this.activeRoute.snapshot.paramMap.get('id');
    this.serviceHome.getById(this.idUser);
    this.serviceHome.getById(this.idUser).then((datosHome) => {
      return (this.hom = datosHome);
    });
  }

  onUpdateHome(idDocument, idEstudiante, hom: Home) {
    const id = this.activeRoute.snapshot.paramMap.get('id');

    if (hom.texto != "" || hom.texto != null) {
      this.serviceHome.updateText(idDocument, idEstudiante, hom)
      this.router.navigate([`admin/home`]);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: '¡Editado Correctamente!',
        showConfirmButton: false,
        timer: 2500,
      });

    } else {
      Swal.fire({
        icon: 'error',
        title: 'El campo del correo no debe estar vacio.',
      });
    }
  }

  devolver() {
    this.router.navigate([`admin/home`]);
  }

}