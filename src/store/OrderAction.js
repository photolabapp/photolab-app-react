export const updateOrder = order => {
    return {
        type: "UPDATE_ORDER",
        payload: order
    }
}

export const clearOrder = () => {
    return {
        type: "CLEAR_ORDER"
    }
}