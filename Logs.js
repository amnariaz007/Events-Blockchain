const abiDecoder = require('abi-decoder');
const Web3 = require('web3');
const web3 = new Web3 ('wss://mainnet.infura.io/ws/v3/1bc30d35b471407d87e6122331f3febb');

const decodeTransactionLogs = async (receipt) => {
    console.log(receipt);
    const erc20TransferEvent = [
        {
          "anonymous": false,
          "inputs": [
              {
                  "indexed": true,
                  "name": "from",
                  "type": "address"
              },
              {
                  "indexed": true,
                  "name": "to",
                  "type": "address"
              },
            //   {
            //       "indexed": true,
            //       "name": "assetId",
            //       "type": "uint256"
            //   },
              {
                "indexed": true,
                "name": "wad",
                "type": "uint256"
            }
          ],
          "name": "Transfer",
          "type": "event"
      }
    ]
    abiDecoder.addABI(erc20TransferEvent)
   // const receipt = await getTransactionReceipt(hash);
    const decodedLogs = abiDecoder.decodeLogs(receipt.logs);
    return decodedLogs;
}
const getTransactionReceipt = async (tx) => {
    const response = await web3.eth.getTransactionReceipt(tx);
    if (!response) {
        throw new Error("Transaction receipt failed!")
    }

     decodeTransactionLogs(response).then(res => {
        console.log(res[1].events);
     }).catch(err =>{
        console.log(err);
     });
    // console.log(txdecodlog);
    
    // return txdecodlog
} 
getTransactionReceipt('0x5e67c4b3c5d5146cce9ea6400c3afe6d9bb72da8010ff0a77203124e3495c8d4')