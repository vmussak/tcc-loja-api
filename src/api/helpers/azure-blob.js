const Promise = require('promise'),
    azure = require('azure-storage'),
    packPath = require('path'),
    fs = require('fs'),
    blobService = azure.createBlobService('tccmussak', process.env.AZURE_STORAGE_KEY);

const FOLDER = __dirname + '../../uploads/';

module.exports = {
    upload
};

async function upload(containerName, fileName, file) {
    uploadLocalFileSync(fileName, file);

    return new Promise((resolve, reject) => {
        blobService.createBlockBlobFromLocalFile(
            containerName,
            fileName,
            `${FOLDER}/${fileName}`,
            (error, result, response) => {
                if (error) return reject(error);

                removeLocalFileSync(fileName);
                resolve(result);
            }
        );
    });
}

function uploadLocalFileSync(filename, base64File) {
    fs.writeFileSync(FOLDER + filename, convertBase64ToFile(base64Prepare(base64File).base64), 'UTF8');
}

function removeLocalFileSync(filename) {
    if (fs.existsSync(FOLDER + filename))
        fs.unlinkSync(FOLDER + filename);
}

function convertBase64ToFile(file) {
    return new Buffer(file, "base64");
}

function base64Prepare(base64) {
    if (!base64)
        throw { statusCode: 400, message: 'Arquivo inválido' };

    if (base64.indexOf(';base64,') === -1)
        throw { statusCode: 400, message: 'Arquivo inválido' };

    base64 = base64.substr(5);
    base64 = base64.split(';base64,');

    return {
        base64: base64[1],
        ext: base64[0].split('/')[1]
    }
}