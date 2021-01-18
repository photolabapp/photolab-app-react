import React from 'react'

export const updateOrder = order => {
    console.log("UPDATEORDER " + JSON.stringify(order))
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