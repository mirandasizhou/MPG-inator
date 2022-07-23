import React from 'react';
const cars = require('../data.js').electricVehicles;

class MPG extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    if (this.props.state.model) {
      return (
        <div>
          {cars.data.map((car, id) => {
            if (car.brand === this.props.state.make && car.model === this.props.state.model) {
              var ppm = (this.props.state.elecPrice / 100) * car.usable_battery_size / car.range;
              var mpg = Math.ceil(this.props.state.gasPrice / ppm);
              return (
                <div key={id}>
                  <p>The MPG equivalency for the {this.props.state.make} {this.props.state.model} {car.variant} in this state is {mpg}</p>
                </div>
              )
            }
          })}
        </div>
      )
    }
  }
}
export default MPG;