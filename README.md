Certainly! Here's the markdown code for your Mynt Solana NFT marketplace add-on API endpoints formatted properly:

```markdown
# Mynt Solana NFT Marketplace Add-On

## Endpoints

### CreateTree

**Parameters:**
- `Network` (String): "devnet"
- `treeAuthority` (String): "walletAddress"
- `max_depth_size_pair` (Optional Object): 
  - `max_depth` (Number): 14
  - `max_buffer_size` (Number): 64

**Payload:**
```json
const raw = JSON.stringify({
  "network": "devnet",
  "wallet_address": "5KW2twHzRsAaiLeEx4zYNV35CV2hRrZGw7NYbwMfL4a2",
  "max_depth_size_pair": {
    "max_depth": 14,
    "max_buffer_size": 64
  },
  "canopy_depth": 10,
  "fee_payer": "3yTKSCKoDcjBFpbgxyJUh4cM1NG77gFXBimkVBx2hKrf"
});
```

### MintOneCNFT

**Parameters:**
- `receiverWallet` (String)
- `MetaData` (Object)

**Payload:**
```json
var raw = JSON.stringify({
  "network": "devnet",
  "creator_wallet": "5KW2twHzRsAaiLeEx4zYNV35CV2hRrZGw7NYbwMfL4a2",
  "metadata_uri": "https://gateway.pinata.cloud/ipfs/QmYmUb5MHZwYovnQg9qANTJUi7R8VaE5CetfssczaSWn5K",
  "merkle_tree": "598xSRemX9f6RicvdYsUeuxRHs83KqEBbGGRJbPCg9f2",
  "is_delegate_authority": true,
  "collection_address": "5wwUuKaTrLWygZEQ1tCRC1uJFthG5pa17ArwpwApNAiw",
  "max_supply": 1,
  "primary_sale_happend": true,
  "is_mutable": true,
  "receiver": "BFefyp7jNF5Xq2A4JDLLFFGpxLq5oPEFKBAQ46KJHW2R",
  "fee_payer": "3yTKSCKoDcjBFpbgxyJUh4cM1NG77gFXBimkVBx2hKrf"
});
```

### TransferCNFT

**Payload:**
```json
const raw = JSON.stringify({
  "network": "devnet",
  "nft_address": "G4EpMRJirDGFcyq7eR9VZ31nPgDhKLpD3HjpZ8GXTzVm",
  "sender": "BFefyp7jNF5Xq2A4JDLLFFGpxLq5oPEFKBAQ46KJHW2R",
  "receiver": "2fmz8SuNVyxEP6QwKQs6LNaT2ATszySPEJdhUDesxktc"
});
```

### BurnCNFT

**Payload:**
```json
var raw = JSON.stringify({
  "network": "devnet",
  "nft_address": "G4EpMRJirDGFcyq7eR9VZ31nPgDhKLpD3HjpZ8GXTzVm",
  "wallet_address": "BFefyp7jNF5Xq2A4JDLLFFGpxLq5oPEFKBAQ46KJHW2R"
});
```

### ReadAllCNFTsByOwner

**Parameters:**
- `walletAddress` (String)
- `network` (String): "devnet"
- `CollectionAddress` (Optional)

### ReadCNFT

**Parameters:**
- `network` (String)
- `NftAddress` (String)

### Coming Soon

### TransferMany

**Parameters:**

### VerifyCollection
```

I've reformatted the markdown to make it easier to read and understand. If you have any further questions or need additional assistance, please let me know!
```
