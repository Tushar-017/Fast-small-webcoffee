import Store from "./services/Store.js";
import API from "./services/API.js";
import { loadData } from "./services/Menu.js";
import Router from "./services/Router.js";

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
