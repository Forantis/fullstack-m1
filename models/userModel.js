const users = require("../data/users");

const getAll = (role) => {
  if (role) {
    return users.filter((user) => user.role === role);
  }

  return users;
};

const getById = (id) => users.find((user) => user.id === id);

const getByEmail = (email) =>
  users.find((user) => user.email.toLowerCase() === email.toLowerCase());

const create = (data) => {
  const nextId = users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;

  const newUser = {
    id: nextId,
    name: data.name,
    email: data.email,
    role: data.role || "user",
    createdAt: new Date().toISOString().slice(0, 10)
  };

  users.push(newUser);
  return newUser;
};

const update = (id, data) => {
  const user = getById(id);

  if (!user) {
    return null;
  }

  const allowedFields = ["name", "email", "role"];

  for (const field of allowedFields) {
    if (Object.prototype.hasOwnProperty.call(data, field)) {
      user[field] = data[field];
    }
  }

  return user;
};

const remove = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return false;
  }

  users.splice(index, 1);
  return true;
};

module.exports = {
  getAll,
  getById,
  getByEmail,
  create,
  update,
  remove
};
