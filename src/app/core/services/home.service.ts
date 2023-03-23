import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import 'firebase/compat/app';
// Model
import { Home } from '../models/home';

@Injectable()
export class HomeService {

  constructor(
    public router: Router,
    private db: AngularFirestore,
  ) { }

  // -----------------------------------------------------------------------------------
  // Register
  // -----------------------------------------------------------------------------------

  makeid(length: number) {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  register(texto: string) {
    let user = {
      id: `uid${this.makeid(10)}`,
      texto: texto,
    };
    return new Promise<any>((resolve, reject) => {
      this.db
        .collection('home')
        .add(user)
        .then(
          (response) => resolve(response),
          (error) => reject(error)
        );
    });
  }

  // -----------------------------------------------------------------------------------
  // End register
  // -----------------------------------------------------------------------------------

  // -----------------------------------------------------------------------------------
  // Get
  // -----------------------------------------------------------------------------------

  getById(id: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.db
        .collection('home', (ref) => ref.where('id', '==', id))
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

  getHome() {
    return this.db
      .collection('home', (ref) => ref.orderBy('id', 'asc'))
      .valueChanges();
  }
  
  // -----------------------------------------------------------------------------------
  // End Get
  // -----------------------------------------------------------------------------------

  // -----------------------------------------------------------------------------------
  // Update
  // -----------------------------------------------------------------------------------

  updateText(idDocument: string, idHome: any, hom: Home) {
    return new Promise<any>((resolve, _reject) => {
      this.db
        .collection('home', (ref) => ref.where('id', '==', idHome))
        .doc(idDocument)
        .update(hom)
        .then((_res) => {
          resolve(true);
        }).catch((_err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error al modificar el texto del Home',
          });
        });
    })
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