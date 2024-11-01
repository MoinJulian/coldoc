import { Server } from "socket.io";

/**
 * Handles socket connections
 * @param {import("http").Server} server
 */
export function handleSocket(server) {
  const io = new Server(server);

  io.on("connection", (socket) => {
    socket.on(
      "join",
      /** @param {string} doc_id */ (doc_id) => {
        console.log(socket.id, "joined", doc_id);
      }
    );
  });
}
