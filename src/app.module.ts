import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { BomberModule } from './bomber/bomber.module';

@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  }),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'locust',
    database: process.env.DB_DATABASE || 'locust',
    schema: process.env.DB_SCHEMA || 'public',
    entities: [join(__dirname, '**', '*.entity.{ts,js}')],
    synchronize: true,
    logging: ['query'],
    //autoLoadEntities: true,
  }),
  BomberModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
