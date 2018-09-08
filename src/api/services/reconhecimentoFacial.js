const request = require('request-promise'),
    faceApi = 'https://southcentralus.api.cognitive.microsoft.com/face/v1.0',
    faceApiKey = process.env.AZURE_API_FACE_KEY,
    largeFaceListName = 'loja';

module.exports = {
    verificarFace,
    treinarReconhecimento,
    criarLargeFaceList,
    uploadFaceParaDeteccao,
    uploadImagemCliente
};

async function verificarFace(faceId) {
    let config = {
        method: 'POST',
        uri: `${faceApi}/findsimilars`,
        headers: {
            'Ocp-Apim-Subscription-Key': faceApiKey
        },
        json: true,
        body: {
            faceId: faceId,
            largeFaceListId: largeFaceListName,
            maxNumOfCandidatesReturned: 2,
            mode: "matchPerson"
        }
    };

    let response = await request(config);

    return response;
};

async function treinarReconhecimento() {
    let config = {
        method: 'POST',
        uri: `${faceApi}/largefacelists/${largeFaceListName}/train`,
        headers: {
            'Ocp-Apim-Subscription-Key': faceApiKey
        }
    };

    let response = await request(config);

    return response;
};

//instalar o pacote do azure
//fazer upload no blob
async function uploadFaceParaDeteccao(fileUrl) {
    let config = {
        method: 'POST',
        uri: `${faceApi}/detect?returnFaceId=true&returnFaceLandmarks=false`,
        headers: {
            'Ocp-Apim-Subscription-Key': faceApiKey
        },
        json: true,
        body: fileUrl
    };

    let response = await request(config);
    return response;
}

async function uploadImagemCliente() {

}

//rodar uma vez só
async function criarLargeFaceList() {
    let config = {
        method: 'PUT',
        uri: `${faceApi}/largefacelists/${largeFaceListName}`,
        headers: {
            'Ocp-Apim-Subscription-Key': faceApiKey
        },
        json: true,
        body: {
            name: largeFaceListName,
            userData: "Lista de faces da loja"
        }
    };

    let response = await request(config);

    return response;
};

