import { Component, OnInit } from '@angular/core';
import Typed from 'typed.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {
    var options = {
      strings: ['', 'Full-Stack', 'WEB', 'Mobile'],
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
    typed.reset(true)

    var typed2 = new Typed('.typed2', options2);
    typed2.reset(true)
  }
}
