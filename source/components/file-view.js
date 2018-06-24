import React from "react"

export function FileView({ id, name, onClickRename, onClickRemove }) {
    return (
        <div style={styles.file}>
            <div>{name}</div>
            <div>
                <a href="#" onClick={e => onClickRename(id)}>
                    rename
                </a>
                <a href="#" onClick={e => onClickRemove(id)}>
                    remove
                </a>
            </div>
        </div>
    )
}

const styles = {
    file: {
        display: "flex",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
    },
}
