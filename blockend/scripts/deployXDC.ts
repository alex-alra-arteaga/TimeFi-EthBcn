import { ethers } from "hardhat";
import { TimeFiCore__factory, UniswapV2Factory__factory, WXDC__factory, TimeFiIssuerAccount__factory, TimeFiToken__factory, TimeFiTokenFactory__factory, TimeFiIssuerAccountFactory__factory } from "../typechain";
import { Wallet } from "ethers";

const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const INFURA_API_KEY = process.env.INFURA_API_KEY || "";
const mainnetWXDC = "0x951857744785E80e2De051c32EE7b25f9c458C42";
const testnetWXDC = "0xc039850f937c623024da66d6df370022e6f16e30";
const testnetFactory = "0xCae66ac135d6489BDF5619Ae8F8f1e724765eb8f"
const testnetRouter = "0x3F11A24EB45d3c3737365b97A996949dA6c2EdDf";
const mainnetFactory = "0x347D14b13a68457186b2450bb2a6c2Fd7B38352f";
const mainnetRouter = "0xf9c5E4f6E627201aB2d6FB6391239738Cf4bDcf9";

const provider = new ethers.providers.JsonRpcProvider("https://erpc.xinfin.network/");

async function main() {
  const options = { gasLimit: 400000000, gasPrice: ethers.utils.parseUnits('5', 'gwei') };
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
  const timeFiIssuerAccount = await tmpTimeFiIssuerAccountFactory.connect(ACCOUNT_1).deploy(options);
  console.log("TimeFiIssuerAccount deployed to:", timeFiIssuerAccount.address);
  await timeFiIssuerAccount.deployed();
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

  const timeFiCore = await tmpTimeFiCoreFactory.deploy(mainnetFactory, mainnetRouter, mainnetWXDC, timeFiTokenFactory.address, timeFiIssuerAccountFactory.address, options);
  await timeFiCore.deployed();

  await timeFiIssuerAccount.connect(ACCOUNT_1).setFactoryAndCore(timeFiTokenFactory.address, timeFiCore.address, options);

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
