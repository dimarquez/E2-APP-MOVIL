import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { StorageService } from 'src/app/services/storage.service';
import { v4 } from 'uuid';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.page.html',
  styleUrls: ['./qrcode.page.scss'],
})
export class QrcodePage implements OnInit {

  asistencia= new FormGroup({
    cod_asist:  new FormControl(''),
    cod_clase: new FormControl(''), 
    alumno: new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      rut: new FormControl(''),
      tipo_usuario: new FormControl(' ', [Validators.required]),

        })
      });

    
    //aqui poner al docen


  //VAMOS A CREAR LAS VARIABLES PARA NUESTRO CÓDIGO QR:
  elementType = 'canvas';
  value = '';

  constructor(private storage: StorageService, private asignaturaService: AsignaturaService) { }
  asignaturas: any[] = [];
  usuarios:any[]= [];

  asistencias: any[] = [];

  KEY_PERSONAS = 'usuarios';
  KEY_ASIGNATURAS= 'asignaturas';

  async ngOnInit() {
    await this.cargarAsignaturas();
    await this.cargarPersonas();
   }

  async cargarAsignaturas(){
    this.asignaturas = await this.asignaturaService.getDatos(this.KEY_ASIGNATURAS);
    this.usuarios = await this.storage.getDatos(this.KEY_PERSONAS);

  }
  async cargarPersonas(){
    this.usuarios = await this.storage.getDatos(this.KEY_PERSONAS);
  }


  //método para generar un código unico para el codigo QR:
  generarCodigo(){
    if (this.value == '') {
      this.value = v4();
    }
  }

  async generarCodige(){
    console.log(this.asistencia.value);
    

    

    
  }
  

}
