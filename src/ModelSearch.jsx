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
              {Array.from(new Set(cars.data.map(car => {
                if (car.brand === this.props.state.make) {
                  return car.model;
                }
              }))).map((model, id) => {
                return <option value={model} key={id}>{model}</option>
              })}
              {/* {cars.data.map((car, id) => {
                var models = {};
                var model = car.model;
                if (car.brand === this.props.state.make && !models.model) {
                  models.model = 1;
                  return <option value={car.model} key={id}>{car.model}</option>
                }
              })} */}
            </select>
          </label>
        </div>
      )
    }
  }
}
export default ModelSearch;