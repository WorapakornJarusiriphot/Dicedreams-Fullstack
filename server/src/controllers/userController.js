const db = require("../models");
const moment = require("moment");
const bcrypt = require("bcryptjs");

const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const writeFileAsync = promisify(fs.writeFile);
const config = { DOMAIN: process.env.DOMAIN };

const User = db.user;

exports.create = async (req, res, next) => {
  try {
    // Validate request
    if (!req.body.username) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      return;
    }

    let birthday = moment(req.body.birthday, "MM-DD-YYYY");
    if (!birthday.isValid()) {
      res.status(400).send({
        message: "Invalid date format, please use MM-DD-YYYY",
      });
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(5);
    const passwordHash = await bcrypt.hash(req.body.password, salt);

    // Handle user image
    let userImage;
    if (req.body.user_image) {
      if (req.body.user_image.startsWith("data:image")) {
        userImage = await saveImageToDisk(req.body.user_image);
      } else {
        userImage = req.body.user_image;
      }
    }

    // Create a user
    const user = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      password: passwordHash,
      email: req.body.email,
      birthday: birthday,
      phone_number: req.body.phone_number,
      gender: req.body.gender,
      user_image: userImage,
    };

    await User.create(user);

    res.status(201).json({
      message: "User was registered successfully!",
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(400).json({
        error: {
          status_code: 400,
          message: "Username or email already exists",
        },
      });
    } else {
      res.status(500).json({
        error: {
          status_code: 500,
          message:
            error.message || "Some error occurred while creating the User.",
        },
      });
    }
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
      order: [["createdAt", "DESC"]], // เรียงลำดับจากใหม่ไปเก่า
    });

    const usersWithPhotoDomain = await users.map((user, index) => {
      return {
        ...user.dataValues,
        user_image: `${config.DOMAIN}/images/${user.user_image}`,
      };
    });

    res.status(200).json(usersWithPhotoDomain);
  } catch (error) {
    next(error);
  }
};

exports.findOne = (req, res, next) => {
  try {
    const users_id = req.params.id;

    User.findByPk(users_id, {
      attributes: { exclude: ["password"] },
    })
      .then(async (data) => {
        data.user_image = `${config.DOMAIN}/images/${data.user_image}`;

        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json({
          message: "Error retrieving User with id=" + users_id,
        });
      });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const users_id = req.params.id;

    let birthday;
    if (req.body.birthday) {
      birthday = moment(req.body.birthday, "MM-DD-YYYY");
      if (!birthday.isValid()) {
        res.status(400).send({
          message: "Invalid date format, please use MM-DD-YYYY",
        });
        return;
      }
    }

    let passwordHash;
    if (req.body.password) {
      const salt = await bcrypt.genSalt(5);
      passwordHash = await bcrypt.hash(req.body.password, salt);
    }
    
    let userImage;
    if (req.body.user_image) {
      if (req.body.user_image.startsWith("data:image")) {
        userImage = await saveImageToDisk(req.body.user_image);
      } else {
        userImage = req.body.user_image;
      }
    }
    const user = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      password: passwordHash || undefined,
      email: req.body.email,
      birthday: birthday || undefined,
      phone_number: req.body.phone_number,
      gender: req.body.gender,
      bio: req.body.bio,
      user_image: userImage || undefined,
    };

    // Remove undefined values
    Object.keys(user).forEach((key) => {
      if (user[key] === undefined) {
        delete user[key];
      }
    });

    const [updated] = await User.update(user, {
      where: { users_id: users_id },
    });

    if (updated) {
      res.send({
        message: "User was updated successfully.",
      });
    } else {
      res.status(404).send({
        message: `Cannot update User with id=${users_id}. Maybe User was not found or req.body is empty!`,
      });
    }
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(400).json({
        error: {
          status_code: 400,
          message: "Username or email already exists",
        },
      });
    } else {
      res.status(500).send({
        message: `Error updating User with id=${req.params.id}`,
      });
    }
  }
};

exports.delete = (req, res, next) => {
  try {
    const users_id = req.params.id;

    User.destroy({
      where: { users_id: users_id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "User was deleted successfully!",
          });
        } else {
          res.send({
            message: `Cannot delete User with id=${users_id}. Maybe User was not found!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete User with id=" + users_id,
        });
      });
  } catch (error) {
    next(error);
  }
};

exports.deleteAll = (req, res) => {
  res.send({ message: "DeleteAll handler" });
};

async function saveImageToDisk(baseImage) {
  const projectPath = path.resolve("./");

  const uploadPath = `${projectPath}/src/public/images/`;

  const ext = baseImage.substring(
    baseImage.indexOf("/") + 1,
    baseImage.indexOf(";base64")
  );

  let filename = "";
  if (ext === "svg+xml") {
    filename = `${uuidv4()}.svg`;
  } else {
    filename = `${uuidv4()}.${ext}`;
  }

  let image = decodeBase64Image(baseImage);

  await writeFileAsync(uploadPath + filename, image.data, "base64");

  return filename;
}

function decodeBase64Image(base64Str) {
  var matches = base64Str.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  var image = {};
  if (!matches || matches.length !== 3) {
    throw new Error("Invalid base64 string");
  }

  image.type = matches[1];
  image.data = matches[2];

  return image;
}
