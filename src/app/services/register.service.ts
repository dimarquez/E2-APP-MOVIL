import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  informacion: any[] = [];
  info: any;

  constructor(private storage: Storage) {
    storage.create();
   }

   async agregar(key, info) {
    this.informacion = await this.storage.get(key) || [];

    this.info = await this.getDatos(key, info.rut);
    if (this.info == undefined) {
      this.informacion.push(info);
      await this.storage.set(key, this.informacion);
      return true;
    }
    return false;
  }

  async getDatos(key, identificador) {
    this.informacion = await this.storage.get(key) || [];
    this.info = this.informacion.find(usuario => usuario.rut == identificador);
    return this.info;
  }

  async getDatoss(key): Promise<any[]> {
    this.informacion = await this.storage.get(key);
    return this.informacion;
  }

  async eliminar(key, info) {
    this.informacion = await this.storage.get(key) || [];
    this.informacion.forEach((value, index) => {
      if (value.rut == info) {
        this.informacion.splice(index, 1);
      }
    });
    await this.storage.set(key, this.informacion);
  }

  async actualizar(key, info) {
    this.informacion = await this.storage.get(key) || [];
    
    var index = this.informacion.findIndex(usuario => usuario.nombre == info.nombre);
    this.informacion[index] = info;

    await this.storage.set(key, this.informacion);
  }

  
}
