const mongoose = require("mongoose");
const User = require("../models/userModel");

const getAllUsers = async (req, res) => {
  try {
    const { role } = req.query;
    const filter = {};

    if (role) {
      filter.role = role;
    }

    const users = await User.find(filter);

    return res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Erreur serveur"
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "ObjectId invalide"
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Utilisateur non trouve"
      });
    }

    return res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Erreur serveur"
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Les champs name et email sont obligatoires"
      });
    }

    const user = await User.create({ name, email, role });

    return res.status(201).json({
      success: true,
      data: user
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email deja utilise"
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Donnees invalides"
      });
    }

    return res.status(500).json({
      success: false,
      message: "Erreur serveur"
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "ObjectId invalide"
      });
    }

    const forbiddenFields = ["_id", "createdAt", "id"];

    for (const field of forbiddenFields) {
      if (Object.prototype.hasOwnProperty.call(req.body, field)) {
        return res.status(400).json({
          success: false,
          message: `Le champ ${field} ne peut pas etre modifie`
        });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "Utilisateur non trouve"
      });
    }

    return res.status(200).json({
      success: true,
      data: updatedUser
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email deja utilise"
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Donnees invalides"
      });
    }

    return res.status(500).json({
      success: false,
      message: "Erreur serveur"
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "ObjectId invalide"
      });
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "Utilisateur non trouve"
      });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Erreur serveur"
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
