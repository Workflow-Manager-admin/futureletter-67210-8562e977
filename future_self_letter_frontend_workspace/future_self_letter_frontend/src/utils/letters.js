const LS_KEY = "future_self_letter_letters";

/**
 * Save a new letter for the user (append, do not overwrite).
 */
export async function saveLetter(username, letterObj) {
  const all = getAllLetters();
  if (!all[username]) all[username] = [];
  all[username].push(letterObj);
  localStorage.setItem(LS_KEY, JSON.stringify(all));
}

/**
 * Get all letters for given user.
 */
export async function getLetters(username) {
  const all = getAllLetters();
  return all[username] || [];
}

function getAllLetters() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY)) || {};
  } catch (e) {
    return {};
  }
}
