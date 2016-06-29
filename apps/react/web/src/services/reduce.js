/**
 * Created by genffy on 16/6/5.
 */

import { combineReducers } from 'redux'
import {
    SELECT_PHOTO, REQUEST_PHOTOS, RECEIVE_PHOTOS
} from './actions.js'

function photos(state = {}, action) {
    switch (action.type) {
        case REQUEST_PHOTOS:
        case RECEIVE_PHOTOS:
            return Object.assign({}, state, {
                photos: action.photos || []
            })
        default:
            return state
    }
}
const rootReducer = combineReducers({
    photos
})

export default rootReducer
