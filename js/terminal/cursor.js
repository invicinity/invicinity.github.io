export function initCursor() {
  const terminalInput = document.getElementById("terminal-input");
  const cursor = document.createElement("span");
  cursor.classList.add("cursor");
  terminalInput.parentElement.appendChild(cursor);

  terminalInput.addEventListener("focus", () => {
    cursor.style.display = "inline"; // Show cursor when input is focused
    updateCursorPosition();          // Update cursor position on focus
  });

  terminalInput.addEventListener("blur", () => {
    cursor.style.display = "none"; // Hide cursor when input is blurred
  });

  terminalInput.addEventListener("input", updateCursorPosition);
  terminalInput.addEventListener("keydown", (e) => {
    // For backspace or delete, update the cursor position
    if (e.key === "Backspace" || e.key === "Delete") {
      setTimeout(updateCursorPosition, 0); // Delay update to get the latest input value
    } else {
      updateCursorPosition();
    }
  });

  function updateCursorPosition() {
    const inputValue = terminalInput.value; // Get current input value
    const textWidth = getTextWidth(inputValue, terminalInput); // Calculate text width
    cursor.style.transform = `translateX(${textWidth}px)`; // Move cursor to the correct position
  }

  function getTextWidth(text, input) {
    const span = document.createElement("span");
    span.style.font = getComputedStyle(input).font; // Match the input font
    span.textContent = text; // Set the text content
    document.body.appendChild(span);
    const width = span.offsetWidth; // Get the width of the text
    document.body.removeChild(span); // Clean up
    return width; // Return the width of the text
  }
}
