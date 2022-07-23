import React from 'react';
import ReactDOM from 'react-dom';
import Dropdown from './LocationSearch.jsx';
import Prices from './Prices.jsx';
import CarSearch from './CarSearch.jsx';
import ModelSearch from './ModelSearch.jsx';
import MPG from './MPG.jsx';
const axios = require('axios');

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedState: '',
      gasPrice: 0,
      elecPrice: 0,
      make: '',
      model: '',
      batterySize: 0,
      range: 0
    }
    this.selectState = this.selectState.bind(this);
    this.selectMake = this.selectMake.bind(this);
    this.selectModel = this.selectModel.bind(this);
  }

  selectState (e) {
    console.log(e.target.value);
    this.setState({selectedState: e.target.value});
    this.searchState(e.target.value);
  }

  searchState (loc) {
    //axios POST request to '/state'
    var that = this;
    axios.post('/state', {
      state: loc
    })
    .then(function (response) {
      axios.get('/state')
        .then((response) => {
          var data = response.data;
          for (var i = 0; i < data.length; i++) {
            if (data[i].state_abbr === loc) {
              console.log(data[i].elec_price);
              that.setState({elecPrice: data[i].elec_price});
            }
          }
          axios.get('/gas')
            .then((response) => {
              var data = response.data;
              for (var i = 0; i < data.length; i++) {
                if (data[i].state_abbr === loc) {
                  console.log(data[i].gas_price);
                  that.setState({gasPrice: data[i].gas_price});
                }
              }
            })
        })
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  selectMake(e) {
    this.setState({make: e.target.value});
  }

  selectModel(e) {
    this.setState({model: e.target.value});
  }

  render () {
    return (
      <div>
        <h1>MPG-inator</h1>
        <Dropdown handleChange={this.selectState}/>
        <Prices state={this.state} />
        <CarSearch handleMake={this.selectMake} state={this.state}/>
        <ModelSearch state={this.state} handleModel={this.selectModel} />
        <MPG state={this.state} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));