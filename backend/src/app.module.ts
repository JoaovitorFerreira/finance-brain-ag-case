import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProducerModule } from './producer/producer.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [ProducerModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
