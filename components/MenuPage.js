export class MenuPage extends HTMLElement {
  constructor() {
    super();
    // creating shadowDOM
    this.root = this.attachShadow({ mode: "open" });

    const styles = document.createElement("style");
    this.root.appendChild(styles);

    async function loadCSS() {
      // since we are loading this style far away the loading time. we can use prefetch if we want
      const request = await fetch("/components/MenuPage.css");
      const css = await request.text();
      styles.textContent = css;
    }
    loadCSS();
  }

  // when the component is attached to the DOM
  connectedCallback() {
    // since we are adding children to the shadowDOM. Now we can put this into constructor on your choice.
    const template = document.getElementById("menu-page-template");
    const content = template.content.cloneNode(true);
    this.root.appendChild(content);

    window.addEventListener("appmenuchange", () => {
      this.render();
    });
    this.render();
  }

  render() {
    if (app.store.menu) {
      this.root.querySelector("#menu").innerHTML = "";
      for (let category of app.store.menu) {
        const liCategory = document.createElement("li");
        liCategory.innerHTML = `
        <h3>${category.name}</h3>
        <ul class='category'></ul>
        `;
        this.root.querySelector("#menu").appendChild(liCategory);

        category.products.forEach((product) => {
          const item = document.createElement("product-item");
          item.dataset.product = JSON.stringify(product);
          liCategory.querySelector("ul").appendChild(item);
        });
      }
    } else {
      this.root.querySelector("menu").innerHTML = "Loading...";
    }
  }
}
customElements.define("menu-page", MenuPage);
