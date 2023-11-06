import home from './home';
import { FastifyInstance } from 'fastify';

export default (app: FastifyInstance): void => {
    app.register(home);
};
