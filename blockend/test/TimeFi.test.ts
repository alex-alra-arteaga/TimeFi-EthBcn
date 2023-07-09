import { ethers } from "hardhat"
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { TimeFiCore__factory, UniswapV2Factory__factory, WXDC__factory, TimeFiIssuerAccount__factory, TimeFiToken__factory, TimeFiTokenFactory__factory, TimeFiIssuerAccountFactory__factory } from "../typechain";
import { expect } from "chai";

const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const INFURA_API_KEY = process.env.INFURA_API_KEY || "";
const mainnetWXDC = "0x951857744785E80e2De051c32EE7b25f9c458C42";
const testnetWXDC = "0xc039850f937c623024da66d6df370022e6f16e30";
const testnetFactory = "0xCae66ac135d6489BDF5619Ae8F8f1e724765eb8f"
const testnetRouter = "0x3F11A24EB45d3c3737365b97A996949dA6c2EdDf";
const mainnetFactory = "0x347D14b13a68457186b2450bb2a6c2Fd7B38352f";
const mainnetRouter = "0xf9c5E4f6E627201aB2d6FB6391239738Cf4bDcf9";

async function TimeFiFixture() {
  const [owner, user, withdrawer, xSwapOwner] = await ethers.getSigners();

  const tmpxSwapFactoryFactoryFactory = (await ethers.getContractFactory(
      "UniswapV2Factory", xSwapOwner
  )) as UniswapV2Factory__factory;

  const xSwapV2Factory = await tmpxSwapFactoryFactoryFactory.deploy(
    xSwapOwner.address
  );

  //const tmpWXDCFactory = (await ethers.getContractFactory(
  //    "WXDC", owner
  //)) as WXDC__factory;

  //const wxdc = await tmpWXDCFactory.deploy();

  const tmpTimeFiTokenFactory = (await ethers.getContractFactory(
      "TimeFiToken", owner
  )) as TimeFiToken__factory;

  const timeFiToken = await tmpTimeFiTokenFactory.deploy();

  const tmpTimeFiIssuerAccountFactory = (await ethers.getContractFactory(
      "TimeFiIssuerAccount", owner
  )) as TimeFiIssuerAccount__factory;

  const timeFiIssuerAccount = await tmpTimeFiIssuerAccountFactory.deploy();

  const tmpTimeFiTokenFactoryFactory = (await ethers.getContractFactory(
      "TimeFi__TokenFactory", owner
  )) as TimeFiTokenFactory__factory;

  const timeFiTokenFactory = await tmpTimeFiTokenFactoryFactory.deploy(timeFiToken.address);

  const tmpTimeFiIssuerAccountFactoryFactory = (await ethers.getContractFactory(
      "TimeFi__IssuerAccountFactory", owner
  )) as TimeFiIssuerAccountFactory__factory;

  const timeFiIssuerAccountFactory = await tmpTimeFiIssuerAccountFactoryFactory.deploy(timeFiIssuerAccount.address);

  const tmpTimeFiCoreFactory = (await ethers.getContractFactory(
    "TimeFiCore", owner
  )) as TimeFiCore__factory;

  const timeFiCore = await tmpTimeFiCoreFactory.deploy(xSwapV2Factory.address, testnetRouter,testnetWXDC, timeFiTokenFactory.address, timeFiIssuerAccountFactory.address);

  return {owner, user, withdrawer, timeFiCore, timeFiToken, timeFiIssuerAccount, timeFiTokenFactory, timeFiIssuerAccountFactory, testnetWXDC, xSwapV2Factory};
}

describe("TimeFi", function () {

  describe("CoreDeployment", function () {
    it("Should deploy TimeFiCore", async function () {
      const { timeFiCore, xSwapV2Factory } = await loadFixture(TimeFiFixture);
      expect(await timeFiCore.xSwapFactory()).to.equal(xSwapV2Factory.address);
      expect(await timeFiCore.wrappedXDC()).to.equal(testnetWXDC);
    });

    it("Should deploy and initialize TimeFiToken", async function () {
      const { timeFiToken } = await loadFixture(TimeFiFixture);
      await timeFiToken.initializeToken("TimeFi", "TIMEFI", 3);
      expect(await timeFiToken.name()).to.equal("TimeFi");
      expect(await timeFiToken.symbol()).to.equal("TIMEFI");
    });

    it("Should deploy and initialize TimeFiIssuerAccount", async function () {
      const { timeFiIssuerAccount, owner } = await loadFixture(TimeFiFixture);
      await timeFiIssuerAccount.connect(owner).initialize("Consultor Warren Buffett");
      expect(await timeFiIssuerAccount.name()).to.equal("Consultor Warren Buffett");
      expect(await timeFiIssuerAccount.owner()).to.equal(owner.address);
    });
    
  });

  describe("PeripheryDeployment", function () {
    it("Should deploy TimeFiTokenFactory", async function () {
      const { timeFiTokenFactory, timeFiToken } = await loadFixture(TimeFiFixture);
      expect(await timeFiTokenFactory.timeFiTokenImplementation()).to.equal(timeFiToken.address);
    });

    it("Should deploy TimeFiIssuerAccountFactory", async function () {
      const { timeFiIssuerAccountFactory, timeFiIssuerAccount } = await loadFixture(TimeFiFixture);
      expect(await timeFiIssuerAccountFactory.issuerAccountImplementation()).to.equal(timeFiIssuerAccount.address);
    });
  });

  describe("TokenFactory", function () {
    it("Should create a new TimeFiToken, which should have correct storage", async function () {
      const { timeFiTokenFactory, user } = await loadFixture(TimeFiFixture);
      await timeFiTokenFactory.connect(user).createToken("TimeFiTest", "TIMEFI", 3);
      const newTokenAddress = await timeFiTokenFactory.allTimeFiTokens(0);
      const newToken = await ethers.getContractAt("TimeFiToken", newTokenAddress);
      expect(await timeFiTokenFactory.issuerToToken(user.address)).to.equal(newTokenAddress);
      expect(await newToken.name()).to.equal("TimeFiTest");
    });
  });
});
