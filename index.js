const api = require('./api')

const loadModelFromFile = async file => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()
    reader.readAsText(file, "UTF-8")
    reader.onload = async (evt) => {
      resolve(await loadModel(evt.target.result))
    }
    reader.onerror = function (err) {
      reject(err)
    }
  })
}

const loadModel = async model => {
  return new Promise((resolve, reject) => {
    try {
      resolve(api.loadXML(model))
    } catch (err) {
      reject(err)
    }
  })
}

const execModel = async model => {
  return new Promise((resolve, reject) => {
    try {
      resolve(api.runModel({ silent: model }))
    } catch (err) {
      reject(err)
    }
  })
}

module.exports = {
  loadModelFromFile,
  loadModel,
  execModel
}