import React from 'react';
const cars = require('../data.js').electricVehicles;

class ModelSearch extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    if (this.props.state.make) {
      return (
        <div>
          <label>
            Select Model
            <select onChange={this.props.handleModel} defaultValue="select">
              {cars.data.map((car, id) => {
                if (car.brand === this.props.state.make) {
                  return <option value={car.model} key={id}>{car.model}</option>
                }
              })}
            </select>
          </label>
        </div>
      )
    }
  }
}
export default ModelSearch;