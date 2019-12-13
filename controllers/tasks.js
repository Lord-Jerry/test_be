/* eslint-disable camelcase */
const { users, tasks } = require('../models');

/**
 * this class contains method managing tasks
 */
class Task {
  /**
   * this method creates tasks
   * @param { object } req - request body
   * @param { object } res - api response
   * @param { function } next - next middleware function
   */
  static async create(req, res, next) {
    try {
      const {
        task,
        description,
        state,
        userId,
      } = req.body;

      const findUser = await users.findByPk(userId);

      if (!findUser) {
        const err = new Error();
        err.message = `user with ID ${userId} not found`;
        err.statusCode = 404;
        return next(err);
      }

      const registeredTask = await tasks.create({
        userId,
        task,
        description,
        state,
      });

      return res.status(201).json({
        message: 'Task registered successfully',
        statusCode: 201,
        data: {
          details: registeredTask,
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
      const { taskId } = req.params;
      const {
        task,
        description,
        state,
        userId,
      } = req.body;

      const findTask = await tasks.findByPk(taskId);

      if (!findTask) {
        const err = new Error();
        err.message = `task with ID ${taskId} not found`;
        err.statusCode = 404;
        return next(err);
      }

      const updatedTask = await findTask.update({
        task,
        description,
        state,
      });

      return res.status(200).json({
        message: 'task updated successfully',
        statusCode: 200,
        data: {
          details: updatedTask,
        },
      });
    } catch (err) {
      return next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const { taskId } = req.params;
      const findTask = await tasks.findByPk(taskId);

      if (!findTask) {
        const err = new Error();
        err.message = `task with ID ${taskId} not found`;
        err.statusCode = 404;
        return next(err);
      }

      await findTask.destroy();

      return res.status(204).json({
        message: 'task deleted succesfully',
        statusCode: 204,
      });
    } catch (err) {
      return next(err);
    }
  }

  static async getAll(req, res, next) {
    try {
      const { userId } = req.params;
      const findTasks = await tasks.findAll({
        where: {
          userId,
        }
      });

      return res.status(200).json({
        message: 'availabe tasks',
        statusCode: 200,
        data: {
          tasks, findTasks,
        },
      });
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = Task;
