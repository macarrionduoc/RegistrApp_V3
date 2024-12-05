import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { QRCodeModule } from 'angularx-qrcode';
import { StorageService } from '../storage.service';

interface Curso {
  asignatura: string;
  profesor: string;
  fecha: string;
  hora: string;
  identificador: string;
}

@Component({
  selector: 'app-genera-qr',
  templateUrl: './genera-qr.page.html',
  styleUrls: ['./genera-qr.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, QRCodeModule],
})
export class GeneraQrPage implements OnInit {
  cursos: Curso[] = [];

  qrData: string = ''; //cambiar texto
  createdCode: string = '';

  constructor(private router: Router, private storageService: StorageService) {}

  async ngOnInit() {
    await this.storageService.init();
    this.listar();
  }

  generarQR(curso:Curso){
    let url = curso.asignatura
    this.createdCode = url;
  }

  generateQRCode() {
    this.createdCode = this.qrData;
  }

  toHome2() {
    this.router.navigate(['home2'], { queryParams: {} });
  }

  async listar() {
    this.cursos = (await this.storageService.obtenerDatos('cursos')) || [];
  }
}
