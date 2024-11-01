/**
 * The textarea element of the document.
 */
const textarea = /**  * @type {HTMLTextAreaElement} */ (document.querySelector("textarea"));

/**
 * The title input element of the document.
 */
const title_input = /** @type {HTMLInputElement} */ (document.querySelector("#title_input"));

/**
 * The name input element for the user.
 */
const name_input = /** @type {HTMLInputElement} */ (document.querySelector("#name_input"));

/**
 * The button to copy the URL of the document.
 *
 */
const copy_button = /** @type {HTMLButtonElement} */ (document.querySelector("#copy_button"));

/**
 * The button to delete the document.
 */
const delete_button = /** @type {HTMLButtonElement} */ (document.querySelector("#delete_button"));

/**
 * The main element of the document.
 */
const main_element = /** @type {HTMLElement} */ (document.querySelector("main"));

/**
 * The status element for the text.
 */
const text_status = /** @type {HTMLElement} */ (document.getElementById("text_status"));

/**
 * The status element for the title.
 */
const title_status = /** @type {HTMLElement} */ (document.getElementById("title_status"));

/**
 * The element to display the names of the editors.
 */
const editor_names_display = /** @type {HTMLElement} */ (document.getElementById("editor_names"));

/**
 * The element to display the word count.
 */
const word_count_display = /** @type {HTMLElement} */ (document.getElementById("word_count"));

/**
 * @typedef {import("socket.io-client").Socket} Socket
 */

/**
 * Gets the document ID from the body element.
 * @returns {string} The document ID
 */
function getDocId() {
  return document.body.getAttribute("data-doc-id") ?? "";
}

// @ts-ignore
const io = window.io;

/**
 * Initializes the client application.
 */
function init() {
  /**
   * @type {Socket}
   * @description The socket connection
   */
  const socket = io();

  socket.on("connect", () => {
    handleSocket(socket);
  });
  enableCopyButton();
  displayWordCount(textarea?.value ?? "");
}

init();

/**
 * Handles socket connections
 * @param {Socket} socket - The socket to handle
 */
function handleSocket(socket) {
  join(socket);
  syncTitle(socket);
  syncText(socket);
  syncName(socket);
  showEditorNames(socket);
  handleDelete(socket);
}

/**
 * Joins the socket to the document's room
 * @param {Socket} socket - The socket to handle
 */
function join(socket) {
  socket.emit("join", getDocId());
}

/**
 * Syncs the title with the server
 * @param {Socket} socket
 */
function syncTitle(socket) {
  title_input.addEventListener("input", () => {
    socket.emit("title", title_input.value);
  });

  socket.on(
    "title",
    /** @param {string} title */ (title) => {
      title_input.value = title;
    }
  );
}

/**
 * Syncs the text with the server
 * @param {Socket} socket
 */
function syncText(socket) {
  textarea.addEventListener("input", () => {
    socket.emit("text", textarea.value);
    displayWordCount(textarea.value);
  });

  socket.on(
    "text",
    /** @param {string} text */ (text) => {
      textarea.value = text;
      displayWordCount(textarea.value);
    }
  );
}

/**
 * Syncs the name with the server
 * @param {Socket} socket
 */
function syncName(socket) {
  const my_name = localStorage.getItem("name") ?? "Anonymous";
  name_input.value = my_name;

  socket.emit("name", name_input.value);
  name_input.addEventListener("input", () => {
    socket.emit("name", name_input.value);
    localStorage.setItem("name", name_input.value);
  });
}

/**
 * Shows the names of the editors in the document
 * @param {Socket} socket
 */
function showEditorNames(socket) {
  socket.on("editor_names", (names) => {
    editor_names_display.innerText = names.join(", ");
  });
}

/**
 * Deletes the document
 * @param {Socket} socket
 */
function handleDelete(socket) {
  delete_button.addEventListener("click", () => {
    const sure = confirm("Are you sure you want to delete this document?");
    if (sure) socket.emit("delete");
  });

  socket.on("deleted", () => {
    displayDeletion();
  });
}

function displayDeletion() {
  main_element.innerHTML =
    "This document has been deleted. You will be redirected to the home page in 3 seconds.";

  setTimeout(() => {
    window.location.href = "/";
  }, 3000);
}

/**
 * Enables the copy button to copy the URL of the document
 */
function enableCopyButton() {
  copy_button.addEventListener("click", async () => {
    await navigator.clipboard.writeText(window.location.href);
    alert("The URL has been copied to the clipboard.");
  });
}

/**
 *
 * @param {string} text - The text to get the word count of
 * @returns The word count
 */
function getWordCount(text) {
  const words = text
    .trim()
    .split(/\s+/)
    .filter((word) => word != "");

  return words.length;
}

/**
 * Displays the word count of the text
 * @param {string} text
 */
function displayWordCount(text) {
  word_count_display.innerText = `${getWordCount(text)} words`;
}
