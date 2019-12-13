/* eslint-disable camelcase */
const Validator = require('validatorjs');
// const { users } = require('../../models');

const createTask = async (req, _res, next) => {
  const rules = {
    description: 'required',
    state: 'required',
  };
  const validate = new Validator(req.body, rules);

  if (!validate.passes()) {
    const err = new Error();
    err.message = validate.errors;
    err.statusCode = 400;
    return next(err);
  }

  const state = ['todo', 'done'];

  if (!state.includes(req.body['state'])) {
    const err = new Error();
    err.message = 'invalid state';
    err.statusCode = 400;
    return next(err);
  }

  return next();
};

module.exports = {
  createTask,
};
