import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //variables:
  usuario = new FormGroup({
    correo: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@(duoc|duocuc|profesor.duoc).(cl)')]),
    clave: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18)])
  });

  constructor(private router: Router, private usuarioService: UsuarioService, private	storage: StorageService) { }

  usuarios: any[] = [
    
  ];  

  KEY_PERSONAS = 'usuarios';


  async ngOnInit() {
    await this.cargarPersonas();
  }

  async cargarPersonas(){
    this.usuarios = await this.storage.getDatos(this.KEY_PERSONAS);
  }


  //crear nuestro métodos:
  async ingresar() {
    
    //rescatamos las variables del formulario por separado:
    var correoValidar = this.usuario.controls.correo.value;
    var claveValidar = this.usuario.controls.clave.value;

    //rescatamos el usuario con el método login usuario:
    //var usuarioLogin = this.storage.loginUsuarios(correoValidar, claveValidar);
    var usuarioLogin = await this.storage.loginUsuarios(this.KEY_PERSONAS, correoValidar, claveValidar);

    //validamos si existe el usuario
    if (usuarioLogin != undefined) {
      console.log(usuarioLogin);
      //UNA VEZ QUE VALIDO QUE EXISTE, ENVIARE ESOS DATOS A LA SIGUIENTE PÁGINA:
      let navigationExtras: NavigationExtras = {
        state: {
          usuario: usuarioLogin
        }
      };

      //PARA ENVIAR EL DATO QUE ESTA LISTO, SE ANEXA AL ROUTER!
      this.router.navigate(['/home'], navigationExtras);

    } else {
      alert('Usuario o contraseña incorrectos!')
    }
  }
  
}

