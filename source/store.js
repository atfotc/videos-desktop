const electron = require("electron")
const path = require("path")
const fs = require("fs")

class Store {
    constructor({ name, defaults }) {
        const app = electron.app || electron.remote.app
        const dataPath = app.getPath("userData")

        this.path = path.join(dataPath, name + ".json")
        this.data = parseDataFile(this.path, defaults)
    }

    get(key) {
        return this.data[key]
    }

    set(key, value) {
        this.data[key] = value
        fs.writeFileSync(this.path, JSON.stringify(this.data))
    }
}

function parseDataFile(filePath, defaults) {
    try {
        return JSON.parse(fs.readFileSync(filePath))
    } catch (error) {
        return defaults
    }
}

module.exports = { Store }
