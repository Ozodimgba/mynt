/**
  Overall flow of this script
  - load or create two keypairs (named `payer` and `testWallet`)
  - create a new tree with enough space to mint all the nft's you want for the "collection"
  - create a new NFT Collection on chain (using the usual Metaplex methods)
  - mint a single compressed nft into the tree to the `payer`
  - mint a single compressed nft into the tree to the `testWallet`
  - display the overall cost to perform all these actions

  ---
  NOTE: this script is identical to the `scripts/verboseCreateAndMint.ts` file, except THIS file has
  less console logging and explanation of what is occurring
*/

import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  clusterApiUrl,
  Cluster,
} from '@solana/web3.js';
import {
  MetadataArgs,
  TokenProgramVersion,
  TokenStandard,
} from '@metaplex-foundation/mpl-bubblegum';
import { CreateMetadataAccountArgsV3 } from '@metaplex-foundation/mpl-token-metadata';

// import custom helpers for demos
import { numberFormatter } from './helpers';

// import custom helpers to mint compressed NFTs
import {
  createCollection,
  createTree,
  mintNFTsToMultipleRecipients,
} from './compression';

// local import of the connection wrapper, to help with using the ReadApi
import { WrapperConnection } from '../ReadApi/WrapperConnection';
import { loadWalletKey } from './utils';
import { ValidDepthSizePair } from '@solana/spl-account-compression';

// define some reusable balance values for tracking
let initBalance: number, balance: number;

