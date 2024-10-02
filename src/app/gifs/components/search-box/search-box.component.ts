import { Component } from '@angular/core';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar:</h5>
    <input
      type="text"
      class="form-control"
      placeholder="Buscar GIF..."
      (keyup.enter)="searchTag(txtTagInput.value)"
      #txtTagInput
    />
  `,
})
export class SearchComponent {
  constructor() {}

  searchTag(newTag: String) {
    console.log(newTag);
  }
}
