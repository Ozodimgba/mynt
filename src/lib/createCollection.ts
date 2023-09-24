import { createCollection } from './compression';
import { CreateMetadataAccountArgsV3 } from '@metaplex-foundation/mpl-token-metadata';
import { clusterApiUrl } from '@solana/web3.js';
import { WrapperConnection } from '../ReadApi/WrapperConnection';
import { loadWalletKey } from './utils';

/*
    Create the actual NFT collection (using the normal Metaplex method)
    (nothing special about compression here)
  */

export async function createNFTCollection() {
  // define the metadata to be used for creating the NFT collection
  // load the env variables and store the cluster RPC url
  const CLUSTER_URL = process.env.RPC_URL ?? clusterApiUrl('devnet');

  // create a new rpc connection, using the ReadApi wrapper
  const connection = new WrapperConnection(CLUSTER_URL, 'confirmed');

  const filePath = 'mint.json';
  // generate a new keypair for use in this demo (or load it locally from the filesystem when available)
  const payer = loadWalletKey(filePath);

  const collectionMetadataV3: CreateMetadataAccountArgsV3 = {
    data: {
      name: 'Super Sweet NFT Collection',
      symbol: 'SSNC',
      // specific JSON metadata for the collection
      uri: 'https://arweave.net/euAlBrhc3NQJ5Q-oJnP10vsQFjTV7E9CgHZcVm8cogo',
      sellerFeeBasisPoints: 100,
      creators: [
        {
          address: payer.publicKey,
          verified: false,
          share: 100,
        },
      ],
      collection: null,
      uses: null,
    },
    isMutable: false,
    collectionDetails: null,
  };

  // create a full token mint and initialize the collection (with the `payer` as the authority)
  const collection = await createCollection(
    connection,
    payer,
    collectionMetadataV3,
  );

  return collection;
}

// Usage:
createNFTCollection();
