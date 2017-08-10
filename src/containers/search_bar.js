import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeather } from '../actions/index';

class SearchBar extends Component {  //classes are useful when we need to have extra func to our components

	constructor(props){
		super(props);

		this.state = {term: ""};
		this.onInputChange = this.onInputChange.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	onInputChange(event){
		this.setState({ term: event.target.value});
	}

	onFormSubmit(event){
		event.preventDefault();

		this.props.fetchWeather(this.state.term);

		this.setState({term: ""});
	}


	render() {
		return (
			<form onSubmit={this.onFormSubmit} className='input_group'>
				<input
				 placeholder="search for a 5 day forecast in a US city"
				 className='form-control'
				 value={this.state.term}
				 onChange={this.onInputChange} />
				 <div>
					<span className='input-group-button'>
						<button type='submit' className="btn btn-secondary">Search</button>
					</span>
				</div>
			</form>
			)

	}



}


function mapDispatchToProps(dispatch) {
	return bindActionCreators({ fetchWeather }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);