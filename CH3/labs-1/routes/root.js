'use strict';
const data = require('../data');

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    const dta = await data();
    return dta;
  });
};
