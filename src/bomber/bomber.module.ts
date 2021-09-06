import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BomberController } from './bomber.controller';
import { BomberService } from './bomber.service';
import { Hosts } from './hosts.entity';

@Module({
    imports: [HttpModule, TypeOrmModule.forFeature([Hosts]),
    ],
    providers: [BomberService],
    controllers: [BomberController]
})
export class BomberModule { }
