require('dotenv').config(); // env data can now be accessed through process.env
const { ChainId, Token, TokenAmount, Fetcher, Pair, Route, Trade, TradeType, Percent } = require('@pancakeswap-libs/sdk');
const ethers = require('ethers');
const bscscan = require('bscscan-api');
const log = require('log-to-file');

const Web3 = require('web3');

// web3 instanc using ANKR MAINNET Binance Chain
const web3 = new Web3(process.env.ANKR_API);

const { JsonRpcProvider } = require('@ethersproject/providers');

// mainnet binance provider
const provider = new JsonRpcProvider('https://bsc-dataseed1.binance.org/');

// Fetching metamask address
const { address } = web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY);

const addresses = {
  B21: '0x70512c7f3d3009be997559d279b991461c451d70', // B21 token address
  BUSD: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', // Binance Wrapped USD (BUSD) address
  PANCAKE_ROUTER: '0x10ed43c718714eb63d5aa57b78b54704e256024e', // Pancake Router address v2
};

const ONE_ETH_IN_WEI = web3.utils.toBN(web3.utils.toWei('1'));
const tradeAmount = ONE_ETH_IN_WEI.div(web3.utils.toBN('1000'));

const getWalletTokenInfo = async (tokenAddress) => {
  const bscscanApi = await bscscan.init(process.env.BSCSCAN_API_KEY);

  // ABI
  const contractAbiFragmentResponse = await bscscanApi.contract.getabi(tokenAddress);
  const contractAbiFragment = await JSON.parse(contractAbiFragmentResponse.result);

  // Wallet
  let wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
  wallet = wallet.connect(provider);

  // Token Contract
  const contract = new ethers.Contract(tokenAddress, contractAbiFragment, wallet);

  // Token Name
  const tokenName = await contract.name();

  // Token Wallet Balance
  let balance = await contract.balanceOf(address);
  balance = web3.utils.fromWei(Number(balance).toString());

  // Token Symbol
  const symbol = await contract.symbol();

  return {
    tokenName,
    balance,
    symbol,
  };
};

const initSwapReverse = async () => {
  try {
    const b21TokenWalletInfo = await getWalletTokenInfo(addresses.B21);

    // Operation will terminate if B21 token balance is less min B21 specified
    if (Number(b21TokenWalletInfo.balance) < Number(process.env.MINIMUM_B21_IN_WALLET)) {
      console.warn(
        `${new Date().toLocaleString()} -> ⚠️  Swap our B21 for BUSD Operation is terminated because B21 token balance is less than ${
          process.env.MINIMUM_B21_IN_WALLET
        }`
      );

      // Enter entry in  log file
      log(
        `⚠️ Swap our B21 for BUSD Operation is terminated because B21 token balance is less than ${process.env.MINIMUM_B21_IN_WALLET}`,
        process.env.LOG_FILE_NAME
      );

      return;
    }

    const [B21, BUSD] = await Promise.all(
      [addresses.B21, addresses.BUSD].map((tokenAddress) => new Token(ChainId.MAINNET, tokenAddress, 18))
    );

    const pair = await Fetcher.fetchPairData(B21, BUSD, provider);
    const route = await new Route([pair], B21);
    const trade = await new Trade(route, new TokenAmount(B21, tradeAmount), TradeType.EXACT_INPUT);

    const slippageTolerance = new Percent('50', '10000');

    // create transaction parameters
    const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw;
    const path = [B21.address, BUSD.address];
    const to = address;
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20;

    // Create signer
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
    const signer = wallet.connect(provider);

    // Create Pancakeswap ethers Contract
    const pancakeswap = new ethers.Contract(
      addresses.PANCAKE_ROUTER,
      [
        'function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)',
      ],
      signer
    );

    // Allow Pancakeswap (Before executing the transaction Pancakeswap needs to be allowed)
    // const abi = ['function approve(address _spender, uint256 _value) public returns (bool success)'];
    // const contract = new ethers.Contract(B21.address, abi, signer);
    // await contract.approve(addresses.PANCAKE_ROUTER, ethers.utils.parseUnits('1000.0', 18), { gasLimit: 100000, gasPrice: 5e9 });

    // Execute transaction (Must be equal to MAXIMUM_B21_TO_SWAP or 100% of B21 wallet token must )
    const swapableB21TokenCount =
      Number(b21TokenWalletInfo.balance) > Number(process.env.MAXIMUM_B21_TO_SWAP)
        ? Number(process.env.MAXIMUM_B21_TO_SWAP)
        : Number(b21TokenWalletInfo.balance);
    const tx = await pancakeswap.swapExactTokensForTokens(
      ethers.utils.parseUnits(String(swapableB21TokenCount), 18),
      ethers.utils.parseUnits(web3.utils.fromWei(amountOutMin.toString()), 18),
      path,
      to,
      deadline,
      { gasLimit: ethers.utils.hexlify(200000), gasPrice: ethers.utils.parseUnits('10', 'gwei') }
    );

    console.log(`${new Date().toLocaleString()} -> 🔐  Swap our B21 for BUSD Tx-hash: ${tx.hash}`);

    const receipt = await tx.wait();

    console.info(`${new Date().toLocaleString()} -> 🔐  Swap our B21 for BUSD Tx was mined in block: ${receipt.blockNumber}`);

    log(`🔐 Swap B21 for BUSD: Transaction Hash: ${tx.hash}`, process.env.LOG_FILE_NAME);
  } catch (error) {
    console.error(`${new Date().toLocaleString()} -> 💀  Swap our B21 for BUSD ERROR: `, error);
  }
};

