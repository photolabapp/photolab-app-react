import React from 'react'

export const addPhoto = (photo) => {
    //console.log("PHOOTORKOKTR -------- raw " + photo.raw + " 1015 " + photo.cropped10x15 + " 15x20 " + cropped15x20)
    return {
        type: "ADD_PHOTO",
        payload: {
            raw: photo.raw,
            cropped10x15: photo.cropped10x15,
            cropped15x20: photo.cropped15x20,
            quantity: 1,
            format: "10x15"
        }
    }
}

export const addPhotos = photos => {
    
    var albums = []
    photos.forEach(photo => {
        albums.push({
            raw: photo.path,
            cropped: photo.path,
            quantity: 1,
            format: "10x15"
        })
    })

    return {
        type: "ADD_PHOTOS",
        payload: albums
    }
}

export const updatePhoto10x15 = (photo, index) => {
    return {
        type: "UPDATE_PHOTO_10X15",
        index: index,
        payload: {
            cropped: photo.uri
        }
    }
}

export const updatePhoto15x20 = (photo, index) => {
    return {
        type: "UPDATE_PHOTO_15X20",
        index: index,
        payload: {
            cropped: photo.uri
        }
    }
}

export const removePhoto = index => {
    return {
        type: "REMOVE_PHOTO",
        index: index
    }
}

export const updateQuantity = (quantity, index) => {
    return {
        type: "UPDATE_PHOTO_QUANTITY",
        index: index,
        payload: {
            quantity: quantity
        }
    }
}

export const updateFormat = (format, index) => {
    return {
        type: "UPDATE_PHOTO_FORMAT",
        index: index,
        payload: {
            format: format
        }
    }
}