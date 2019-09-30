const initialState = {
    order: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case "UPDATE_ORDER":
            return { ...state.order, order: action.payload }
        default:
            return state

    }
}