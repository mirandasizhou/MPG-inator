import React from 'react';
import ReactDOM from 'react-dom';
import Dropdown from './LocationSearch.jsx';
const axios = require('axios');

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedState: ''
    }
    this.selectState = this.selectState.bind(this);
  }

  selectState (e) {
    console.log(e.target.value);
    this.setState({selectState: e.target.value});
    this.searchState(e.target.value);
  }

  searchState (loc) {
    //axios POST request to '/state'
    axios.post('/state', {
      state: loc
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render () {
    return (
      <div>
        <h1>MPG-inator</h1>
        <Dropdown handleChange={this.selectState}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));