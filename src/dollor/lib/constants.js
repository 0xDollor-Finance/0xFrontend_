import BigNumber from 'bignumber.js/bignumber'

export const SUBTRACT_GAS_LIMIT = 100000

const ONE_MINUTE_IN_SECONDS = new BigNumber(60)
const ONE_HOUR_IN_SECONDS = ONE_MINUTE_IN_SECONDS.times(60)
const ONE_DAY_IN_SECONDS = ONE_HOUR_IN_SECONDS.times(24)
const ONE_YEAR_IN_SECONDS = ONE_DAY_IN_SECONDS.times(365)

export const INTEGERS = {
  ONE_MINUTE_IN_SECONDS,
  ONE_HOUR_IN_SECONDS,
  ONE_DAY_IN_SECONDS,
  ONE_YEAR_IN_SECONDS,
  ZERO: new BigNumber(0),
  ONE: new BigNumber(1),
  ONES_31: new BigNumber('4294967295'), // 2**32-1
  ONES_127: new BigNumber('340282366920938463463374607431768211455'), // 2**128-1
  ONES_255: new BigNumber(
    '115792089237316195423570985008687907853269984665640564039457584007913129639935',
  ), // 2**256-1
  INTEREST_RATE_BASE: new BigNumber('1e18'),
}

export const addressMap = {
  uniswapFactory: '0xc0a47dFe034B400B47bDaD5FecDa2621de6c4d95',
  uniswapFactoryV2: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
  YFI: '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e',
  YCRV: '0xdF5e0e81Dff6FAF3A7e52BA697820c5e32D806A8',
  UNIAmpl: '0xc5be99a02c6857f9eac67bbce58df5572498f40c',
  WETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  UNIRouter: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
  LINK: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
  MKR: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
  SNX: '0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F',
  COMP: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
  LEND: '0x80fB784B7eD66730e8b1DBd9820aFD29931aab03',
  SUSHIYCRV: '0x2C7a51A357d5739C5C74Bf3C96816849d2c9F726',
}

export const contractAddresses = {
  dollor: {//coin contract
    1: '0x34870322F473830d28D28BEf7F1D4178edF832d8',
    3: '0x1708bA96D1B9724cf88D1ea5F77153C82F42Fc80',
  },
  masterChef: {
    1: '0x62e63084f2f796ca40b35e958dd0c0ed6020a281',//need to change
    3: '0x200e5aFBf77B69112Dd67F5754D9A200cC61931E',
  },
  weth: {
    1: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    3: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  },
}

/*
UNI-V2 LP Address on mainnet for reference
==========================================
0  USDT 0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852
1  USDC 0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc
2  DAI  0xa478c2975ab1ea89e8196811f51a7b7ade33eb11
3  sUSD 0xf80758ab42c3b07da84053fd88804bcb6baa4b5c
4  COMP 0xcffdded873554f362ac02f8fb1f02e5ada10516f
*/
//where the farms get set
export const supportedPools = [
  {//dollor
    pid: 4,
    lpAddresses: {
      1: '0x29777da560f6d4d2da7f20b0190275bcf06cea93',//need to update
      3: '0x86Dc8F4678fF1F1D94C9a1E3412d786C30d732E7',
    },
    tokenAddresses: {
      1: '0x34870322F473830d28D28BEf7F1D4178edF832d8',
      3: '0x1708bA96D1B9724cf88D1ea5F77153C82F42Fc80',
    },
    name: '0xDollar Dreams',
    symbol: '0xDOLLAR-ETH UNI-V2 LP',
    tokenSymbol: '0xDOLLAR',
    icon: '11',
  },
  {// usdc
    pid: 1,
    lpAddresses: {
      1: '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc',
      3: '0xC6E52Cc55F0A2F445537984D7ed403aFddA0BF8E',
    },
    tokenAddresses: {
      1: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      3: '0x1858E65632D72FDB3c3593478304Bb5545016749',
    },
    name: '0xDollar Robot',
    symbol: 'USDC-ETH UNI-V2 LP',
    tokenSymbol: 'USDC',
    icon: '22',
  },
  { // dai
    pid: 2,
    lpAddresses: {
      1: '0xa478c2975ab1ea89e8196811f51a7b7ade33eb11',
      3: '0xbDF4Bcd3A2C07d7C6521dB334F124970B4236fad',
    },
    tokenAddresses: {
      1: '0x6b175474e89094c44da98b954eedeac495271d0f',
      3: '0x795FD662A60E46BEA064e30c50fe70e92eb167a0',
    },
    name: "0xDollar Crazy",
    symbol: 'DAI-ETH UNI-V2 LP',
    tokenSymbol: 'DAI',
    icon: '33',
  },
  {//susd
    pid: 3,
    lpAddresses: {
      1: '0xf80758ab42c3b07da84053fd88804bcb6baa4b5c',
      3: '0x2DF7A2838766c043fc01dbe0d5e646a10241A229',
    },
    tokenAddresses: {
      1: '0x57ab1ec28d129707052df4df418d58a2d46d5f51',
      3: '0x695b13461271aaeB6Cdef33FD7185F2f19EE202E',
    },
    name: '0xDollar Frog',
    symbol: 'SUSD-ETH UNI-V2 LP',
    tokenSymbol: 'SUSD',
    icon: '44',
  },
  {//tether
    pid: 0,
    lpAddresses: {
      1: '0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852',
      3: '0xd1749cD50F243Dcd6adF095413ED31891BFb2C7b',
    },
    tokenAddresses: {
      1: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      3: '0x2b6201d5C8B2638D2cF85084734897844fD677E9',
    },
    name: '0xDollar Sunshine',
    symbol: 'USDT-ETH UNI-V2 LP',
    tokenSymbol: 'USDT',
    icon: '55',
  },
]
