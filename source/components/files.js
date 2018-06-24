import React from "react"
import { connect } from "react-redux"
import { renameFile, renamedFile, removeFile } from "../reducers/files"
import { File } from "../components"

export function Files({ files, onClickRename, onClickRemove, onClickSave }) {
    return (
        <ol style={styles.files}>
            {files.map(({ id, name, renaming }) => (
                <li key={id}>
                    <File id={id} />
                </li>
            ))}
        </ol>
    )
}

const styles = {
    files: {
        display: "flex",
        flexDirection: "column",
        listStyleType: "none",
        margin: 0,
        padding: 0,
    },
}

export function matchStateToProps(state) {
    return {
        files: Object.values(state.files),
    }
}

export function matchDispatchToProps(dispatch) {
    return {}
}

export const ConnectedFiles = connect(
    matchStateToProps,
    matchDispatchToProps,
)(Files)
