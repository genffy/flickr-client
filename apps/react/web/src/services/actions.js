/**
 * Created by genffy on 16/6/5.
 */

import flickr from './flickr.js'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_REDDIT = 'SELECT_REDDIT'
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT'

export const REQUEST_TAGS = 'REQUEST_TAGS'
export const RECEIVE_TAGS = 'RECEIVE_TAGS'
export const SELECT_TAG = 'SELECT_TAG'
export const INVALIDATE_TAG = 'INVALIDATE_TAG'
// 获取相册列表
function requestPosts(reddit) {
    return {
        type: REQUEST_POSTS,
        reddit
    }
}

function receivePosts(reddit, json) {
    return {
        type: RECEIVE_POSTS,
        reddit,
        posts: json.photos.photo.map(child => {
            child.imgUrl = `https://farm${child.farm}.staticflickr.com/${child.server}/${child.id}_${child.secret}.jpg`
            return child
        }),
        receivedAt: Date.now()
    }
}

// 获取热门标签
function requestTags(params) {
    return {
        type: REQUEST_TAGS,
        params
    }
}

function receiveTags(params, json) {
    return {
        type: RECEIVE_TAGS,
        params,
        tags: json.hottags.tag.map(item => {
            return item
        }),
        receivedAt: Date.now()
    }
}

function fetchPosts(reddit) {
    return dispatch => {
        dispatch(requestPosts(reddit))
        /*return fetch(`https://www.reddit.com/r/${reddit}.json`)
            .then(response => response.json())
            .then(json => dispatch(receivePosts(reddit, json)))*/
        if(reddit == 'all'){
            return flickr.interestingness.getList({}, function(err, res){
                if(err) {throw new Error(err)}
                dispatch(receivePosts(reddit, res))
            })
        }else{
            return flickr.photos.search({tags: reddit}, function(err, res){
                if(err) {throw new Error(err)}
                dispatch(receivePosts(reddit, res))
            })
        }
        
    }
}

function fetchTags(params) {
    return dispatch => {
        console.log(params)
        dispatch(requestTags(params))
        return flickr.tags.getHotList({}, function(err, res){
            if(err) {throw new Error(err)}
            dispatch(receiveTags(params, res))
        })
    }
}

function shouldFetchPosts(state, reddit) {
    const posts = state.postsByReddit[reddit]
    if (!posts) {
        return true
    }
    if (posts.isFetching) {
        return false
    }
    return posts.didInvalidate
}
// 选择
export function selectReddit(reddit) {
    return {
        type: SELECT_REDDIT,
        reddit
    }
}

// 非法
export function invalidateReddit(reddit) {
    return {
        type: INVALIDATE_REDDIT,
        reddit
    }
}

// 获取照片
export function fetchPostsIfNeeded(reddit) {
    return (dispatch, getState) => {
        if (shouldFetchPosts(getState(), reddit)) {
            return dispatch(fetchPosts(reddit))
        }
    }
}

// 获取标签
export function fetchTagsIfNeeded(params) {
    return (dispatch, getState) => {
        return dispatch(fetchTags(params))
    }
}