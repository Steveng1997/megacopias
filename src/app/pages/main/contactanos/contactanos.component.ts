import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.css']
})
export class ContactanosComponent implements OnInit {

  selectNumber: any = 1;

  number12: number = 12000;

  respuesta: number;
  texto: any;

  objeto: any;
  constructor(
  ) { }

  ngOnInit(): void {
    this.respuesta = this.number12 * this.selectNumber;
  }


  cambio(e) {
    this.selectNumber = e.target.value;

    // this.texto = document.getElementById("number4").innerText;

    // console.log(this.texto)
    console.log("number number" + this.selectNumber)



    this.respuesta = this.number12 * this.selectNumber;

    console.log("respuestaa", this.respuesta)
  }
}
