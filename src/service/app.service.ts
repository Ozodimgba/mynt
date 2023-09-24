import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'This is the server for Mynt a quicknode market-place add-on for minting solana compressed nfts!';
  }

  provision(): string {
    return 'This is a healthcheck for the provision api endpoints';
  }

  // check(): any {
  //   const tree = create_tree();
  //   return tree;
  // }
}
