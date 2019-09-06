export const addPhoto = photo => {
    return {
        type: "ADD_PHOTO",
        payload: {
            uri: photo.uri
        }
    }
}

export const updatePhoto = photo => {
    return {
        type: "UPDATE_PHOTO",
        payload: {
            uri: photo.uri
        }
    }
}