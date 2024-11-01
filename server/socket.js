import { Server } from "socket.io";
import { getDocInMemory, getOrCreateDocInMemory } from "./docs_memory.js";

/**
 * @typedef {import("socket.io").Socket} Socket
 */

/**
 * Handles socket connections
 * @param {import("http").Server} server
 */
export function handleSocket(server) {
  const io = new Server(server);

  io.on("connection", (socket) => {
    socket.on("join", (doc_id) => handleJoin(socket, doc_id));
    socket.on("title", (title) => {
      handleTitle(socket, title);
    });
    socket.on("text", (text) => {
      handleText(socket, text);
    });
    socket.on("name", (name) => {
      handleName(socket, name);
    });
    socket.on("disconnect", () => handleDisconnect(socket));
  });

  /**
   * @param {Socket} socket
   * @param {string} doc_id
   */
  function handleJoin(socket, doc_id) {
    const doc_mem = getOrCreateDocInMemory(doc_id);
    socket.join(doc_id);
    socket.data.doc_id = doc_id;
    socket.data.name = "Anonymous";
    doc_mem.editors[socket.id] = socket.data.name;
  }

  /**
   * @param {Socket} socket
   * @param {string} title
   */
  function handleTitle(socket, title) {
    const doc_id = socket.data.doc_id;
    if (!doc_id) return;
    socket.to(doc_id).emit("title", title);
  }

  /**
   * @param {Socket} socket
   * @param {string} text
   */
  function handleText(socket, text) {
    const doc_id = socket.data.doc_id;
    if (!doc_id) return;
    socket.to(doc_id).emit("text", text);
  }

  /**
   * @param {Socket} socket
   * @param {string} name
   */
  function handleName(socket, name) {
    socket.data.name = name;
    const doc_id = socket.data.doc_id;
    const doc_mem = getDocInMemory(doc_id);
    if (!doc_mem) return;

    doc_mem.editors[socket.id] = name;
    sendEditorNames(doc_mem);
  }

  /**
   * Sends the names of the editors to all the editors
   * @param {import("./docs_memory.js").Doc_Memory} doc_mem - The selected document
   */
  function sendEditorNames(doc_mem) {
    io.to(doc_mem.id).emit("editor_names", Object.values(doc_mem.editors));
  }

  /**
   * Handles the disconnection of a socket
   * @param {Socket} socket
   * @returns
   */
  function handleDisconnect(socket) {
    const doc_id = socket.data.doc_id;
    socket.leave(doc_id);
    const doc_mem = getDocInMemory(doc_id);
    if (!doc_mem) return;

    delete doc_mem.editors[socket.id];
    sendEditorNames(doc_mem);
  }
}
