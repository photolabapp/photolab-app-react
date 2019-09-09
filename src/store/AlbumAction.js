export const addPhoto = photo => {
    return {
        type: "ADD_PHOTO",
        payload: {
            uri: photo.uri
        }
    }
}

export const updatePhoto = (photo, index) => {
    return {
        type: "UPDATE_PHOTO",
        index: index,
        payload: {
            uri: photo.uri
        }
    }
}