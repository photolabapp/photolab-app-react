import React from 'react'
const initialState = {
    user: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case "UPDATE_USER":
            console.log("LOG -------- action.payload " + action.payload.name)
            return { ...state, user: action.payload }
        default:
            return state

    }
}