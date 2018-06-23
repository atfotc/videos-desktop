const initial = {}

let id = 0

export const FILES_RESET = "FILES_RESET"
export const FILES_ADD = "FILES_ADD"
export const FILES_RENAME = "FILES_RENAME"
export const FILES_DELETE = "FILES_DELETE"

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
            },
        }
    }

    if (action.type === FILES_RENAME) {
        return {
            ...state,
            [action.id]: {
                ...state[action.id],
                name: action.name,
            },
        }
    }

    if (action.type === FILES_DELETE) {
        return {
            ...state,
            [action.id]: undefined,
        }
    }

    return state
}

export function resetFiles() {
    return { type: FILES_RESET }
}

export function addFile(file) {
    return { type: FILES_ADD, file }
}

export function renameFile(id, name) {
    return { type: FILES_RENAME, id, name }
}

export function deleteFile(id) {
    return { type: FILES_DELETE, id }
}
