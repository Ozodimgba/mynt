import {
  Controller,
  Get,
  Post,
  Req,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

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
  async auth(@Req() req: Request, @Body() params: any): Promise<any> {
    try {
      return this.provision.storeCredentials(params);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/update')
  async update(@Req() req: Request, @Body() params: any): Promise<any> {
    try {
      return this.provision.updateCredentials(params);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
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
