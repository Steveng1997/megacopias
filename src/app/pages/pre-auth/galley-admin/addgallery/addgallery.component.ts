import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
// Service
import { GaleriaService } from 'src/app/core/services/galeria.service';
//Angular
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-addgallery',
  templateUrl: './addgallery.component.html',
  styleUrls: ['./addgallery.component.css']
})
export class AddgalleryComponent implements OnInit {

  public precio: number = 0;

  selectPrincipal: any;
  selectGroup: any;

  imagetexto1: any;

  formTemplate = new FormGroup({
    selectFirst: new FormControl(''),
    imagen: new FormControl(''),
    selectGroup: new FormControl(''),
    nombre: new FormControl(''),
    descripcion: new FormControl(''),
    precio: new FormControl(''),
  });

  constructor(
    public router: Router,
    public storage: AngularFireStorage,
    public serviceGallery: GaleriaService
  ) { }

  ngOnInit(): void { }

  devolver() {
    this.router.navigate([`admin/galleryAdmin`]);
  }

  onAddGalery(formValue) {
    debugger
    if (this.formTemplate.value.selectFirst != '') {
      this.serviceGallery.register(formValue).then((rp) => {
        if (rp) {
          this.serviceGallery.getByInsert(rp['id']).then((respuesta) => {
            if (respuesta) {
              // Imagen 1
              if (this.imagetexto1 != undefined) {
                this.serviceGallery.updateImage1(
                  respuesta['idDocument'],
                  respuesta['id'],
                  this.imagetexto1
                );
                this.router.navigate([`admin/galleryAdmin`]);
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: '¡Insertado Correctamente!',
                  showConfirmButton: false,
                  timer: 2500,
                });
              } else {
                Swal.fire('No has seleccionado ninguna imagen')
              }
              // Fin imagen 1
            }
          })
        }
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Verifica si no hay ningun campo vacìo',
      });
    }
  }

  ImageTexto(fileInput) {
    let file = (<HTMLInputElement>fileInput.target).files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (
        file.type == 'image/jpeg' ||
        file.type == 'image/jpg' ||
        file.type == 'image/png' ||
        file.type == 'image/jpeg'
      ) {
        this.imagetexto1 = reader.result;
      }
    };
  }

  seleccionPrincipal(e) {
    this.selectPrincipal = e.target.value;
    if (this.selectPrincipal == '0') {
      Swal.fire({
        icon: 'error',
        title: 'El campo no debe estar vacio.',
      });
    }
  }

  seleccionGrupo(e) {
    this.selectGroup = e.target.value;
    if (this.selectGroup == '0') {
      Swal.fire({
        icon: 'error',
        title: 'Selecciona un grupo.',
      });
    }
  }
}
