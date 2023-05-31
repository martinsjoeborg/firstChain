const Blockchain = require('../Blockchain');
const blockchain = new Blockchain();

const getChain = (req, res) => {
    res.status(200).json(blockchain.chain);
};

const createBlock = (req, res) => {
    const { data } = req.body;
    const block = blockchain.addBlock({ data });
    res.status(201).json({ message: 'Added new block', block: block }); 
}

module.exports = {
    getChain,
    createBlock
};