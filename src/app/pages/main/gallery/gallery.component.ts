import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { GaleriaService } from 'src/app/core/services/galeria.service';
import * as Aos from 'aos';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  galeria: any[] = [];
  public page!: number;

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public serviceGallery: GaleriaService
  ) { }

  ngOnInit(): void {
    this.getGallery();
  }

  getGallery() {
    this.serviceGallery.getGallery().subscribe((dataGallery) => {
      this.galeria = dataGallery;
    });
  }

}
