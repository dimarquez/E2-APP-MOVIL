import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidacionesService } from 'src/app/services/validaciones.service';
import { RegisterService } from 'src/app/services/register.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {


  usuario = new FormGroup({
    rut: new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]')]),
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    ap_paterno: new FormControl('', [Validators.required, Validators.minLength(3)]),
    fecha_nac: new FormControl('', [Validators.required]),
    //solo se validan correos de alumnos.
    correo: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@(duocuc).(cl)')]),
    clave: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]),
    //el tipo de usuario cuando se registrar en solo del tipo alumno.
    tipo_usuario: new FormControl('alumno', [Validators.required]),
  });
  repetir_clave: string;
  usuarios: any[] = [];

  KEY_USUARIOS = 'usuarios';

  constructor( private loadingCtrl: LoadingController, private register: RegisterService,private validaciones: ValidacionesService, private router: Router) { }

  async ngOnInit() {
    await this.cargarUsuarios();
  }

  async cargarUsuarios(){
    this.usuarios = await this.register.getDatoss(this.KEY_USUARIOS);
  }

  async registrar(){
    if (!this.validaciones.validarRut(this.usuario.controls.rut.value)) {
      alert('Rut incorrecto!');
      return;
    }
    if (!this.validaciones.validarEdadMinima(17, this.usuario.controls.fecha_nac.value)) {
      alert('Edad mínima 17 años!');
      return;
    }
    //validación de coincidencia de contraseñas.
    if (this.usuario.controls.clave.value != this.repetir_clave) {
      alert('Contraseñas no coinciden!');
      return;
    }
    var respuesta : boolean = await this.register.agregar(this.KEY_USUARIOS, this.usuario)
    //console.log(respuesta);
    if (respuesta) {
      console.log(respuesta);
      alert('Usuario registrado!');
      this.router.navigate(['/login']);
      await this.cargarUsuarios();
    } else {
      alert('Usuario ya existe!');
    }
  }
  async eliminar(rut){
    await this.register.eliminar(this.KEY_USUARIOS, rut);
    await this.cargando('eliminando...');
    await this.cargarUsuarios();
  }

  async buscar(rut){
    this.usuario = await this.register.getDatos(this.KEY_USUARIOS, rut);
  }

  async modificar(){
    await this.register.actualizar(this.KEY_USUARIOS, this.usuario);
    await this.cargando('actualizando personas...');
    await this.cargarUsuarios();
  }



  //METODO DE LOADING:
  async cargando(mensaje){
    const loading = await this.loadingCtrl.create({
      message: mensaje,
      duration: 1000
    });
    loading.present();
  }

}
