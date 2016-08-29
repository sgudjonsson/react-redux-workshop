import React from 'react'
import { ANIMALS } from './petfinder-client'

import { connect } from 'react-redux'
import { setAnimal, setBreed, search, getBreeds } from './actionCreators'

const SearchControls = React.createClass({

	handleAnimalChange(event) {
		this.props.dispatch(setAnimal(event.target.value))
	},

	handleBreedChange(event) {
		this.props.dispatch(setBreed(event.target.value))
	},

	componentDidMount() {
		this.props.dispatch(search())
		this.props.dispatch(getBreeds())
	},

	render() {

		const animalSelector = (
			<select value={this.props.animal} onChange={this.handleAnimalChange}>
				<option value=""></option>
				{ANIMALS.map(animal => (
					<option key={animal} value={animal}>{animal}</option>
				))}
			</select>
		)

		const breedSelector = !this.props.animal ? null : (
			<select value={this.props.breed} onChange={this.handleBreedChange}>
				<option value=""></option>
				{this.props.breeds.map(breed => (
					<option key={breed} value={breed}>{breed}</option>
				))}
			</select>
		)

		return (
			<div className="search">
				{animalSelector}
				{breedSelector}
			</div>
		)
	}
})

const mapStateProps = (state) => {
	return {
		animal: state.animal,
		breed: state.breed,
		breeds: state.breeds
	}
}

export default connect(mapStateProps)(SearchControls)