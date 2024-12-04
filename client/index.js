const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');
const readline = require('readline');

const serverUrl = 'http://localhost:1225';

async function main() {
  const merkleTree = new MerkleTree(niceList);
  console.log('MERKLE ROOT:', merkleTree.getRoot() + '\n'); //get the root and paste it to the server side

  // Add a readline input process from cmd line
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.question('Please enter a name: ', async (name) => {
    const index = niceList.findIndex(n => n === name);
    const proof = merkleTree.getProof(index);
  
    const { data: gift } = await axios.post(`${serverUrl}/gift`, {
      name: name,
      proof: proof
    });
    console.log({ gift });
    
    // Close the interface after getting input
    rl.close();
  });
}

main();