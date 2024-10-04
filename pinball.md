<html lang="en-us">
  <head>
    <meta charset="utf-8">
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
    <title>3D Pinball for Windows - Space Cadet</title>
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
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        height: 100vh;
        margin: 0;
        overflow: hidden;
      }

      .window {
        width: 900px;
        height: 660px;
        background-color: var(--ButtonFace);
        border: 1px solid var(--ActiveBorder);
        box-shadow: -0.5px -0.5px 0 0.5px var(--ButtonHilight),
          0 0 0 1px var(--ButtonShadow),
          -0.5px -0.5px 0 1.5px var(--ButtonLight),
          0 0 0 2px var(--ButtonDkShadow);
        position: relative;
      }

      canvas.emscripten {
        border: 0 none;
        background-color: #000;
        width: 900px;
        height: 660px;
        display: block;
        margin: 0 auto;
      }

      /* CMD Style Button */
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

    <div class="window">
      <div class="emscripten" id="status" style="display: none;"></div>
      <div class="emscripten">
        <progress id="progress" max="1" value="0" hidden="" style="display: none;"></progress>
      </div>
      <canvas class="emscripten" id="canvas" oncontextmenu="event.preventDefault()" style="cursor: default" tabindex="-1" width="900" height="660"></canvas>
    </div>

    <!-- Back Button -->
    <button class="cmd-button" id="backButton" onclick="goBack()">Back to Root</button>

    <script>
      // Function to navigate to root directory
      function goBack() {
        // Navigate to root URL
        window.location.href = '/';  // Assuming root directory is the homepage "/"
      }
    </script>

    <script async="" src="/pinball/SpaceCadetPinball.js"></script>
</body>
</html>
