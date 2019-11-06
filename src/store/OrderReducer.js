const initialState = {
    order: { status: "DRAWN" }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case "UPDATE_ORDER":
            return { ...state.order, order: action.payload }

        case "ADD_PHOTO":
            return { ...state.order, album: [...state.album, action.payload] }

        case "UPDATE_PHOTO":
            var newState = [...state.album]
            newState[action.index].cropped = action.payload.cropped

            return { ...state.order, album: newState }

        case "UPDATE_PHOTO_QUANTITY":
            var newState = [...state.album]
            newState[action.index].quantity = action.payload.quantityÎ

            return { ...state.order, album: newState }

        case "UPDATE_PHOTO_FORMART":
            var newState = [...state.album]
            newState[action.index].format = action.payload.format

            return { ...state.order, album: newState }
            
        default:
            return state

    }
}