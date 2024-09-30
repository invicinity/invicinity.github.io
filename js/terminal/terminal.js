import { applyTheme } from "../config/settings.js";
import { banner, bannerPart1, bannerPart2, about, rules, contact, demo, help, test, linkedinURL, githubURL, email } from "../config/content.js";
import { scrollToBottom } from '../handlers/utils.js';

export async function showWelcomeMessage() {
	const terminalOutput = document.getElementById("terminal-output");
	const welcomeMessage = banner;
	const welcome1 = bannerPart1;
	const welcome2 = bannerPart2;
	
	const newOutputLine1 = document.createElement("div");
	terminalOutput.appendChild(newOutputLine1);
	const newOutputLine2 = document.createElement("div");
	terminalOutput.appendChild(newOutputLine2);
	const newOutputLine = document.createElement("div");
	terminalOutput.appendChild(newOutputLine);

	await animateText(newOutputLine1, welcome1);
	await animateText(newOutputLine1, welcome2);
	await animateText(newOutputLine, welcomeMessage);
	
	scrollToBottom();
}

export function processCommand(inputText) {
	const inputPrefix = document.getElementById("input-prefix");
	const terminalInput = document.getElementById("terminal-input");
	const userCommand = terminalInput.textContent;
	let response = '';

	switch (inputText.toLowerCase()) {
	  case "help":
		return userCommand + "\n" + help;
	  case "date":
		return userCommand + "\n" + new Date().toLocaleString();
	  case "clear":
		document.getElementById("terminal-output").innerHTML = "";
		return "";
	  case "about":
		return userCommand + "\n" + about;
	  case "demo":
		return userCommand + "\n" + demo;
	  case "experience":
		return userCommand + "\n" + demo;
	  case "rules":
		return userCommand + "\n" + rules;
	  case "contact":
		return userCommand + "\n" + contact;
	  case "contact linkedin":
		window.open(linkedinURL, "_blank");
		break;
	  case "contact github":
		window.open(githubURL, "_blank");
		break;
	  case "contact email":
		window.open(`mailto:${email}`, "_blank");
		response = userCommand + "\n" + "Opening email client to send an email.";
		break;
	  case "theme green":
		applyTheme('Green');
		return userCommand + "\n" + "Theme changed to Green.";
	  case "theme black":
		applyTheme('Black');
		return userCommand + "\n" + "Theme changed to Black.";
	  case "test":
		return userCommand + "\n" + test;
	  default:
		return userCommand + "\n" + `Unknown command: ${inputText}`;
	}
	return response;
}

let userInteracted = false;
document.addEventListener("click", () => {
	userInteracted = true;
});
  
export async function animateText(element, text, delay = 10, terminalInput, inputPrefix) {
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
