const request = require('request-promise'),
    faceApi = 'https://southcentralus.api.cognitive.microsoft.com/face/v1.0',
    faceApiKey = process.env.AZURE_API_FACE_KEY,
    largeFaceListName = 'loja',
    blobUrl = 'https://tccmussak.blob.core.windows.net/cliente',
    blobReconhecimentoUrl = 'https://tccmussak.blob.core.windows.net/reconhecimento';

module.exports = {
    verificarFace,
    treinarReconhecimento,
    criarLargeFaceList,
    uploadFaceParaDeteccao,
    uploadImagem
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

async function uploadFaceParaDeteccao(imageName) {
    let config = {
        method: 'POST',
        uri: `${faceApi}/detect?returnFaceId=true&returnFaceLandmarks=false`,
        headers: {
            'Ocp-Apim-Subscription-Key': faceApiKey
        },
        json: true,
        body: {
            url: `${blobReconhecimentoUrl}/${imageName}`
        }
    };

    let response = await request(config);
    return response;
}

async function uploadImagem(imageName) {
    await criarLargeFaceList();

    let config = {
        method: 'POST',
        uri: `${faceApi}/largefacelists/${largeFaceListName}/persistedfaces`,
        headers: {
            'Ocp-Apim-Subscription-Key': faceApiKey
        },
        json: true,
        body: {
            url: `${blobUrl}/${imageName}`
        }
    };

    let response = await request(config);

    return response;
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

