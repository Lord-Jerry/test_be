const router = require('express').Router();
const { create } = require('../middleware/validation/users');
const UserController = require('../controllers/users');
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

module.exports = router;
