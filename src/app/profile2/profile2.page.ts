import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-profile2',
  templateUrl: './profile2.page.html',
  styleUrls: ['./profile2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})


export class Profile2Page implements OnInit {

 usuarioLogueado: any = {}; // Variable para almacenar los datos del usuario
 
   constructor(private router: Router, private storageService: StorageService) {}
 
   async ngOnInit() {
     // Obtener los datos del usuario logueado desde el Storage a través del nuevo método
     this.usuarioLogueado = await this.storageService.obtenerItem('usuarioLogueado') || {};
   }
 
  Tohome2() {
    this.router.navigate(['home2'],  {queryParams:{}} );
  }
}