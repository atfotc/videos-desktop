import React from "react"
import { connect } from "react-redux"
import fs from "fs"
import { Files } from "../components"
import { addFile, files } from "../reducers/files"

export function dispatchFiles(files, dispatch) {
    Array.from(files).forEach(file => {
        const { name, path, size, type } = file

        if (type !== "audio/mp3") {
            console.log(`not saving ${name}, wrong type`)
            return
        }

        console.log(`saving ${name}`)

        const data = fs.readFileSync(path)

        dispatch(
            addFile({
                name,
                path,
                size,
                type,
                data: data.toString("base64"),
            }),
        )
    })
}

export function App({ onDragOver, onDragLeave, onDragEnd, onDrop }) {
    return (
        <div
            draggable={true}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDragEnd={onDragEnd}
            onDrop={onDrop}
            style={styles.dropper}
        >
            <Files />
        </div>
    )
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

export function mapStateToProps(state) {
    return {}
}

export function mapDispatchToProps(dispatch) {
    const stop = e => {
        e.preventDefault()
        e.stopPropagation()
    }

    return {
        onDragOver: e => stop(e),
        onDragLeave: e => stop(e),
        onDragEnd: e => stop(e),

        onDrop: e => {
            stop(e)
            dispatchFiles(e.dataTransfer.files, dispatch)
        },
    }
}

export const ConnectedApp = connect(
    mapStateToProps,
    mapDispatchToProps,
)(App)
