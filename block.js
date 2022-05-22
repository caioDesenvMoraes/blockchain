const SHA256 = require("crypto-js/sha256")

class Block {
    // método construtor
    constructor(timestamp, lastHash, hash, data) {
        this.timestamp = timestamp
        this.lastHash = lastHash
        this.hash = hash
        this.data = data
    }

    // método que retorna uma string
    toString() {
        return `Block
        timestamp = ${this.timestamp}
        lastHash = ${this.lastHash.substring(0, 10)}
        hash = ${this.hash.substring(0, 10)}
        data = ${this.data}`
    }

    // método do bloco genesis
    static genesis() {
        return new this("Genesis Time", "----------", "JSHE123SSHA2", [])
    }

    // método do bloco de mineração
    static mineBlock(lastBlock, data) {
        const timestamp = Date.now()
        const lastHash = lastBlock.hash
        const hash = Block.hash(timestamp, lastHash, data)
        
        return new this(timestamp, lastHash, hash, data)
    }

    // método para criar um hash SHA256
    static hash(timestamp, lastHash, data) {
        return SHA256(`${timestamp}${lastHash}${data}`).toString()
    }

    // método para validar o hash do bloco
    static blockHash(block) {
        const {timestamp, lastHash, data} = block
        
        return Block.hash(timestamp, lastHash, data)
    }
}

module.exports = Block