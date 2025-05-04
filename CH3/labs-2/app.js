'use strict';

const path = require('node:path');
const AutoLoad = require('@fastify/autoload');

module.exports = async function (fastify, opts){
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: { ...opts },
  });

  fastify.setNotFoundHandler((request, reply) => {
    if (request.method !== 'GET') {
      reply.status(405);
      return 'method Not Allowed';
    }
    reply.status(404);
    return 'Not found\n';
  });
}