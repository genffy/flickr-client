/**
 * Created by genffy on 16/6/5.
 */

import Flickr from 'flickrapi/browser/flickrapi.js'
const flickr = new Flickr({
   api_key: '90cf3303994db18bd620941cd9d1f131'
});
class flickrAction {
    /**
     * 
     * @param params
     * @returns {Promise}
     */
    listPhotoDefault (params = {}) {
        return new Promise((resolve, reject) => {
            flickr.interestingness.getList(params, (err, res) => {
                if(err) {return reject(err)}
                resolve(res)
            })
        })
    }

    /**
     *
     * @param params
     * @returns {Promise}
     */
    listPhotoByTag (params = {}) {
        return new Promise((resolve, reject) => {
            flickr.photos.search(params, (err, res) =>{
                if(err) {return reject(err)}
                resolve(res)
            })
        })
    }

    /**
     *
     * @param params
     * @returns {Promise}
     */
    listPhotoByUser (params = {}) {
        return new Promise((resolve, reject) => {
            flickr.people.getPhotos(params, (err, res) => {
                if(err) {return reject(err)}
                resolve(res)
            })
        })
    }

    /**
     *
     * @param params
     * @returns {Promise}
     */
    listPhotoByAlbum (params = {}) {
        return new Promise((resolve, reject) => {
            flickr.photosets.getPhotos(params, (err, res) => {
                if(err) {return reject(err)}
                resolve(res)
            })
        })
    }

    /**
     *
     * @param params
     * @returns {Promise}
     */
    listPhotosByFav (params = {}) {
        return new Promise((resolve, reject) => {
            flickr.favorites.getList(params, (err, res) => {
                if(err) {return reject(err)}
                resolve(res)
            })
        })
    }

    /**
     *
     * @param params
     * {photo_id: <number>}
     * @returns {Promise}
     */
    getPhotoDetail (params = {}) {
        return new Promise((resolve, reject) => {
            flickr.photos.getInfo(params, (err, res) => {
                if(err) {return reject(err)}
                resolve(res)
            })
        })
    }

    /**
     *
     * @param params
     * {photo_id: <number>}
     * @returns {Promise}
     */
    getPhotoComments (params = {}) {
        return new Promise((resolve, reject) => {
            flickr.photos.comments.getList(params, (err, res) => {
                if(err) {return reject(err)}
                resolve(res)
            })
        })
    }
}
// TODO 需要重构
export default new flickrAction;