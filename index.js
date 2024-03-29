"use strict"

const api = require("./api")

const loadModelFromFile = async (file) => {
  return new Promise((resolve, reject) => {
    if (typeof FileReader === "undefined") {
      const fs = require("fs")
      if (typeof fs === "undefined") {
        reject(
          "Error to read the file, try to use the method loadModel passing the file content as parameter"
        )
      }

      const data = fs.readFileSync(file, "utf8")

      Promise.all([loadModel(data)]).then((values) => {
        resolve(values[0])
      })
    } else {
      let reader = new FileReader()
      reader.readAsText(file, "UTF-8")
      reader.onload = async (evt) => {
        resolve(await loadModel(evt.target.result))
      }
      reader.onerror = function (err) {
        reject(err)
      }
    }
  })
}

const loadModel = async (fileContent) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(api.loadXML(fileContent))
    } catch (err) {
      reject(err)
    }
  })
}

const runModel = async (model) => {
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

const findID = async (primitiveId) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(api.findID(primitiveId))
    } catch (err) {
      reject(err)
    }
  })
}

const getName = async (imPrimitive) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(api.getName(imPrimitive))
    } catch (err) {
      reject(err)
    }
  })
}

const getType = async (imPrimitive) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(api.getType(imPrimitive))
    } catch (err) {
      reject(err)
    }
  })
}

const getID = async (imPrimitive) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(api.getID(imPrimitive))
    } catch (err) {
      reject(err)
    }
  })
}

const getValue = async (imPrimitive) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(api.getValue(imPrimitive))
    } catch (err) {
      reject(err)
    }
  })
}

const setValue = async (imPrimitive, value) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(api.setValue(imPrimitive, value))
    } catch (err) {
      reject(err)
    }
  })
}

const setTimeLength = async (timeLength) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(api.setTimeLength(timeLength))
    } catch (err) {
      reject(err)
    }
  })
}

const setTimeStep = async (timeStep) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(api.setTimeStep(timeStep))
    } catch (err) {
      reject(err)
    }
  })
}

const setTimeUnits = async (units) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(api.setTimeUnits(units))
    } catch (err) {
      reject(err)
    }
  })
}

const getData = async (converter) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(api.getData(converter))
    } catch (err) {
      reject(err)
    }
  })
}

const clearModel = async () => {
  return new Promise((resolve, reject) => {
    try {
      resolve(api.clearModel())
    } catch (err) {
      reject(err)
    }
  })
}

const createPrimitive = async (name, type, position, size) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(api.createPrimitive(name, type, position, size))
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
  findID,
  getName,
  getType,
  getID,
  getValue,
  setValue,
  getData,
  clearModel,
  createPrimitive,
  setTimeLength,
  setTimeStep,
  setTimeUnits,
}
