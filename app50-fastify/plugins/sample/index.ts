import { FastifyInstance } from 'fastify';
import { fastifyPlugin } from 'fastify-plugin';

function samplePlugin(fastify: any, _options: any, next: any) {
    fastify.get('/sample', (request: any, reply: any) => {
        console.log("executing plugin");
        reply.send({ message: 'Hello from sample plugin!' })
    });
    next();
}

function registerSamplePlugin(app: FastifyInstance) {
    app.register(fastifyPlugin(samplePlugin));
}

export default registerSamplePlugin;