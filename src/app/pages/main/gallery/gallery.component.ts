import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Galeria } from 'src/app/core/models/galeria';

// Service
import { GaleriaService } from 'src/app/core/services/galeria.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  galeria: any[] = [];
  public page!: number;

  galerias: Galeria[];
  selectGroup: any;

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public serviceGallery: GaleriaService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getGallery();
  }

  getGallery() {
    this.serviceGallery.getGalleryByGrupos().subscribe((dataGallery) => {
      this.galeria = dataGallery;
    });
  }

  openModal(targetModal) {
    this.selectGroup = targetModal.elementRef.nativeElement.parentElement.parentElement.parentElement.outerText

    this.serviceGallery.getBySelectGroup(this.selectGroup).then((datoGroup) => {
      this.galerias = datoGroup;
    });
    
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
    });
  }

  compra(e){
    console.log(e);
  }
}
