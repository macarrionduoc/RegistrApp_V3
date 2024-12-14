import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
    imports: [IonicModule],
})
export class ProfilePage implements OnInit {
  usuarioLogueado: any = {}; // Variable para almacenar los datos del usuario

  constructor(private router: Router, private storageService: StorageService) {}

  async ngOnInit() {
    // Obtener los datos del usuario logueado desde el Storage a través del nuevo método
    this.usuarioLogueado = await this.storageService.obtenerItem('usuarioLogueado') || {};
  }

  goToHome() {
    this.router.navigate(['home']);
  }
}