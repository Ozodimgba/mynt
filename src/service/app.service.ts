import { Injectable } from '@nestjs/common';
import { Cluster } from '@solana/web3.js';
import {
  create_tree,
  mintOneCNFT,
  mintOneWithCNFTCollection,
  mintMultipleCNFTs,
  fetchByOwner,
} from 'src/lib';

@Injectable()
export class AppService {
  getHello(): string {
    return 'This is the server for Mynt a tool for minting solana compressed nfts!';
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
    collectionName: string,
    collectionSymbol: string,
    uri: string,
    receipients: string[],
    owner?: string,
    collectionSize?: number,
    treeAddress?: string,
  ): Promise<any> {
    const result = await mintMultipleCNFTs(
      creators,
      cluster,
      collectionName,
      collectionSymbol,
      uri,
      receipients,
      treeAddress,
      collectionSize,
      owner,
    );
    return result;
  }

  async fetchCNFTByOwner(owner: string, treeAddress?: string): Promise<any> {
    const result = await fetchByOwner(owner, treeAddress);
    return result;
  }

  // check(): any {
  //   const tree = create_tree();
  //   return tree;
  // }
}
