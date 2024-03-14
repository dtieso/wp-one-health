import { pageTransitionInit } from "./pageTransitionHandler.js";
import { initScroll } from "./animationHandler.js";

window.addEventListener('load',initScroll);
window.addEventListener('load',pageTransitionInit);