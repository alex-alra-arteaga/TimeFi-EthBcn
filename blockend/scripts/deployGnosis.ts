import { ethers } from "hardhat";
import { TimeFiCore__factory, UniswapV2Factory__factory, WXDC__factory, TimeFiIssuerAccount__factory, TimeFiToken__factory, TimeFiTokenFactory__factory, TimeFiIssuerAccountFactory__factory } from "../typechain";
import { Wallet } from "ethers";

const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const INFURA_API_KEY = process.env.INFURA_API_KEY || "";
const mainnetWETH = "0x951857744785E80e2De051c32EE7b25f9c458C42";
const mainnetUniswapFactory = "0xb52535fbABEd0a7DfCb2b5d92D39c9308DDf00b6";
const mainnetUniswapRouter = "0x90d62e06b711be223E79b9065eD52f1f2eE2db26";

const provider = new ethers.providers.JsonRpcProvider("https://rpc.chiadochain.net/");

async function main() {
  const options = { gasLimit: 30000000, gasPrice: ethers.utils.parseUnits('10', 'gwei') };
  // Dalex
  const ACCOUNT_1 = new ethers.Wallet(PRIVATE_KEY, provider);

  const tmpTimeFiTokenFactory = (await ethers.getContractFactory(
      "TimeFiToken",
  )) as TimeFiToken__factory;
  // Implementation for TimeFiTokenFactory
  const timeFiToken = await tmpTimeFiTokenFactory.deploy(options);
  console.log("TimeFiToken deployed to:", timeFiToken.address);
 await timeFiToken.deployed();

 const tmpTimeFiIssuerAccountFactory = (await ethers.getContractFactory(
      "TimeFiIssuerAccount",
  )) as TimeFiIssuerAccount__factory;

  // Implementation for TimeFiIssuerAccountFactory
  const timeFiIssuerAccount = await tmpTimeFiIssuerAccountFactory.deploy(options);
  console.log("TimeFiIssuerAccount deployed to:", timeFiIssuerAccount.address);
  await timeFiIssuerAccount.connect(ACCOUNT_1).deployed();
  const tmpTimeFiTokenFactoryFactory = (await ethers.getContractFactory(
      "TimeFi__TokenFactory",
  )) as TimeFiTokenFactory__factory;

  const timeFiTokenFactory = await tmpTimeFiTokenFactoryFactory.deploy(timeFiToken.address, options);
  console.log("TimeFiTokenFactory deployed to:", timeFiTokenFactory.address);
  await timeFiTokenFactory.deployed();
  const tmpTimeFiIssuerAccountFactoryFactory = (await ethers.getContractFactory(
      "TimeFi__IssuerAccountFactory",
  )) as TimeFiIssuerAccountFactory__factory;

  const timeFiIssuerAccountFactory = await tmpTimeFiIssuerAccountFactoryFactory.deploy(timeFiIssuerAccount.address, options);
  console.log("TimeFiIssuerAccountFactory deployed to:", timeFiIssuerAccountFactory.address);
  await timeFiIssuerAccountFactory.deployed();

  const tmpTimeFiCoreFactory = (await ethers.getContractFactory(
      "TimeFiCore",
  )) as TimeFiCore__factory;
  
  const timeFiCore = await tmpTimeFiCoreFactory.deploy(mainnetUniswapFactory, mainnetUniswapRouter, mainnetWETH, timeFiTokenFactory.address, timeFiIssuerAccountFactory.address, options);
  await timeFiCore.deployed();

  await timeFiIssuerAccount.connect(ACCOUNT_1).setFactoryAndCore(timeFiTokenFactory.address, timeFiCore.address, options);
  //const tx = await

  console.log("TimeFiCore deployed to:", timeFiCore.address);
  console.log("TimeFiToken deployed to:", timeFiToken.address);
  console.log("TimeFiIssuerAccount deployed to:", timeFiIssuerAccount.address);
  console.log("TimeFiTokenFactory deployed to:", timeFiTokenFactory.address);
  console.log("TimeFiIssuerAccountFactory deployed to:", timeFiIssuerAccountFactory.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
