import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import fetchCars from '../actions';
import Aside from '../components/aside';

class CarsIndex extends Component {
  componentDidMount() {
    this.props.fetchCars(this.props.garage);
  }

  render () {
    if (this.props.cars.length === 0) {
      return [
        <Aside key="aside" garage={this.props.garage}>
          <Link to="/cars/new">Add a car</Link>
        </Aside>,
        <div className="no-car" key="nocar">No car yet</div>
      ];
    }
    return (
      <div className="d-flex mt-5">
        <Aside key="aside" garage={this.props.garage}>
          <Link to="/cars/new">Add a car</Link>
        </Aside>
        <div className="list-container" key="cars">
          {this.props.cars.map((car) => {
            return (
              <div key={car.id} className="car-smallad">
                <Link to={`/cars/${car.id}`} key={car.id} />
                <img className="car-logo" alt="" src="https://raw.githubusercontent.com/lewagon/garage-redux/5f01e42e3cf43a30105cf7793a717f4a6e9400ee/assets/images/logo_square.svg" />
                <div className="car-details">
                  <span>{car.brand} - {car.model}</span>
                  <ul>
                    <li><strong>Owner:</strong> {car.owner}</li>
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cars: state.cars,
    garage: state.garage
  };
}

function mapsDipatchToProps(dispatch) {
  return bindActionCreators({ fetchCars }, dispatch);
}

export default connect(mapStateToProps, mapsDipatchToProps)(CarsIndex);
