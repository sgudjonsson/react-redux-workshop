import React from 'react'

import SearchControls from './SearchControls'
import PetList from './PetList'

import { Provider } from 'react-redux'
import store from './store'

const App = React.createClass({

	render() {

		return (
			<Provider store={store}>
				<div className="app">
					<img src="src/adopt-me.png" alt="adopt-me logo" />
					<SearchControls />
					<PetList title="Search results" />
					<PetList title="Favorites" isFavorites />
				</div>
			</Provider>
		)
	}
})

export default App