/**
 * Documents saved in memory
 * @typedef {object} Doc_Memory
 * @property {string} id - The document ID
 * @property {Record<string, string>} editors - The editors of the document
 */

/**
 * The documents in memory, indexed by the document ID
 * @type {Record<string, Doc_Memory>}
 */
const docs_memory = {};

/**
 * Gets a document from memory
 * @param {string} id
 * @returns {Doc_Memory | undefined} The document in memory, or undifined if it does not exist
 */
export function getDocInMemory(id) {
  return docs_memory[id];
}

/**
 * Gets or creates a document in memory
 * @param {string} id
 * @returns {Doc_Memory}
 */
export function getOrCreateDocInMemory(id) {
  const existing_doc = docs_memory[id];
  if (existing_doc) return existing_doc;

  docs_memory[id] = {
    id,
    editors: {},
  };

  return docs_memory[id];
}

/**
 * Deletes a document from memory
 * @param {string} id
 */
export function deleteDocFromMemory(id) {
  delete docs_memory[id];
}
