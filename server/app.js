import { router } from "./router.js";
import { generateServer } from "./server.js";

/**
 * Initializes the server
 */
function init() {
  generateServer(router);
}

init();
