import React from "react"

export function FileRename({ id, name, onClickSave }) {
    let input

    return (
        <div>
            <input type="text" ref={i => (input = i)} defaultValue={name} />
            <button onClick={e => onClickSave(id, input.value)}>save</button>
        </div>
    )
}
