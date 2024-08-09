import {
    Connection,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction,
    PublicKey,
    Keypair,
    clusterApiUrl
} from "@solana/web3.js";

import "dotenv/config.js";
// process.env coneverts the secret key to string and JSON.parse converts it to bytes
const byteArray = JSON.parse(process.env.SECRET_KEY as string);

//bytes which is present in the form of array to uint8
const secretKey = Uint8Array.from(byteArray);

// Keypair from the existing env file (my keypair)
const keypair = Keypair.fromSecretKey(secretKey);

const suppliedToPubKey = process.argv[2] || null;

if (!suppliedToPubKey) {
    console.log(`Please provide a public key`);
    process.exit(1);
}

console.log(`suppliedToPubKey: ${suppliedToPubKey}`);

const toPubKey = new PublicKey(suppliedToPubKey);

const connection = new Connection(clusterApiUrl("devnet"));

console.log(`Connected to Solana`);

//To complete transaction
const transaction = new Transaction();

//Amount to send
const LAMPORTS_TO_SEND = 5000;

const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: keypair.publicKey,
    toPubkey: toPubKey,
    lamports: LAMPORTS_TO_SEND,
});

transaction.add(sendSolInstruction);

const signature = await sendAndConfirmTransaction(connection, transaction, [
    keypair,
]);

console.log(
    `Sent ${LAMPORTS_TO_SEND} lamports to the address ${toPubKey}.`
);

console.log(`Transaction completed!🦖🦖 signature is ${signature}`);
