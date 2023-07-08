import { expect } from "chai";
import { Wallet } from "ethers"
import { ethers } from "hardhat"
import {config} from "dotenv";

const contractToken = "0x8dA38026f5bB57D20485299903858092AD9C9fBA"
config()

const PRIVATE_KEY = process.env.PRIVATE_KEY || ""
const provider = new ethers.providers.JsonRpcProvider("https://erpc.apothem.network");

async function main() {
    console.log("Provider: ", provider)
    const signer = new ethers.Wallet(PRIVATE_KEY, provider)
    console.log("Signer: ", signer)
    const contract = await ethers.getContractAt("EmitEvent", contractToken, signer)
    const tx = await contract.emitEvent()
    await tx.wait(1)
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});