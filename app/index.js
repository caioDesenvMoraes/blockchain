// imporando os métodos
const express = require("express")
const Blockchain = require("../blockchain")

// definindo a porta
const HTTP_PORT = process.env.HTTP_PORT || 3001

// instanciando os objetos
const app = express()
const bc = new Blockchain()

// recebendo os dados no formato json
app.use(express.json())

// método get para enviar a corrente de blocos
app.get("/blocks", (req, res) => {
    res.json(bc.chain)
})

// método post para adicionar um bloco na cadeia de blocos
app.post("/mine", (req, res) => {
    const block = bc.addBlock(req.body.data)
    console.log(`New block added: ${block.toString()}`)

    res.redirect("/blocks")
})

app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`))