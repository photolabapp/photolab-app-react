export const addPhoto = photo => {
    return {
        type: "ADD_PHOTO",
        payload: {
            raw: photo,
            cropped: photo,
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