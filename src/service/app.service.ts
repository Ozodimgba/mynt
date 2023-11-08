import { Injectable } from '@nestjs/common';
import { Cluster } from '@solana/web3.js';
import { create_tree } from 'src/lib/createTree';
import { mintOneCNFT } from 'src/lib/mintOneCNFT';
import { mintOneWithCNFTCollection } from 'src/lib/mintOneCNFTwithCollection';

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

  async mintCNFT(
    creators: string[],
    cluster: Cluster,
    name: string,
    symbol: string,
    uri: string,
    receiverAddress: string,
    owner?: string,
    treeAddress?: string,
  ): Promise<any> {
    const result = await mintOneCNFT(
      creators,
      cluster,
      name,
      symbol,
      uri,
      treeAddress,
      receiverAddress,
      owner,
    );
    return result;
  }

  async mintWithCollection(
    creators: string[],
    cluster: Cluster,
    name: string,
    symbol: string,
    uri: string,
    receiverAddress: string,
    owner?: string,
    collectionSize?: number,
    treeAddress?: string,
  ): Promise<any> {
    const result = await mintOneWithCNFTCollection(
      creators,
      cluster,
      name,
      symbol,
      uri,
      treeAddress,
      receiverAddress,
      collectionSize,
      owner,
    );
    return result;
  }

  async mintMultiple(
    creators: string[],
    cluster: Cluster,
    name: string,
    symbol: string,
    uri: string,
    receiverAddress: string,
    owner?: string,
    collectionSize?: number,
    treeAddress?: string,
  ): Promise<any> {
    const result = await mintOneWithCNFTCollection(
      creators,
      cluster,
      name,
      symbol,
      uri,
      treeAddress,
      receiverAddress,
      collectionSize,
      owner,
    );
    return result;
  }

  // check(): any {
  //   const tree = create_tree();
  //   return tree;
  // }
}
