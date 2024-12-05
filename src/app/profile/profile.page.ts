import { Component, OnInit,} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { IonContent, IonHeader, IonTitle, IonToolbar,IonButton } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  //imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton]
  imports: [ CommonModule, FormsModule, IonicModule ]
})

export class ProfilePage{


  constructor(private router: Router) { }


  goTohome() {
    this.router.navigate(['home'],  {queryParams:{}} );
  }

  ngOnInit() {
  }

}
