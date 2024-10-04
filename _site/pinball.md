
<html lang="en-us">
<head>
  <meta charset="utf-8" />
  <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
  <title>invicinity</title>
  <link rel="stylesheet" href="style.css" />
<script src="script.js"></script>
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

  <script src="script.js"></script>
  <script async src="/pinball/SpaceCadetPinball.js"></script>
</body>
</html>
