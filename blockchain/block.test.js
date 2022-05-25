const Block = require("./block")

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
})