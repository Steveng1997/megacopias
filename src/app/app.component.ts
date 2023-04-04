import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  date = new Date().toLocaleDateString();

  constructor() { }

  ngOnInit(): void {
    const items = JSON.parse(localStorage.getItem('informaciondetodo'));
    const filtered = items.filter(item => item.id);
    console.log(filtered)

    if (filtered[0]['date'] != this.date) {
      localStorage.clear();
    }
  }
}
