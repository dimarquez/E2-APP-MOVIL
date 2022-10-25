import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { normalize } from 'path';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registroasignatura',
  templateUrl: './registroasignatura.page.html',
  styleUrls: ['./registroasignatura.page.scss'],
})
export class RegistroasignaturaPage implements OnInit {
  

 
  asignatura= new FormGroup({
    cod_clase:  new FormControl ('', [Validators.required, Validators.pattern('[0-9]')]),                                                                              
    nombre_clase: new FormControl('', [Validators.required, Validators.minLength(3)]),
    semestre: new FormControl('', [Validators.required, Validators.max(10)]),
    usuario: new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      
    })
    //aqui poner al docente
  });



  constructor(private asignaturaService: AsignaturaService , private loadingCtrl: LoadingController, private storage: StorageService) { }
//INFORMACION ASIGNATURA 
  asignaturas: any[] = [];
  usuarios:any[]= [];
  docentes:any[]=[];

  KEY_DOCENTES='docentes';
  KEY_PERSONAS = 'usuarios';
  KEY_ASIGNATURAS= 'asignaturas';

  async ngOnInit() {
    await this.cargarAsignaturas();
    await this.cargarPersonas();
    await this.cargarDocentes();
   }

  async cargarAsignaturas(){
    this.asignaturas = await this.asignaturaService.getDatos(this.KEY_ASIGNATURAS);
    this.usuarios = await this.storage.getDatos(this.KEY_PERSONAS);

  }
  async cargarPersonas(){
    this.usuarios = await this.storage.getDatos(this.KEY_PERSONAS);
  }
  
  async cargarDocentes(){
    this.usuarios = await this.storage.getDocentes(this.KEY_PERSONAS);
  }

  async registrar() {
    console.log(this.asignatura.value);
    console.log(this.asignatura.controls.cod_clase.value);

    //validación de salida para buscar un rut válido.
    
    //validación de salida para verificar que persona tenga al menos 17 años.
 
    //validación de coincidencia de contraseñas.
    let nombre = parseInt(this.asignatura.value.usuario.nombre);
    var respuesta : boolean = await this.asignaturaService.agregar(this.KEY_ASIGNATURAS, this.asignatura.value);
    //console.log((respuesta));
    if (respuesta) {

      if (nombre != undefined){
        console.log(this.cargarAsignaturas);
        console.log(this.cargarPersonas,11);
        console.log(this.cargarDocentes);
        await this.cargando('Registrando...')
        //this.router.navigate(['/login']);
        await this.cargarAsignaturas();
        await this.cargarPersonas();
        
      

      } else {
        alert('Asignatura ya existe!');
      }
      
    } else {
      alert('Asignatura ya existe!');
    }
    }


    async cargando(mensaje){
      const loading = await this.loadingCtrl.create({
        message: mensaje,
        duration: 1000
      });
      loading.present();
    }
    async buscar(cod_clase){
      let userEncontrado = await this.asignaturaService.getDato(this.KEY_ASIGNATURAS, cod_clase);
      this.asignatura.setValue(userEncontrado);
    }
    async modificar(){
      await this.asignaturaService.actualizar(this.KEY_ASIGNATURAS, this.asignatura.value);
      await this.cargando('Modificando...');
      await this.cargarAsignaturas();
    }
   
}
