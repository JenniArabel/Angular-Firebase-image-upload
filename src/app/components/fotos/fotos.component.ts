import { Component, inject } from '@angular/core';
import { StorageService } from '../../../service/storage.service';
import { UploadTask, UploadTaskSnapshot } from 'firebase/storage';

@Component({
  selector: 'app-fotos',
  standalone: true,
  imports: [],
  templateUrl: './fotos.component.html',
  styleUrls: ['./fotos.component.css'],
})
export class FotosComponent {
  private storageService = inject(StorageService);

  uploadInProgress = false;
  uploadSuccess = false;
  message = '';
  downloadURL: string | null = null;
  uploadProgress = 0; // ✅ Nuevo estado para la barra de progreso

  uploadImage(event: Event) {
    const input = event.target as HTMLInputElement;
    const image = input.files?.[0];

    this.uploadInProgress = true;
    this.uploadSuccess = false;
    this.message = '';
    this.downloadURL = null;

    if (image) {
      this.uploadInProgress = true;
      this.uploadSuccess = false;
      this.message = 'Subiendo imagen...';
      this.downloadURL = null;

      // Inicia la subida y obtiene la tarea
      const uploadTask: UploadTask = this.storageService.uploadImage(image);

      // ✅ Suscríbete a los eventos de la tarea para monitorear el progreso y el estado
      uploadTask.on('state_changed',
        (snapshot: UploadTaskSnapshot) => {
          // Actualiza el progreso
          this.uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Progreso:', this.uploadProgress);
        },
        (error) => {
          // Maneja el error
          this.uploadInProgress = false;
          this.message = 'Error al subir la imagen.';
          console.error(error);
        },
        () => {
          // La subida se completó, ahora obtiene la URL de descarga
          this.storageService.getDownloadUrl(uploadTask).then((url) => {
            this.downloadURL = url;
            this.uploadSuccess = true;
            this.message = '✅ Imagen subida con éxito.';
            this.uploadInProgress = false;
            this.uploadProgress = 100;

            console.log('URL de descarga:', url);

          }).catch((err) => {
            this.uploadInProgress = false;
            this.message = 'Error al obtener la URL.';
            
            console.error(err);
          });
        }
      );
    } else {
      this.message = 'No se seleccionó ninguna imagen.';
    }

    // this.uploadInProgress = false;
  }
}
