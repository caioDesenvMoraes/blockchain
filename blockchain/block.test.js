const Block = require("./block")
// const { DIFFICULTY } = require("../config")

describe("Block", () => {
    let data, lastBlock, block
    
    // vai executar sempre antes dos testes
    beforeEach(() => {
        data = "index.html"
        lastBlock = Block.genesis()
        block = Block.mineBlock(lastBlock, data)
    })

    // validando se o atributo data do bloco é igual o valor informado
    it("sets the `data` to match the input", () => {
        expect(block.data).toEqual(data)
    })
    
    // validando se o lastHash do bloco atual é igual ao hash do bloco anterior
    it("sets the `lastHash` to match the hash of the last block", () => {
        expect(block.lastHash).toEqual(lastBlock.hash)
    })

    // validando se os zeros iniciais são iguais ao numero da difficuldade
    it("generates a hash that matches the difficulty", () => {
        expect(block.hash.substring(0, block.difficulty)).toEqual("0".repeat(block.difficulty))
    })
 
    // valindo que a dificuldade está sendo diminuida para uma geração lenta de blocos
    it("lowers the difficulty for slowly mined blocks", () => {
        expect(Block.adjustDifficulty(block, block.timestamp + 360000)).toEqual(block.difficulty - 1)
    })

    // valindo que a dificuldade está sendo aumentada para uma geração rapida de blocos
    it("raises the difficulty for quickly mined blockls", () => {
        expect(Block.adjustDifficulty(block, block.timestamp + 1)).toEqual(block.difficulty + 1)
    })
})