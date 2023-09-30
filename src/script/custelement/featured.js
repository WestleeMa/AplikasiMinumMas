class featuredDrinks extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <h2>Drinks Generator</h2>
        <button id="refresh"><i class="fa-solid fa-arrows-rotate" style="color: #ffffff;"></i></button>
        <div id="featured"></div>
        `;
  }
}

customElements.define("featured-drinks", featuredDrinks);
