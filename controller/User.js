const UserModel = require('../model/User')
const response = require('../config/response')
const bcrypt = require('bcrypt')

exports.register = (data) =>
  new Promise((resolve, reject) =>{
    UserModel.findOne({
      username: data.username
    }).then(user =>{
      if (user) {
        resolve(response.commonErrorMsg('Username is already exists'))
      }else{
        bcrypt.hash(data.password, 10, (err, hash) => {
          if (err) {
            reject(response.commonErrorMsg)
          }else {
          data.password = hash
          UserModel.create(data)
            .then (() => resolve(response.commonSuccessMsg('Register Succesfully')))
            .catch(() => reject(response.commonErrorMsg('Register Failed')))
          }
        })     
      }
    }).catch(() => reject(response.commonError))
  })

exports.login = (data) => 
  new Promise((resolve, reject) => {
    UserModel.findOne({
      username: data.username
    }).then(user => {
      if (user) {
       if (bcrypt.compareSync(data.password,user.password)){
         resolve(response.commonResult(user))
       }else{
         reject(response.commonErrorMsg('Wrong Password'))
       }
      }else{
        reject(response.commonErrorMsg('Username not found'))
      }
    })
  })