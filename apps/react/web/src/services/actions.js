/**
 * Created by genffy on 16/6/5.
 */

import Flickr from './flickr.js'
// 照片列表(最近、个人、相册)
export const REQUEST_PHOTOS = 'REQUEST_PHOTOS'
export const RECEIVE_PHOTOS = 'RECEIVE_PHOTOS'

export const REQUEST_PHOTO_DETAIL = 'REQUEST_PHOTO_DETAIL'
export const RECEIVE_PHOTO_DETAIL = 'RECEIVE_PHOTO_DETAIL'

export const REQUEST_PHOTO_COMMENTS = 'REQUEST_PHOTO_COMMENTS'
export const RECEIVE_PHOTO_COMMENTS = 'RECEIVE_PHOTO_COMMENTS'

function requestPhotos(params) {
    return {
        type: REQUEST_PHOTOS,
        params
    }
}

function receivePhotos(params, json) {
    return {
        type: RECEIVE_PHOTOS,
        params,
        photos: json.photos.photo.map(child => {
            child.imgUrl = `https://farm${child.farm}.staticflickr.com/${child.server}/${child.id}_${child.secret}.jpg`
            return child
        }),
        receivedAt: Date.now()
    }
}

function fetchPhotos(params) {
    return dispatch => {
        dispatch(requestPhotos(params))
        const type = params.type, config = params.data
        // recent tag user fav
        switch (type){
            case 'recent':
                Flickr.listPhotoDefault(config).then( res => {
                    dispatch(receivePhotos(params, res))
                })
                break;
            case 'tag':
                Flickr.listPhotoByTag(config).then( res => {
                    dispatch(receivePhotos(params, res))
                })
                break;
            case 'user':
                Flickr.listPhotoByUser(config).then( res => {
                    dispatch(receivePhotos(params, res))
                })
                break;
            case 'fav':
                Flickr.listPhotosByFav(config).then(res => {
                    dispatch(receivePhotos(params, res))
                })
                break;
            default:
                break;
        }
    }
}

function fetchPhotoComments(params) {
    return dispatch => {
        dispatch({
            type: REQUEST_PHOTO_COMMENTS,
            params
        })
        Flickr.getPhotoComments(params).then(res => {
            dispatch({
                type: RECEIVE_PHOTO_COMMENTS,
                params,
                comments: res.comments.comment
            })
        })
    }
}

function fetchPhotoDetail(params) {
    return dispatch => {
        dispatch({
            type: REQUEST_PHOTO_DETAIL,
            params
        })
        Flickr.getPhotoDetail(params).then(res => {
            dispatch({
                type: RECEIVE_PHOTO_DETAIL,
                params,
                detail: res.photo
            })
        })
    }
}

export function getPhotosByCondition(params) {
    return (dispatch, getState) => {
        const state = getState()
        console.log('getPhotosByCondition log state', state)
        return dispatch(fetchPhotos(params))
    }
}

export function getPhotoDetail(params) {
    return (dispatch, getState) => {
        return dispatch(fetchPhotoDetail(params))
    }
}

export function getPhotoComments(params) {
    return (dispatch, getState) => {
        return dispatch(fetchPhotoComments(params))
    }
}