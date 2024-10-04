<!DOCTYPE html>
<html lang="en-us">
<head>
  <meta charset="utf-8" />
  <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
  <title>Game Selector</title>
  <style>
    :root {
      --ActiveBorder: rgb(212, 208, 200);
      --ActiveTitle: rgb(10, 36, 106);
      --AppWorkspace: rgb(128, 128, 128);
      --Background: rgb(0, 0, 0);
      --ButtonAlternateFace: rgb(192, 192, 192);
      --ButtonDkShadow: rgb(64, 64, 64);
      --ButtonFace: rgb(212, 208, 200);
      --ButtonHilight: rgb(255, 255, 255);
      --ButtonLight: rgb(212, 208, 200);
      --ButtonShadow: rgb(128, 128, 128);
      --ButtonText: rgb(0, 0, 0);
      --GradientActiveTitle: rgb(166, 202, 240);
      --GradientInactiveTitle: rgb(192, 192, 192);
      --GrayText: rgb(128, 128, 128);
      --Hilight: rgb(10, 36, 106);
      --HilightText: rgb(255, 255, 255);
      --HotTrackingColor: rgb(0, 0, 128);
      --InactiveBorder: rgb(212, 208, 200);
      --InactiveTitle: rgb(128, 128, 128);
      --InactiveTitleText: rgb(212, 208, 200);
      --InfoText: rgb(0, 0, 0);
      --InfoWindow: rgb(255, 255, 225);
      --Menu: rgb(212, 208, 200);
      --MenuBar: rgb(192, 192, 192);
      --MenuHilight: rgb(0, 0, 128);
      --MenuText: rgb(0, 0, 0);
      --Scrollbar: rgb(212, 208, 200);
      --TitleText: rgb(255, 255, 255);
      --Window: rgb(255, 255, 255);
      --WindowFrame: rgb(0, 0, 0);
      --WindowText: rgb(0, 0, 0);
    }

    body {
      font-family: Tahoma, Geneva, Verdana, sans-serif;
      background-color: var(--Background);
      text-align: center;
      display: flex;
      height: 100vh; /* Full height of the viewport */
      margin: 0; /* Remove default margin */
      overflow: hidden; /* Prevent scrollbars */
    }

    .sidebar {
      background-color: var(--ButtonFace);
      border-right: 1px solid var(--ActiveBorder);
      width: 200px; /* Width of sidebar */
      padding: 10px; /* Padding inside sidebar */
      box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
      display: flex;
      flex-direction: column; /* Stack items vertically */
      align-items: flex-start; /* Align items to the start */
    }

    .game-list {
      list-style-type: none; /* Remove bullet points */
      padding: 0; /* Remove padding */
      margin: 0; /* Remove margin */
      width: 100%; /* Full width */
    }

    .game-list li {
      cursor: pointer; /* Pointer cursor on hover */
      padding: 5px; /* Padding around list items */
      width: 100%; /* Full width of sidebar */
      background-color: var(--ButtonFace);
      color: var(--WindowText);
      transition: background-color 0.3s; /* Smooth background transition */
      border: 1px solid transparent; /* Transparent border for layout consistency */
    }

    .game-list li:hover {
      background-color: var(--Hilight); /* Highlight on hover */
      color: var(--HilightText); /* Change text color */
      border: 1px solid var(--ActiveBorder); /* Highlight border on hover */
    }

    .main-content {
      flex-grow: 1; /* Take the remaining space */
      display: flex;
      flex-direction: column; /* Stack children vertically */
      align-items: center; /* Center horizontally */
      justify-content: flex-start; /* Align to top */
    }

    .active.window {
      width: 900px; /* Set the width for 150% scale */
      height: 660px; /* Set the height for 150% scale */
      background-color: var(--ButtonFace);
      border: 1px solid var(--ActiveBorder);
      box-shadow: -0.5px -0.5px 0 0.5px var(--ButtonHilight),
        0 0 0 1px var(--ButtonShadow),
        -0.5px -0.5px 0 1.5px var(--ButtonLight),
        0 0 0 2px var(--ButtonDkShadow);
      margin-top: 2px; /* Add space at the top */
      position: relative; /* For absolute positioning of iframe */
    }

    canvas.emscripten {
      border: 0 none;
      background-color: #000;
      width: 900px; /* Set width for 150% zoom */
      height: 660px; /* Set height for 150% zoom */
    }

    .iframe-container {
      display: none; /* Initially hidden */
      width: 900px; /* Match the window width */
      height: 660px; /* Match the window height */
      border: none; /* No border for iframe */
      position: absolute; /* Overlay on top of the canvas */
      top: 0; /* Align to top */
      left: 0; /* Align to left */
    }

    .button-container {
      margin-top: 20px; /* Space between canvas and button */
    }

    .cmd-button {
      background-color: black;
      color: white;
      font-size: 14px;
      font-family: 'Courier New', Courier, monospace; /* Terminal-like font */
      padding: 5px 20px;
      border: 2px solid white; /* CMD-like white border */
      cursor: pointer;
      text-transform: uppercase;
      display: inline-block;
      margin-top: 15px; /* Space between canvas and button */
    }

    .cmd-button:active {
      background-color: white;
      color: black;
    }
  </style>
