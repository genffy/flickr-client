/**
 * Created by genffy on 16/6/5.
 */

import Flickr from 'flickrapi/browser/flickrapi.js'

const flickr = new Flickr({
   api_key: '90cf3303994db18bd620941cd9d1f131'
});

// TODO 需要重构
export default class {
   listPhotoDefault (params = {}) {
      return new Promise((resolve, reject) => {
         flickr.interestingness.getList(params, (err, res) => {
            if(err) {return reject(err)}
            resolve(res)
         })
      })
   }
   listPhotoByTag (params = {}) {
      return new Promise((resolve, reject) => {
         flickr.photos.search(params, (err, res) =>{
            if(err) {return reject(err)}
            resolve(res)
         })
      })
   }
   listPhotoByUser (params = {}) {
      return new Promise((resolve, reject) => {
         flickr.people.getPhotos(params, (err, res) => {
            if(err) {return reject(err)}
            resolve(res)
         })
      })
   }
   listPhotoByAlbum (params = {}) {
      return new Promise((resolve, reject) => {
         flickr.photosets.getPhotos(params, (err, res) => {
            if(err) {return reject(err)}
            resolve(res)
         })
      })
   }
   listPhotosByFav (params = {}) {
      return new Promise((resolve, reject) => {
         flickr.favorites.getList(params, (err, res) => {
            if(err) {return reject(err)}
            resolve(res)
         })
      })
   }
};