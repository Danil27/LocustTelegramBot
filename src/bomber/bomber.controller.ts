import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { BomberService } from './bomber.service';
import { Request, response, Response } from 'express';
import { CreateURLRequest } from './dto/create.URL.request';

@Controller('bomber')
export class BomberController {
    constructor(private readonly bomberService: BomberService) { }

    @Post('')
    public async addHost(
        @Body() host: CreateURLRequest,
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const result = await this.bomberService.addUrl(host)
        res.status(200).json({ data: result })
    }

    @Get('/start/:phone')
    public async startBomb(
        @Param('phone') phone: string,
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const result = await this.bomberService.startBomb(phone)
        res.status(200).json({ data: result })
    }

}
