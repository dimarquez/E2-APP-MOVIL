import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {

  isAuthenticated = new BehaviorSubject(false);
  //variables a utilizar:
  datos: any[] = [];
  dato: any = {};



  constructor(private storage: Storage, private router: Router) {
    storage.create();
  }

  //métodos del crud del storage:
  async agregar(key, dato) {
    this.datos = await this.storage.get(key) || [];
    let existe = await this.getDato(key, dato.identificador)
    this.dato = await this.getDato(key, dato.rut);
    if (existe == undefined) {
      this.datos.push(dato);
      await this.storage.set(key, this.datos);
      return true;
    }
    return false;
  }

  async getDato(key, identificador) {
    this.datos = await this.storage.get(key) || [];
    this.dato = this.datos.find(persona => persona.rut == identificador);
    return this.dato;
  }

  async getDocentes(key): Promise<any[]>{
    this.datos = await this.storage.get(key) || [];
    this.datos = await this.datos.filter(persona => persona.tipo_usuario == 'docente')

    return this.datos;
  }


  async getDatos(key): Promise<string[]>{
    this.datos = await this.storage.get(key);
    return this.datos;
  }

  async eliminar(key, dato) {
    this.datos = await this.storage.get(key) || [];
    this.datos.forEach((value, index) => {
      if (value.rut == dato) {
        this.datos.splice(index, 1);
      }
    });
    await this.storage.set(key, this.datos);
  }
  
  async actualizar(key, dato) {
    this.datos = await this.storage.get(key) || [];
    
    var index = this.datos.findIndex(persona => persona.rut == dato.rut);
    this.datos[index] = dato;

    await this.storage.set(key, this.datos);
  }

  async getAuth(){
    return this.isAuthenticated.value;
  }

  async logout(){
    this.isAuthenticated.next(false);
    this.router.navigate(['/login']);
  }

  cantidadUsuarios(): number{
    
    return this.datos.length;

  }

  async getCorreos(key, identificador) {
    this.datos = await this.storage.get(key) || [];
    this.dato = this.datos.find(persona => persona.correo == identificador);
    return this.dato;
  }


  async loginUsuarios(key, correo, clave) {
    this.datos = await this.storage.get(key) || [];
    var usuarioLogin: any;
    usuarioLogin = this.datos.find(usu => usu.correo == correo && usu.clave == clave);
    if (usuarioLogin != undefined) {
      //PARA CAMBIAR EL VALOR A UN BehaviorSubject SE UTILIZA EL METODO .next(valor);
      this.isAuthenticated.next(true);
      return usuarioLogin;
    }
  }

  
}
