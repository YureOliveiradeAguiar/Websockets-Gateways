import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ItemsModule } from "./items/items.module";

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [ItemsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'nest_training',
      autoLoadEntities: true,
      synchronize: true // TODO dev only
    }),
  ],
})
export class AppModule { }
