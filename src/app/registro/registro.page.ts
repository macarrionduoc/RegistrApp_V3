import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { logInOutline } from 'ionicons/icons';

import { CommonModule } from '@angular/common';
import { StorageService } from '../storage.service';

interface Usuario {
  usuario: string;
  nombre: string;
  apellido: string;
  edad: string;
  rut: string;
  correo: string;
  carrera: any;
  rol: any;
  contrasena: string;
  identificador: string;
}

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule],
})
export class RegistroPage implements OnInit {
  registroForm!: FormGroup;

  // variables para leer parametros

  par_username: string = '';
  par_password: number = 0;

  // Variables para  Crud

  currentId: string = ''; // alamacena identificador

  usuarios: Usuario[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private storageService: StorageService
  ) {
    this.registroForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.minLength(3)]],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      rut: ['', [Validators.required, Validators.pattern(/^\d{7,8}-[0-9Kk]$/)]],
      edad: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      correo: ['', [Validators.required, Validators.email]],
      rol: ['', [Validators.required, Validators.minLength(3)]],
      carrera: ['', [Validators.required, Validators.minLength(3)]],
      contrasena: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/),Validators.minLength(3)]],
    });

    //inicio codigo para icono
    addIcons({ 'log-in-outline': logInOutline });
    //fin codigo para icono
  }
  // funcion para volver al login
  goToLogin() {
    this.router.navigate(['/login']);
  }

  async ngOnInit() {
    const navigation = this.router.getCurrentNavigation();

    if (navigation?.extras.queryParams) {
      this.par_username = navigation.extras.queryParams['username'];
      this.par_password = navigation.extras.queryParams['password'];
    }
    await this.storageService.init();
  }
  // fin ngOinit

  // Esperando funcionalidad del boton con el crud agregar
  async agregar() {
    if (this.registroForm.valid) {
      // Crear un nuevo usuario basado en los valores del formulario
      const nuevoUsuario = {
        usuario: this.registroForm.value.usuario,
        nombre: this.registroForm.value.nombre,
        apellido: this.registroForm.value.apellido,
        edad: this.registroForm.value.edad,
        rut: this.registroForm.value.rut,
        correo: this.registroForm.value.correo,
        carrera: this.registroForm.value.carrera,
        rol: this.registroForm.value.rol,
        contrasena: this.registroForm.value.contrasena,
        identificador: Date.now().toString(), // Generar un identificador único
      };
  
      // Intentar guardar el usuario en el servicio de almacenamiento
      const resp = await this.storageService.agregar('usuarios', nuevoUsuario);
  
      if (resp) {
        // Usuario registrado con éxito
        alert('Usuario registrado con éxito.');
        this.usuarios.push(nuevoUsuario); // Agregar a la lista local
        this.registroForm.reset(); // Limpiar el formulario
        await this.listar(); // Actualizar la lista (si aplica)
      } else {
        // Error al registrar usuario
        alert('No se pudo registrar el usuario. Intenta nuevamente.');
      }
    } else {
      // Mostrar errores si el formulario no es válido
      this.registroForm.markAllAsTouched(); // Marca todos los campos como tocados para mostrar errores
      alert('USUARIO NO SE PUDO REGISTRAR, INTENTE LLENAR TODOS LOS CAMPOS EN EL FORMATO SOLICITADO');
    }
  }
  async listar() {}
}
