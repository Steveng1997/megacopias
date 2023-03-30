import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import 'firebase/compat/app';

@Injectable()
export class VideoService {

  constructor(
    public router: Router,
    private db: AngularFirestore,
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

  register(formVideo) {
    formVideo = {
      id: `uid${this.makeid(10)}`,
      video: formVideo.video,
      nombre: formVideo.nombre,
    };
    return new Promise<any>((resolve, reject) => {
      this.db
        .collection('videos')
        .add(formVideo)
        .then(
          (response) => resolve(response),
          (error) => reject(error)
        );
    });
  }

  getByInsert(id): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .collection('videos')
        .doc(id)
        .valueChanges({ idField: 'idDocument' })
        .subscribe((rp) => {
          if (rp[0]?.idDocument) {
            resolve(rp);
          } else {
            resolve(rp);
          }
        });
    });
  }

  // -----------------------------------------------------------------------------------
  // End register
  // -----------------------------------------------------------------------------------

  // -----------------------------------------------------------------------------------
  // Get
  // -----------------------------------------------------------------------------------

  getVideo() {
    return this.db
      .collection('videos', (ref) =>  ref.orderBy('id', 'asc'))
      .valueChanges();
  }

  // -----------------------------------------------------------------------------------
  // End Get
  // -----------------------------------------------------------------------------------

  // -----------------------------------------------------------------------------------
  // Update
  // -----------------------------------------------------------------------------------

  updateVideo(idDocumentReto, idReto, videoText: string) {
    return this.db
      .collection('videos', (ref) => ref.where('id', '==', idReto))
      .doc(idDocumentReto)
      .update({ video: videoText });
  }

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