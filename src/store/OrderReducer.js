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
            const newOrder = { ...state.order, ...action.payload }
            console.log("SLSKDLSDKLSD UPDATE ORDER" + JSON.stringify(newOrder))
            return newOrder

        case "CLEAR_ORDER":
            return initialState

        case "ADD_PHOTO":
            console.log("SLSKDLSDKLSD" + state.status)
            return { ...state, album: [...state.album, action.payload] }

        case "REMOVE_PHOTO":
            var newState = [...state.album]
            var itemToRemove = newState[action.index]

            return { ...state, album: newState.filter(item => item !== itemToRemove) }

        case "ADD_PHOTOS":
            var albums = [...state.album]
            album.push(action.payload)
            return { ...state, album: albums }

        case "UPDATE_PHOTO":
            var newState = [...state.album]
            newState[action.index].cropped = action.payload.cropped

            return { ...state, album: newState }

        case "UPDATE_PHOTO_10X15":
            var newState = [...state.album]
            newState[action.index].cropped10x15 = action.payload.cropped

            return { album: newState }

        case "UPDATE_PHOTO_15X20":
            var newState = [...state.album]
            newState[action.index].cropped15x20 = action.payload.cropped

            return { album: newState }

        case "UPDATE_PHOTO_QUANTITY":
            var newState = [...state.album]
            newState[action.index].quantity = action.payload.quantity

            return { ...state, album: newState }

        case "UPDATE_PHOTO_FORMAT":
            var newState = [...state.album]
            newState[action.index].format = action.payload.format

            return { ...state, album: newState }

        default:
            return state

    }
}