// initSwap
const initSwap = async (swapB21ForBusdTimeoutInterval) => {
  try {
    const busdTokenWalletInfo = await getWalletTokenInfo(addresses.BUSD);

    // Operation will terminate if BUSD balance is less than min BUSD specified
    if (Number(busdTokenWalletInfo.balance) < Number(process.env.MINIMUM_BUSD_IN_WALLET)) {
      console.warn(
        `${new Date().toLocaleString()} -> ⚠️  Swap our BUSD for B21 Operation is terminated because BUSD token balance is less than ${
          process.env.MINIMUM_BUSD_IN_WALLET
        }`
      );
      // Enter entry in  log file
      log(
        `⚠️ Swap our BUSD for B21 Operation is terminated because BUSD token balance is less than ${process.env.MINIMUM_BUSD_IN_WALLET}`,
        process.env.LOG_FILE_NAME
      );

      return;
    }

    const [B21, BUSD] = await Promise.all(
      [addresses.B21, addresses.BUSD].map((tokenAddress) => new Token(ChainId.MAINNET, tokenAddress, 18))
    );

    const pair = await Fetcher.fetchPairData(BUSD, B21, provider);
    const route = await new Route([pair], BUSD);
    const trade = await new Trade(route, new TokenAmount(BUSD, tradeAmount), TradeType.EXACT_INPUT);

    const slippageTolerance = new Percent('50', '10000');

    // create transaction parameters
    const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw;
    const path = [BUSD.address, B21.address];
    const to = address;
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20;

    // Create signer
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
    const signer = wallet.connect(provider);

    // Create Pancakeswap ethers Contract
    const pancakeswap = new ethers.Contract(
      addresses.PANCAKE_ROUTER,
      [
        'function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)',
      ],
      signer
    );

    // Allow Pancakeswap (Before executing the transaction Pancakeswap needs to be allowed)
    // const abi = ['function approve(address _spender, uint256 _value) public returns (bool success)'];
    // const contract = new ethers.Contract(B21.address, abi, signer);
    // await contract.approve(addresses.PANCAKE_ROUTER, ethers.utils.parseUnits('1000.0', 18), { gasLimit: 100000, gasPrice: 5e9 });

    // Execute transaction (80% of B21 wallet token must less than or equal to MAXIMUM_BUSD_TO_SWAP  )
    const eightyPercentOfBusdTokenBalance = Number(busdTokenWalletInfo.balance) * 80 * 0.01;
    const swapableBUSDTokenCount =
      eightyPercentOfBusdTokenBalance > Number(process.env.MAXIMUM_BUSD_TO_SWAP)
        ? Number(process.env.MAXIMUM_BUSD_TO_SWAP)
        : eightyPercentOfBusdTokenBalance;
    const tx = await pancakeswap.swapExactTokensForTokens(
      ethers.utils.parseUnits(String(swapableBUSDTokenCount), 18),
      ethers.utils.parseUnits(web3.utils.fromWei(amountOutMin.toString()), 18),
      path,
      to,
      deadline,
      { gasLimit: ethers.utils.hexlify(200000), gasPrice: ethers.utils.parseUnits('10', 'gwei') }
    );

    console.info(`${new Date().toLocaleString()} -> 🔐  Swap our BUSD for B21: Tx-hash: ${tx.hash}`);

    const receipt = await tx.wait();

    console.info(`${new Date().toLocaleString()} -> 🔐  Swap our BUSD for B21: Tx was mined in block: ${receipt.blockNumber}`);

    log(`🔐 Swap our BUSD for B21: Transaction Hash: ${tx.hash}`, process.env.LOG_FILE_NAME);

    if (tx.hash) {
      setTimeout(() => {
        initSwapReverse();
      }, swapB21ForBusdTimeoutInterval);
    }
  } catch (error) {
    console.error(`${new Date().toLocaleString()} -> 💀  Swap our BUSD for B21 ERROR: `, error);
  }
};

const tick = async (config) => {
  initSwap(config.swapB21ForBusdTimeoutInterval);
};

const run = () => {
  const config = {
    tickInterval: 1000 * 60 * 30, // tickInterval - 1000 * 60 * 30 milliseconds (i.e., 30 mins)
    swapB21ForBusdTimeoutInterval: 1000 * 60 * 5, // swapB21ForBusdTimeoutInterval - 1000 * 60 * 5 milliseconds (i.e., 5 mins)
  };

  tick(config);
  setInterval(tick, config.tickInterval, config); // Runs continuously
};

run();
