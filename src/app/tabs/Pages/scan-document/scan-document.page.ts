import { Component, OnInit } from '@angular/core';
import { DomSanitizer ,SafeResourceUrl} from '@angular/platform-browser';
import { Plugins, CameraResultType ,CameraSource} from '@capacitor/core';

const { Camera } = Plugins;

@Component({
  selector: 'app-scan-document',
  templateUrl: './scan-document.page.html',
  styleUrls: ['./scan-document.page.scss'],
})
export class ScanDocumentPage implements OnInit {
  photo : SafeResourceUrl;
  photos :any = []
  constructor(
    private sanitizar : DomSanitizer
  ) { }

  ngOnInit() {
    
  }
  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    
    this.photo = this.sanitizar.bypassSecurityTrustResourceUrl(image && (image.dataUrl))
    this.photos.push(this.photo)

    

    
    
    
    
  }

}
