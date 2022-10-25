import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  //variables de usuario que recibirá los datos que vienen desde login:
  usuario: any;
  cantidad : number;
  
  asignatura: any;
  
  constructor(private router: Router, private usuarioService: UsuarioService, private storage: StorageService, private asignaturaService: AsignaturaService) {}

  async ngOnInit(){
    this.KEY_PERSONAS = this.router.getCurrentNavigation().extras.state.usuario;
    this.KEY_ASIGNATURAS = this.router.getCurrentNavigation().extras.state.asignatura;
    this.cantidad = this.storage.cantidadUsuarios();
  }

  usuarios: any[] = [
    
  ];
  asignaturas: any[] = [
    
  ];
  
  
  KEY_PERSONAS = 'usuarios';
  KEY_ASIGNATURAS = 'asignaturas';



  async cargarPersonas(){
    this.usuarios = await this.storage.getDatos(this.KEY_PERSONAS);
  }
  
  async cargarAsignaturas(){
    this.asignaturas = await this.asignaturaService.getDatos(this.KEY_ASIGNATURAS);
  }

  //método para logout:
  logout(){
    this.storage.logout();
  }


}
