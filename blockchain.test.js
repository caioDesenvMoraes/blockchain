const Blockchain = require("./blockchain")
const Block = require("./block")

describe("Blockchain", () => {
    let bc
    let bc2

    // vai executar sempre antes dos testes
    beforeEach(() => {
        bc = new Blockchain
        bc2 = new Blockchain
    })

    // validando se o primeiro bloco é o genesis
    it("starts with genesis block", () => {
        expect(bc.chain[0]).toEqual(Block.genesis())
    })

    // validando se está adicionando um novo bloco
    it("adds a new block", () => {
        const data = "arquivo.pdf"
        bc.addBlock(data)

        expect(bc.chain[bc.chain.length - 1].data).toEqual(data)
    })

    // validando uma cadeia de blocos
    it("validates a valid chain", () => {
        bc2.addBlock("500 U$")
        
        expect(bc.isValidChain(bc2.chain)).toBe(true)
    })

    // invalidando uma cadeia que tem o bloco genesis corrompido
    it("Invalidates a chain with a corrupt genesis block", () => {
        bc2.chain[0].data = "0 U$"

        expect(bc.isValidChain(bc2.chain)).toBe(false)
    })

    // invalidando uma cadeia que tenha algum bloco corrompido
    it("Invalidates a corrupt chain", () => {
        bc2.addBlock("200 U$")
        bc2.chain[1].data = "0 U$"

        expect(bc.isValidChain(bc2.chain)).toBe(false)
    })

    // validando se houve a troca da cadeia pois era uma cadeia valida.
    it("Replaces the chain with a valid chain", () => {
        bc2.addBlock("600 U$")
        bc.replaceChain(bc2.chain)

        expect(bc.chain).toEqual(bc2.chain)
    })

    // validando se não houve a troca pois era uma cadeia inválida.
    it("Does not replace the chain with one of less or equal length", () => {
        bc.addBlock("200 U$")
        bc.replaceChain(bc2.chain)

        expect(bc.chain).not.toEqual(bc2.chain)
    })
})