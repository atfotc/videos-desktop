const { app, BrowserWindow } = require("electron")
const { Store } = require("./store")

const store = new Store({
    name: "preferences",
    defaults: {
        bounds: { width: 800, height: 600 },
    },
})

let window = null

function createWindow() {
    window = new BrowserWindow(store.get("bounds"))

    window.on("resize", () => {
        store.set("bounds", window.getBounds())
    })

    window.on("move", () => {
        store.set("bounds", window.getBounds())
    })

    window.loadFile("./build/index.html")
}

app.on("ready", createWindow)

app.on("window-all-closed", () => {
    window = null

    if (process.platform !== "darwin") {
        app.quit()
    }
})

app.on("activate", () => {
    if (window === null) {
        createWindow()
    }
})
