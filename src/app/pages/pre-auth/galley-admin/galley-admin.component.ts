import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { GaleriaService } from 'src/app/core/services/galeria.service';

@Component({
  selector: 'app-galley-admin',
  templateUrl: './galley-admin.component.html',
  styleUrls: ['./galley-admin.component.css']
})
export class GalleyAdminComponent implements OnInit {

  galeria: any[] = [];

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

  agregar(){
    this.router.navigate([`admin/galleryAdd`]);
  }

  getGallety(){
    
  }

}
