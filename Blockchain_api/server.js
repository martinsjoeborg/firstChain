const express = require('express');
const cors = require('cors');
const blockchainRouter = require('./routes/routes');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/1/blocks', blockchainRouter);

const PORT = 5001;

app.listen(PORT, () =>
  console.log(`Server is up and running on port: ${PORT}`)
);