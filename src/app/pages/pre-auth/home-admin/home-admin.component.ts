import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/core/services/home.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  homes: any[] = [];

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public serviceHome: HomeService
  ) { }


  ngOnInit(): void {
    this.getHome();
  }

  getHome() {
    this.serviceHome.getHome().subscribe((datosHomes) => {
      this.homes = datosHomes;
    });
  }
  
  agregar(){
    this.router.navigate([`admin/homeAdd`]);
  }
}
