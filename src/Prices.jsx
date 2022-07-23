import React from 'react';

class Prices extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    if (this.props.state.gasPrice && this.props.state.elecPrice) {
      return (
        <div>
         <p>The average gas price in {this.props.state.selectedState} is {this.props.state.gasPrice} dollars per gallon</p>
         <p>The average electricity price in {this.props.state.selectedState} is {this.props.state.elecPrice} cents per kW/h</p>
        </div>
      )
    }
  }
}
export default Prices;