export async function mintMultipleCNFTs(
  creators: string[],
  cluster: Cluster,
  collectionName: string,
  collectionSymbol: string,
  uri: string,
  recipients: string[],
  treeAddress?: string,
  collectionSize?: number,
  owner?: string,
) {
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  // generate a new Keypair for testing, named `wallet`
  const testWallet = Keypair.generate();

  // generate a new keypair for use in this demo (or load it locally from the filesystem when available)
  const payer = loadWalletKey('mint.json');

  console.log('Payer address:', payer.publicKey.toBase58());
  console.log('Test wallet address:', testWallet.publicKey.toBase58());

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  // load the env variables and store the cluster RPC url
  let creator: PublicKey[];

  if (creators.length === 0) {
    creator = [payer.publicKey];
  } else {
    creator = creators.map((creatorString) => new PublicKey(creatorString));
  }

  console.log(creator);

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  // Check if the user passed in the cluster, defaults to devnet. Only Paid users can use mainet-beta
  let CLUSTER_URL;
  if (cluster === 'mainnet-beta') {
    CLUSTER_URL = clusterApiUrl('mainnet-beta');
  } else {
    // set the default cluster to devnet
    CLUSTER_URL = clusterApiUrl('devnet');
  }

  // create a new rpc connection, using the ReadApi wrapper
  const connection = new WrapperConnection(CLUSTER_URL, 'confirmed');

  // get the payer's starting balance (only used for demonstration purposes)
  initBalance = await connection.getBalance(payer.publicKey);

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  // const treePubkey = new PublicKey(
  //   'J12LTKYwfMmurbunJZQg8VLNgJjCpGK2HDU3mTXVSXGb',
  // );

  /*
        Define our tree size parameters
      */

  let treePubkey: PublicKey;
  if (!treeAddress) {
    const maxDepthSizePair: ValidDepthSizePair = {
      // max=16,384 nodes
      maxDepth: 14,
      maxBufferSize: 64,
    };
    const canopyDepth = maxDepthSizePair.maxDepth - 5;

    /*
          Actually allocate the tree on chain
        */

    // define the address the tree will live at
    const treeKeypair = Keypair.generate();
    ///////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////
    treePubkey = treeKeypair.publicKey;
    // create and send the transaction to create the tree on chain
    await createTree(
      connection,
      payer,
      treeKeypair,
      maxDepthSizePair,
      canopyDepth,
    );
  } else {
    try {
      treePubkey = new PublicKey(treeAuthority);
    } catch (error) {
      // Handle the error appropriately (e.g., log the error or throw a new error)
      console.error(
        'Error: The provided tree authority is not a valid public key.',
      );

      return 'Error: The provided tree authority is not a valid public key.';
      // throw new Error('The provided tree authority is not a valid public key.'); // Uncomment this line to throw a new error
    }
  }

  let recipient: PublicKey[];

  creator =
    recipient.length === 0
      ? [payer.publicKey]
      : recipients.map((recipientString) => new PublicKey(recipientString));

  console.log(creator);

  let ownerPubkey: PublicKey;
  if (owner) {
    try {
      ownerPubkey = new PublicKey(owner);
    } catch (err) {
      return 'The receiver address provided is a valid public key';
    }
  }

  /*
        Create the actual NFT collection (using the normal Metaplex method)
        (nothing special about compression here)
      */

  // define the metadata to be used for creating the NFT collection
  const collectionMetadataV3: CreateMetadataAccountArgsV3 = {
    data: {
      name: collectionName || 'NFT Collection',
      symbol: collectionSymbol || 'SSNC',
      // specific json metadata for the collection
      uri: uri || 'https://supersweetcollection.notarealurl/collection.json',
      sellerFeeBasisPoints: 100,
      creators: creator.map((creatorPublicKey) => ({
        address: creatorPublicKey,
        verified: false,
        share: 100 / creator.length,
      })),
      collection: null,
      uses: null,
    },
    isMutable: false,
    collectionDetails: null,
  };

  const collection = await createCollection(
    connection,
    payer,
    collectionMetadataV3,
    ownerPubkey,
    collectionSize,
  );

  const compressedNFTMetadata: MetadataArgs = {
    name: 'NFT Name',
    symbol: collectionMetadataV3.data.symbol,
    // specific json metadata for each NFT
    uri: uri || 'https://supersweetcollection.notarealurl/token.json',
    creators: creator.map((creatorPublicKey) => ({
      address: creatorPublicKey,
      verified: false,
      share: 100 / creator.length,
    })),
    editionNonce: 0,
    uses: null,
    collection: null,
    primarySaleHappened: false,
    sellerFeeBasisPoints: 0,
    isMutable: false,
    // these values are taken from the Bubblegum package
    tokenProgramVersion: TokenProgramVersion.Original,
    tokenStandard: TokenStandard.NonFungible,
  };

  // fully mint a single compressed NFT to the payer
  console.log(
    `Minting a single compressed NFT to ${payer.publicKey.toBase58()}...`,
  );

  const mint = await mintNFTsToMultipleRecipients(
    connection,
    payer,
    treePubkey,
    collection.mint,
    collection.metadataAccount,
    collection.masterEditionAccount,
    compressedNFTMetadata,
    // mint to this specific wallet (in this case, the tree owner aka `payer`
    recipient,
    ownerPubkey,
  );

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  // fetch the payer's final balance
  balance = await connection.getBalance(payer.publicKey);

  console.log(`==============================================================`);
  console.log(
    'Total cost:',
    numberFormatter((initBalance - balance) / LAMPORTS_PER_SOL, true),
    'SOL\n',
  );

  return mint;
}

const creators = [
  'Ehg4iYiJv7uoC6nxnX58p4FoN5HPNoyqKhCMJ65eSePk',
  '59RM2TCBLtkKqUzQa8FwesenJX4ZLM7BVVJtkTAy5v5X',
];

const treeAuthority = 'J12LTKYwfMmurbunJZQg8VLNgJjCpGK2HDU3mTXVSXGb';
const collectionName = 'CNFT';
const collectionSymbol = 'SNSS';
const uri = 'https://supersweetcollection.notarealurl/collection.json';
const recipients = [''];

// mintMultipleCNFTs(
//   creators,
//   'devnet',
//   collectionName,
//   collectionSymbol,
//   uri,
//   recipients,
//   treeAuthority,
// );
