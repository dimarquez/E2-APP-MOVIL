import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Key } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {

  datos: any[] = [];
  dato: any = {};


  constructor(private storage: Storage) {
    storage.create();
  }

  async agregar(key, dato ) {
    this.datos = await this.storage.get(key) || [];
    let existe = await this.getDato(key, dato.identificador)
    this.dato = await this.getDato(key, dato.cod_clase);
    if (existe == undefined) {
      this.datos.push(dato);
      await this.storage.set(key, this.datos);
      return true;
    }
    return false;
  }


  async getDato(key, identificador) {
    this.datos = await this.storage.get(key) || [];
    this.dato = this.datos.find(asignatura => asignatura.cod_clase == identificador);
    return this.dato;
    
  }

  async getDatos(key): Promise<string[]>{
    this.datos = await this.storage.get(key);
    return this.datos;
  }

  async eliminar(key, dato) {
    this.datos = await this.storage.get(key) || [];
    this.datos.forEach((value, index) => {
      if (value.cod_clase == dato) {
        this.datos.splice(index, 1);
      }
    });
    await this.storage.set(key, this.datos);
  }
  
  async actualizar(key, dato) {
    this.datos = await this.storage.get(key) || [];
    
    var index = this.datos.findIndex(asignatura => asignatura.cod_clase == asignatura.cod_clase);
    this.datos[index] = dato;

    await this.storage.set(key, this.datos);
  }


}
