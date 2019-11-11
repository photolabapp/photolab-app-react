import React, { Component } from 'react'

const initialState = {
    order: { status: "DRAWN", album: [] }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case "UPDATE_ORDER":
            return { ...state.order, order: action.payload }

        case "ADD_PHOTO":
            console.log("SLSKDLSDKLSD" + state.status)
            return { ...state, album: [...state.album, action.payload] }

        case "UPDATE_PHOTO":
            var newState = [...state.album]
            newState[action.index].cropped = action.payload.cropped

            return { ...state, album: newState }

        case "UPDATE_PHOTO_QUANTITY":
            var newState = [...state.album]
            newState[action.index].quantity = action.payload.quantityÎ

            return { ...state, album: newState }

        case "UPDATE_PHOTO_FORMART":
            var newState = [...state.album]
            newState[action.index].format = action.payload.format

            return { ...state, album: newState }

        default:
            return state

    }
}