import React, { Component } from "react"
import fs from "fs"
import { Store } from "../store"
import { Files } from "./files"

const store = new Store({
    name: "data",
    defaults: {
        id: 0,
        files: {},
        verses: {},
        tracks: {},
    },
})

class App extends Component {
    onStop = e => {
        e.preventDefault()
        e.stopPropagation()
    }

    onDrop = e => {
        e.preventDefault()
        e.stopPropagation()

        // console.log("dropped", e.dataTransfer.files)

        Array.from(e.dataTransfer.files).forEach(this.onFile)
    }

    onFile = file => {
        if (file.type !== "audio/mp3") {
            this.onReject(file, "wrong type")
            return
        }

        this.onStore(file)
    }

    onStore = file => {
        const { name, path, size, type } = file

        console.log(`saving ${name}`)

        const id = store.increment("id")
        const data = fs.readFileSync(path)

        store.set("files", {
            ...store.get("files"),
            [id]: {
                id,
                ...file,
                data: data.toString("base64"),
            },
        })

        console.log(store.get("files"))
    }

    onReject = (file, reason) => {
        console.log(`not saving ${file.name}, ${reason}`)
    }

    render() {
        const { onDrop, onStop } = this

        return (
            <div
                draggable={true}
                onDragOver={onStop}
                onDragLeave={onStop}
                onDragEnd={onStop}
                onDrop={onDrop}
                style={styles.dropper}
            >
                <Files store={store} />
            </div>
        )
    }
}

const styles = {
    dropper: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: "#999",
    },
}

export { App }
