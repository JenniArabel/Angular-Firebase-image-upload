import { inject, Injectable } from '@angular/core';
import { FirebaseStorage, getDownloadURL, ref, uploadBytes, uploadBytesResumable, UploadTask } from 'firebase/storage';
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
  uploadImage(file: File, path: string = 'images'): UploadTask {
    // construimos la ruta final
    const filePath = `${path}/${Date.now()}_${file.name}`;
    const storageRef = ref(this.storage, filePath);

    // ✅ Usamos uploadBytesResumable para obtener una tarea que se puede monitorear
    // subimos el archivo
    return uploadBytesResumable(storageRef, file);

    // obtenemos la URL
    //return await getDownloadURL(storageRef);
  }

  /**
   * Obtiene la URL de descarga de una tarea de subida completada.
   * @param uploadTask La tarea de subida completada.
   * @returns Una promesa que resuelve con la URL de descarga.
   */
  getDownloadUrl(uploadTask: UploadTask): Promise<string> {
    return getDownloadURL(uploadTask.snapshot.ref);
  }
}
