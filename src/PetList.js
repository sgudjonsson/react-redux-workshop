import React from 'react'
import { connect } from 'react-redux'

import Pet from './Pet'

const PetList = React.createClass({
	render() {
		let pets
		let petList = this.props.isFavorities ? this.props.favorities : this.props.pets
		if(petList.length > 0) {
			pets = petList.map(pet => {
				const isFavorite = this.props.favorites.some(favorite => favorite.id === pet.id)
				return <Pet key={pet.id} pet={pet} isFavorite={isFavorite} />
			})
		} else {
			pets = <h2>List is empty</h2>
		}

		return (
			<div className="petlist">
				<h1>{this.props.title}</h1>
				<div>
					{pets}
				</div>
			</div>
		)
	}
})

const mapStateToProps = (state) => {
	return {
		favorites: state.favorites,
		pets: state.pets
	}
}

export default connect(mapStateToProps)(PetList)