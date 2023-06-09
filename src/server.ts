//for pending transactions

// const ethers = require("ethers");
// const address = "0x816fe884C2D2137C4F210E6a1d925583fa4A917d";
// const mantleurl = "wss://ws.testnet.mantle.xyz";
// const polygonurl = "wss://polygon-mainnet.g.alchemy.com/v2/s5BwByPukIVosEOZEfXU68neTN4WsDOy";
// const init = function () {
  
//   const customWsProvider = new ethers.WebSocketProvider(polygonurl);

//   customWsProvider.on("pending", (tx : string) => {
//     customWsProvider.getTransaction(tx).then(function (transaction : any) {
//       if(transaction !== null)
//       {
//         if (transaction.from == address || transaction.to == address) {
//           console.log(transaction);
//         }
//       }
//     });
//   });
// };
// init();


//for confirmed transactions

import { ethers } from 'ethers';
const provider = new ethers.WebSocketProvider('wss://polygon-mainnet.g.alchemy.com/v2/s5BwByPukIVosEOZEfXU68neTN4WsDOy');
const address = "0x816fe884C2D2137C4F210E6a1d925583fa4A917d";
async function getConfirmedTransactionDetails(txHash: string) {
  const tx = await provider.getTransaction(txHash);
  if (tx && tx.blockNumber) {
    if(tx.from == address || tx.to == address)
    {
      console.log(tx);
    }
  }
}

provider.on('block', async (blockNumber) => {
  const block = await provider.getBlock(blockNumber, true);
  if (block && block.transactions) {
    for (const tx of block.transactions) {
      await getConfirmedTransactionDetails(tx);
    }
  }
});
