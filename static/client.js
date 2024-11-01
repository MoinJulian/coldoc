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
    console.log("I am", socket.id);
    handleSocket(socket);
  });
}

init();

/**
 * Handles socket connections
 * @param {Socket} socket - The socket to handle
 */
function handleSocket(socket) {
  join(socket);
}

/**
 * Joins the socket to the document's room
 * @param {Socket} socket - The socket to handle
 */
function join(socket) {
  socket.emit("join", getDocId());
}
