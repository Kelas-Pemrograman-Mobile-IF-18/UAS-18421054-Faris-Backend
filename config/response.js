module.exports = {

  commonError:{
    error: true,
    msg : 'There is some issue on server'
  },
  commonErrorMsg: (msg) => {
    return {
      error: true,
      msg : msg
    }
  },
  commonSuccess:{
    error: false,
    msg : 'Server has been sucessfuly loaded'
  },
  commonSuccessMsg: (msg) => {
    return {
      error: false,
      msg : msg
    }
  },
  commonResult: (data) => {
    return {
      error: false,
      msg : 'Server is loaded',
      data : data
    }
  }

};