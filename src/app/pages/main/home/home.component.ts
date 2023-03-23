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

    var options2 = {
      strings: ['', 'Bienvenidos'],
      typeSpeed: 200,
      backSpeed: 100,
      loop: false,
    };

    var typed = new Typed('.typed', options);
    var typed2 = new Typed('.typed2', options2);
    typed.reset(true)
    typed2.reset(true)
  }
}
