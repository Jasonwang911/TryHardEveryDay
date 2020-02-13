'use strict';

const BaseService = require('./base');

class ResourceService extends BaseService {
  constructor(...args) {
    super(...args);
    this.entity = 'role';
  }
}

module.exports = ResourceService;
