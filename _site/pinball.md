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
    display: flex; /* Use flexbox for layout */
    height: 100vh; /* Full viewport height */
    color: var(--SidebarText); /* Default text color */
}

/* New Container for Border */
.container {
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
    position: fixed; /* Fix the sidebar to the left */
    top: 0; /* Align to the top */
    left: 0; /* Align to the left */
}

.sidebar-item {
    padding: 5px 10px; /* Smaller padding for a more compact look */
    cursor: pointer;
    color: var(--SidebarText); /* White text for sidebar */
    text-align: left;
    border-bottom: 1px solid var(--ActiveBorder); /* Separator lines between items */
    text-transform: uppercase;
    transition: background-color 0.3s; /* Smooth background transition */
    font-size: 14px; /* Adjusted font size for better readability */
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
