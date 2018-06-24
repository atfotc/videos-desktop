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
            style={styles.app}
        >
            <div style={styles.files}>
                <Files />
            </div>
            <div style={styles.details} />
        </div>
    )
}

const styles = {
    app: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        fontFamily: "sans-serif",
    },
    files: {
        position: "absolute",
        top: 0,
        left: 0,
        width: 350,
        height: "100%",
    },
    details: {
        position: "absolute",
        top: 0,
        left: "30%",
        width: "calc(100% - 250px)",
        height: "100%",
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
