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

const loadModel = async fileContent => {
  return new Promise((resolve, reject) => {
    try {
      resolve(api.loadXML(model))
    } catch (err) {
      reject(err)
    }
  })
}

const runModel = async model => {
  return new Promise((resolve, reject) => {
    try {
      resolve(api.runModel({ silent: model }))
    } catch (err) {
      reject(err)
    }
  })
}

const findAll = async () => {
  return new Promise((resolve, reject) => {
    try {
      resolve(api.findAll())
    } catch (err) {
      reject(err)
    }
  })
}

const getName = async imPrimitive => {
  return new Promise((resolve, reject) => {
    try {
      resolve(api.getName(imPrimitive))
    } catch (err) {
      reject(err)
    }
  })
}

const getType = async imPrimitive => {
  return new Promise((resolve, reject) => {
    try {
      resolve(api.getType(imPrimitive))
    } catch (err) {
      reject(err)
    }
  })
}

const getId = async imPrimitive => {
  return new Promise((resolve, reject) => {
    try {
      resolve(api.getID(imPrimitive))
    } catch (err) {
      reject(err)
    }
  })
}

const getValue = async imPrimitive => {
  return new Promise((resolve, reject) => {
    try {
      resolve(api.getValue(imPrimitive))
    } catch (err) {
      reject(err)
    }
  })
}

const getData = async converter => {
  return new Promise((resolve, reject) => {
    try {
      resolve(api.getData(converter))
    } catch (err) {
      reject(err)
    }
  })
}

module.exports = {
  loadModelFromFile,
  loadModel,
  runModel,
  findAll,
  getName,
  getType,
  getId,
  getValue,
  getData
}