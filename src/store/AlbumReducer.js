const initialState = {
    album: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case "ADD_PHOTO":
            return {
                album: [...state.album, action.payload]
            }
        case "UPDATE_PHOTO":
            var newState = [...state.album]
            newState[action.index].cropped = action.payload.cropped

            return {
                album: newState
            }
        case "UPDATE_PHOTO_QUANTITY":
            var newState = [...state.album]
            newState[action.index].quantity = action.payload.quantity

            return {
                album: newState
            }
        case "UPDATE_PHOTO_FORMART":
            var newState = [...state.album]
            newState[action.index].format = action.payload.format

            return {
                album: newState
            }
        default:
            return state

    }
}