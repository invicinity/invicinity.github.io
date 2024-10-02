import { applyTheme } from "../config/settings.js";
import {
  banner,
  intro1,
  bannerPart1,
  bannerPart2,
  about,
  rules,
  contact,
  demo,
  help,
  test,
  linkedinURL,
  githubURL,
  email,
} from "../config/content.js";
import { scrollToBottom } from "../handlers/utils.js";

export async function showWelcomeMessage() {
  const terminalOutput = document.getElementById("terminal-output");
  const welcomeMessage = banner;
  const welcome1 = bannerPart1;
  const welcome2 = bannerPart2;

  const newOutputLine = document.createElement("div");
  terminalOutput.appendChild(newOutputLine);

  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

  await animateText1(newOutputLine, intro1);
  await animateText1(newOutputLine, welcome1);
  await animateText1(newOutputLine, welcome2); // Only animate bannerPart2 if not mobile
  await animateText1(newOutputLine, welcomeMessage);

  scrollToBottom();
}
let count = 0;

let imageShownTime; // Track when the image was shown

function checkWeather() {
  const currentTime = new Date();
  const hours = currentTime.getHours(); // Get the current hour (0-23)

  let weather = "rainy";
  let timeOfDay = "night";

  // Check if it's after 7 PM or before 6 AM
  if (hours >= 19) {
    weather = "snowy"; // After 7 PM, it's snowy
    timeOfDay = "night";
  } else if (hours >= 6) {
    weather = "rainy"; // After 6 AM but before 7 PM, it's rainy
    timeOfDay = "day"; // After 6 AM, it's considered daytime
  }

  // Return both the weather and time of day
  return { weather, timeOfDay };
}

// Example usage:
const { weather, timeOfDay } = checkWeather();

function showImage() {
  const imagePopup = document.getElementById("imagePopup");

  console.log("Showing image...");
  imageShownTime = Date.now();

  imagePopup.style.display = "flex"; // Show the image popup

  const intervalId = setInterval(() => {
    const count = Math.floor((Date.now() - imageShownTime) / 1000); // Calculate seconds since shown
  }, 1000); // Check every second

  document.addEventListener("keydown", function keyHandler() {
    const elapsed = (Date.now() - imageShownTime) / 500; // Time since image was shown
    if (elapsed >= 1) {
      console.log("Hiding image due to key press...");
      imagePopup.style.display = "none"; // Hide the image popup
      console.log("Image is now hidden.");
      clearInterval(intervalId); // Stop the interval
      document.removeEventListener("keydown", keyHandler); // Remove the event listener
    }
  });
}

export function processCommand(inputText) {
  const inputPrefix = document.getElementById("input-prefix");
  const terminalInput = document.getElementById("terminal-input");
  const userCommand = terminalInput.textContent;
  let response = "";

  switch (inputText.toLowerCase()) {
    case "help":
      return userCommand + "\n" + help;
    case "date":
      return (
        userCommand +
        "\n" +
        "Current date and time: " +
        new Date().toLocaleString()
      );
    case "clear":
      document.getElementById("terminal-output").innerHTML = "";
      return "";
    case "about":
      return (
        userCommand +
        "\n" +
        "Vicinity Terminal" +
        "\n" +
        "System status: operational."
      );
    case "demo":
      return userCommand + "\n" + demo;
    case "random fact":
      showImage();
      return userCommand + "\n" + about();
    case "rules":
      return userCommand + "\n" + rules;
    case "contact":
      return userCommand + "\n" + contact;
    case "weather":
      return (
        userCommand +
        "\n" +
        `It's currently ${timeOfDay} and the weather is ${weather}.`
      );
    case "contact email":
      window.open(`mailto:${email}`, "_blank");
      response = userCommand + "\n" + "Opening email client to send an email.";
      break;
    case "theme green":
      applyTheme("Green");
      return userCommand + "\n" + "Theme changed to Green.";
    case "theme black":
      applyTheme("Black");
      return userCommand + "\n" + "Theme changed to Black.";
    case "test":
      return userCommand + "\n" + test;
    default:
      return userCommand + "\n" + "Unknown command: " + userCommand;
  }
  return response;
}

let userInteracted = false;
document.addEventListener("keydown", () => {
  userInteracted = true;
});

let userInteractedClick = false;
document.addEventListener("click", () => {
  userInteractedClick = true;
});

export async function animateText(
  element,
  text,
  delay = 1,
  terminalInput,
  inputPrefix
) {
  if (terminalInput) {
    terminalInput.contentEditable = "false";
    if (inputPrefix) inputPrefix.style.display = "none";
  }

  // const typingSound = new Audio("sounds/typing.mp3");

  // Calculate speed factor based on character count
  const speedFactor = text.length <= 50 ? 1 : text.length <= 100 ? 10 : 20;
  const adjustedDelay = delay / speedFactor;

  for (const char of text) {
    element.textContent += char;
    scrollToBottom();

    if (userInteracted) {
      // Play typing sound
      // typingSound.currentTime = 0;
      // typingSound.play().catch((error) => {
      //   console.error("Error playing typing sound:", error);
      // });
    }

    await new Promise((resolve) => setTimeout(resolve, adjustedDelay));
  }

  if (terminalInput) {
    terminalInput.contentEditable = "true";
    if (inputPrefix) inputPrefix.style.display = "inline";
  }
}

export async function animateText1(
  element,
  text,
  delay = 1,
  terminalInput,
  inputPrefix
) {
  if (terminalInput) {
    terminalInput.contentEditable = "false";
    if (inputPrefix) inputPrefix.style.display = "none";
  }

  // const typingSound = new Audio("sounds/typing.mp3");

  // Calculate speed factor based on character count
  const speedFactor = text.length <= 50 ? 1 : text.length <= 100 ? 10 : 20;
  const adjustedDelay = delay / speedFactor;

  for (const char of text) {
    if (userInteracted) {
      // Show the full remaining text immediately
      element.textContent += text.slice(element.textContent.length);
      await new Promise((resolve) => setTimeout(resolve, 75));

      element.textContent += text.slice(1);
      scrollToBottom();
      break; // Exit the loop once text is displayed
    }

    element.textContent += char;
    scrollToBottom();

    if (userInteracted) {
      // Play typing sound
      // typingSound.currentTime = 0;
      // typingSound.play().catch((error) => {
      //   console.error("Error playing typing sound:", error);
      // });
    }

    await new Promise((resolve) => setTimeout(resolve, adjustedDelay));
  }

  if (terminalInput) {
    terminalInput.contentEditable = "true";
    if (inputPrefix) inputPrefix.style.display = "inline";
  }
}
