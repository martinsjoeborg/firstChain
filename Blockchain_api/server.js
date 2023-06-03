//-------Original server---------

// const express = require('express');
// const cors = require('cors');
// const blockchainRouter = require('./routes/routes');

// const app = express();
// app.use(express.json());
// app.use(cors());

// app.use('/1/blocks', blockchainRouter);

// const PORT = 5001;

// app.listen(PORT, () =>
//   console.log(`Server is up and running on port: ${PORT}`)
// );

//-------Server with redis---------

const express = require('express');
const Broker = require('./messageBroker/Broker');
const Blockchain = require('./blockchain/Blockchain');
const axios = require('axios');
const cors = require('cors');

const app = express();

const blockchain = new Blockchain();
const messageBroker = new Broker(blockchain);

const DEFAULT_PORT = 5001;
const ROOT_ADDRESS = `http://localhost:${DEFAULT_PORT}`;

//Sync data at startup
const syncData = async () => {
  try {
    const url = `${ROOT_ADDRESS}/1/blocks`;
    const { data } = await axios.get(url);
    blockchain.replaceChain(data);
    console.log('Synchronizing at startup');
  } catch(err) {
    console.log('Error', err);
  }
}

//Middleware
app.use(express.json());
app.use(cors());

//Endpoints
app.get('/1/blocks', (req, res) => {
  res.status(200).json(blockchain.chain);
});

app.post('/1/blocks', (req, res) => {
  const { data } = req.body;
  const block = blockchain.addBlock({ data });
  messageBroker.broadcast();

  res.status(201).json({ message: 'Added new block', block: block });

});

// const DEFAULT_PORT = 5001;
let PEER_PORT;

if (process.env.GENERATE_PEER_PORT === 'true') {
  PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 100);
}

const PORT = PEER_PORT || DEFAULT_PORT;

app.listen(PORT, () => {
  console.log(`Server is up and running on port: ${PORT}`);
  syncData();
  
});
