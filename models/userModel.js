const fs = require('fs');
const path = './data/users.json';

function readUsers() {
  const data = fs.readFileSync(path);
  return JSON.parse(data);
}

function writeUsers(users) {
  fs.writeFileSync(path, JSON.stringify(users, null, 2));
}

function createUser(user) {
  const users = readUsers();
  users.push(user);
  writeUsers(users);

  // SQL mock
  console.log(`-- SQL: INSERT INTO users (id, email, password, role) VALUES (${user.id}, ${user.email}, ${user.password}, ${user.role});`);
}

function getUserByEmail(email) {
  return readUsers().find(u => u.email === email);
}

module.exports = { createUser, getUserByEmail };
