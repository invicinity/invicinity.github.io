import { init } from "./init.js";
import { initCursor } from "./terminal/cursor.js";
import {
  showWelcomeMessage,
  processCommand,
  animateText,
} from "./terminal/terminal.js";
import {
  handleClick,
  theme,
  fullscreen,
  globalListener,
} from "./handlers/globalHandlers.js";
import { initSettings } from "./config/settings.js";
const terminal = document.querySelector('.terminal');

// Function to scroll the terminal to the left
function scrollToLeft() {
    terminal.scrollLeft = 0;
}

// Scroll to the left whenever the terminal content changes
const observer = new MutationObserver(scrollToLeft);
observer.observe(terminal, { childList: true, subtree: true });

// Also, reset the scroll position when clicking on the terminal
terminal.addEventListener('click', scrollToLeft);
document.addEventListener("DOMContentLoaded", init);
initCursor();
showWelcomeMessage();
initSettings();

// Define some stuff on the window so we can use it directly from the HTML
Object.assign(window, {
  theme,
  handleClick,
  fullscreen,
  



});
