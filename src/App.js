import React from 'react'

import credentials from './credentials'
import petfinder from './petfinder-client'

const pf = petfinder(credentials)

import SearchControls from './SearchControls'
import PetList from './PetList'

const App = React.createClass({

	getInitialState() {
		return {
			animal: 'dog',
			breed: 'Havanese',
			location: 'San Francisco, CA',
			pets: [],
			favorites: []
		}
	},

	componentDidMount() {
		// ajax or e.g jquery calls
		this.search()
	},

	search() {
		const { animal, breed, location } = this.state
		const promise = pf.pet.find({animal,breed,location, output: 'full'})
		promise.then(data => {
			const pets = data.petfinder.pets ? data.petfinder.pets.pet : []
			this.setState({pets})
		})
	},

	changeBreed(breed) {
		this.setState({breed}, () => this.search())
	},

	changeAnimal(animal) {
		this.setState({animal, breed: ''}, () => this.search())
	},

	toggleFavorite(pet, addToFavorites) {
		let { favorites } = this.state
		favorites = addToFavorites ? favorites.concat(pet) : favorites.filter(favorite => pet.id !== favorite.id)
		this.setState({favorites})
	},

	render() {

		return (
			<div className="app">
				<img src="src/adopt-me.png" alt="adopt-me logo" />
				<SearchControls breed={this.state.breed} animal={this.state.animal} changeBreed={this.changeBreed} changeAnimal={this.changeAnimal} />
				<PetList title="Search results" pets={this.state.pets} favorites={this.state.favorites} toggleFavorite={this.toggleFavorite} />
				<PetList title="Favorites" pets={this.state.favorites} favorites={this.state.favorites} toggleFavorite={this.toggleFavorite} />
			</div>
		)
	}
})

export default App