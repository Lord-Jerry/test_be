const router = require('express').Router();
const { create } = require('../middleware/validation/users');
const { createTask } = require('../middleware/validation/tasks');
const UserController = require('../controllers/users');
const TaskController = require('../controllers/tasks');
const url = '/api/v1';

// USER ROUTE
router
  .route(`${url}/create-user`)
  .post(
    create,
    UserController.create,
  );

router
  .route(`${url}/update-user/:userId`)
  .put(
    create,
    UserController.update,
  );

router
  .route(`${url}/delete-user/:userId`)
  .delete(
    UserController.delete,
  );

// TASK ROUTE
router
  .route(`${url}/create-task`)
  .post(
    createTask,
    TaskController.create,
  );

router
  .route(`${url}/update-task/:taskId`)
  .put(
    createTask,
    TaskController.update,
  );

router
  .route(`${url}/delete-task/:taskId`)
  .delete(
    TaskController.delete,
  );

router
  .route(`${url}/tasks/:userId`)
  .get(
    TaskController.getAll,
  );

module.exports = router;
