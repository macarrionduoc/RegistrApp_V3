import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { QRCodeModule } from 'angularx-qrcode';
import { StorageService } from '../storage.service';
import { list } from 'ionicons/icons';

interface Curso {
  asignatura: string;
  profesor: string;
  fecha: string;
  hora: string;
  identificador: string;
}

@Component({
  selector: 'app-registrar-asistencia',
  templateUrl: './registrar-asistencia.page.html',
  styleUrls: ['./registrar-asistencia.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RegistrarAsistenciaPage implements OnInit {

  cursos: Curso[] = [];
  identificador: any = '';
  asistencia!: Curso;

  qrData: string = ''; //cambiar texto
  createdCode: string = '';

  constructor(private router: Router, 
    private route: ActivatedRoute,
    private storageService: StorageService) {}

  async ngOnInit() {
    await this.storageService.init();
    this.route.paramMap.subscribe(params => {
      this.identificador = params.get('identificador');
    });

    this.registrarAsistencia();
    //this.listar();
  }

  async registrarAsistencia(){

    try {
      // Llamamos a obtenerValor y esperamos su resolución con await
      const asistencia = await this.storageService.obtenerValor('cursos', this.identificador);

  
      // Ahora podemos acceder a los datos dse la asistencia
      if (asistencia) {
        this.asistencia=asistencia;
      } else {
        console.log('No se encontró la asistencia');
      }
    } catch (error) {
      console.error('Error al obtener la asistencia:', error);
    }
  }

  async listar() {
    this.cursos = (await this.storageService.obtenerDatos('cursos')) || [];
    console.log(this.cursos);
  }

}
