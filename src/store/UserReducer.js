const initialState = {
    user: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case "ADD_USER":
            return {
                //user: {...state.album, action.payload}
            }
        case "UPDATE_ADDRESS":
            return {
                //album: newState
            }
        default:
            return state

    }
}