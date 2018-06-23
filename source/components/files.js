import React from "react"
import { connect } from "react-redux"
import { renameFile, renamedFile, removeFile } from "../reducers/files"

export function Files({ files, onClickRename, onClickRemove, onClickSave }) {
    let input

    return (
        <ol>
            {files.map(({ id, name, renaming }) => (
                <li key={id}>
                    {renaming ? (
                        <span>
                            <input
                                type="text"
                                ref={i => (input = i)}
                                defaultValue={name}
                            />
                            <button onClick={e => onClickSave(id, input.value)}>
                                save
                            </button>
                        </span>
                    ) : (
                        <span>
                            {name}
                            <a href="#" onClick={e => onClickRename(id)}>
                                rename
                            </a>
                            <a href="#" onClick={e => onClickRemove(id)}>
                                remove
                            </a>
                        </span>
                    )}
                </li>
            ))}
        </ol>
    )
}

export function matchStateToProps(state) {
    return {
        files: Object.values(state.files),
    }
}

export function matchDispatchToProps(dispatch) {
    return {
        onClickRename: id => dispatch(renameFile(id)),
        onClickRemove: id => dispatch(removeFile(id)),
        onClickSave: (id, name) => dispatch(renamedFile(id, name)),
    }
}

export const ConnectedFiles = connect(
    matchStateToProps,
    matchDispatchToProps,
)(Files)
