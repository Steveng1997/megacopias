import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/core/services/home.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home-add-admin',
  templateUrl: './home-add-admin.component.html',
  styleUrls: ['./home-add-admin.component.css']
})
export class HomeAddAdminComponent implements OnInit {
  public texto: string = '';

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public serviceHome: HomeService,
  ) { }

  ngOnInit(): void { }

  onAddHome() {
    if (this.texto != '') {
      this.serviceHome.register(this.texto)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: '¡Insertado Correctamente!',
        showConfirmButton: false,
        timer: 2500,
      });
      this.router.navigate([`admin/home`]);
    }
  }

  devolver() {
    this.router.navigate([`admin/home`]);
  }
}