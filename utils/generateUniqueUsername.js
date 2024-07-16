const User = require('../models/user');

async function generateUniqueUsername(baseUsername) {
  let username = baseUsername;
  let user = await User.findOne({ username });

  // Append a number to the username if it already exists
  let suffix = 1;
  while (user) {
    username = `${baseUsername}${suffix}`;
    user = await User.findOne({ username });
    suffix++;
  }

  return username;
}

module.exports = generateUniqueUsername
