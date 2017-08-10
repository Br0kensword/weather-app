import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Chart from '../components/chart';
import _ from 'lodash';
import GoogleMap from '../components/google-map';


class WeatherList extends Component {
	renderWeather(cityData){
		const name = cityData.city.name;
		const temps = _.map(cityData.list.map(weather => weather.main.temp),(temp) => (9/5) * (temp - 273) + 32 );
		const press = cityData.list.map(weather => weather.main.pressure);
		const humid = cityData.list.map(weather => weather.main.humidity);
		const { lon, lat } = cityData.city.coord;

		return (

			<tr key={name}>
				<td><GoogleMap lon={lon} lat={lat} /></td>
				<td>
					<Chart data={temps} color="red" units="F" />
				</td>
				<td>
					<Chart data={press} color="orange" units="hPA" />
				</td>
				<td>
					<Chart data={humid} color="blue" units="%" />
				</td>
			</tr>
			);
	}

	render() {
		return (
				<table className='table table-hover'>
					<thead>
						<tr>
							<th>City</th>
							<th>Tempreature (F)</th>
							<th>Pressure (hPa)</th>
							<th>Humidity (%)</th>
						</tr>
					</thead>
					<tbody>
						{this.props.weather.map(this.renderWeather)}
					</tbody>
					</table>
			);
	}
}

function mapStateToProps(state) {
	return {weather: state.weather};
}

export default connect(mapStateToProps)(WeatherList);