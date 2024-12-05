import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule} from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mesa2',
  templateUrl: './mesa2.page.html',
  styleUrls: ['./mesa2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Mesa2Page implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  Tohome2() {
    this.router.navigate(['home2'],  {queryParams:{}} );
  }



}
