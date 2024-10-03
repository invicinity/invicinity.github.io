<!DOCTYPE html>
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
      }

      textarea.emscripten {
        font-family: monospace;
        width: 80%;
      }

      canvas.emscripten {
        border: 0 none;
        background-color: #000;
      }

      .titlebar {
        text-align: start;
        margin: 0;
        padding: 1px;
        position: relative;
        overflow: hidden;
        display: flex;
        user-select: none;
      }

      .titlebar .titlebar-icon {
        width: 16px;
        height: 16px;
        padding: 1px;
      }

      .titlebar .titlebar-title {
        display: flex;
        padding: 0 2px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        flex-grow: 1;
        font-weight: 700;
        align-items: center;
      }

      .titlebar .titlebar-wincontrols {
        display: inline-block;
        margin: 0;
        padding: 1px;
        min-width: fit-content;
      }

      .titlebar-wincontrols .buttons-wrapper {
        display: inline-block;
        width: auto;
        margin: 0;
        padding: 1px;
      }

      .titlebar-wincontrols .spacer {
        display: inline-block;
        margin: 0;
        padding: 0;
        width: 2px;
      }

      .titlebar-wincontrols .button {
        display: inline-block;
        min-width: 12px;
        min-height: 10px;
        width: 12px;
        height: 10px;
        text-align: center;
        vertical-align: middle;
        line-height: 10px;
      }

      .window {
        font-size: 8pt;
        color: var(--WindowText);
        background-color: var(--ButtonFace);
        border: 1px solid var(--ActiveBorder);
        box-shadow: -0.5px -0.5px 0 0.5px var(--ButtonHilight),
          0 0 0 1px var(--ButtonShadow),
          -0.5px -0.5px 0 1.5px var(--ButtonLight),
          0 0 0 2px var(--ButtonDkShadow);
        padding-right: 0;
        margin-left: auto;
        margin-right: auto;
        display: inline-block;
      }

      .window.active {
        border: 1px solid var(--ActiveBorder);
      }

      .window.active .titlebar .titlebar-icon {
        background-color: var(--ActiveTitle);
        color: var(--TitleText);
      }

      .window.active .titlebar .titlebar-title {
        background-color: var(--ActiveTitle);
        background-image: linear-gradient(
          to right,
          var(--ActiveTitle),
          var(--GradientActiveTitle)
        );
        color: var(--TitleText);
      }

      .window.active .titlebar .titlebar-wincontrols,
      .window.active .titlebar .titlebar-wincontrols .buttons-wrapper {
        background-color: var(--GradientActiveTitle);
        font-size: 8pt;
        font-weight: 700;
      }

      .button {
        margin: 2px;
      }

      .button span.button-content {
        display: inline-block;
      }

      .button:active .button-content {
        transform: translate(1px, 1px);
      }

      .button {
        background-color: var(--ButtonFace);
        color: var(--ButtonText);
        box-shadow: -0.5px -0.5px 0 0.5px var(--ButtonLight),
          0 0 0 1px var(--ButtonShadow),
          -0.5px -0.5px 0 1.5px var(--ButtonHilight),
          0 0 0 2px var(--ButtonDkShadow);
      }

      .button:active {
        box-shadow: -0.5px -0.5px 0 0.5px var(--ButtonShadow),
          0 0 0 1px var(--ButtonShadow),
          -0.5px -0.5px 0 1.5px var(--WindowFrame), 0 0 0 2px var(--WindowFrame);
      }

      .button svg path {
        fill: var(--ButtonText);
      }

      .titlebar .button:active {
        box-shadow: -0.5px -0.5px 0 0.5px var(--ButtonShadow),
          0 0 0 1px var(--ButtonLight),
          -0.5px -0.5px 0 1.5px var(--ButtonDkShadow),
          0 0 0 2px var(--ButtonHilight);
      }

      #status {
        margin: 40px 32px;
      }
    </style>
  </head>
  <body>
    <div class="active window">
      <div class="emscripten" id="status" style="display: none"></div>
      <div class="emscripten">
        <progress
          id="progress"
          max="1"
          value="0"
          hidden=""
          style="display: none"
        ></progress>
      </div>
      <canvas
        class="emscripten"
        id="canvas"
        oncontextmenu="event.preventDefault()"
        style="cursor: default"
        tabindex="-1"
        width="600"
        height="440"
      ></canvas>
    </div>
    <script>
      var statusElement = document.getElementById("status"),
        progressElement = document.getElementById("progress"),
        Module = {
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
              var t = e.match(/([^(]+)\((\d+(\.\d+)?)\/(\d+)\)/),
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
    <script async="" src="/pinball/SpaceCadetPinball.js"></script>
  </body>
</html>
