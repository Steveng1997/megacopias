import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import 'firebase/compat/app';


import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

@Injectable()
export class VideoService {

  constructor(
    public router: Router,
    private db: AngularFirestore,
    private angularDb: AngularFireStorage
  ) { }

  // -----------------------------------------------------------------------------------
  // Register
  // -----------------------------------------------------------------------------------

  makeid(length) {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  register(nombre: string, url: string) {
    let videoRegistro = {
      id: `uid${this.makeid(10)}`,
      nombre: nombre,
      url: url
    };
    return new Promise<any>((resolve, reject) => {
      this.db
        .collection('videos')
        .add(videoRegistro)
        .then(
          (response) => resolve(response),
          (error) => reject(error)
        );
    });
  }

  tareaCloudStorage(nombreArchivo: string, datos: any) {
    return this.angularDb.upload(nombreArchivo, datos);
  }

  referenciaCloudStorage(nombreArchivo: string) {
    return this.angularDb.ref(nombreArchivo)
  }

  // -----------------------------------------------------------------------------------
  // End register
  // -----------------------------------------------------------------------------------

  // -----------------------------------------------------------------------------------
  // Get
  // -----------------------------------------------------------------------------------

  getVideo() {
    return this.db
      .collection('videos', (ref) => ref.orderBy('id', 'asc'))
      .valueChanges();
  }

  // -----------------------------------------------------------------------------------
  // End Get
  // -----------------------------------------------------------------------------------

  // -----------------------------------------------------------------------------------
  // Update
  // -----------------------------------------------------------------------------------



  // -----------------------------------------------------------------------------------
  // End Update
  // -----------------------------------------------------------------------------------

  // -----------------------------------------------------------------------------------
  // Delete
  // -----------------------------------------------------------------------------------

  // async deleteUsuario(idDocument: string, id: any): Promise<any> {
  //   this.db
  //     .collection('home', (ref) => ref.where('id', '==', id))
  //     .doc(idDocument)
  //     .delete();
  // }

  // -----------------------------------------------------------------------------------
  // End Delete
  // -----------------------------------------------------------------------------------
}