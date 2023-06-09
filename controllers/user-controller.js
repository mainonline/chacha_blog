const userService = require("../service/user-service");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation error", errors.array()));
      }
      const { email, password, name } = req.body;
      const userData = await userService.registration(email, password, name);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const { deletedTokenCount } = await userService.logout(refreshToken);
      
      if (deletedTokenCount > 0) {
        res.clearCookie("refreshToken");
        res.clearCookie("accessToken");
        return res.json({ message: "Successfully logged out" });
      } else {
        return res.json({ message: "Token not found" });
      }
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async getUsers(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 20;
      const users = await userService.getAllUsers(page, limit);
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async getSingleUser(req, res, next) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async patchUser(req, res, next) {
    try {
      const data = req.body;
      const file = req.file;

      const user = await userService.update(data, file);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
