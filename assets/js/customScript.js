import { pageTransitionInit } from "./pageTransitionHandler.js";
import { initScroll } from "./animationHandler.js";
import { hotspotPosition } from "./hotspostPosition.js"

window.addEventListener('load', hotspotPosition);
window.addEventListener('load',initScroll);
window.addEventListener('load',pageTransitionInit);