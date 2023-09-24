import { Controller, Get, Post, Req } from '@nestjs/common';
import { ProvisionService } from 'src/service/provision.service';
import { Request } from 'express';

@Controller('/provisioning')
export class ProvisionController {
  constructor(private readonly provision: ProvisionService) {}

  @Get('/check')
  healthcheck(): string {
    return this.provision.healthcheck();
  }

  @Post('/auth')
  auth(@Req() req: Request): Promise<any> {
    const requestData = {
      method: req.method,
      url: req.url,
      headers: req.headers,
      body: req.body,
    };

    console.log(requestData.body);
    const params = {
      quicknode_id:
        '9469f6bfc411b1c23f0f3677bcd22b890a4a755273dc2c0ad38559f7e1eb2700',
      'endpoint-id': '2c03e048-5778-4944-b804-0de77df9363a',
      'wss-url':
        'wss://long-late-firefly.quiknode.pro/2f568e4df78544629ce9af64bbe3cef9145895f5/',
      'http-url':
        'https://long-late-firefly.quiknode.pro/2f568e4df78544629ce9af64bbe3cef9145895f5/',
      referers: ['quicknode.com'], // may be null as well if none set
      contract_addresses: [],
      chain: 'ethereum',
      network: 'mainnet',
      plan: 'your-plan-slug',
    };
    return this.provision.storeCredentials(params);
  }

  @Post('/creatCollection')
  test(@Req() req: Request): any {
    const requestData = {
      method: req.method,
      url: req.url,
      headers: req.headers,
      body: req.body,
    };

    console.log(requestData.body); // Log the extracted request data

    return { message: requestData.body.message };
  }
}
