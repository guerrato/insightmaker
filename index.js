const api = require('./api')

const loadModel = model => {
  try {
    return api.loadXML(model)
  } catch (err) {
    throw err
  }
}

const execModel = model => {
  try {
    return api.runModel({ silent: model })
  } catch (err) {
    throw err
  }
}

module.exports = {
  loadModel,
  execModel
}