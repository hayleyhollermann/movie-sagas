import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects'; 
import axios from 'axios';


// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('GET_MOVIES', getMoviesSaga);
    yield takeEvery('SEE_INFO', seeInfoSaga);
    yield takeEvery('GET_GENRES', getGenresSaga);
    yield takeEvery('ALL_GENRES', allGenresSaga);
    yield takeEvery('EDIT_DETAILS', editDetailsSaga);
    yield takeEvery('EDIT_GENRES', editGenresSaga);
    // yield takeEvery('EDIT_TITLE', editTitleSaga);
}

//--------SAGAS-------------
// gets all movies from server
function* getMoviesSaga() {
    try {
        const moviesResponse = yield axios.get('/movies');
        yield put ({ type: 'SET_MOVIES', payload: moviesResponse.data})
    } catch(error) {
        console.log('error fetching movies list', error)
    }    
}
// gets info of selected movie
function* seeInfoSaga(action) {
    try {
        const moviesResponse = yield axios.get(`/movies/details/${action.payload}`);
        yield put ({ type: 'SEE_MOVIE', payload: moviesResponse.data})
    } catch(error) {
        console.log('error fetching movies list', error)
    }
}
// gets all genres of selected movie
function* getGenresSaga(action) {
    try {
        const moviesResponse = yield axios.get(`/movies/genres/${action.payload}`);
        yield put ({ type: 'MOVIE_GENRES', payload: moviesResponse.data})
    } catch(error) {
        console.log('error fetching movie genres list', error)
    }
}
// gets all genres
function* allGenresSaga() {
    try {
        const moviesResponse = yield axios.get('/movies/genres');
        console.log('in allGenresSaga', moviesResponse.data);
        yield put ({ type: 'SET_GENRES', payload: moviesResponse.data})
    } catch(error) {
        console.log('error fetching genres list', error)
    } 
}
// sends new description and title to server 
function* editDetailsSaga(action) {
    try {
        yield axios.put(`/movies/details/${action.payload.id}`, action.payload);
        // yield put({type: 'SEE_INFO', payload: action.payload.id});
        yield put({type: 'GET_MOVIES'})
    } catch(error) {
         console.log('error in editDescriptionSaga', error)
    }
}
function* editGenresSaga(action) {
    console.log('in editGenresSaga');
    try {
        yield axios.put(`/movies/genres/`, action.payload);
        yield put({type: 'SEE_INFO', payload: action.payload.id});
    } catch(error) {
         console.log('error in editGenresSaga', error)
    }
}
//--------END SAGAS---------


// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();


//--------REDUCERS----------
// stores movie info returned from the server
const movieInfo = (state= {}, action) => {
    if (action.type === 'SEE_MOVIE'){
        return action.payload;
    }
    return state;
}
// stores genres of selected movie
const movieGenres = (state=[], action) => {
    switch (action.type) {
        case 'MOVIE_GENRES':
            return action.payload;
        default:
            return state;
    }    
}
// stores all movies 
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}
// stores all genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}
// tracks changes to genre list
const genreChanges = (state = [], action) => {
    if (action.type === 'SET_NEW_GENRE'){
        return [...state, action.payload] 
    }
    // add reducer to clear state
    return state
}
//--------END REDUCERS---------


// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        movieInfo,
        movieGenres,
        genreChanges,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();
