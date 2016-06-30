/**
 * Created by genffy on 16/6/5.
 */

import { combineReducers } from 'redux'
import {
    SELECT_PHOTO, REQUEST_PHOTOS, RECEIVE_PHOTOS,
    REQUEST_PHOTO_DETAIL, RECEIVE_PHOTO_DETAIL,
    REQUEST_PHOTO_COMMENTS, RECEIVE_PHOTO_COMMENTS
} from './actions.js'

function photos(state = {
    isFetching: false,
    didInvalidate: false,
    photos: []
}, action) {
    switch (action.type) {
        case REQUEST_PHOTOS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            })
        case RECEIVE_PHOTOS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                photos: action.photos,
                lastUpdated: action.receivedAt
            })
        default:
            return state
    }
}

function PhotoDetail(state = {
    isFetching: true,
    detail: []
}, action) {
    switch (action.type) {
        case REQUEST_PHOTO_DETAIL:
            return Object.assign({}, state, {
                isFetching: true
            })
        case RECEIVE_PHOTO_DETAIL:
            return Object.assign({}, state, {
                isFetching: false,
                detail: action.detail,
            })
        default:
            return state
    }
}

function PhotoComments(state = {
    isFetching: true,
    comments: []
}, action) {
    switch (action.type) {
        case REQUEST_PHOTO_COMMENTS:
            return Object.assign({}, state, {
                isFetching: true
            })
        case RECEIVE_PHOTO_COMMENTS:
            return Object.assign({}, state, {
                isFetching: false,
                comments: action.comments
            })
        default:
            return state
    }
}

const rootReducer = combineReducers({
    photos,
    PhotoDetail,
    PhotoComments
})

export default rootReducer
