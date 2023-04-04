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
    Aos.init();
  }
}
