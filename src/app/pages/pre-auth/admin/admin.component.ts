import { Component, OnInit } from '@angular/core';

//importamos el servicio
import { LoginService } from 'src/app/core/services/login.service';
//importamos los modulos para formularios
import { FormBuilder } from '@angular/forms';
//importamos el enrutador
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/core/models/login';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  user: Usuario[];
  idUser: string;

  constructor(
    public router: Router,
    public serviceUser: LoginService,
    public formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.idUser = this.activeRoute.snapshot.paramMap.get('id');
    this.serviceUser.getById(this.idUser).then((rp) => {
      this.user = rp;
    });
  }

  users() {
    this.router.navigate([`admin/usuarios`]);
  }

  home() {
    this.router.navigate([`admin/home`]);
  }

  galery() {
    this.router.navigate([`admin/galleryAdmin`]);
  }

  video() {
    this.router.navigate([`admin/videoAdmin`]);
  }


  salir() {
    this.router.navigate([`login`]);
  }

}
