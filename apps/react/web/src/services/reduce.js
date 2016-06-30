/**
 * Created by genffy on 16/6/5.
 */

import { combineReducers } from 'redux'
import {
    SELECT_PHOTO, REQUEST_PHOTOS, RECEIVE_PHOTOS
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
const rootReducer = combineReducers({
    photos
})

export default rootReducer
