import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule} from '@ionic/angular';
import { Router } from '@angular/router';




@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.page.html',
  styleUrls: ['./mesa.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class MesaPage implements OnInit {

  constructor(private router: Router) {}

  goTohome() {
    this.router.navigate(['home'],  {queryParams:{}} );
  }

  ngOnInit() {
  }

}
