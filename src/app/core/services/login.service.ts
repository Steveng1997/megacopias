import { Injectable } from '@angular/core';
import 'firebase/compat/app';
import { Usuario } from '../models/login';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable()
export class LoginService {

  constructor(
    public router: Router,
    private db: AngularFirestore,
    private authFire: AngularFireAuth
  ) { }

  usuarios: Usuario[] = [];

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

  registerUser(email: string, password: string) {
    let user = {
      id: `uid${this.makeid(10)}`,
      email: email,
      password: password,
    };
    return new Promise<any>((resolve, reject) => {
      this.db
        .collection('usuarios')
        .add(user)
        .then(
          (response) => resolve(response),
          (error) => reject(error)
        );
    });
  }

  registerAutenticacion(email: string, password: string) {
    this.authFire.createUserWithEmailAndPassword(email, password);
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
        .collection('usuarios', (ref) => ref.where('id', '==', id))
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

  getByIdAll(id: any) {
    return this.db
      .collection('usuarios', (ref) => ref.where('id', '==', id))
      .valueChanges();
  }

  getByEmail(email: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.db
        .collection('usuarios', (ref) => ref.where('email', '==', email))
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

  emailExistAndPassword(email: string, password: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.db
        .collection('usuarios', (ref) =>
          ref.where('email', '==', email).where('password', '==', password)
        )
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

  getUsuariosByDocument(id: any): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.db
        .collection('usuarios', (ref) => ref.where('id', '==', id))
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

  getUsuarios() {
    return this.db
      .collection('usuarios', (ref) => ref.orderBy('id', 'asc'))
      .valueChanges();
  }


  getEmailYPassword(email: string, password: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.authFire.signInWithEmailAndPassword(email, password)
        .then(
          (response) => resolve(response),
          (error) => reject(error)
        );
    });
  }

  // -----------------------------------------------------------------------------------
  // End Get
  // -----------------------------------------------------------------------------------

  // -----------------------------------------------------------------------------------
  // Update
  // -----------------------------------------------------------------------------------

  updateUsuarios(idDocument: string, idUser: any, user: Usuario) {
    return new Promise<any>((resolve, _reject) => {
      this.db
        .collection('usuarios', (ref) => ref.where('id', '==', idUser))
        .doc(idDocument)
        .update(user)
        .then((_res) => {
          resolve(true);
        }).catch((_err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error al modificar el Usuario',
          });
        });
    })
  }


  async resetPassword(email: string): Promise<void> {
    try {
      return this.authFire.sendPasswordResetEmail(email);
    } catch (error) {
      console.log(error);
    }
  }

  // -----------------------------------------------------------------------------------
  // End Update
  // -----------------------------------------------------------------------------------

  // -----------------------------------------------------------------------------------
  // Delete
  // -----------------------------------------------------------------------------------

  async deleteUsuario(idDocument: string, id: any): Promise<any> {
    this.db
      .collection('usuarios', (ref) => ref.where('id', '==', id))
      .doc(idDocument)
      .delete();
  }

  // -----------------------------------------------------------------------------------
  // End Delete
  // -----------------------------------------------------------------------------------
}