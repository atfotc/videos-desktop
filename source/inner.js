import React from "react"
import { render } from "react-dom"
import { createStore, combineReducers } from "redux"
import { Provider } from "react-redux"
import Store from "electron-store"
import { files } from "./reducers"
import { App } from "./components"

const reducers = combineReducers({
    files,
})

const electronStore = new Store()
// electronStore.clear()

const storedState = electronStore.get("redux-state")

const reduxStore = createStore(
    reducers,
    storedState ? JSON.parse(storedState) : undefined,
)

let debounce

reduxStore.subscribe(() => {
    clearTimeout(debounce)

    debounce = setTimeout(() => {
        electronStore.set("redux-state", JSON.stringify(reduxStore.getState()))
    }, 250)
})

render(
    <Provider store={reduxStore}>
        <App />
    </Provider>,
    document.querySelector(".app"),
)
