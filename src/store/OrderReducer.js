import React, { Component } from 'react'

const initialState = {
    status: "DRAWN",
    format: "10x15",
    quantity: 1,
    album: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case "UPDATE_ORDER":
            return { ...state.order, order: action.payload, album: [...state.album] }

        case "CLEAR_ORDER":
            return initialStatee

        case "ADD_PHOTO":
            console.log("SLSKDLSDKLSD" + state.status)
            return { ...state, album: [...state.album, action.payload] }

        case "UPDATE_PHOTO":
            var newState = [...state.album]
            newState[action.index].cropped = action.payload.cropped

            return { ...state, album: newState }

        case "UPDATE_PHOTO_QUANTITY":
            var newState = [...state.album]
            newState[action.index].quantity = action.payload.quantity

            return { ...state, album: newState }

        case "UPDATE_PHOTO_FORMAT":
            console.log("LSKDLKDL format " + action.payload.format + " index " + action.index)
            var newState = [...state.album]
            newState[action.index].format = action.payload.format

            return { ...state, album: newState }

        default:
            return state

    }
}