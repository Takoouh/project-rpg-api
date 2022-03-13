import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsController } from './controller/items.controller';
import { ItemsEntity } from './entity/items.entity';
import { ItemsService } from './service/items/items.service';

@Module({
  imports: [TypeOrmModule.forFeature([ItemsEntity])],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
