import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-buy',
  templateUrl: './table-buy.component.html',
  styleUrls: ['./table-buy.component.css']
})
export class TableBuyComponent implements OnInit {

  InformationBuy: any;

  constructor(
    public router: Router,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.obtenerInfo();
  }

  obtenerInfo() {
    this.InformationBuy = JSON.parse(localStorage.getItem('informaciondetodo'));
    console.log(this.InformationBuy)
  }

}
