import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  CheckContentTypeMiddleware,
  CheckTokenMiddleware,
} from './middleware/middleware';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckContentTypeMiddleware, CheckTokenMiddleware)
      .exclude('/api/live_data/token/get')
      .forRoutes('*');
  }
}
