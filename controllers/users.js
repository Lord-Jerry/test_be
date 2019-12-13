/* eslint-disable camelcase */
const { users } = require('../models');

/**
 * this class contains method managing users
 */
class User {
  /**
   * this method creates users
   * @param { object } req - request body
   * @param { object } res - api response
   * @param { function } next - next middleware function
   */
  static async create(req, res, next) {
    try {
      const {
        name
      } = req.body;

      const registeredUser = await users.create({
        name,
      });

      return res.status(201).json({
        message: 'User registered successfully',
        statusCode: 201,
        data: {
          details: registeredUser,
        },
      });
    } catch (err) {
      return next(err);
    }
  }

  /**
   * @param { object } req - request body
   * @param { object } res - api response
   * @param { function } next - next middleware function
   */
  static async update(req, res, next) {
    try {
      const { userId } = req.params;
      const {
        name
      } = req.body;

      const findUser = await users.findByPk(userId);

      if (!findUser) {
        const err = new Error();
        err.message = `user with ID ${userId} not found`;
        err.statusCode = 404;
        return next(err);
      }

      const updatedUser = await findUser.update({
        name,
      });

      return res.status(200).json({
        message: 'user updated successfully',
        statusCode: 200,
        data: {
          details: updatedUser,
        },
      });
    } catch (err) {
      return next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const { userId } = req.params;
      const findUser = await users.findByPk(userId);

      if (!findUser) {
        const err = new Error();
        err.message = `user with ID ${userId} not found`;
        err.statusCode = 404;
        return next(err);
      }

      await findUser.destroy();

      return res.status(204).json({
        message: 'user deleted succesfully',
        statusCode: 204,
      });
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = User;
