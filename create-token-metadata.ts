// This uses "@metaplex-foundation/mpl-token-metadata@2" to create tokens
import "dotenv/config";
import {
  getExplorerLink,
} from "@solana-developers/helpers";
import {
  Keypair,  
  Connection,
  clusterApiUrl,
  PublicKey,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import { createCreateMetadataAccountV3Instruction } from "@metaplex-foundation/mpl-token-metadata";
import { moveEmitHelpers } from "typescript";
 
// mother various bone squirrel mystery vibrant choose loan credit guess voice name
const byteArray = JSON.parse(process.env.SECRET_KEY as string);

const secretKey = Uint8Array.from(byteArray);


const payer = Keypair.fromSecretKey(secretKey);
 
const connection = new Connection(clusterApiUrl("devnet"));
 
console.log(
  `🔑 We've loaded our keypair securely, using an env file! Our public key is: ${payer.publicKey.toBase58()}`,
);
 
const TOKEN_METADATA_PROGRAM_ID = new PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
);
 
// Substitute in your token mint account
const tokenMintAccount = new PublicKey("9nteU7rQsi41bUGRUVNosHVJvaLN1wiDXLc6tMnwNqdg");
 
const metadataData = {
  name: "Token🪄",
  symbol: "TRAINING",
  // Arweave / IPFS / Pinata etc link using metaplex standard for offchain data
  uri: "https://arweave.net/1234",
  sellerFeeBasisPoints: 0,
  creators: null,
  collection: null,
  uses: null,
};
 
const metadataPDAAndBump = PublicKey.findProgramAddressSync(
  [
    Buffer.from("metadata"),
    TOKEN_METADATA_PROGRAM_ID.toBuffer(),
    tokenMintAccount.toBuffer(),
  ],
  TOKEN_METADATA_PROGRAM_ID,
);
 
const metadataPDA = metadataPDAAndBump[0];
 
const transaction = new Transaction();
 
const createMetadataAccountInstruction =
  createCreateMetadataAccountV3Instruction(
    {
      metadata: metadataPDA,
      mint: tokenMintAccount,
      mintAuthority: payer.publicKey,
      payer: payer.publicKey,
      updateAuthority: payer.publicKey,
    },
    {
      createMetadataAccountArgsV3: {
        collectionDetails: null,
        data: metadataData,
        isMutable: true,
      },
    },
  );
 
transaction.add(createMetadataAccountInstruction);
 
const transactionSignature = await sendAndConfirmTransaction(
  connection,
  transaction,
  [payer],
);
 
const transactionLink = getExplorerLink(
  "transaction",
  transactionSignature,
  "devnet",
);
 
console.log(`✅ Transaction confirmed, explorer link is: ${transactionLink}!`);
 
const tokenMintLink = getExplorerLink(
  "address",
  tokenMintAccount.toString(),
  "devnet",
);
 
console.log(`✅ Look at the token mint again: ${tokenMintLink}!`);