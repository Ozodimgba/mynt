import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './service/app.service';
// import { create_tree } from './lib/createTree';
// import { createNFTCollection } from './lib/createCollection';
import { Request } from 'express';
import * as jayson from 'jayson';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  async handle(@Body() body: any) {
    const server = new jayson.Server({
      add: (args: any, callback: any) => {
        const result = args[0] + args[1];
        callback(null, result);
      },
      subtract: (args: any, callback: any) => {
        const result = args[0] - args[1];
        callback(null, result);
      },
      multiply: (args: any, callback: any) => {
        const result = args[0] * args[1];
        callback(null, result);
      },
      // Add more methods here as needed
    });
    return new Promise((resolve, reject) => {
      server.call(body, (err: any, result: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  // @Post('/createTree')
  // async createTree(): Promise<any> {
  //   const tree = await create_tree(); // Call create_tree function here
  //   return tree;
  // }

  // @Post('/createCollection')
  // async createCollection(): Promise<any> {
  //   const collection = await createNFTCollection(); // Call create_tree function here
  //   return collection;
  // }

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
