import { inject, Injectable } from '@angular/core';
import { FirebaseStorage, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Storage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root', // ✅ lo hace disponible en toda la app sin imports extras
})
export class StorageService {
  // ✅ Cast seguro: Angular nos da un Storage y lo convertimos a FirebaseStorage
  private storage = inject(Storage) as unknown as FirebaseStorage;

  /**
   * Sube una imagen a Firebase Storage
   * @param file archivo que selecciona el usuario
   * @param path ruta opcional dentro del bucket
   * @returns URL pública de descarga de la imagen
   */
  async uploadImage(file: File, path: string = 'images'): Promise<string> {
    // construimos la ruta final
    const filePath = `${path}/${Date.now()}_${file.name}`;
    const storageRef = ref(this.storage, filePath);

    // subimos el archivo
    await uploadBytes(storageRef, file);

    // obtenemos la URL
    return await getDownloadURL(storageRef);
  }
}
