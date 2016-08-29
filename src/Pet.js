import React from 'react'
import { connect } from 'react-redux'
import { addFavorite, removeFavorite } from './actionCreators'

const MAX_DESCRIPTION_LENGTH = 150

const Pet = React.createClass({

	handleFavoriteChange(event) {
		const action = this.props.isFavorite ? removeFavorite : addFavorite
		this.props.dispatch(action(this.props.pet))
	},

	render() {

		const photos = this.props.pet.media ? this.props.pet.media.photos.photo.filter((photo) => photo['@size'] === 'pn') : []
		const description = this.props.pet.description || ''

		return (
			<div className="pet">
				<input type="checkbox" checked={this.props.isFavorite} onChange={this.handleFavoriteChange} /> 
				<div>
					{photos.map((photo, index) => (
						<img key={photo.value} alt={`${this.props.pet.name} number ${index+1}`} src={photo.value} />
					))}
				</div>
				<ul>
					<li>{this.props.pet.name}</li>
					<li>{this.props.pet.animal} : {Array.isArray(this.props.pet.breeds.breed) ? this.props.pet.breeds.breed.join(', ') : this.props.pet.breeds.breed}</li>
					<li>{this.props.pet.age}</li>
					<li>{this.props.pet.contact.city}, {this.props.pet.contact.state}</li>
				</ul>
				<p>{description.substring(0, MAX_DESCRIPTION_LENGTH)}{description.length > MAX_DESCRIPTION_LENGTH ? '...' : '' }</p>
			</div>
		)
	}
})

export default connect()(Pet)