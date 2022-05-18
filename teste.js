const Block = require("./block")

// instânciando um objeto do bloco
const block = new Block("7467", "765EQHR45HAAR54", "3455HEE34EJL65HL3", "100")

console.log(block.toString())
console.log(Block.genesis().toString())

// criando nosso primeiro bloco
const primeiroBloco = Block.mineBlock(Block.genesis(), "$500")
console.log(primeiroBloco.toString())