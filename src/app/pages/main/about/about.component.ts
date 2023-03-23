import { Component, OnInit } from '@angular/core';
import * as Aos from 'aos';
import Typed from 'typed.js';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})


export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    var options3 = {
      strings: ['', 'PROPÓSITOS'],
      typeSpeed: 120,
      backSpeed: 100,
      loop: true,
    };

    var typed3 = new Typed('.typed3', options3);
    typed3.reset(true)

    Aos.init();
  }
}
