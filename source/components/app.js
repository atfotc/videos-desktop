import React, { Component } from "react"

class App extends Component {
    constructor(...params) {
        super(...params)

        this.stop = this.stop.bind(this)
        this.onDrop = this.onDrop.bind(this)
    }

    stop(e) {
        e.preventDefault()
        e.stopPropagation()
    }

    onDrop(e) {
        e.preventDefault()
        e.stopPropagation()

        console.log("dropped", e.dataTransfer.files)
    }

    render() {
        const { onDrop, stop } = this

        return (
            <div
                draggable={true}
                onDragOver={stop}
                onDragLeave={stop}
                onDragEnd={stop}
                onDrop={onDrop}
                style={styles.dropper}
            >
                hello world
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
