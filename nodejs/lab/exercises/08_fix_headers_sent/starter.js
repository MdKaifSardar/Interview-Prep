// starter.js
/**
 * Buggy route handler: Fix the duplicate response dispatch bug!
 */
function handleRegister(req, res) {
  const { username, email } = req.body || {};

  if (!username) {
    // BUG: Missing return allows execution to continue!
    res.status(400).json({ error: 'Username required' });
  }

  if (!email) {
    // BUG: Missing return
    res.status(400).json({ error: 'Email required' });
  }

  // BUG: Sends second response after 400 was already initiated
  res.status(201).json({ success: true, user: { username, email } });
}

module.exports = { handleRegister };
