import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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

  formTemplate = new FormGroup({
    video: new FormControl(''),
    nombre: new FormControl(''),
  });

  constructor(
    public router: Router,
    public storage: AngularFireStorage,
    public serviceVideo: VideoService
  ) { }

  ngOnInit(): void { }

  devolver() {
    this.router.navigate([`admin/videoAdmin`]);
  }

  onAddGalery(formValue) {
    debugger
    this.serviceVideo.register(formValue).then((rp) => {
      if (rp) {
        this.serviceVideo.getByInsert(rp['id']).then((respuesta) => {
          if (respuesta) {
            // Imagen 1
            if (this.videoText != undefined) {
              this.serviceVideo.updateVideo(
                respuesta['idDocument'],
                respuesta['id'],
                this.videoText
              ).then((a => {
console.log(a)
              }));
              this.router.navigate([`admin/videoAdmin`]);
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: '¡Insertado Correctamente!',
                showConfirmButton: false,
                timer: 2500,
              });
            } else {
              Swal.fire('No has seleccionado ningun video')
            }
            // Fin imagen 1
          }
        })
      }
    })
  }



  VideoTexto(fileInput) {
    debugger
    let file = (<HTMLInputElement>fileInput.target).files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (
        file.type == 'video/mp4' ||
        file.type == 'video/mov' ||
        file.type == 'video/webm' ||
        file.type == 'video/avi' ||
        file.type == 'video/flv'
      ) {
        this.videoText = reader.result;
      }
    };
  }
}