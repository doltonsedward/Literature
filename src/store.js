import { createStore } from 'redux'
import rootReducer from './rootReducer'

// const initialValue = JSON.parse(localStorage.getItem('user'))

const store = createStore(rootReducer)


export default store
