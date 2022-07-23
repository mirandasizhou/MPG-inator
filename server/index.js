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
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/state', (req, res) => {
  let state = req.body.state;
  //search the gas prices API with the state
  connection.query(
    'SELECT * FROM `gas` WHERE `state_abbr` = ?', [state],
    function(err, results) {
      if (err) {
        console.log(err);
      } else {
        if (results.length === 0) {
          getGasPrice(state, (err, results) => {
            if (err) {
              console.log('failed to get gas prices');
            } else {
              console.log(results.data.result.state.gasoline);
              let gas = results.data.result.state.gasoline;
              connection.query(
                'INSERT IGNORE INTO `gas` (`state_abbr`, `gas_price`) VALUES (?, ?)', [state, gas],
                function(err) {
                  if (err) {
                    console.log(err);
                  } else {
                    res.end();
                  }
                }
              );
            }
          });
        } else {
          res.end();
        }
      }
    }
  )

});

app.get('/state', (req, res) => {
  connection.query(
    'SELECT * FROM `electric`', function(err, results) {
      if (err) {
        console.log(err);
      } else {
        res.send(results);
      }
    }
  )
});

app.get('/gas', (req, res) => {
  connection.query(
    'SELECT * FROM `gas`', function(err, results) {
      if (err) {
        console.log(err);
      } else {
        res.send(results);
      }
    }
  )
})
let port = 3306;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
})