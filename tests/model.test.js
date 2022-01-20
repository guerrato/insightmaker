const path = require("path")
const { SimpleNode } = require("../api")
const Im = require("../index")

describe("File reading", () => {
  test("Must return error when not find file", async () => {
    const file = path.join(__dirname, "files", "none.InsightMaker")
    await expect(Im.loadModelFromFile(file)).rejects.toThrow()
  })

  test("Must be a valid empty model", () => {
    const file = path.join(__dirname, "files", "empty.InsightMaker")
    return Im.loadModelFromFile(file).then((s) => {
      expect(s).toBeInstanceOf(SimpleNode)
    })
  })

  test("Must be a valid model file", () => {
    const file = path.join(__dirname, "files", "model.InsightMaker")
    return Im.loadModelFromFile(file).then((s) => {
      expect(s).toBeInstanceOf(SimpleNode)
    })
  })

  test("Must throw error when file is invalid", () => {
    const file = path.join(__dirname, "files", "invalid.InsightMaker")
    return Im.loadModelFromFile(file).then((s) => {
      expect(s).toBeInstanceOf(SimpleNode)
    })
  })
})

describe("Model loading", () => {
  test("Must load model by file content", () => {
    const fs = require("fs")
    const file = path.join(__dirname, "files", "model.InsightMaker")
    const data = fs.readFileSync(file, "utf8")

    expect(data).toMatch(/^\s*<InsightMakerModel>(\n.*)+<\/InsightMakerModel>/)

    return Im.loadModel(data).then((s) => {
      expect(s).toBeInstanceOf(SimpleNode)
    })
  })

  test("Must throw error for invalid model by file content", () => {
    const fs = require("fs")
    const file = path.join(__dirname, "files", "invalid.InsightMaker")
    const data = fs.readFileSync(file, "utf8")

    expect(data).not.toMatch(
      /^\s*<InsightMakerModel>(\n.*)+<\/InsightMakerModel>/
    )
  })
})

describe("Model manipulation", () => {
  test("Must clean model", async () => {
    const file = path.join(__dirname, "files", "model.InsightMaker")
    await Im.loadModelFromFile(file)
    let primitiveList = await Im.findAll()
    expect(primitiveList.length).toBe(9)
    await Im.clearModel()
    primitiveList = await Im.findAll()
    expect(primitiveList.length).toBe(0)
  })

  test("Must create primitive", async () => {
    const file = path.join(__dirname, "files", "model.InsightMaker")
    await Im.loadModelFromFile(file)
    await Im.clearModel()
    await Im.createPrimitive("Var", "Variable", [100, 100], [100, 100])
    let primitiveList = await Im.findAll()
    expect(primitiveList.length).toBe(1)
  })

  test("Must set primitive values", async () => {
    const file = path.join(__dirname, "files", "model.InsightMaker")
    const model = await Im.loadModelFromFile(file)
    await Im.clearModel()
    const primitive = await Im.createPrimitive(
      "Var",
      "Variable",
      [100, 100],
      [100, 100]
    )
    await Im.setTimeUnits("Years")
    await Im.setTimeStep(1)
    await Im.setTimeLength(10)
    await Im.setValue(primitive, "Years()^2")

    const result = await Im.runModel(model)
    return expect(result.value(primitive)[2]).toBe(4)
  })

  test("Must return error when invalid primitive value", async () => {
    const file = path.join(__dirname, "files", "model.InsightMaker")
    const model = await Im.loadModelFromFile(file)
    await Im.clearModel()
    const variable = await Im.createPrimitive(
      "Var",
      "Variable",
      [100, 100],
      [100, 100]
    )
    await Im.setValue(variable, "sds")
    const result = await Im.runModel(model)
    return expect(result.error.trim()).toBe(
      'The variable or function "sds" does not exist.'
    )
  })

  test("Must find primitive by its ID", async () => {
    const file = path.join(__dirname, "files", "model.InsightMaker")
    await Im.loadModelFromFile(file)
    const primitive = await Im.findID(6)
    expect(primitive.id).toBe("6")
  })

  test("Must get a primitive name", async () => {
    const file = path.join(__dirname, "files", "model.InsightMaker")
    await Im.loadModelFromFile(file)
    const primitive = await Im.findID(6)
    const name = await Im.getName(primitive)
    expect(name).toBe("Desired level")
  })

  test("Must get a primitive ID", async () => {
    const file = path.join(__dirname, "files", "model.InsightMaker")
    await Im.loadModelFromFile(file)
    const primitive = await Im.findID(6)
    const id = await Im.getID(primitive)
    expect(id).toBe("6")
  })

  test("Must get a primitive Type", async () => {
    const file = path.join(__dirname, "files", "model.InsightMaker")
    await Im.loadModelFromFile(file)
    const primitive = await Im.findID(6)
    const type = await Im.getType(primitive)
    expect(type).toBe("Variable")
  })

  test("Must get a primitive Value", async () => {
    const file = path.join(__dirname, "files", "model.InsightMaker")
    await Im.loadModelFromFile(file)
    const primitive = await Im.findID(6)
    const value = await Im.getValue(primitive)
    expect(value).toBe("300")
  })

  test("Must get a converter data", async () => {
    const file = path.join(__dirname, "files", "converter.InsightMaker")
    await Im.loadModelFromFile(file)
    const primitive = await Im.findID(55)
    const value = await Im.getData(primitive)
    expect(value).toBe("0,0; 10,100; 20,400; 30,900")
  })
})
