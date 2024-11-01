import path from "path";
import { fileURLToPath } from "url";

/**
 * The directory name of the current module.
 * This is a workaround for the lack of `__dirname` in ES6 modules.
 * @type {string}
 */
export const __dirname = path.dirname(fileURLToPath(import.meta.url));
