import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Variables auxiliares
  datos: any[] = [];
  dato: any = {};

  private storage: Storage | null = null; // Definiendo propiedad storage

  constructor(private storageInstance: Storage) {
    this.init(); // Inicializo el almacenamiento
  }

  // Inicialización del almacenamiento
  async init() {
    if (!this.storage) {
      this.storage = await this.storageInstance.create();
    }
  }

  async agregar(key: string, jsonAgregar: any) {
    this.datos = await this.storage?.get(key) || []; // Obtiene los datos actuales en la clave

    // No se verifica identificador; se agrega el objeto directamente
    this.datos.push(jsonAgregar);
    await this.storage?.set(key, this.datos); // Guarda el nuevo arreglo en el almacenamiento
    return true;
  }

  async obtenerDato(key: string, identificador: string) {
    this.datos = await this.storage?.get(key) || [];
    this.dato = this.datos.find(valor => valor.identificador === identificador);
    return this.dato;
  }

  async obtenerDatos(key: string) {
    if (!this.storage) {
      throw new Error('Storage no está inicializado');
    }
    this.datos = await this.storage.get(key) || [];
    return this.datos;
  }



  // Método para validar el ingreso de usuario desde un servicio
  validaServicio(usuario: string, clave: number): boolean {
    // Validación para el usuario estudiante
    if (usuario == 'estudiante' && clave == 1234) {
      return true;
    }
    // Validación para el usuario docente
    else if (usuario == 'docente' && clave == 4321) {
      return true;
    } 
    else {
      return false;
    }
  }
}




















// crear metodo para validar ingreso del usuario  desde un servicio 




