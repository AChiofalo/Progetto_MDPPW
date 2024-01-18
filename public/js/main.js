"use strict";

import App from "./app.js";


const main_element = document.querySelector("#main");
const navLinks_element = document.querySelector("#collapsibleNavbar");
const newApp = new App(main_element, navLinks_element);