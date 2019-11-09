import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects'; 
import axios from 'axios';


// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('GET_MOVIES', getMoviesSaga);
    yield takeEvery('SEE_INFO', seeInfoSaga);
    yield takeEvery('GET_GENRES', getGenresSaga);
    yield takeEvery('ALL_GENRES', allGenresSaga);
    yield takeEvery('EDIT_DESCRIPTION', editDescriptionSaga);
}

//--------SAGAS-------------
function* getMoviesSaga() {
    try {
        const moviesResponse = yield axios.get('/movies');
        yield put ({ type: 'SET_MOVIES', payload: moviesResponse.data})
    } catch(error) {
        console.log('error fetching movies list', error)
    }    
}
function* seeInfoSaga(action) {
    try {
        const moviesResponse = yield axios.get(`/movies/details/${action.payload}`);
        yield put ({ type: 'SEE_MOVIE', payload: moviesResponse.data})
    } catch(error) {
        console.log('error fetching movies list', error)
    }
}
function* getGenresSaga(action) {
    try {
        const moviesResponse = yield axios.get(`/movies/genres/${action.payload}`);
        yield put ({ type: 'MOVIE_GENRES', payload: moviesResponse.data})
    } catch(error) {
        console.log('error fetching movie genres list', error)
    }
}
function* allGenresSaga() {
    try {
        const moviesResponse = yield axios.get('/movies/genres');
        console.log('in allGenresSaga', moviesResponse.data);
        yield put ({ type: 'SET_GENRES', payload: moviesResponse.data})
    } catch(error) {
        console.log('error fetching genres list', error)
    } 
}
function* editDescriptionSaga(action) {
    console.log('in editDescriptionSaga', action.payload.description);
    
    try {
        yield axios.put(`/movies/details/${action.payload.id}`, action.payload);
        yield put({type: 'SEE_INFO', payload: action.payload.id});
    } catch(error) {
         console.log('error in editDescriptionSaga', error)
    }
}
//--------END SAGAS---------


// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();


//--------REDUCERS----------
// Used to store movies returned from the server
const movieInfo = (state= {}, action) => {
    if (action.type === 'SEE_MOVIE'){
        return action.payload;
    }
    return state;
}
const movieGenres = (state=[], action) => {
    switch (action.type) {
        case 'MOVIE_GENRES':
            return action.payload;
        default:
            return state;
    }    
}
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}
// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}
//--------END REDUCERS---------


// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        movieInfo,
        movieGenres,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();
