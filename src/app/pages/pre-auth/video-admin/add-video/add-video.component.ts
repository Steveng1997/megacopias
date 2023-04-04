import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
// Service
import { VideoService } from 'src/app/core/services/video.service';
//Angular
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.component.html',
  styleUrls: ['./add-video.component.css']
})
export class AddVideoComponent implements OnInit {

  public precio: number = 0;
  videoText: any;
  public nombre: string = '';

  formTemplate = new FormGroup({
    video: new FormControl(null, Validators.required),
    nombre: new FormControl('')
  });

  public mensajeArchivo = 'No hay un archivo seleccionado';
  public datosFormulario = new FormData();
  public nombreArchivo = '';
  public URLPublica = '';
  public porcentaje = 0;
  public finalizado = false;

  constructor(
    public router: Router,
    public storage: AngularFireStorage,
    public serviceVideo: VideoService
  ) { }

  ngOnInit(): void { }

  devolver() {
    this.router.navigate([`admin/videoAdmin`]);
  }

  public cambioArchivo(event) {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.mensajeArchivo = `Archivo preparado: ${event.target.files[i].name}`;
        this.nombreArchivo = event.target.files[i].name;
        this.datosFormulario.delete('archivo');
        this.datosFormulario.append('archivo', event.target.files[i], event.target.files[i].name)
      }
    } else {
      this.mensajeArchivo = 'No hay un archivo seleccionado';
    }
  }

  //Sube el archivo a Cloud Storage
  public subirArchivo() {
    let archivo = this.datosFormulario.get('archivo');
    let referencia = this.serviceVideo.referenciaCloudStorage(this.nombreArchivo);
    let tarea = this.serviceVideo.tareaCloudStorage(this.nombreArchivo, archivo);

    //Cambia el porcentaje
    tarea.percentageChanges().subscribe((porcentaje) => {
      this.porcentaje = Math.round(porcentaje);
      if (this.porcentaje == 100) {
        this.finalizado = true;

        referencia.getDownloadURL().subscribe((URL) => {
          this.URLPublica = URL;
        });
      }
    });


  }

  aceptar() {
    if (this.porcentaje == 100) {
      console.log(this.URLPublica)
      this.serviceVideo.register(this.formTemplate.value.nombre, this.URLPublica)
      this.router.navigate([`admin/videoAdmin`]);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: '¡Insertado Correctamente!',
        showConfirmButton: false,
        timer: 2500,
      });

    } else {
      console.log(this.URLPublica)
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'El video aun no carga!',
        showConfirmButton: false,
        timer: 2500,
      });
    }
  }
}