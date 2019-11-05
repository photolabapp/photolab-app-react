export const addPhoto = photo => {
    return {
        type: "ADD_PHOTO",
        payload: {
            raw: photo.uri,
            cropped: photo.uri,
            quantity: 1,
            format: "10x15"
        }
    }
}

export const updatePhoto = (photo, index) => {
    return {
        type: "UPDATE_PHOTO",
        index: index,
        payload: {
            cropped: photo.uri
        }
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