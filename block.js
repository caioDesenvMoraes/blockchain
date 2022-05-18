const SHA256 = require("crypto-js/sha256")

class Block {
    // método construtor
    constructor(timestamp, lastHash, hash, data) {
        this.timestamp = timestamp
        this.lastHash = lastHash
        this.hash = hash
        this.data = data
    }

    // função que retorna uma string
    toString() {
        return `Block
        timestamp = ${this.timestamp}
        lastHash = ${this.lastHash.substring(0, 10)}
        hash = ${this.hash.substring(0, 10)}
        data = ${this.data}`
    }

    // bloco genesis
    static genesis() {
        return new this("Genesis Time", "----------", "JSHE123SSHA2", [])
    }

    // bloco de mineração
    static mineBlock(lastBlock, data) {
        const timestamp = Date.now()
        const lastHash = lastBlock.hash
        const hash = Block.hash(timestamp, lastHash, data)
        
        return new this(timestamp, lastHash, hash, data)
    }

    // hash SHA256
    static hash(timestamp, lastHash, data) {
        return SHA256(`${timestamp}${lastHash}${data}`).toString()
    }
}

module.exports = Block