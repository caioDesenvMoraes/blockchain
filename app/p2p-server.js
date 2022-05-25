// importando o módulo
const Websocket = require("ws")

// definindo a porta
const P2P_PORT = process.env.P2P_PORT || 5001

// verificando se uma variável peer foi declarada
const peers = process.env.PEERS ? process.env.PEERS.split(",") : []

// definindo a classe P2P
class P2PServer {
    // método construtor
    constructor(blockchain) {
        this.blockchain = blockchain
        this.socket = []
    }

    // método para iniciar o servidor
    listen() {
        const server = new Websocket.Server({port: P2P_PORT})
        server.on("connection", socket => this.connectSocket(socket))
        this.connectToPeers()

        console.log(`Listening for peer-to-peer connections on: ${P2P_PORT}`);
    }

    // método que conecta as instâncias futuras no servidor original
    connectToPeers() {
        peers.forEach(peer => {
            const socket = new Websocket(peer)
            socket.on("open", () => this.connectSocket(socket))
        })
    }

    // método para adicionar um socket no array
    connectSocket(socket) {
        this.socket.push(socket)
        console.log("Socket Connected");

        this.messageHandler(socket)
        socket.send(JSON.stringify(this.blockchain.chain))
    }

    // método para fazer os sockets se comunicarem enviando dados.
    messageHandler(socket) {
        socket.on("message", message => {
            const data = JSON.parse(message)
            console.log("data", data)
        })
    }
}

module.exports = P2PServer