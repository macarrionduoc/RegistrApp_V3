import { Component, OnInit } from '@angular/core';
//import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { RouterModule,Router } from '@angular/router';
import {personCircleOutline,checkmarkCircleOutline,documentTextOutline,callOutline,exitOutline} from 'ionicons/icons'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule,FormsModule,CommonModule,RouterModule],
})
export class HomePage  {
  usuario: any = 'Nombre del Usuario'; // Define 'usuario' y asigna un valor si es necesario

  constructor(private router: Router ) {

    addIcons({'person-circle-outline': personCircleOutline,
              'checkmark-circle-outline': checkmarkCircleOutline,
              'document-text-outline': documentTextOutline,
              'call-outline': callOutline,
              'exit-outline': exitOutline
    })
}

    ngOnInit() {
  // Aquí puedes escribir el código que quieres ejecutar al inicializar el componente

  const navigation=this.router.getCurrentNavigation();
  if(navigation && navigation.extras.state){
    this.usuario = navigation.extras.state['nombre'];

  }else{
    alert('Ups!...por seguridad inicia sesión nuevamente')
  }
}
}