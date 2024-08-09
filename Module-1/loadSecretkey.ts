import dotenv from "dotenv";
import {Keypair} from "@solana/web3.js";

dotenv.config();

const byteArray = JSON.parse(process.env.SECRET_KEY as string);
const secretKey = Uint8Array.from(byteArray);
const keypair = Keypair.fromSecretKey(secretKey);

console.log(
    `We've loaded our secret key`,
);
