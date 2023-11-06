import { FastifyInstance } from 'fastify';

export default async (fastify: FastifyInstance): Promise<void> => {
    fastify.get('/home', (_request, reply) => {
        reply.send({ message: 'Hello from Fastify!' })
    });
};
