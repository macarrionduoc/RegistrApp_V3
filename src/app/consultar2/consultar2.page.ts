import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

import { StorageService } from 'src/app/storage.service'; //NUEVO

//INICIO INTERFACE - NUEVO
interface Persona {
  nombre: string;
  apellido: string;
  rut: string;
  edad: string;
  correo: string;
  carrera: string;
  identificador: string
}
//FIN INTERFACE - NUEVO


@Component({
  selector: 'app-consultar2',
  templateUrl: './consultar2.page.html',
  styleUrls: ['./consultar2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class Consultar2Page implements OnInit {

  registroForm!: FormGroup;


  mensajeExitoso: boolean = false
  mensajeError: boolean = false

  //inicio bloque nuevo
  nombre: string = ""
  apellido: string = ""
  rut: string = ""
  correo: string = ""
  edad = ""
  carrera: any = ''

  // Variables para leer parametros
  par_username: string = "";
  par_password: number = 0;
  // Variables para CRUD
  currentId: string = "";  // para almacenar el identificador
  personas: Persona[] = [];
  //fin bloque nuevo


  constructor(private router: Router,
    private storageservice: StorageService, private fb: FormBuilder) {


    this.registroForm = this.fb.group({

      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      rut: ['', [Validators.required, Validators.minLength(3)]],
      edad: ['', [Validators.required, Validators.minLength(2)]],
      correo: ['', [Validators.required, Validators.minLength(3), Validators.email]],
      carrera: ['', [Validators.required]]

    });



  }  // Fin constructor

  Tohome2() {
    this.router.navigate(['home2'], { queryParams: {} });
  }



  // este "ngOnInit" fué reemplazado por el de abajo
  //  ngOnInit() {}


  //////////////////////////////////////////////
  ////////inicio - este codigo es nuevo/////////
  //////////////////////////////////////////////
  async ngOnInit() {


    // Recepcion de parametros
    const navigation = this.router.getCurrentNavigation();

    if (navigation?.extras.queryParams) {
      this.par_username = navigation.extras.queryParams['username']
      this.par_password = navigation.extras.queryParams['password']
    }

    await this.storageservice.init();
    await this.listar();
  }  // fin onInt


  async agregar() {

    if (this.registroForm.valid) {



      const nuevaPersona = {
        nombre: this.registroForm.value.nombre,
        apellido: this.registroForm.value.apellido,
        rut: this.registroForm.value.rut,
        edad: this.registroForm.value.edad,
        correo: this.registroForm.value.correo,
        carrera: this.registroForm.value.carrera,
        identificador: Date.now().toString()  // Genera un identificador unico 
      }

      this.personas.push(nuevaPersona);

      let resp = await this.storageservice.agregar('personas', nuevaPersona)

      if (resp) {
        //alert('Persona Agregada');
        this.mensajeExitoso = true
        this.mensajeError = false
        await this.listar();
        this.registroForm.reset();
      } else {
        alert('Registro Invalido');
      }

      //Limpiamos los campos despues de Agregar

      this.nombre = "";
      this.apellido = "";
      this.rut = "";
      this.edad = "";
      this.correo = "";
      this.carrera = "";

    } else {
      this.mensajeError = true
      this.mensajeExitoso = false


    }

  } // fin agregar


  async listar() {
    this.personas = await this.storageservice.obtenerDatos('personas') || [];

  }  // fin listar



  async eliminar(id: any) {
    await this.storageservice.eliminar('personas', id);
    await this.listar();

  }// fin eliminar

  async buscar(id: any) {
    let registroEncontrado = await this.storageservice.obtenerDato('personas', id)

    if (registroEncontrado) {

      this.registroForm.patchValue({ nombre: registroEncontrado.nombre,
                                    apellido: registroEncontrado.apellido,
                                    rut: registroEncontrado.rut, 
                                    edad: registroEncontrado.edad, 
                                    correo: registroEncontrado.correo, 
                                    carrera: registroEncontrado.carrera });
                                    this.currentId = registroEncontrado.identificador;
    }
  } // fin registro


  async modificar() {
    const personaModificada: Persona = {
      nombre: this.registroForm.value.nombre,
      apellido: this.registroForm.value.apellido,
      rut: this.registroForm.value.rut,
      edad: this.registroForm.value.edad,
      correo: this.registroForm.value.correo,
      carrera: this.registroForm.value.carrera,
      identificador: this.currentId
    }


    await this.storageservice.actualizar('personas', personaModificada)
    await this.listar();

    this.registroForm.reset()

    // limpieza

    this.nombre = "";
    this.apellido = "";
    this.rut = "";
    this.edad = "";
    this.correo = "";
    this.carrera = "";

  } // fin modi

  //////////////////////////////////////////////
  ////////fin - este codigo es nuevo/////////
  //////////////////////////////////////////////
}
