export const SCROLL_TIMEFICORE_ADDRESS =
  "0x46233255E2454FBb86489c2eb60e21AbFf2565de";
export const SCROLL_TIMEFITOKEN_ADDRESS =
  "0xe76B601EEE6E3EF3D7aEF177047B3e10DC37A561";
export const SCROLL_TIMEFIISSUERACCOUNT_ADDRESS =
  "0xd46B303548149Aa5539442fd0cbE6F8F41DB3706";
export const SCROLL_TIMEFITOKENFACTORY_ADDRESS =
  "0xBb587320C4A00abDe1648421648D0Cb4305c193c";
export const SCROLL_TIMEFIISSUERACCOUNTFACTORY_ADDRESS =
  "0x8B19AfD24d9c02d394154321389Cef1bC2A3cff3";

export const XDC_TESTNET_TIMEFI_CORE_ADDRESS =
  "0x2c678c775E706cA552016C9c447983167463124a";
export const XDC_TESTNET_TIMEFI_TOKEN_ADDRESS =
  "0xf6c41de1Cb1C468cEf1F012b6B234Edb5520d22F";
export const XDC_TESTNET_TIMEFI_ISSUERACCOUNT_ADDRESS =
  "0xA6371a12fE38d03c36b5b6F1FC498A4b7AbBFd2c";
export const XDC_TESTNET_TIMEFI_TOKENFACTORY_ADDRESS =
  "0x60C9729Fe8ebA284cfB54B014AfA2d71D7E8f0F7";
export const XDC_TESTNET_TIMEFI_ISSUERACCOUNTFACTORY_ADDRESS =
  "0x75bAD9C79AfcbF16D6442AdA858AD6f9464aB0F8";

export const XDC_MAINNET_TIMEFI_CORE_ADDRESS = "0x8B19AfD24d9c02d394154321389Cef1bC2A3cff3"
export const XDC_MAINNET_TIMEFITOKEN_ADDRESS = "0xe3d5cA6861A5cABD30AAAF78333b0Cc7Ea809DFF"
export const XDC_MAINNET_TIMEFIISSUERACCOUNT_ADDRESS = "0xe76B601EEE6E3EF3D7aEF177047B3e10DC37A561"
export const XDC_MAINNET_TIMEFI_ISSUERACCOUNTFACTORY_ADDRESS = "0xBb587320C4A00abDe1648421648D0Cb4305c193c"
export const XDC_MAINNET_TIMEFI_TOKENFACTORY_ADDRESS = "0xd46B303548149Aa5539442fd0cbE6F8F41DB3706"

export const GNOSIS_TESTNET_TIMEFI_CORE_ADDRESS = "0x75bAD9C79AfcbF16D6442AdA858AD6f9464aB0F8"
export const GNOSIS_TESTNET_TIMEFI_TOKEN_ADDRESS = "0xF3Fe973f3Bd3d6ac17A75103c808c375eA74FBFc"
export const GNOSIS_TESTNET_TIMEFI_ISSUERACCOUNT_ADDRESS = "0xf6c41de1Cb1C468cEf1F012b6B234Edb5520d22F"
export const GNOSIS_TESTNET_TIMEFI_TOKENFACTORY_ADDRESS = "0xA6371a12fE38d03c36b5b6F1FC498A4b7AbBFd2c"
export const GNOSIS_TESTNET_TIMEFI_ISSUERACCOUNTFACTORY_ADDRESS = "0x60C9729Fe8ebA284cfB54B014AfA2d71D7E8f0F7"

export const IssuerAccount_FactoryAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_issuerAccountImplementation",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "allIssuerAccounts",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    name: "createIssuerAccount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "issuerAccountImplementation",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "issuerToAccount",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export const TimeFiToken_FactoryAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_timeFiTokenImplementation",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "allTimeFiTokens",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "customizedToken",
        type: "address",
      },
      {
        internalType: "string",
        name: "_issuerName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_issuerSymbol",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_fixedPrice",
        type: "uint256",
      },
    ],
    name: "createCustomizedToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_issuerName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_issuerSymbol",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_fixedPrice",
        type: "uint256",
      },
    ],
    name: "createToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "issuerToToken",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "timeFiTokenImplementation",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export const TimeFi_Token_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "TokenCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "TIME_REPRESENTATION",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "burnRate",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "burnTimeTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "fixedPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_issuerName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_issuerSymbol",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_fixedPrice",
        type: "uint256",
      },
    ],
    name: "initializeToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "issuer",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lastTimeMinted",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mintTime",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "royaltyPercentage",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_fixedPrice",
        type: "uint256",
      },
    ],
    name: "setFixedPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_royaltyPercentage",
        type: "uint256",
      },
    ],
    name: "setRoyalties",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "slashRate",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "slashTimeTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

  export const TimeFiCoreABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_xSwapFactory",
        type: "address",
      },
      {
        internalType: "address",
        name: "_uniswapRouter",
        type: "address",
      },
      {
        internalType: "address",
        name: "_wrappedXDC",
        type: "address",
      },
      {
        internalType: "address",
        name: "_tokenFactory",
        type: "address",
      },
      {
        internalType: "address",
        name: "_issuerAccountFactory",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "issuerToken",
        type: "address",
      },
    ],
    name: "_getOracleQuote",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "issuerToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountIssuerToken",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountWXDC",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountIssuerTokenMin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountWXDCMin",
        type: "uint256",
      },
    ],
    name: "addLiquidity",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "allTokensPairs",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "issuerToken",
        type: "address",
      },
    ],
    name: "createPair",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "issuerAccountFactory",
    outputs: [
      {
        internalType: "contract TimeFi__IssuerAccountFactory",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenFactory",
    outputs: [
      {
        internalType: "contract TimeFi__TokenFactory",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "wrappedXDC",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "xSwapFactory",
    outputs: [
      {
        internalType: "contract IUniswapV2Factory",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "xSwapRouter",
    outputs: [
      {
        internalType: "contract IUniswapV2Router02",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;
