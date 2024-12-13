import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,FormGroup,ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { IonicModule,AnimationController,Animation } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';

import {UserService} from 'src/app/user.service';// ajusta ruta segun direccion del archivo
import { StorageService } from '../storage.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule,CommonModule,FormsModule,ReactiveFormsModule]
})


export class LoginPage implements OnInit  {
   loginForm!: FormGroup;

  // usuario:string="estudiante"
  // password:string="1234"

  
    

// Variables para leer parametros
  @ViewChild('logo', {read:ElementRef}) logo?:ElementRef<HTMLImageElement>;
  @ViewChild('text', {read:ElementRef}) text?:ElementRef<HTMLImageElement>;


private logoAnimation!:Animation; 
private textAnimation!:Animation; 



  constructor(private fb:FormBuilder,
              private router:Router,
              private animationCtrl:AnimationController,
              private retornoService: UserService,
              private storageService: StorageService
              )
  { 
    this.loginForm=this.fb.group({
        username: [
          '',
          [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern('^[a-zA-Z0-9]*$')
          ]
        ],
        
          password: [
          '',
          [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern('^[a-zA-Z0-9]*$')
          ]
        ]
    }); 
  }

  async ngOnInit(): Promise<void> {
    await this.storageService.init();
    this.loginForm.reset(); //CODIGO PARA RESTABLECER //
   
  }
//  CODIGO PARA LIMPIAR CAMPOS INICIALMENTE CUANDO ABRES LA VISTA //
  async ionViewWillEnter(): Promise<void> {
    // Este evento es ideal para asegurarse de que los campos estén vacíos cada vez que se vuelva a la vista
    this.loginForm.reset();
  }
  

  async onLoginAlumno() {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;

      const usuarioLogueado = await this.storageService.iniciarSesion(username, password, 'alumno');
      if(usuarioLogueado){

        localStorage.setItem('usuario',usuarioLogueado.usuario)
        
        const navigationExtras: NavigationExtras = {
          state: { nombre: username }
        };
        this.router.navigate(['home'], navigationExtras);
      }
      else{
        alert('Usuario o contraseña inválidos para Alumno');
      }
      }
      
  }
  
  async onLoginDocente() {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;

      const usuarioLogueado = await this.storageService.iniciarSesion(username, password, 'docente');
      if(usuarioLogueado){
        localStorage.setItem('usuario',usuarioLogueado.usuario)
        const navigationExtras: NavigationExtras = {
          state: { nombre: username }
        };
        this.router.navigate(['home2'], navigationExtras);
      }
      else{
        alert('Usuario o contraseña inválidos para Docente');  
      }
    }
  }

  



toRegistro() {
  this.router.navigate(['registro'],  {queryParams:{}} ); 
    
    
  }// funcion ir a registro.
    
    
    
  ngAfterViewInit() {
    if(this.logo?.nativeElement && this.text?.nativeElement) {
      this.logoAnimation =this.animationCtrl.create()
      .addElement(this.logo.nativeElement)
      .duration(5000)
      .fromTo('opacity','0','1');
      
      this.textAnimation =this.animationCtrl.create()
      .addElement(this.text.nativeElement)
      .duration(1000)
      .fromTo('transform','translateY(20px)', 'translateY(0)');

      this.logoAnimation.play()
      this.textAnimation.play()


    } // final If
      else{
        console.error('Los elementos no fueron encontrados')
      }


  } // final After


  /*recuperarClave(){
    alert("recupear clave");
  }*/
    

} // Final 

