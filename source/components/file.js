import React from "react"
import { connect } from "react-redux"

import {
    selectFile,
    renameFile,
    renamedFile,
    removeFile,
} from "../reducers/files"

import { FileRename, FileView } from "../components"

export function File({
    id,
    name,
    renaming,
    selected,
    onClick,
    onClickSave,
    onClickRename,
    onClickRemove,
}) {
    const props = {
        onClick: e => {
            onClick(id)
        },
        onDragStart: e => {
            e.preventDefault()
            e.stopPropagation()
        },
        style: {
            ...styles.file,
            ...(selected ? styles.selectedFile : undefined),
        },
    }

    if (renaming) {
        return (
            <div {...props}>
                <FileRename id={id} name={name} onClickSave={onClickSave} />
            </div>
        )
    }

    return (
        <div {...props}>
            <FileView
                id={id}
                name={name}
                onClickRename={onClickRename}
                onClickRemove={onClickRemove}
            />
        </div>
    )
}

const styles = {
    file: {
        display: "flex",
        flexDirection: "row",
        padding: 15,
        cursor: "pointer",
    },
    selectedFile: {
        backgroundColor: "rgba(0, 0, 0, 0.1)",
    },
}

export function mapStateToProps(state, props) {
    const { name, renaming, selected } = state.files[props.id]

    return {
        name,
        renaming,
        selected,
    }
}

export function mapDispatchToProps(dispatch) {
    return {
        onClick: id => dispatch(selectFile(id)),
        onClickRename: id => dispatch(renameFile(id)),
        onClickRemove: id => dispatch(removeFile(id)),
        onClickSave: (id, name) => dispatch(renamedFile(id, name)),
    }
}

export const ConnectedFile = connect(
    mapStateToProps,
    mapDispatchToProps,
)(File)
