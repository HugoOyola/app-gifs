import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResponse, Gif } from '../interfaces/gifs.interfaces';

@Injectable({ providedIn: 'root' })
export class GifsService {
  public gifList: Gif[] = []; // Array para almacenar los gifs

  private _tagsHistory: string[] = []; // Array para almacenar el historial de tags
  private apiKey: string = 'IFpKcwNWFbiWSCqRkX6RMJxmHdQILr0Z'; // API Key de Giphy
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs'; // URL base de la API

  constructor(private http: HttpClient) {
    this.loadLocalStorage(); // Carga el historial de tags desde el LocalStorage
    console.log('GifsService initialized');
  }

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
    this.saveLocalStorage();
  }

  private saveLocalStorage() {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory)); // Guarda el historial de tags en el LocalStorage
  }

  private loadLocalStorage() {
    if (!localStorage.getItem('history')) return; // Verifica si el historial de tags existe en el LocalStorage
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!); // Carga el historial de tags desde el LocalStorage

    if (this._tagsHistory.length === 0) return; // Verifica si el historial de tags está vacío
    this.searchTag(this._tagsHistory[0]); // Realiza una búsqueda con el primer tag del historial
  }

  searchTag(tag: string): void {
    if (tag.length === 0) return; // Verifica si el tag está vacío
    this.organizeHistory(tag); // Organiza el historial de tags

    const params = new HttpParams() // Crea un objeto de parámetros
      .set('api_key', this.apiKey) // Agrega el API Key
      .set('limit', '10') // Agrega el límite de resultados
      .set('q', tag); // Agrega el tag

    // Lógica para buscar un tag
    this.http
      .get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe((resp) => {
        this.gifList = resp.data; // Almacena los gifs en el array

        console.log({ gifs: this.gifList });
      });
  }
}
