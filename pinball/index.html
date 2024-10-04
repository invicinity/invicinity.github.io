<!DOCTYPE html>
<html lang="en-us">
<head>
  <meta charset="utf-8" />
  <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
  <title>invicinity</title>
  <style>
    :root {
      --Background: rgb(0, 0, 0); /* Complete black background */
      --Window: rgb(0, 0, 0); /* Complete black for the window */
      --ButtonFace: rgb(0, 0, 0); /* Black button background */
      --ButtonText: rgb(255, 255, 255); /* Button text color */
      --ActiveBorder: rgb(255, 255, 255); /* White borders */
      --TitleText: rgb(255, 255, 255); /* White title text */
      --SidebarText: rgb(255, 255, 255); /* White text for sidebar items */
      --SidebarBackground: rgb(0, 0, 0); /* Complete black sidebar background */
    }

    h1 {
      display: none; /* Ensure <h1> is hidden */
    }

    body {
      font-family: 'Courier New', Courier, monospace; /* Terminal-like font */
      background-color: var(--Background);
      margin: 0;
      overflow: hidden; /* Prevent scrollbars */
      display: flex;
      height: 100vh; /* Full viewport height */
      color: var(--SidebarText); /* Default text color */
      zoom: 200%; /* Simulate zoom at 200% */
    }

    /* Background Decoration with White Dots */
    .background-decorator {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none; /* Allow clicks through to other elements */
      background-image: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 80%),
                        linear-gradient(to right, rgba(255, 255, 255, 0.1) 0%, transparent 100%);
      opacity: 0.05; /* Subtle decoration */
    }

    /* New Container for Border */
    .container {
      border: 2px solid var(--ActiveBorder); /* Outer white border */
      display: flex; /* Enable flexbox for positioning */
      width: 100%; /* Full width */
      height: 100%; /* Full height */
      box-sizing: border-box; /* Include border in element's dimensions */
    }

    .sidebar {
      display: flex; /* Enable flexbox for sidebar */
      flex-direction: column; /* Arrange items vertically */
      width: 200px; /* Fixed width for the sidebar */
      background-color: var(--SidebarBackground); /* Complete black sidebar color */
      border-right: 1px solid var(--ActiveBorder);
      height: 100%; /* Full height of the viewport */
      overflow-y: auto; /* Allow scrolling if necessary */
      padding: 10px; /* Padding for better spacing */
    }

    .sidebar-item {
      padding: 5px 10px; /* Smaller padding for a more compact look */
      cursor: pointer;
      color: var(--SidebarText); /* White text for sidebar */
      text-align: left;
      border-bottom: 1px solid var(--ActiveBorder); /* Separator lines between items */
      text-transform: uppercase;
      transition: background-color 0.3s; /* Smooth background transition */
      font-size: 10px; /* Smaller font size for a more CMD-like feel */
    }

    .sidebar-item:hover {
      background-color: rgba(255, 255, 255, 0.1); /* Highlight on hover */
    }

    .active.window {
      background-color: var(--Window); /* Complete black background for the window */
      border: 1px solid var(--ActiveBorder); /* Thicker border for visibility */
      position: absolute; /* Positioning it absolutely */
      top: 0; /* Stick to the top */
      left: 200px; /* Align to the right of the sidebar */
      width: calc(100% - 200px); /* Full width minus the sidebar width */
      height: calc(100% - 1px); /* Full height of the viewport minus border */
      overflow: hidden; /* Hide overflow */
      box-shadow: 0 0 0 1px var(--ActiveBorder), /* Right border */
                  1px 1px 0 0 var(--ActiveBorder); /* Bottom border */
    }

    /* Canvas styling */
    canvas.emscripten {
      width: 100%;
      height: 100%;
      border: none;
    }

    /* Iframe to display DOSBox games, aligned to top-left */
    iframe {
      position: absolute; /* Positioning it absolutely */
      top: 0;  /* Stick to the top */
      left: 0; /* Stick to the left */
      width: 100%;  /* Full width of the window */
      height: 100%; /* Full height of the window */
      border: none;
      display: none; /* Initially hide iframe */
    }

    .button-container {
      margin-top: auto; /* Push button to the bottom of the sidebar */
      text-align: center;
      margin: 10px;
    }

    .cmd-button {
      background-color: black;
      color: white;
      padding: 5px 10px; /* Smaller padding for a more compact look */
      border: 2px solid white;
      cursor: pointer;
      text-transform: uppercase;
      transition: background-color 0.2s; /* Smooth background transition */
      width: calc(100% - 20px); /* Full width minus padding */
      box-shadow: none; /* Remove any shadow for a flat look */
      font-size: 10px; /* Smaller font size for buttons */
    }

    .cmd-button:hover {
      background-color: white; /* Change background color on hover */
      color: black; /* Change text color on hover */
    }

    .cmd-button:active {
      background-color: white;
      color: black;
    }
  </style>
</head>
<body>
  <div class="background-decorator"></div> <!-- Background decorations -->
  
  <!-- Outer container to add the border -->
  <div class="container">
    <div class="sidebar">
      <div class="sidebar-item" onclick="selectGame('pinball')">Pinball</div>
      <div class="sidebar-item" onclick="selectGame('princeOfPersia')">Prince of Persia</div>
      <div class="sidebar-item" onclick="selectGame('dosGame1')">MS-DOS Game 1</div>
      <div class="sidebar-item" onclick="selectGame('dosGame2')">MS-DOS Game 2</div>
      <div class="sidebar-item" onclick="selectGame('dosGame3')">MS-DOS Game 3</div>
      
      <div class="button-container">
        <button class="cmd-button" onclick="window.location.href='https://invicinity.github.io'">Go Back</button>
      </div>
    </div>

    <div class="active window">
      <div class="emscripten" id="status" style="display: none"></div>
      <canvas class="emscripten" id="canvas" oncontextmenu="event.preventDefault()" style="cursor: default"></canvas>
      <iframe id="iframe" src="" allowfullscreen></iframe>
    </div>
  </div>

  <script>
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
  </script>

  <script async src="/pinball/SpaceCadetPinball.js"></script>
</body>
</html>
