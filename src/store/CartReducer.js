const initialState = {
    cart: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case "ADD_CART":
            return {
                //user: {...state.album, action.payload}
            }
        case "UPDATE_CART":
            return {
                //album: newState
            }
        default:
            return state

    }
}