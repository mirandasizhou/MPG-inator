const express = require('express');
const getGasPrice = require('../helper/gasPrice.js');
const mysql = require('mysql2');

let app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'mpg'
});

app.use(express.static(__dirname + '/../dist'));
app.use(express.json());

app.post('/state', (req, res) => {
  let state = req.body.state;
  //search the gas prices API with the state
  getGasPrice(state, (err, results) => {
    if (err) {
      console.log('failed to get gas prices');
    } else {
      console.log(results.data.result.state.gasoline);
      let gas = results.data.result.state.gasoline;
      res.end();
    }
  })
})
let port = 7007;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
})