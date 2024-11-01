import { router } from "./router.js";
import { generateServer } from "./server.js";
import { handleSocket } from "./socket.js";

/**
 * Initializes the server
 */
function init() {
  const server = generateServer(router);
  handleSocket(server);
}

init();
