import { FastifyInstance } from 'fastify';
import registerSamplePlugin from './sample';
import registerAccessLogsPlugin from './access-logs';

export default async (app: FastifyInstance) => {
    await registerAccessLogsPlugin(app);
    await registerSamplePlugin(app);
};
