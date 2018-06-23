const electron = require("electron")
const path = require("path")
const fs = require("fs")

const parse = (filePath, defaults) => {
    try {
        return JSON.parse(fs.readFileSync(filePath))
    } catch (error) {
        return defaults
    }
}

class Store {
    constructor({ name, defaults }) {
        const app = electron.app || electron.remote.app
        const dataPath = app.getPath("userData")

        this.path = path.join(dataPath, name + ".json")
        this.data = parse(this.path, defaults)

        console.log(`opening store at ${this.path}`)
    }

    get = key => {
        return this.data[key]
    }

    set = (key, value) => {
        this.data[key] = value
        fs.writeFileSync(this.path, JSON.stringify(this.data))
    }

    increment = key => {
        const value = this.get(key) + 1
        this.set(key, value)
        return value
    }
}

module.exports = { Store }
