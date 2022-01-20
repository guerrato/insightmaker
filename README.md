# InsightMaker

InsightMaker is a library that lets you use the Insight Maker API (https://insightmaker.com) on your Node.js projects.
By installing you will be able to execute the IM models and get the results on your server or client-side Node.js project in the same way of Insight Maker (IM) application does.

## Installation

```npm i insightmaker```

## Basic Examples
All the API methods are asynchronous.

### Exemple using a basic Node script
```jsx
const Im = require('insightmaker')

const getModelResults = async filePath => {
    try {
        const model = await Im.loadModelFromFile(filePath)
        return await Im.runModel(model)
    } catch (e) {
        console.log(e)
    }
}

getModelResults('./Example.InsightMaker').then(results => {
    console.log(results)
})
```

### Example using async methods when browser file uploaded
```jsx
// Importing the IM NPM package before using it
import Im from 'insightmaker'

// Loading model by uploaded file via browser
const model = await Im.loadModelFromFile(file)

// Run the model and attibute the results into a constant
const results = await Im.runModel(model)

console.log(results)
```

## Methods
| Name | Params | Type | Description |
| :------------ |:---------------:| :---------------:| :----- |
| clearModel | |  | Clean the whole loaded model |
| createPrimitive | name, type, position, size | integer | Creates a new primitive and adds it to the model. The types can be can be: “Stock”, “Flow”, “Link”, “Text”, “Button”, “Picture”, “Converter”, “Variable” or Array of string. |
| findAll |  |  | Returns all primitives of a specific type. They can be: “Stock”, “Flow”, “Link”, “Text”, “Button”, “Picture”, “Converter”, “Variable” or Array of string. |
| findID | primitiveId | integer | Returns a primitive by its given ID. |
| getData | converter | SimpleNode | Given a converter or an array of Converters, it gets the data of a converter. |
| getID | imPrimitive | SimpleNode | Given a primitive, it gets the **id** of the passed primitive. |
| getName | imPrimitive | SimpleNode | Given a primitive, it gets the **name** of the passed primitive. |
| getType | imPrimitive | SimpleNode | Given a primitive, it gets the **type** of the passed primitive. |
| getValue | imPrimitive | SimpleNode | Given a primitive, it gets the **value** of the passed primitive. |
| loadModelFromFile | file | File/string | Loads the exported IM models from file ([Learn more about export IM files](#Exporting-IM-File)) |
| loadModel | fileContent | string | Loads the exported IM models from file **content** |
| runModel | model | Object |  |
| setValue | imPrimitive, value | SimpleNode, any | Given a primitive, it sets the primitive **value**. |
| setTimeLength | timeLength | integer | Sets the length of the simulation. |
| setTimeStep | timeStep | string | Sets the time units of the simulation. The units could be: "Seconds", "Minutes", "Days", "Years". |
| setTimeUnits | units | integer | The time step to be used in the simulation. |


## Exporting IM File
To get the model file from IM website and use it in your project go to Share -> Export -> Download Insight Maker File. The download must be started automatically and you can use by the command `loadModelFromFile` or get its content and load it by `loadModel`
*Note*: If you have the file as part of your project and have the Node FS, then you can pass the file path that will be read when loading.

![Export file](presentation/file_export.png "Exporting file on IM")