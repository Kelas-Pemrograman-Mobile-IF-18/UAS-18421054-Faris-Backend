const artist = require('../model/Artist')
const response = require('../config/response')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

exports.inputDataArtist = (data, image) =>
  new Promise( async (resolve, reject) => {

    const dataArtist = new artist({
      artistCode: data.artistCode,
      artistName: data.artistName,
      workDays: data.workDays, 
      workProgress: data.workProgress, 
      email: data.email, 
      commissionSheet: image
    })
    
    await artist.findOne({artistCode: data.artistCode})
      .then(artist => {
        if (artist){
          reject(response.commonErrorMsg('Code Existed'))
        } else {
          dataArtist.save()
            .then(r=> {
              resolve(response.commonSuccessMsg('Input Data Succesfully'))
            }).catch(err => {
              reject(response.commonErrorMsg('Input Data Failed'))
            })
        }
      }).catch(err => {
        reject(response.commonErrorMsg('Server is having error issue'))
      })
  })

exports.getArtistData = () =>
  new Promise( async (resolve, reject) => {
    await artist.find({})
      .then(result => {
        resolve(response.commonResult(result))
      })
      .catch(() => reject(response.commonErrorMsg('Server is having error issue')))
  })

exports.getArtistDataOne = (artistCode) =>
  new Promise( async (resolve, reject) => {
    await artist.findOne({artistCode: artistCode})
      .then(result => {
        resolve(response.commonResult(result))
      })
      .catch(() => reject(response.commonErrorMsg('Server is having error issue')))
  })

exports.updateData = (id, data, image) =>
  new Promise ( async (resolve, reject)=>{
   await artist.updateOne(
      {_id : ObjectId(id)},
      {
        $set: {
          artistCode: data.artistCode,
          artistName: data.artistName,
          workDays: data.workDays, 
          workProgress: data.workProgress, 
          email: data.email, 
          commissionSheet: image
        }
      }
    ).then(artist => {
      resolve(response.commonSuccessMsg('Edit Data Succesfully'))
    }).catch(err => {
      reject(response.commonErrorMsg('Server is having error issue'))
    })
  })

  exports.delete = (id) =>
  new Promise( async (resolve, reject) => {
   await artist.remove({_id: ObjectId(id)})
    .then(() => {
      resolve(response.commonSuccessMsg('Delete Success'))
    }).catch(() => {
      reject(response.commonErrorMsg('Server is having error issue'))
    })
  })