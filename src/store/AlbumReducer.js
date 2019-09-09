import react from 'react'

const initialState = {
    album: [
        {
            raw: 'https://a-static.mlcdn.com.br/618x463/quadro-decorativo-canvas-p-escritorios-casas-de-praia-paisagem-praia-ii-incasa-design/incasadesign/cv0133pri/f45e60739214167a99eea02c17016b91.jpg',
            cropped: 'https://a-static.mlcdn.com.br/618x463/quadro-decorativo-canvas-p-escritorios-casas-de-praia-paisagem-praia-ii-incasa-design/incasadesign/cv0133pri/f45e60739214167a99eea02c17016b91.jpg'
        }
    ]
    //album: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case "ADD_PHOTO":
            return {
                album: [...state.album, action.payload]
            }
        case "UPDATE_PHOTO":
            var newState = [...state.album]
            newState[action.index].cropped = action.payload.cropped
            
            return {
                album: newState
            }
        default:
            return state

    }
}