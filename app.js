import Store from "./services/Store.js";
import API from "./services/API.js";
import { loadData } from "./services/Menu.js";
import Router from "./services/Router.js";

// Link my Web Component
import { MenuPage } from "./components/MenuPage.js";
import { DetailsPage } from "./components/DetailsPage.js";
import { OrderPage } from "./components/OrderPage.js";
import ProductItem from "./components/ProductItem.js";
import CartItem from "./components/CartItem.js";

window.app = {};
// making Store global in this app
app.store = Store;
app.router = Router;

// It is better to wait for the event for manipulation

// INITIALIZERS for the whole app.
// 1. EVENT-"load" : it wait for styles, fonts, image, videos..everything is loaded
// 2. EVENT-"DOMContentLoaded" : it wait for the DOM in memory is ready for manipulation.  It happens before the user seen the page.
window.addEventListener("DOMContentLoaded", () => {
  loadData();
  app.router.init();
});

window.addEventListener("appcartchange", (event) => {
  const badge = document.getElementById("badge");
  const qty = app.store.cart.reduce((acc, item) => acc + item.quantity, 0);
  badge.textContent = qty;
  badge.hidden = qty == 0;
});
