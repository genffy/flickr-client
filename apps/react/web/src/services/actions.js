/**
 * Created by genffy on 16/6/5.
 */

import Flickr from './flickr.js'
// 照片列表(最近、个人、相册)
export const REQUEST_PHOTOS = 'REQUEST_PHOTOS'
export const RECEIVE_PHOTOS = 'RECEIVE_PHOTOS'


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
    console.log('export class', Flickr)
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

export function getPhotosByCondition(params) {
    return (dispatch, getState) => {
        const state = getState()
        console.log('getPhotosByCondition log state', state)
        return dispatch(fetchPhotos(params))
    }
}