</head>
<body>
  <div class="sidebar">
    <ul class="game-list">
      <li onclick="selectGame('pinball')">Pinball</li>
      <li onclick="selectGame('princeOfPersia')">Prince of Persia</li>
      <li onclick="selectGame('dosGame1')">MS-DOS Game 1 (Placeholder)</li>
      <li onclick="selectGame('dosGame2')">MS-DOS Game 2 (Placeholder)</li>
      <li onclick="selectGame('dosGame3')">MS-DOS Game 3 (Placeholder)</li>
    </ul>
  </div>
  <div class="main-content">
    <div class="active window">
      <div class="emscripten" id="status" style="display: none"></div>
      <div class="emscripten">
        <progress id="progress" max="1" value="0" hidden style="display: none"></progress>
      </div>
      <canvas class="emscripten" id="canvas" oncontextmenu="event.preventDefault()" style="cursor: default" tabindex="-1" width="600" height="440"></canvas>
      <iframe id="iframe" class="iframe-container" src="https://archive.org/embed/invicinity_prince"></iframe>
    </div>

    <!-- Button container with a single button -->
    <div class="button-container">
      <button class="cmd-button" id="toggleButton">Toggle View</button>
    </div>
  </div>

  <script>
    var statusElement = document.getElementById("status"),
      progressElement = document.getElementById("progress"),
      canvasElement = document.getElementById("canvas"),
      iframeElement = document.getElementById("iframe"),
      toggleButton = document.getElementById("toggleButton"),
      isPinballActive = true; // State variable to track the current view

    toggleButton.onclick = function() {
      isPinballActive = !isPinballActive; // Toggle the view state

      // Show/hide the canvas and iframe based on the current view
      if (isPinballActive) {
        canvasElement.style.display = "block"; // Show canvas
        iframeElement.style.display = "none"; // Hide iframe
        Module.setStatus("Downloading..."); // Reset status for pinball
      } else {
        canvasElement.style.display = "none"; // Hide canvas
        iframeElement.style.display = "block"; // Show iframe
      }
    };

    function selectGame(game) {
      // Cleanup: hide canvas and iframe to close the currently active game
      canvasElement.style.display = "none"; // Hide canvas
      iframeElement.style.display = "none"; // Hide iframe
      Module.setStatus(""); // Reset status

      if (game === 'pinball') {
        canvasElement.style.display = "block"; // Show the canvas for Pinball
        Module.setStatus("Downloading..."); // Reset status for pinball
        isPinballActive = true; // Update the state
      } else if (game === 'princeOfPersia') {
        iframeElement.style.display = "block"; // Show the iframe for Prince of Persia
        iframeElement.src = "https://archive.org/embed/invicinity_prince"; // Set iframe source
      } else {
        iframeElement.style.display = "block"; // Show iframe for placeholder DOS game
        iframeElement.src = "https://example.com/your_placeholder_url"; // Replace with actual URL
      }
    }

    var Module = {
      preRun: [],
      postRun: [],
      print: (function () {
        var e = document.getElementById("output");
        return (
          e && (e.value = ""),
          function (e) {
            arguments.length > 1 &&
              (e = Array.prototype.slice.call(arguments).join(" "));
            console.log(e);
          }
        );
      })(),
      printErr: function (e) {
        arguments.length > 1 &&
          (e = Array.prototype.slice.call(arguments).join(" "));
        console.error(e);
      },
      canvas: (function () {
        var e = document.getElementById("canvas");
        e.addEventListener(
          "webglcontextlost",
          function (e) {
            alert("WebGL context lost. You will need to reload the page."),
            e.preventDefault();
          },
          !1
        );
        return e;
      })(),
      setStatus: function (e) {
        if (
          (Module.setStatus.last ||
            (Module.setStatus.last = { time: Date.now(), text: "" }),
          e !== Module.setStatus.last.text)
        ) {
          var t = e.match(/([^(]+)\((\d+(\.\d+)?)\/(\d+)/),
            n = Date.now();
          if (!(t && n - Module.setStatus.last.time < 30)) {
            if (
              ((Module.setStatus.last.time = n),
              (Module.setStatus.last.text = e),
              t)
            )
              (e = t[1]),
              (progressElement.value = 100 * parseInt(t[2])),
              (progressElement.max = 100 * parseInt(t[4])),
              (progressElement.hidden = !1);
            else
              (progressElement.value = null),
              (progressElement.max = null),
              (progressElement.hidden = !0),
              (document.getElementById("canvas").style.display = "");
            statusElement.innerHTML = e;
            "" === e
              ? ((statusElement.style.display = "none"),
                (progressElement.style.display = "none"))
              : ((statusElement.style.display = ""),
                (progressElement.style.display = ""));
          }
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
  </script>

  <script async src="/pinball/SpaceCadetPinball.js"></script>
</body>
</html>
