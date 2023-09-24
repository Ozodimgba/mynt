import { Controller, Get, Post, Req, Param, Body } from '@nestjs/common';
import { ProvisionService } from 'src/service/provision.service';
// import { redisClient } from 'src/config/redis.config';
import { Request } from 'express';

@Controller('/provisioning')
export class ProvisionController {
  constructor(private readonly provision: ProvisionService) {}

  @Get('/check')
  healthcheck(): string {
    return this.provision.healthcheck();
  }

  @Get(':userId')
  getUserById(@Param('userId') userId: string) {
    return `User with ID ${userId}`;
  }

  @Post('/auth')
  auth(@Req() req: Request, @Body() params: any): Promise<any> {
    // const requestData = {
    //   method: req.method,
    //   url: req.url,
    //   headers: req.headers,
    //   body: req.body,
    // };
    // const params = req.body;
    console.log(params);
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
