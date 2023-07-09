// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";
import "../mocks/DEX/interfaces/IUniswapV2Factory.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";
import "../mocks/wXDC/wXDC.sol";
import "../periphery/IssuerAccountFactory.sol";
import "../periphery/TimeFiTokenFactory.sol";
import "../mocks/DEX/interfaces/IUniswapV2Pair.sol";
import "../mocks/DEX/interfaces/IUniswapV2Router02.sol";
import "../mocks/wXDC/IwXDC.sol";

contract TimeFiCore {
    using Clones for address;

    IUniswapV2Factory immutable public xSwapFactory;
    IUniswapV2Router02 immutable public xSwapRouter;
    address immutable public wrappedXDC;
    TimeFi__IssuerAccountFactory immutable public issuerAccountFactory;
    TimeFi__TokenFactory immutable public tokenFactory;

    address[] public allTokensPairs;

    // Testnet
    // Factory: 0xCae66ac135d6489BDF5619Ae8F8f1e724765eb8f
    // Router: 0x3F11A24EB45d3c3737365b97A996949dA6c2EdDf
    // Mainnet
    // Factory: 0x347D14b13a68457186b2450bb2a6c2Fd7B38352f
    // Router: 0xf9c5E4f6E627201aB2d6FB6391239738Cf4bDcf9

    // Wrapped XDC: 0x951857744785E80e2De051c32EE7b25f9c458C42
    // testnet: xdcc039850f937c623024da66d6df370022e6f16e30
    constructor(address _xSwapFactory, address _uniswapRouter, address _wrappedXDC, address _tokenFactory, address _issuerAccountFactory) {
        xSwapFactory = IUniswapV2Factory(_xSwapFactory);
        xSwapRouter = IUniswapV2Router02(_uniswapRouter);
        wrappedXDC = _wrappedXDC;
        issuerAccountFactory = TimeFi__IssuerAccountFactory(_issuerAccountFactory);
        tokenFactory = TimeFi__TokenFactory(_tokenFactory);
    }

    // create xSwap pair from the Issuer Token to Wrapped XDC
    function createPair(address issuerToken) external {
        address pair = xSwapFactory.createPair(issuerToken, wrappedXDC);
        allTokensPairs.push(pair);
    }

    // add liquidity to UniswapV2
    function addLiquidity(address issuerToken, uint amountIssuerToken, uint amountWXDC, uint amountIssuerTokenMin, uint amountWXDCMin) external {
        xSwapRouter.addLiquidity(
            issuerToken,
            wrappedXDC,
            amountIssuerToken,
            amountWXDC,
            amountIssuerTokenMin,
            amountWXDCMin,
            msg.sender,
            block.timestamp + 5 minutes
        );
    }

    function quote(uint amountA, uint reserveA, uint reserveB) internal pure returns (uint amountB) {
        require(amountA > 0, 'UniswapV2Library: INSUFFICIENT_AMOUNT');
        require(reserveA > 0 && reserveB > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        amountB = amountA * (reserveB) / reserveA;
    }

    // Susceptible to price volatility due to low liquidity in xSwap Protocols
    function _getOracleQuote(uint256 amount, address issuerToken) public view returns (uint256) {
        address pair = xSwapFactory.getPair(issuerToken, wrappedXDC);
        (uint256 reserve0, uint256 reserve1, ) = IUniswapV2Pair(pair).getReserves();
        if (IUniswapV2Pair(pair).token0() == issuerToken) {
            return quote(amount, reserve0, reserve1);
        } else {
            return quote(amount, reserve1, reserve0);
        }
    }
}