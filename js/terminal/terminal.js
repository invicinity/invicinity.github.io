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
  await animateText1(newOutputLine, welcome2);
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
  if (hours >= 19 && hours <= 5) {
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

// Move lastResponses and responseIndexes outside of the processCommand function to persist data between calls

let questionCategories = {}; // Initialize an empty object to hold questions by categories
let responseIndexes = {}; // To keep track of ordered responses for all questions
let lastResponses = {}; // To keep track of last random responses for all questions

// Fetch the questions from the questions.json file and store them in the questionCategories object
async function loadQuestions() {
  try {
    const response = await fetch('questions.json'); // Adjust path if needed
    questionCategories = await response.json();
  } catch (error) {
    console.error('Failed to load questions:', error);
  }
}

// Call the function to load questions
loadQuestions();

export function processCommand(inputText) {
  const terminalInput = document.getElementById("terminal-input");
  const userCommand = terminalInput.textContent;
  let response = "";

  // Function to get a response in order for specific questions
  function getOrderedResponse(question, responses) {
    if (responseIndexes[question] === undefined) {
      responseIndexes[question] = 0;
    }
    const response = responses[responseIndexes[question]];
    responseIndexes[question] = (responseIndexes[question] + 1) % responses.length;
    return response;
  }

  // Function to get a random response from an array without repeating the last one
  function getNonRepeatingResponse(question, responses) {
    let newResponse;
    if (!lastResponses[question]) {
      newResponse = responses[Math.floor(Math.random() * responses.length)];
    } else {
      do {
        newResponse = responses[Math.floor(Math.random() * responses.length)];
      } while (newResponse === lastResponses[question]);
    }
    lastResponses[question] = newResponse;
    return newResponse;
  }

  // Helper function to determine if a question should be ordered or random
  function isOrdered(question) {
    return question.endsWith("[O]");
  }

  // Helper function to strip the flag ([O] or [R]) from the internal question
  function stripFlag(question) {
    return question.replace(/\s*\[[OR]\]$/, "");
  }

  // Process standard commands and philosophical questions
  switch (inputText.toLowerCase()) {
    case "help":
      return userCommand + "\n" + help;
    case "date":
      let specificDate = "30-Dec-1999"; // Example date
      let timeOnly = new Date().toLocaleTimeString(); // Current time
      return userCommand + "\n" + "Date: " + specificDate + "\nTime: " + timeOnly;
    case "clear":
      document.getElementById("terminal-output").innerHTML = "";
      return "";
    case "about":
      return userCommand + "\n" + "Vicinity Terminal\nSystem status: operational.";
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
      return userCommand + "\n" + `It's currently ${timeOfDay} and the weather is ${weather}.`;
    case "dosbox":
      return (window.location.href = "./dosbox");
    case "prince":
      return (window.location.href = "./prince");
    case "pinball":
      return (window.location.href = "./pinball");
    case "doom":
      return (window.location.href = "./doom");
    case "contact email":
      window.open(`mailto:${email}`, "_blank");
      return userCommand + "\n" + "Opening email client to send an email.";
    case "theme green":
      applyTheme("Green");
      return userCommand + "\n" + "Theme changed to Green.";
    case "theme black":
      applyTheme("Black");
      return userCommand + "\n" + "Theme changed to Black.";
    case "test":
      return userCommand + "\n" + test;

    // Check for category-specific questions
    default:
      // Loop through categories to find a matching question
      for (const [category, questions] of Object.entries(questionCategories)) {
        // Find the matching question within this category
        const matchedQuestion = Object.keys(questions).find(
          (q) => stripFlag(q).toLowerCase() === inputText.toLowerCase()
        );

        if (matchedQuestion) {
          const question = matchedQuestion;
          const responses = questions[question];

          // Check if the question should follow an ordered or random response
          if (isOrdered(question)) {
            return userCommand + "\n" + getOrderedResponse(question, responses);
          } else {
            return userCommand + "\n" + getNonRepeatingResponse(question, responses);
          }
        }
      }

      // If no match found, handle unknown command
      return userCommand + "\n" + "Unknown command: " + userCommand;
  }
}
let userInteracted = false;
document.addEventListener("keydown", () => {
  userInteracted = true;
});
document.addEventListener("DOMContentLoaded", enableTypingSound);

let userInteractedClick = false;
document.addEventListener("click", () => {
  userInteractedClick = true;
});
export function enableTypingSound() {
  const terminalInput = document.getElementById("terminal-input");

  // Array of typing sound file paths for random selection
  const typingSounds = [
    "sounds/Wav_Keyboard_key1.WAV",
    "sounds/Wav_Keyboard_key2.WAV",
    "sounds/Wav_Keyboard_key3.WAV",
    "sounds/Wav_Keyboard_key4.WAV",
    "sounds/Wav_Keyboard_key5.WAV",
  ];

  // Paths for Enter and Spacebar sounds
  const enterSound = "sounds/Wav_Keyboard_ENTER.WAV";
  const spacebarSound = "sounds/SpacebarZvuk.WAV";

  // Event listener for keydown events
  terminalInput.addEventListener("keydown", (event) => {
    let soundToPlay;

    // Check if the Enter key is pressed
    if (event.key === "Enter") {
      soundToPlay = new Audio(enterSound);

      // Check if the Spacebar is pressed
    } else if (event.key === " ") {
      soundToPlay = new Audio(spacebarSound);

      // Otherwise, randomly pick one of the regular typing sounds
    } else {
      const randomSoundIndex = Math.floor(Math.random() * typingSounds.length);
      soundToPlay = new Audio(typingSounds[randomSoundIndex]);
    }

    soundToPlay.volume = 0.4; // Set a reasonable volume
    soundToPlay.play().catch((error) => {
      console.error("Error playing typing sound:", error);
    });
  });
}
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

  const typingSound = new Audio("sounds/spacebarZVUK.wav");

  // Calculate speed factor based on character count
  const speedFactor = text.length <= 50 ? 1 : text.length <= 100 ? 10 : 20;
  const adjustedDelay = delay / speedFactor;

  for (const char of text) {
    element.textContent += char;
    scrollToBottom();

    if (userInteracted) {
      // Play typing sound
      typingSound.volume = 0.04;
      typingSound.currentTime = 0;
      typingSound.play().catch((error) => {
        console.error("Error playing typing sound:", error);
      });
    }
    scrollToBottom();
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
  let isTyping = true;
  let skipAnimation = false;

  // Disable user input during animation
  if (terminalInput) {
    terminalInput.contentEditable = "false";
    if (inputPrefix) inputPrefix.style.display = "none";
  }

  const typingSound = new Audio("sounds/Wav_Keyboard_key1.wav");
  const speedFactor = text.length <= 50 ? 1 : text.length <= 100 ? 10 : 20;
  const adjustedDelay = delay / speedFactor;

  const finishTyping = () => {
    isTyping = false; // Stop typing if user clicks
  };

  const skipText = () => {
    skipAnimation = true; // Set flag to skip animation
  };

  document.addEventListener("click", finishTyping, { once: true });
  document.addEventListener("keydown", skipText, { once: true }); // Detect keypress

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (skipAnimation) {
      // If user starts typing, show remaining text and break the loop
      element.innerHTML += escapeHTML(text.slice(i))
        .replace(/\n/g, "<br>")
        .replace(/ /g, "&nbsp;");

      // Use requestAnimationFrame for accurate rendering
      requestAnimationFrame(() => {
        element.scrollTop = element.scrollHeight; // Scroll to the bottom
        element.lastElementChild?.scrollIntoView(); // Ensure the new content is visible
      });

      break;
    }

    // Append each character, replacing newlines and spaces with proper HTML equivalents
    if (char === "\n") {
      element.innerHTML += "<br>";
    } else if (char === " ") {
      element.innerHTML += "&nbsp;"; // Preserve spaces in ASCII art
    } else {
      element.innerHTML += escapeHTML(char);
    }

    // Use requestAnimationFrame to ensure scroll happens after render
    requestAnimationFrame(() => {
      element.scrollTop = element.scrollHeight; // Ensure scroll goes to the bottom
      element.lastElementChild?.scrollIntoView(); // Make sure it's visible in the viewport
    });

    // Uncomment if sound is desired
    // typingSound.volume = 0.04;
    // typingSound.currentTime = 0;
    // typingSound.play().catch((error) => {
    //   console.error("Error playing typing sound:", error);
    // });

    await new Promise((resolve) => setTimeout(resolve, adjustedDelay));
  }

  typingSound.pause();
  typingSound.currentTime = 0;

  // Enable user input again after animation
  if (terminalInput) {
    terminalInput.contentEditable = "true";
    if (inputPrefix) inputPrefix.style.display = "inline";
  }

  // Cleanup event listeners after the animation is done
  document.removeEventListener("click", finishTyping);
  document.removeEventListener("keydown", skipText);
}

// Helper function to escape HTML characters
function escapeHTML(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

document.addEventListener("DOMContentLoaded", () => {
  const terminalInput = document.getElementById("terminal-input");

  // Set focusable and contentEditable
  terminalInput.contentEditable = "true"; // Ensure contentEditable is set correctly
  terminalInput.setAttribute("tabindex", "0"); // Ensure focusability

  // Automatically focus the terminal input when the page loads
  terminalInput.focus();

  // Place caret at the end of the input (if any text exists)
  placeCaretAtEnd(terminalInput);
});

// Function to place the cursor at the end of the contentEditable div
function placeCaretAtEnd(el) {
  el.focus(); // Ensure the element has focus
  if (
    typeof window.getSelection !== "undefined" &&
    typeof document.createRange !== "undefined"
  ) {
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false); // Collapse to the end (false = end of content)
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }
}

// Optionally, handle focus when the terminal body (#crt) is clicked
function handleClick(event) {
  const terminalInput = document.getElementById("terminal-input");
  terminalInput.focus();
  placeCaretAtEnd(terminalInput); // Move the caret to the end on click
}
