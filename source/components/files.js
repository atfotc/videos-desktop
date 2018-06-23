import React from "react"
import { connect } from "react-redux"

export function Files({ files }) {
    return <ol>{files.map(({ id, name }) => <li key={id}>{name}</li>)}</ol>
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
