/**
 * Demonstrate the use of the Metaplex Read DAS API methods,
 * (needed to fetch compressed NFTs)
 */

// local import of the connection wrapper, to help with using the ReadApi
import { WrapperConnection } from '../ReadApi/WrapperConnection';

// import custom helpers for demos
import { printConsoleSeparator, savePublicKeyToFile } from './helpers';

// imports from other libraries
import { PublicKey, clusterApiUrl } from '@solana/web3.js';

export async function fetchByCNFT(
  assetId: string,
): Promise<any> {
  // load the stored PublicKeys for ease of use

//   const owner = new PublicKey(`${ownerBase58}`);
//   
  const cnft = new PublicKey(assetId)
  console.log(cnft)

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  // load the env variables and store the cluster RPC url
  const CLUSTER_URL = process.env.RPC_URL ?? clusterApiUrl('devnet');

  // create a new rpc connection, using the ReadApi wrapper
  const connection = new WrapperConnection(
    'https://devnet.helius-rpc.com/?api-key=d7e73515-c3a0-4f6c-a8a9-88306b028fbf',
  );

  // get all the assets owned by the specific address
   printConsoleSeparator(`Getting all assets by owner ${cnft.toBase58()}...`);


  const result = await connection
    .getAssetProof(cnft)
    // .then((res: any) => {
    //   console.log('Total assets returned:', res.total);

    //   // loop over each of the asset items in the collection
    // result = res.items?.map((asset: any) => {
    //     // only show compressed nft assets
    //     if (!asset.compression.compressed) return;

    //     // display a spacer between each of the assets
    //     // console.log('\n===============================================');

    //     // extra useful info
    //     // console.log('assetId:', asset.id);

    //     // view the ownership info for the given asset
    //     // console.log('ownership:', asset.ownership);

    //     // metadata json data (auto fetched thanks to the Metaplex Read API)
    //     // console.log("metadata:", asset.content.metadata);

    //     // view the compression specific data for the given asset
    //     // console.log('compression:', asset.compression);

    //     // if (asset.compression.compressed) {
    //     //   console.log('==> This NFT is compressed! <===');
    //     //   console.log('\tleaf_id:', asset.compression.leaf_id);
    //     // } else console.log('==> NFT is NOT compressed! <===');
    //   });
    // });
    
    return result
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  // get the latest NFT owned by the `userAddress`
//   printConsoleSeparator(
//     `Getting latest assets by owner ${owner.toBase58()}...`,
//   );

//   await connection
//     .getAssetsByOwner({
//       ownerAddress: owner.toBase58(),
//       sortBy: {
//         sortBy: 'recent_action',
//         sortDirection: 'asc',
//       },
//     })
//     .then((res: { total: any; items: any[] }) => {
//       console.log('Total assets returned:', res.total);

      // search for NFTs from the same tree
      //   res.items
      //     ?.filter((asset) => asset.compression.tree === treeAddress.toBase58())
      //     .map((asset) => {
      //       // display some info about the asset
      //       console.log('assetId:', asset.id);
      //       console.log('ownership:', asset.ownership);
      //       console.log('compression:', asset.compression);

      //       // save the newest assetId locally for the demo
      //       if (asset.compression.tree === treeAddress.toBase58())
      //         savePublicKeyToFile('assetIdUserAddress', new PublicKey(asset.id));
      //     });
    //});
}