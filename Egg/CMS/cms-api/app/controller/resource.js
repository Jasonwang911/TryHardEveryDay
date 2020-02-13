'use strict';

const BaseController = require('./base');

class ResourceController extends BaseController {
  constructor(...args) {
    super(...args);
    this.entity = 'role';
  }
}

module.exports = ResourceController;
