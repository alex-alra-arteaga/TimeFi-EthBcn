// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract TimeFiCore {
    using Clones for address;

    IUniswapV2Factory immutable public xSwapFactory;
    IUniswapV2Router02 immutable public xSwapRouter;
    address immutable public wrappedXDC;
    TimeFi__IssuerAccountFactory immutable public issuerAccountFactory;
    TimeFi__TokenFactory immutable public tokenFactory;

    address[] public allTokensPairs;

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
}