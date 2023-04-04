import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.css']
})
export class ContactanosComponent implements OnInit {

  formTemplate = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    subject: new FormControl(''),
    message: new FormControl(''),
  });

  constructor(
  ) { }

  ngOnInit(): void {
  }

  enviar() {
    const URL = `https://api.whatsapp.com/send?phone=+573043277453&text=Hola.%0A%0AMi nombre es: %20${this.formTemplate.value.name},%20 este es mi numero celular:%20${this.formTemplate.value.phone}%20 y mi correo electronico: %20${this.formTemplate.value.email}&source=&data=`;
    window.open(URL, "_blank");
  }
}
