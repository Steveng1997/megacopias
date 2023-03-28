import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
// Service
import { GaleriaService } from 'src/app/core/services/galeria.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {

  galeria: any[] = [];

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public serviceGallery: GaleriaService,
  ) { }

  ngOnInit(): void {
    this.getGallery();
  }

  getGallery() {
    this.serviceGallery.getGalleryByGrupos().subscribe((dataGallery) => {
      this.galeria = dataGallery;
    });
  }

}
