import { Controller, Post, Req } from '@nestjs/common';

import { ProvisionService } from 'src/service/provision.service';
// import { redisClient } from 'src/config/redis.config';
import { Request } from 'express';

@Controller('/mynt')
export class ProvisionController {
  constructor(private readonly provision: ProvisionService) {}

  /**
   * @param destinationWallet: Wallet where this compressed NFt should be minted to.
   * @param req takes in the user endpoint id and checks if they still have an active plan.
   * @returns signature that can be verified in the explorer.
   */
  @Post('/mintCNFT/:userid')
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
