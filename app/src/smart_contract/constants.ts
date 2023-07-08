export const SCROLL_TIMEFICORE_ADDRESS = "0x46233255E2454FBb86489c2eb60e21AbFf2565de"
export const SCROLL_TIMEFITOKEN_ADDRESS = "0xe76B601EEE6E3EF3D7aEF177047B3e10DC37A561"
export const SCROLL_TIMEFIISSUERACCOUNT_ADDRESS = "0xd46B303548149Aa5539442fd0cbE6F8F41DB3706"
export const SCROLL_TIMEFITOKENFACTORY_ADDRESS = "0xBb587320C4A00abDe1648421648D0Cb4305c193c"
export const SCROLL_TIMEFIISSUERACCOUNTFACTORY_ADDRESS = "0x8B19AfD24d9c02d394154321389Cef1bC2A3cff3"

export const XDC_TESTNET_TIMEFI_CORE_ADDRESS = "0x2c678c775E706cA552016C9c447983167463124a"
export const XDC_TESTNET_TIMEFI_TOKEN_ADDRESS = "0xf6c41de1Cb1C468cEf1F012b6B234Edb5520d22F"
export const XDC_TESTNET_TIMEFI_ISSUERACCOUNT_ADDRESS = "0xA6371a12fE38d03c36b5b6F1FC498A4b7AbBFd2c"
export const XDC_TESTNET_TIMEFI_TOKENFACTORY_ADDRESS = "0x60C9729Fe8ebA284cfB54B014AfA2d71D7E8f0F7"
export const XDC_TESTNET_TIMEFI_ISSUERACCOUNTFACTORY_ADDRESS = "0x75bAD9C79AfcbF16D6442AdA858AD6f9464aB0F8"


export const IssuerAccount_FactoryAbi = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_issuerAccountImplementation",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "allIssuerAccounts",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        }
      ],
      "name": "createIssuerAccount",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "issuerAccountImplementation",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "issuerToAccount",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ] as const;

  export const TimeFiToken_FactoryAbi = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_timeFiTokenImplementation",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint8",
          "name": "version",
          "type": "uint8"
        }
      ],
      "name": "Initialized",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "allTimeFiTokens",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "customizedToken",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_issuerName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_issuerSymbol",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_fixedPrice",
          "type": "uint256"
        }
      ],
      "name": "createCustomizedToken",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_issuerName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_issuerSymbol",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_fixedPrice",
          "type": "uint256"
        }
      ],
      "name": "createToken",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "issuerToToken",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "timeFiTokenImplementation",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ] as const;