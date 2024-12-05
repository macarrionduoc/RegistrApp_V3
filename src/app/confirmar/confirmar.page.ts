


import { Component, OnInit,OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { Html5QrcodeScanner,Html5QrcodeScanType } from 'html5-qrcode';
import { StorageService } from 'src/app/storage.service';



@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.page.html',
  styleUrls: ['./confirmar.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})


export class ConfirmarPage implements OnInit,OnDestroy{

  // variables declaradas
  scannerResult:string | null=null; // Resultado del escaneo QR
  private Html5Qrcode : Html5QrcodeScanner | null=null; 
  isCameraPermissionGranted:boolean = false;


  // Nueva variable para almacenar los datos guardados
  datosGuardados: any[] = [];

  constructor(private router: Router,
              private storageService: StorageService /////NUEVO GUARDAR QR /////////////////
  ) {}

//////nuevo oninit, el cual reemplazara al original///////////
  async ngOnInit() {
    // Llama a la función que obtiene los datos guardados al iniciar la página
    await this.storageService.init();

    this.obtenerDatosGuardados();
  }

  // Método para obtener los datos guardados desde el storage
  async obtenerDatosGuardados() {
    this.datosGuardados = await this.storageService.obtenerDatos('qrData'); // Usa la clave asignada
    console.log('Datos de QR guardados:', this.datosGuardados);
  }


  

  requestCameraPermission(){
    // verificar si se han concedido los permisos 
    alert('Permitir acceso?');

      if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
        navigator.mediaDevices.getUserMedia({video:true})
        .then((stream)=> {

          this.isCameraPermissionGranted=true;
          this.startScanner();
        })

      .catch((error) => {
        alert("No se pudieron conceder permisos a la camara");
      });
      }else {
        alert("Navegador no soporta la camara");
    }// Fin If
  }// fin Request Camera 

 
  
  
  startScanner(){
    const config = {
      fps:10,
      qrbox:250,
      supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
    };



    
    this.Html5Qrcode = new Html5QrcodeScanner("reader", config, false);
    this.Html5Qrcode.render(async(result) =>{ // aca se agregó "async" solamente
      this.scannerResult = result;
      console.log("Resultado del scanner",result);
//      this.saveQRData(); // Guardar los datos escaneados NUEVA LINEA 63 COMPLETA QR////////////////////

// Guardar el resultado en storage
const dataToSave = {
  //      id: new Date().getTime().toString(),  // ID único basado en el timestamp
        qrText: result,
        fecha: new Date().toLocaleDateString(),
        hora: new Date().toLocaleTimeString()
  };
  
      const success = await this.storageService.agregar('qrData', dataToSave);
      if (success) {
        alert("QR escaneado guardado con éxito.");
        await this.obtenerDatosGuardados(); // Actualiza la lista después de guardar
      } else {
        alert("Este QR ya existe en la lista.");
      }
      },
  
    (error) =>{
      console.warn("Error  al escanear",error);
    })
  }// fin start Scanner*/

  ///////// INICIO METODO PARA ESCANEAR QR /////////////////////////////
  // metodo para guardar la informacion del QR escaneado
  async saveQRData() {
    if (this.scannerResult) {
      const currentDate = new Date();
      const qrData = {
        qrText: this.scannerResult,
        date: currentDate.toISOString() // Guardar fecha y hora en formato ISO
      };

      try {
        await this.storageService.agregar('scannedQRCodes', qrData);
        alert('QR escaneado guardado con éxito.');
      } catch (error) {
        console.error("Error al guardar el QR escaneado", error);
        alert('No se pudo guardar el QR escaneado.');
      }
    } else {
      alert('No hay un código QR escaneado para guardar.');
    }
  }
///////// FIN METODO PARA ESCANEAR QR /////////////////////////////

ngOnDestroy(){
    if(this.Html5Qrcode){
      this.Html5Qrcode.clear();
    }
}// Fin Destroy

goTohome() {
  this.router.navigate(['home'],  {queryParams:{}} );
}
}

