import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProducerModule } from './modules/producer/producer.module';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [ProducerModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
