import { Injectable } from '@nestjs/common';
import { create_tree } from 'src/lib/createTree';
import { mintOneCNFT } from 'src/lib/mintOneCNFT';

@Injectable()
export class AppService {
  getHello(): string {
    return 'This is the server for Mynt a quicknode market-place add-on for minting solana compressed nfts!';
  }

  provision(): string {
    return 'This is a healthcheck for the provision api endpoints';
  }

  async createTree(cluster: string): Promise<any> {
    const result = await create_tree(cluster);
    return result;
  }

  async createCollection(cluster: string): Promise<any> {
    const result = await create_tree(cluster);
    return result;
  }

  async mintCNFT(): Promise<any> {
    const result = await mintOneCNFT([], 'devnet', '', '', '');
    return result;
  }

  // check(): any {
  //   const tree = create_tree();
  //   return tree;
  // }
}
