import react from 'react'

const initialState = {
    /*
    album: [
        {
            uri: 'http://conteudo.imguol.com.br/c/entretenimento/1b/2019/09/01/porsche-macan-1567368649708_v2_750x421.jpg'
        },
        {
            uri: 'http://conteudo.imguol.com.br/c/entretenimento/29/2019/09/01/porsche-macan-1567368584320_v2_750x421.jpg'
        },
        {
            uri: 'http://conteudo.imguol.com.br/c/entretenimento/67/2019/09/01/porsche-macan-1567368444505_v2_750x421.jpg'
        },
        {
            uri: 'http://conteudo.imguol.com.br/c/entretenimento/2f/2019/09/01/porsche-macan-1567368615884_v2_750x421.jpg'
        }
    ]
    */
   album: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case "ADD_PHOTO":
            return {
                album: [...state.album, action.payload]
            }
        case "UPDATE_PHOTO":
            console.log("SDSDSDSDSD " + action.index + " " + action.payload.uri)
            let newState = [...state]
            newState[action.index] = action.payload
            return {
                //album: [newState]
                album: [...state.album, action.payload]
            }
        default:
            return state

    }
}