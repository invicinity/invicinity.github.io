<html lang="en-us">
  <head>
    <meta charset="utf-8" />
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
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
        flex-direction: column; /* Stack children vertically */
        align-items: center;     /* Center horizontally */
        justify-content: flex-start; /* Align content at the top */
        height: 100vh;          /* Full height of the viewport */
        margin: 0;              /* Remove default margin */
        overflow: hidden;       /* Prevent scrollbars */
      }

      /* Pinball window without title bar */
      .active.window {
        width: 900px;          /* Set the width for the scaled canvas */
        height: 660px;         /* Set the height for the scaled canvas */
        background-color: var(--ButtonFace);
        border: none;          /* No border */
        padding: 0;
        margin-top: 0;         /* Ensure it's aligned to the top */
        box-shadow: none;      /* Removed unnecessary shadows */
      }

      /* Adjust the canvas inside the window */
      canvas.emscripten {
        border: none;          /* No border */
        background-color: #000;
        width: 900px;          /* Match canvas to the window's size */
        height: 660px;         /* Same here */
        display: block;        /* Ensure it's block element */
        margin: 0 auto;        /* Center the canvas horizontally */
      }

      /* Button styles */
      button {
        margin: 20px;          /* Space between canvas and buttons */
        padding: 10px 20px;    /* Padding for buttons */
        font-size: 16px;       /* Font size for button text */
        cursor: pointer;       /* Pointer cursor on hover */
        background-color: var(--ButtonFace);
        color: var(--ButtonText);
        border: 1px solid var(--ActiveBorder);
        border-radius: 5px;    /* Rounded corners for buttons */
      }

      button:active {
        background-color: #ccc; /* Button press effect */
      }
    </style>
  </head>
  <body>
    <div class="active window">
      <canvas
        class="emscripten"
        id="canvas"
        oncontextmenu="event.preventDefault()"
        style="cursor: default"
        tabindex="-1"
        width="900"
        height="660"
      ></canvas>
    </div>

    <!-- Optional Button, placed below the game -->
    <button id="back-button" onclick="window.location.href='/root'">Go Back to Root</button>

    <script async="" src="/pinball/SpaceCadetPinball.js"></script>
  </body>
</html>
