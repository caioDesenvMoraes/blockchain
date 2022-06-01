const Blockchain = require("./blockchain/index")

const bc = new Blockchain()

for (let i = 1; i < 10; i++) {
    let block = bc.addBlock({index: i, amount: 500})
    console.log(block);
}
