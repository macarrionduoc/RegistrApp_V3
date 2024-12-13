import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,FormGroup,ReactiveFormsModule,FormBuilder,Validators,} from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';

interface Curso {
  asignatura: string;
  profesor: string;
  fecha: string;
  hora: string;
  identificador: string
}

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.page.html',
  styleUrls: ['./cursos.page.scss'],
  standalone: true,
  imports: [IonContent,CommonModule, FormsModule,IonicModule, ReactiveFormsModule]
})
export class CursosPage implements OnInit {
  cursosForm!: FormGroup;
  cursos: Curso[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private storageService: StorageService
  ) {
    this.cursosForm = this.fb.group({
      asignatura: ['', [Validators.required, Validators.minLength(3)]],
      fecha: ['', [
        Validators.required, 
        Validators.pattern(/^\d{4}(-\d{2}){2}$/) // Formato: YYYY-MM-DD o solo números
      ]],
      hora: ['', [
        Validators.required, 
        Validators.pattern(/^([01]?\d|2[0-3]):[0-5]\d$/) // Formato: HH:mm (24 horas)
      ]]
    });
  }

  async ngOnInit() {
    await this.storageService.init();
    this.listar();
  }

  async agregar(){
    const usuario:any = localStorage.getItem('usuario');

    const nuevaAsignatura = {
      asignatura: this.cursosForm.value.asignatura,
      fecha: this.cursosForm.value.fecha,
      hora: this.cursosForm.value.hora,
      profesor: usuario,
      identificador: Date.now().toString() //genera un identificador unico
    };
  
    this.cursos.push(nuevaAsignatura);

    let resp = await this.storageService.agregar('cursos', nuevaAsignatura);

    this.cursosForm.reset()

    if (resp) {
      alert('Asignatura Creada');
      await this.listar();
    } else {
      alert(' No se puede crear asignatura ');
    }
  }

  async listar() {
    this.cursos = await this.storageService.obtenerDatos('cursos') || [];
  }

  Tohome2(){
    this.router.navigate(['home2'],  {queryParams:{}} );
  }
}