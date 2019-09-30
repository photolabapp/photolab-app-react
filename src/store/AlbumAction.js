export const addPhoto = photo => {
    return {
        type: "ADD_PHOTO",
        payload: {
            raw: photo.uri,
            cropped: photo.uri
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