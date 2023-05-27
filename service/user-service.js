const UserModel = require("../models/user-model");
const RoleModel = require("../models/role-model");
const UserRoleModel = require("../models/user-role-model");
const bcrypt = require("bcrypt");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../exceptions/api-error");
const cloudinary = require("../cloudinary");
const fs = require("fs");

class UserService {
  async registration(email, password, name) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(`User with email ${email} already exists`);
    }
    const hashPassword = await bcrypt.hash(password, 3);

    // Check if the "user" role exists
    let role = await RoleModel.findOne({ name: "user" });

    // If the "user" role doesn't exist, create it
    if (!role) {
      role = await RoleModel.create({ name: "user" });
    }

    const user = await UserModel.create({
      name,
      email,
      password: hashPassword,
      roles: [role._id],
    });

    const userRole = await UserRoleModel.create({
      user: user._id,
      role: role._id,
    });

    userRole.save();

    // Fetch the assigned role for the user
    const assignedRoles = await UserRoleModel.find({ user: user._id }).populate(
      "role"
    );
    const roles = assignedRoles.map((ur) => ur.role.name);

    // Assign the roles to the user object
    user.roles = roles;
    user.save();

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest("User with this email not found");
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest("Invalid password or email");
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async getAllUsers(page, limit) {
    const skip = (page - 1) * limit;
    const [users, totalCount] = await Promise.all([
      UserModel.find().skip(skip).limit(limit).populate("posts"),
      UserModel.countDocuments(),
    ]);
    const totalPages = Math.ceil(totalCount / limit);
    return {
      users,
      pagination: {
        totalCount,
        totalPages,
        currentPage: page,
        hasPrevPage: page > 1,
        hasNextPage: page < totalPages,
      },
    };
  }

  /* get method */
  async getUserById(id) {
    const user = await UserModel.findById(id).populate("posts");
    return user;
  }

  /* patch method */
  async update(id, data, file) {
    console.log("update method", id, data, file);
    const user = await UserModel.findById(id);
    if (!user) {
      throw ApiError.NotFound("User not found");
    }

    // Delete existing image from Cloudinary
    if (file) {
      if (user.image && user.image.id) {
        await cloudinary.destroy(user.image.id);
      }
    }

    let updatedImage = {};
    if (file) {
      const { path } = file;
      const { url, id } = await cloudinary.uploads(path, "users"); // Upload the image to Cloudinary
      updatedImage = { url, id };
      fs.unlinkSync(path); // Delete the uploaded image file from the server
    }

    // Update user data
    user.name = data.name || user.name;
    user.email = data.email || user.email;
    user.image = updatedImage || user.image;
    user.banned = data.banned || user.banned;
    user.layout = data.layout || user.layout;
    await user.save();
    return { error: null, status: 200, message: "User updated successfully" };
  }
}

module.exports = new UserService();
