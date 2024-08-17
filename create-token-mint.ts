import { createMint } from "@solana/spl-token";
import "dotenv/config";
import {
  getExplorerLink,
} from "@solana-developers/helpers";
import { Connection, Keypair, clusterApiUrl } from "@solana/web3.js";
 
const connection = new Connection(clusterApiUrl("devnet"));
 
const byteArray = JSON.parse(process.env.SECRET_KEY as string);

const secretKey = Uint8Array.from(byteArray);

const payer = Keypair.fromSecretKey(secretKey);
 
console.log(
  `🔑 Loaded our keypair securely, using an env file! Our public key is: ${payer.publicKey.toBase58()}`,
);
 
// This is a shortcut that runs:
// SystemProgram.createAccount()
// token.createInitializeMintInstruction()
// See https://www.soldev.app/course/token-program
const tokenMint = await createMint(connection, payer, payer.publicKey, null, 2);
 
const link = getExplorerLink("address", tokenMint.toString(), "devnet");
 
console.log(`✅ Finished! Created token mint: ${link}`);