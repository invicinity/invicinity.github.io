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

document.addEventListener("DOMContentLoaded", init);
initCursor();
showWelcomeMessage();
initSettings();

// Define some stuff on the window so we can use it directly from the HTML
Object.assign(window, {
  theme,
  handleClick,
  fullscreen,
  
  var statusElement = document.getElementById("status"),
    canvasElement = document.getElementById("canvas"),
    iframeElement = document.getElementById("iframe"),
    isPinballActive = false;

function selectGame(game) {
  // Cleanup: hide canvas and iframe to close the currently active game
  if (isPinballActive) {
    canvasElement.style.display = "none"; // Hide canvas for Pinball
  } else {
    iframeElement.style.display = "none"; // Hide iframe
    iframeElement.src = ""; // Unload the iframe source to stop it
  }

  Module.setStatus(""); // Reset status

  if (game === 'pinball') {
    canvasElement.style.display = "block"; // Show canvas for Pinball
    isPinballActive = true; // Update the state
  } else if (game === 'princeOfPersia') {
    iframeElement.style.display = "block"; // Show iframe for Prince of Persia
    iframeElement.src = "https://archive.org/embed/invicinity_prince"; // Set iframe source
    isPinballActive = false; // Update state
  } else {
    iframeElement.style.display = "block"; // Show iframe for other DOS games
    iframeElement.src = "https://example.com/your_placeholder_url"; // Replace with actual URL
    isPinballActive = false; // Update state
  }
}

var Module = {
  preRun: [],
  postRun: [],
  print: function (e) {
    console.log(e);
  },
  printErr: function (e) {
    console.error(e);
  },
  canvas: (function () {
    var e = document.getElementById("canvas");
    e.addEventListener(
      "webglcontextlost",
      function () {
        alert("WebGL context lost. You will need to reload the page."), e.preventDefault();
      },
      false
    );
    return e;
  })(),
  setStatus: function (e) {
    if (e) {
      statusElement.innerHTML = e;
      statusElement.style.display = "";
    } else {
      statusElement.style.display = "none";
    }
  },
  totalDependencies: 0,
  monitorRunDependencies: function (e) {
    this.totalDependencies = Math.max(this.totalDependencies, e);
    Module.setStatus(
      e
        ? "Preparing... (" +
          (this.totalDependencies - e) +
          "/" +
          this.totalDependencies +
          ")"
        : "All downloads complete."
    );
  },
};

Module.setStatus("Downloading..."),
(window.onerror = function () {
  Module.setStatus("Exception thrown, see JavaScript console"),
  (Module.setStatus = function (e) {
    e && Module.printErr("[post-exception status] " + e);
  });
});

});
