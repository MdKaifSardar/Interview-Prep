// solution.js
function handleRegister(req, res) {
  const { username, email } = req.body || {};

  if (!username) {
    return res.status(400).json({ error: 'Username required' });
  }

  if (!email) {
    return res.status(400).json({ error: 'Email required' });
  }

  return res.status(201).json({ success: true, user: { username, email } });
}

module.exports = { handleRegister };
