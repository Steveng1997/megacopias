import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-buy',
  templateUrl: './table-buy.component.html',
  styleUrls: ['./table-buy.component.css']
})
export class TableBuyComponent implements OnInit {

  InformationBuy: any;
  public page!: number;
  totalAmounts: number;

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
    localStorage.setItem('informaciondetodo', JSON.stringify(filtered));
  }

  amount(e, id) { 
    const product = this.InformationBuy.filter(item => item.id === id)
    const price = product[0].precio
    const count = parseInt(e.target.value)
    const total = price * count
    product[0].total = total
    product[0].cantidad = count
    const index = this.InformationBuy.findIndex(item => item.id === id)
    this.InformationBuy[index] = product[0]
    localStorage.setItem('informaciondetodo', JSON.stringify(this.InformationBuy));
  }
}