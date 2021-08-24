import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { MongooseModule } from '@nestjs/mongoose';
import config from "./config/keys"
import { LoggerMiddleware } from './common/middlewares/logger.middleware';

@Module({
  imports: [
    ItemsModule,
    MongooseModule.forRoot(config.mongoURI)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule  {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('items');
  }
}
