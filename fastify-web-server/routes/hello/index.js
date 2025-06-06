'use strict';

module.exports = async (fastify, opts) => {
  fastify.get('/', async (request, reply) => {
    const { greeting = 'hello' } = request.query;
    return reply.view('hello.hbs', { greeting });
  });
};
