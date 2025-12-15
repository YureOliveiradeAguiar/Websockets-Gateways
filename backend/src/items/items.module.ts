import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Item } from "./entities/item.entity";
import { ItemsController } from "./items.controller";
import { ItemsService } from "./items.service";
import { ItemsGateway } from './items.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Item])],
  controllers: [ItemsController],
  providers: [ItemsService, ItemsGateway],
})
export class ItemsModule {}
