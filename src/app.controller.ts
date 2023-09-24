import { Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './service/app.service';
// import { create_tree } from './lib/createTree';
// import { createNFTCollection } from './lib/createCollection';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
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
