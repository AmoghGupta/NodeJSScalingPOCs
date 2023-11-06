import { FastifyInstance } from 'fastify';
import { fastifyPlugin } from 'fastify-plugin';

function accessLogsPlugin(fastify: any, _options: any, next: any) {

    fastify.addHook('onRequest', (request: any, reply: any, next: any) => {

        console.log("**************Request Hook*****************");
        console.log(new Date().toISOString());
        console.log(`Received request hook: ${request.method} ${request.url}`)
        next();
    });

    fastify.addHook('onResponse', (request: any, reply: any, next: any) => {
        console.log("**************Response Hook****************: " + reply.getResponseTime() + ' ms');
        console.log(new Date().toISOString());
        console.log(`Received response hook: ${request.method} ${request.url}`)
        next();
    });

    next();
}

function registerAccessLogsPlugin(app: FastifyInstance) {
    app.register(fastifyPlugin(accessLogsPlugin));
}

export default registerAccessLogsPlugin;