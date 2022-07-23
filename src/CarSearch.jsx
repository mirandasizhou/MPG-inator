import React from 'react';
const cars = require('../data.js').electricVehicles;

class CarSearch extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    if (this.props.state.gasPrice && this.props.state.elecPrice) {
      return (
        <div>
          <h3>Choose your Electric Car</h3>
          <label>
            Select Make
            <select onChange={this.props.handleMake}>
              {cars.brands.map((car, id) => {
                return <option value={car.name} key={id}>{car.name}</option>
              })}
            </select>
          </label>
        </div>
      )
    }
  }
}
export default CarSearch;