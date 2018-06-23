const initial = {}

let id = 0

export const FILES_RESET = "FILES_RESET"
export const FILES_ADD = "FILES_ADD"
export const FILES_RENAME = "FILES_RENAME"
export const FILES_RENAMED = "FILES_RENAMED"
export const FILES_REMOVE = "FILES_REMOVE"

export function files(state = initial, action) {
    if (action.type === FILES_RESET) {
        return initial
    }

    if (action.type === FILES_ADD) {
        return {
            ...state,
            [++id]: {
                id,
                ...action.file,
                renaming: false,
            },
        }
    }

    if (action.type === FILES_RENAME) {
        return {
            ...state,
            [action.id]: {
                ...state[action.id],
                renaming: true,
            },
        }
    }

    if (action.type === FILES_RENAMED) {
        return {
            ...state,
            [action.id]: {
                ...state[action.id],
                name: action.name,
                renaming: false,
            },
        }
    }

    if (action.type === FILES_REMOVE) {
        const next = {
            ...state,
        }

        delete next[action.id]
        return next
    }

    return state
}

export function resetFiles() {
    return { type: FILES_RESET }
}

export function addFile(file) {
    return { type: FILES_ADD, file }
}

export function renameFile(id) {
    return { type: FILES_RENAME, id }
}

export function renamedFile(id, name) {
    return { type: FILES_RENAMED, id, name }
}

export function removeFile(id) {
    return { type: FILES_REMOVE, id }
}
