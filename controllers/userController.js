const userModel = require("../models/userModel");

const getAllUsers = (req, res) => {
  const { role } = req.query;
  const users = userModel.getAll(role);

  return res.status(200).json({
    success: true,
    count: users.length,
    data: users
  });
};

const getUserById = (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  const user = userModel.getById(id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Utilisateur non trouvé"
    });
  }

  return res.status(200).json({
    success: true,
    data: user
  });
};

const createUser = (req, res) => {
  const { name, email, role } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: "Les champs name et email sont obligatoires"
    });
  }

  if (userModel.getByEmail(email)) {
    return res.status(409).json({
      success: false,
      message: "Email déjà utilisé"
    });
  }

  const newUser = userModel.create({ name, email, role });

  return res.status(201).json({
    success: true,
    data: newUser
  });
};

const updateUser = (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  const existingUser = userModel.getById(id);

  if (!existingUser) {
    return res.status(404).json({
      success: false,
      message: "Utilisateur non trouvé"
    });
  }

  const forbiddenFields = ["id", "createdAt"];

  for (const field of forbiddenFields) {
    if (Object.prototype.hasOwnProperty.call(req.body, field)) {
      return res.status(400).json({
        success: false,
        message: `Le champ ${field} ne peut pas être modifié`
      });
    }
  }

  if (req.body.email) {
    const emailOwner = userModel.getByEmail(req.body.email);

    if (emailOwner && emailOwner.id !== id) {
      return res.status(409).json({
        success: false,
        message: "Email déjà utilisé"
      });
    }
  }

  const updatedUser = userModel.update(id, req.body);

  return res.status(200).json({
    success: true,
    data: updatedUser
  });
};

const deleteUser = (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  const deleted = userModel.remove(id);

  if (!deleted) {
    return res.status(404).json({
      success: false,
      message: "Utilisateur non trouvé"
    });
  }

  return res.status(204).send();
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
