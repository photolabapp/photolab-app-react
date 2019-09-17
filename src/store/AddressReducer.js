const initialState = {
    user: {
        
    }
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
        default:
            return state

    }
}