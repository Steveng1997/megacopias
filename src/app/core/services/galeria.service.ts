import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import 'firebase/compat/app';

@Injectable()
export class GaleriaService {

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

  register(formGallery) {
    formGallery = {
      id: `uid${this.makeid(10)}`,
      selectFirst: formGallery.selectFirst,
      imagen: formGallery.imagen,
      selectGroup: formGallery.selectGroup,
      descripcion: formGallery.descripcion,
      precio: formGallery.precio
    };
    return new Promise<any>((resolve, reject) => {
      this.db
        .collection('gallery')
        .add(formGallery)
        .then(
          (response) => resolve(response),
          (error) => reject(error)
        );
    });
  }

  getByInsert(id): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .collection('gallery')
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

  getGalleryByGrupos() {
    return this.db
      .collection('gallery', (ref) => ref.where('selectFirst', '==', 'grupos'))
      .valueChanges();
  }

  getGallery() {
    return this.db
      .collection('gallery', (ref) =>  ref.orderBy('id', 'asc'))
      .valueChanges();
  }

  getBySelectGroup(selectGroup: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .collection('gallery', (ref) => ref.where('selectFirst', '==', 'fotos').where('selectGroup', '==', selectGroup))
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
  // End Get
  // -----------------------------------------------------------------------------------

  // -----------------------------------------------------------------------------------
  // Update
  // -----------------------------------------------------------------------------------

  updateImage1(idDocumentReto, idReto, imagen) {
    return this.db
      .collection('gallery', (ref) => ref.where('id', '==', idReto))
      .doc(idDocumentReto)
      .update({ imagen: imagen });
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