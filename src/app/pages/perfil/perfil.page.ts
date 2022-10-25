import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  //DEBEMOS PODER RECIBIR EL VALOR QUE VIENE DESDE LA PAGINA HOME:
  usuario: any = {};
  rut: string;
  nombre: string;
  ap_paterno: string; 
  correo: string;



  

  constructor(private activatedRoute: ActivatedRoute, private storage: StorageService) { }

  usuarios: any[] = [
    
  ];  

  KEY_PERSONAS = 'usuarios';


  async ngOnInit() {
    this.rut = await this.activatedRoute.snapshot.paramMap.get('rut');
    //this.nombre = await this.activatedRoute.snapshot.paramMap.get('nombre');

    this.usuario = await this.storage.getDato(this.KEY_PERSONAS, this.rut);
    this.usuario = await this.storage.getDato(this.KEY_PERSONAS, this.nombre);
    this.usuario = await this.storage.getDato(this.KEY_PERSONAS, this.ap_paterno);
    this.usuario = await this.storage.getDato(this.KEY_PERSONAS, this.correo);

    await this.cargarPersonas();
  }

  async cargarPersonas(){
    this.usuarios = await this.storage.getDatos(this.KEY_PERSONAS);
    
  }


}
