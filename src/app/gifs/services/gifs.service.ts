import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GifsService {
  private _tagsHistory: string[] = []; // Array para almacenar el historial de tags

  get tagsHistory(): string[] {
    // Getter para obtener el historial de tags
    return [...this._tagsHistory]; // Retorna una copia del array de tags
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase(); // Convierte el tag a minúsculas
    if (this._tagsHistory.includes(tag)) {
      // Verifica si el tag ya existe en el array
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag != tag); // Elimina el tag repetido
    }

    this._tagsHistory.unshift(tag); // Agrega el tag al principio del array
    this._tagsHistory = this._tagsHistory.splice(0, 10); // Limita el array a 10 elementos
  }

  searchTag(tag: string): void {
    if (tag.length === 0) return; // Verifica si el tag está vacío
    this.organizeHistory(tag); // Organiza el historial de tags

    console.log(this.tagsHistory); // Muestra el historial de tags
  }

  constructor() {}
}
