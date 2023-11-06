import { fastify } from 'fastify';
import routes from '../routes';
import plugins from '../plugins';

// const app = fastify({
//     logger: true
// });

const app = fastify();

const start = async () => {
    try {
        // register plugins
        plugins(app);
        // register routes
        routes(app);
        await app.listen({ port: 4000 });
        // app.log.info(`Server listening on ${JSON.stringify(app.server)}`)
    } catch (err) {
        console.log(err);
        app.log.error(err)
        process.exit(1)
    }
}

start();
