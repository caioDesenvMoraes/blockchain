const SHA256 = require("crypto-js/sha256")

const { DIFFICULTY, MINE_RATE } = require("../config")

class Block {
    // método construtor
    constructor(timestamp, lastHash, hash, data, nonce, difficulty) {
        this.timestamp = timestamp
        this.lastHash = lastHash
        this.hash = hash
        this.data = data
        this.nonce = nonce
        this.difficulty = difficulty || DIFFICULTY
    }

    // método que retorna uma string
    toString() {
        return `Block
        timestamp = ${this.timestamp}
        lastHash = ${this.lastHash.substring(0, 10)}
        hash = ${this.hash.substring(0, 10)}
        nonce = ${this.nonce}
        difficulty = ${this.difficulty}
        data = ${this.data}`
    }

    // método do bloco genesis
    static genesis() {
        return new this("Genesis Time", "----------", "JSHE123SSHA2", [], 0, DIFFICULTY)
    }

    // método para criação de um bloco de mineração
    static mineBlock(lastBlock, data) {
        let hash, timestamp
        const lastHash = lastBlock.hash
        let { difficulty } = lastBlock
        let nonce = 0
        
        do {
            nonce++
            timestamp = Date.now()
            difficulty = Block.adjustDifficulty(lastBlock, timestamp)
            hash = Block.hash(timestamp, lastHash, data, nonce, difficulty)
        } while (hash.substring(0, difficulty) !== "0".repeat(difficulty))
        
        return new this(timestamp, lastHash, hash, data, nonce, difficulty)
    }

    // método para criar um hash SHA256
    static hash(timestamp, lastHash, data, nonce, difficulty) {
        return SHA256(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString()
    }

    // método para validar o hash do bloco
    static blockHash(block) {
        const {timestamp, lastHash, data, nonce, difficulty} = block
        
        return Block.hash(timestamp, lastHash, data, nonce, difficulty)
    }

    // método para ajustar a dificuldade
    static adjustDifficulty(lastBlock, currentTime) {
        let { difficulty } = lastBlock
        difficulty = lastBlock.timestamp + MINE_RATE > currentTime ? difficulty + 1 : difficulty - 1
        return difficulty
    }
}

module.exports = Block