import React, { Component } from "react"

class Files extends Component {
    onDelete = file => {
        const { store } = this.props

        console.log(`deleting file ${file.name}`)

        const files = store.get("files")
        delete files[file.id]
        store.set("files", files)
    }

    render() {
        const { store } = this.props

        const values = Object.values(store.get("files"))

        return (
            <div style={styles.files}>
                {values.map(file => this.renderFile(file))}
            </div>
        )
    }

    renderFile = file => {
        return (
            <div key={file.id} style={styles.file}>
                {file.name}
                <button onClick={e => this.onDelete(file)}>delete</button>
            </div>
        )
    }
}

const styles = {
    files: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "25%",
        height: "100%",
    },
    file: {
        padding: 10,
    },
}

export { Files }
