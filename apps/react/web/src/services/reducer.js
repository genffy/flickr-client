/**
 * Created by genffy on 16/6/5.
 */

import { combineReducers } from 'redux'
import {
    SELECT_REDDIT, INVALIDATE_REDDIT,
    REQUEST_POSTS, RECEIVE_POSTS,
    SELECT_TAG, INVALIDATE_TAG,
    REQUEST_TAGS, RECEIVE_TAGS,
    SELECT_PHOTO, REQUEST_PHOTOS, RECEIVE_PHOTOS
} from './actions.js'

function selectedReddit(state = 'all', action) {
    switch (action.type) {
        case SELECT_REDDIT:
            return action.reddit
        default:
            return state
    }
}

function posts(state = {
    isFetching: false,
    didInvalidate: false,
    items: []
}, action) {
    switch (action.type) {
        case INVALIDATE_REDDIT:
            return Object.assign({}, state, {
                didInvalidate: true
            })
        case REQUEST_POSTS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            })
        case RECEIVE_POSTS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.posts,
                lastUpdated: action.receivedAt
            })
        default:
            return state
    }
}

function postsByReddit(state = { }, action) {
    switch (action.type) {
        case INVALIDATE_REDDIT:
        case RECEIVE_POSTS:
        case REQUEST_POSTS:
            return Object.assign({}, state, {
                [action.reddit]: posts(state[action.reddit], action)
            })
        default:
            return state
    }
}

function tagsByDefault(state = { }, action) {
    switch (action.type) {
        case INVALIDATE_TAG:
        case RECEIVE_TAGS:
        case REQUEST_TAGS:
            return Object.assign({}, state, {
                tags: action.tags || []
            })
        default:
            return state
    }
}

function photos(state = {}, action) {
    switch (action.type) {
        case REQUEST_PHOTOS:
        case RECEIVE_PHOTOS:
            return Object.assign({}, state, {
                photos: action.data || []
            })
        default:
            return state
    }
}
const rootReducer = combineReducers({
    postsByReddit,
    selectedReddit,
    tagsByDefault,
    photos,
})

export default rootReducer
