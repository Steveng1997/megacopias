import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-buy',
  templateUrl: './table-buy.component.html',
  styleUrls: ['./table-buy.component.css']
})
export class TableBuyComponent implements OnInit {

  InformationBuy: any;
  public page!: number;

  constructor() { }

  ngOnInit(): void {
    this.obtenerInfo();
  }

  obtenerInfo() {
    this.InformationBuy = JSON.parse(localStorage.getItem('informaciondetodo'));
  }

  DeleteUser(e) {
    const items = JSON.parse(localStorage.getItem('informaciondetodo'));
    const filtered = items.filter(item => item.id === e);
    console.log(filtered)
    localStorage.setItem('informaciondetodo', JSON.stringify(filtered));
  }
}