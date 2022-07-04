import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsController } from '../../Controllers/Items/items.controller';
import { ItemsEntity } from '../../Entity/Items/items.entity';
import { ItemsService } from '../../Services/Items/items.service';

@Module({
  imports: [TypeOrmModule.forFeature([ItemsEntity])],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
