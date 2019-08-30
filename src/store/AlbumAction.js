export const addPhoto = photo => {
    return {
        type: "UPDATE_ALBUM",
        payload: {
            uri: photo.uri
        }
    }
}