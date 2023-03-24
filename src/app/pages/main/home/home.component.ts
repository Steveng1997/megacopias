import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/core/services/home.service';
import Typed from 'typed.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  homes: any[] = [];

  constructor(public serviceHome: HomeService) { }

  ngOnInit(): void {

    this.serviceHome.getHome().subscribe((datosHomes) => {
      this.homes = datosHomes[0][`texto`];
      this.textos();
    });
  }

  textos() {
    var options = {
      strings: ['', this.homes],
      typeSpeed: 120,
      backSpeed: 100,
      loop: true,
    };

    var typed = new Typed('.typed', options);
    typed.reset(true)
  }
}
