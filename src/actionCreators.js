import { SET_ANIMAL, SET_BREED, SET_PETS, ADD_FAVORITE, REMOVE_FAVORITE, SET_BREEDS } from './actions'

import credentials from './credentials'
import petfinder from './petfinder-client'

const pf = petfinder(credentials)

export function setAnimal(animal) {
	return function(dispatch, getState) {
		dispatch({ type: SET_ANIMAL, animal })
		dispatch(getBreeds())
		dispatch(search())
	}
}

export function setBreed(breed) {
	return function(dispatch, getState) {
		dispatch({ type: SET_BREED, breed })
		dispatch(search())
	}
}

export function setPets(pets) {
	return { type: SET_PETS, pets: pets }
}

export function addFavorite(pet) {
	return { type: ADD_FAVORITE, pet }
}

export function removeFavorite(pet) {
	return { type: REMOVE_FAVORITE, pet }
}

export function search() {
	return function(dispatch, getState) {
		const { animal, breed, location } = getState()

		const promise = pf.pet.find({animal,breed,location, output: 'full'})
		promise.then(data => {
			const pets = data.petfinder.pets ? data.petfinder.pets.pet : []
			dispatch(setPets(pets))
		})
	}
}

export function getBreeds() {
	return function(dispatch, getState) {
		const { animal } = getState()
		pf.breed.list({animal})
			.then(data => {
				if(data.petfinder.breeds) {
					dispatch({ type: SET_BREEDS, breeds: data.petfinder.breeds.breed})
				}
			})	
	}
}