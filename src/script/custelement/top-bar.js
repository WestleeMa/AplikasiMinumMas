class topBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <h1>Minum mas</h1>
        <p>Find your cocktails here :)</p>
        `;
  }
}

customElements.define("top-bar", topBar);
