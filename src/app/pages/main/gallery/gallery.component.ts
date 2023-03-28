import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Galeria } from 'src/app/core/models/galeria';
import Swal from 'sweetalert2';
// Service
import { GaleriaService } from 'src/app/core/services/galeria.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class GalleryComponent implements OnInit {

  galeria: any[] = [];
  public page!: number;
  public pageModal!: number;
  galerias: Galeria[];

  selectGroup: any;

  informacion: any;
  nombre: any;
  precio: any;
  id: any;

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public serviceGallery: GaleriaService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getGallery();
    this.obtenerInfo();
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

  obtenerInfo() {
    this.informacion = JSON.parse(localStorage.getItem('informaciondetodo'));
    console.log(this.informacion)
  }

  guardarInfo(e) {
    Swal.fire({
      text: "¿Deseas comprarlo?",
      icon: 'warning',
      showCancelButton: true,

      cancelButtonText: 'No',
      confirmButtonText: 'Si',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        if (!localStorage.getItem('informaciondetodo')) {
          localStorage.setItem("informaciondetodo", JSON.stringify([]))
        }
        var informacionTodoa = JSON.parse(localStorage.getItem('informaciondetodo'))
        informacionTodoa.push({ nombre: e.nombre, precio: e.precio })

        localStorage.setItem("informaciondetodo", JSON.stringify(informacionTodoa))

      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
      }
    })
  }
}
