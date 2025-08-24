import { Component, inject } from '@angular/core';
import { StorageService } from '../../../service/storage.service';

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

  async uploadImage(event: Event) {
    const input = event.target as HTMLInputElement;
    const image = input.files?.[0];

    this.uploadInProgress = true;
    this.uploadSuccess = false;
    this.message = '';
    this.downloadURL = null;

    if (image) {
      try {
        this.downloadURL = await this.storageService.uploadImage(image);
        this.uploadSuccess = true;
        this.message = 'Imagen subida con éxito.';
      } catch (error) {
        this.message = 'Error al subir la imagen.';
        console.error(error);
      }
    } else {
      this.message = 'No se seleccionó ninguna imagen.';
    }

    this.uploadInProgress = false;
  }
}
