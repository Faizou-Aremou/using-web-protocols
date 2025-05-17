'use strict';

const path = require('node:path');
const AutoLoad = require('@fastify/autoload');
const pointOfView = require('point-of-view');
const handlebars = require('handlebars')
const dev = process.env.NODE_ENV !== 'production';
const fastifyStatic = dev && require('@fastify/static');
// Pass --options via CLI arguments in command to enable these options.
const options = {};

module.exports = async function (fastify, opts) {
  fastify.register(pointOfView, {
    engine: { handlebars },
    root: path.join(__dirname, 'views'),
    layout: 'layout.hbs',
  });

  // if (dev) {
  //   fastify.register(fastifyStatic, {
  //     root: path.join(__dirname, 'public'),
  //   });
  // }
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts),
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts),
  });
  fastify.setNotFoundHandler((request, reply) => {
    if (request.method !== 'GET') {
      reply.status(405);
      return 'method Not Allowed\n';
    }
    return 'Not found\n';
  });
};

module.exports.options = options;
