import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar:</h5>
    <input
      type="text"
      class="form-control"
      placeholder="Buscar GIF..."
      (keyup.enter)="searchTag()"
      #txtTagInput
    />
  `,
})
export class SearchComponent {
  @ViewChild('txtTagInput') // Decorador para obtener una referencia al input
  public tagInput!: ElementRef<HTMLInputElement>; // Propiedad para almacenar la referencia al input

  constructor(private gifService: GifsService) {} // Inyecta el servicio de gifs

  searchTag() {
    // Método para buscar un tag
    const newTag = this.tagInput.nativeElement.value; // Obtiene el valor del input
    this.gifService.searchTag(newTag); // Llama al método searchTag del servicio
    this.tagInput.nativeElement.value = ''; // Limpia el input
  }
}
