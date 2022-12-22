const express = require('express');
const connect = require('./schemas');
const cors = require('cors')
const router = require('./routes')

connect();

const app = express();
const port = 5000;

app.use(cors())
app.use(express.json());
app.use('/api', router);

app.listen(process.env.PORT || 5000 , () => {
    console.log(port, 'Server is open with port!');
});