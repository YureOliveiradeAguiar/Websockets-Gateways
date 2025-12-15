import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateItemDto } from "./dto/create-item.dto";
import { UpdateItemDto } from "./dto/update-item.dto";
import { Item } from "./entities/item.entity";
import { ItemsGateway } from "./items.gateway";

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly repo: Repository<Item>,
    private gateway: ItemsGateway
  ) {}

  //================Create==================
  async create(dto: CreateItemDto) {
    const item = await this.repo.save(dto);
    this.gateway.server.emit('itemCreated', item);
    return item;
  }

  //=================Update=================
  async update(id: string, dto: UpdateItemDto) {
    await this.repo.update(id, dto);
    const item = await this.repo.findOneBy({ id });
    this.gateway.server.emit('itemUpdated', item);
    return item;
  }

  //==================Remove===================
  async remove(id: string) {
    await this.repo.delete(id);
    this.gateway.server.emit('itemDeleted', id);
  }
  //===========================================

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOneBy({ id });
  }
}
